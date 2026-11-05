#!/usr/bin/env node
/**
 * Editorial quality gate + indexability control.
 *
 * Runs before every build. For each content page it checks uniqueness,
 * thin content, near-duplicates, keyword cannibalization, canonical paths,
 * images/alt text and business-data requirements. Only pages that pass every
 * hard check get status "index"; everything else is rendered with
 * robots noindex and is left out of the XML sitemap.
 *
 * Outputs:
 *   seo/indexability.json   path -> { status, score, reasons }
 *   seo/images.json         public image path -> { width, height }
 *   seo/quality-report.json full report used by the final QA report
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";
import sharp from "sharp";

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "content", "pages");
const business = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "business.json"), "utf8"));
const keywordMap = JSON.parse(fs.readFileSync(path.join(ROOT, "seo", "keyword-map.json"), "utf8"));

const MIN_WORDS = { home: 500, setup: 550, apps: 500, guides: 600, compare: 600, troubleshooting: 550, company: 500, legal: 250, blog: 600 };
const HUB_MIN_WORDS = 500;
// Contact is a short utility page; legal pages are as long as their terms need.
const SHORT_PAGES = { "/contact": 250 }; // hubs also list their children
const NEAR_DUP_THRESHOLD = 0.18; // Jaccard similarity of 5-word shingles
const TITLE_LEN = [25, 65];
const DESC_LEN = [110, 165];

const requirements = {
  pricing: (b) => [...(b.plans ? [] : ["plans"]), ...(b.checkoutMethod ? [] : ["checkoutMethod"]), ...(b.contentRightsConfirmed ? [] : ["content rights (verify before commercial launch)"])],
  trial: (b) => (b.trial ? [] : ["trial"]),
  contact: (b) => (b.email || b.whatsapp || b.telegram ? [] : ["email|whatsapp|telegram"]),
  reseller: (b) => (b.reseller ? [] : ["reseller"]),
  refund: (b) => (b.refundPolicy ? [] : ["refundPolicy"]),
  legal: (b) => (b.legalEntity && (b.email || b.whatsapp) ? [] : ["legalEntity", "contact"]),
};

// keyword -> owning url from the keyword map
const kwOwner = new Map();
for (const c of keywordMap.clusters) for (const k of c.keywords) kwOwner.set(k.keyword.toLowerCase(), c.url);

function plain(md) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*`|_]/g, " ")
    .replace(/-{3,}/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function shingles(text, n = 5) {
  const w = text.split(" ").filter(Boolean);
  const s = new Set();
  for (let i = 0; i + n <= w.length; i++) s.add(w.slice(i, i + n).join(" "));
  return s;
}

function jaccard(a, b) {
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter || 1);
}

const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".md"));
const pages = files.map((file) => {
  const { data, content } = matter(fs.readFileSync(path.join(PAGES_DIR, file), "utf8"));
  // Visible text = intro + body + FAQ answers (all rendered on the page).
  const faqText = (data.faqs ?? []).map((f) => `${f.q} ${f.a}`).join(" ");
  const text = plain(`${data.intro ?? ""} ${content} ${faqText}`);
  return {
    file,
    fm: data,
    content,
    text,
    words: text.split(" ").filter(Boolean).length,
    hash: crypto.createHash("sha256").update(text).digest("hex"),
    sh: shingles(text),
  };
});

const report = { generatedAt: new Date().toISOString(), totals: {}, pages: [], duplicates: { exact: [], near: [] }, cannibalization: [], errors: [] };
const reasons = new Map(pages.map((p) => [p.fm.path, []]));
const warn = new Map(pages.map((p) => [p.fm.path, []]));
const fail = (p, r) => reasons.get(p.fm.path).push(r);

// ---------- uniqueness checks ----------
function uniqueCheck(field, label, norm = (v) => String(v ?? "").trim().toLowerCase()) {
  const seen = new Map();
  for (const p of pages) {
    const v = norm(p.fm[field]);
    if (!v) { fail(p, `missing ${label}`); continue; }
    if (seen.has(v)) {
      fail(p, `duplicate ${label} with ${seen.get(v).fm.path}`);
      fail(seen.get(v), `duplicate ${label} with ${p.fm.path}`);
    } else seen.set(v, p);
  }
}
uniqueCheck("path", "path/slug");
uniqueCheck("title", "title");
uniqueCheck("description", "meta description");
uniqueCheck("h1", "H1");
uniqueCheck("primaryKeyword", "primary keyword");

// ---------- secondary keyword cannibalization ----------
const kwPages = new Map();
for (const p of pages) {
  for (const k of [p.fm.primaryKeyword, ...(p.fm.secondaryKeywords ?? [])]) {
    const key = String(k).toLowerCase();
    if (!kwPages.has(key)) kwPages.set(key, []);
    kwPages.get(key).push(p.fm.path);
  }
}
for (const [kw, paths] of kwPages) {
  if (paths.length > 1) {
    report.cannibalization.push({ keyword: kw, pages: paths });
    for (const pa of paths) reasons.get(pa).push(`keyword "${kw}" targeted by multiple pages: ${paths.join(", ")}`);
  }
}

// ---------- per-page checks ----------
const imageDims = {};
for (const p of pages) {
  const fm = p.fm;
  const r = reasons.get(fm.path);
  const w = warn.get(fm.path);

  if (!/^\/[a-z0-9\-\/]*$/.test(fm.path) || (fm.path !== "/" && fm.path.endsWith("/"))) r.push("invalid canonical path");
  const tl = String(fm.title ?? "").length;
  if (tl < TITLE_LEN[0] || tl > TITLE_LEN[1]) r.push(`title length ${tl} outside ${TITLE_LEN.join("-")}`);
  const dl = String(fm.description ?? "").length;
  if (dl < DESC_LEN[0] || dl > DESC_LEN[1]) r.push(`meta description length ${dl} outside ${DESC_LEN.join("-")}`);
  if (/^#\s/m.test(p.content)) r.push("body contains an extra H1 (only the template renders H1)");
  if (!/^##\s/m.test(p.content)) r.push("no H2 structure");
  if (/^####\s/m.test(p.content) && !/^###\s/m.test(p.content)) r.push("H4 used without H3 (heading hierarchy)");

  const isHub = fm.path.split("/").length === 2 && fm.section !== "company" && fm.section !== "legal" && fm.path !== "/";
  const min = SHORT_PAGES[fm.path] ?? (isHub ? HUB_MIN_WORDS : MIN_WORDS[fm.section] ?? 600);
  if (p.words < min) r.push(`thin content: ${p.words} words < ${min}`);

  // focus keyword requirements: title, h1, h2, h3, and density between 2% and 4%
  const pk = String(fm.primaryKeyword ?? "").toLowerCase().trim();
  if (pk) {
    if (!String(fm.title ?? "").toLowerCase().includes(pk)) {
      r.push(`primary keyword "${pk}" missing from title`);
    }
    if (!String(fm.h1 ?? "").toLowerCase().includes(pk)) {
      r.push(`primary keyword "${pk}" missing from H1`);
    }
    const h2s = (p.content.match(/^##\s+(.+)$/gm) || []).map((h) => h.replace(/^##\s+/, "").toLowerCase());
    if (!h2s.some((h) => h.includes(pk))) {
      r.push(`primary keyword "${pk}" missing from H2 headings`);
    }
    const h3s = (p.content.match(/^###\s+(.+)$/gm) || []).map((h) => h.replace(/^###\s+/, "").toLowerCase());
    if (!h3s.some((h) => h.includes(pk))) {
      r.push(`primary keyword "${pk}" missing from H3 headings`);
    }

    const occurrences = p.text.split(pk).length - 1;
    const density = (occurrences * pk.split(" ").filter(Boolean).length) / Math.max(p.words, 1);
    if (density < 0.02) {
      r.push(`primary keyword density ${(density * 100).toFixed(1)}% is below 2.0%`);
    } else if (density > 0.0401) {
      r.push(`primary keyword density ${(density * 100).toFixed(1)}% exceeds 4.0%`);
    }

    const owner = kwOwner.get(pk);
    if (owner && owner !== fm.path) r.push(`keyword map assigns "${pk}" to ${owner}, not this page`);
    if (!owner) w.push(`primary keyword "${pk}" has no volume data in the keyword research`);
  }

  // images
  if (fm.image) {
    const file = path.join(ROOT, "public", fm.image);
    if (!fs.existsSync(file)) r.push(`missing image ${fm.image}`);
    else {
      const meta = await sharp(file).metadata();
      imageDims[fm.image] = { width: meta.width, height: meta.height };
    }
    if (!fm.imageAlt || String(fm.imageAlt).length < 15) r.push("missing or weak image alt text");
  } else w.push("no hero image");
  for (const m of p.content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    if (!m[1] || m[1].length < 10) r.push(`inline image ${m[2]} lacks alt text`);
    if (!fs.existsSync(path.join(ROOT, "public", m[2]))) r.push(`missing inline image ${m[2]}`);
  }

  // internal links in body must point to existing pages
  for (const m of p.content.matchAll(/\]\((\/[^)#\s]*)/g)) {
    const target = m[1];
    if (target.startsWith("/img/")) continue;
    if (!pages.some((x) => x.fm.path === target)) r.push(`broken internal link ${target}`);
  }
  for (const rel of fm.related ?? []) if (!pages.some((x) => x.fm.path === rel)) r.push(`broken related link ${rel}`);

  // FAQ: only if visible and meaningful
  for (const f of fm.faqs ?? []) if (!f.q || !f.a || f.a.length < 60) r.push(`weak FAQ answer: ${f.q}`);

  // business data requirements
  if (fm.requires) {
    const req = requirements[fm.requires];
    if (!req) r.push(`unknown requirement ${fm.requires}`);
    else {
      const missing = req(business);
      if (missing.length) r.push(`awaiting verified business data: ${missing.join(", ")}`);
    }
  }

  // unverifiable claims guard
  const banned = [/99\.9\s?%/, /\b\d{2},?\d{3}\+?\s+(live\s+)?channels/, /anti-?freeze\s+\d/, /money-back guarantee/, /guaranteed (uptime|speed|no buffering)/, /\bnumber one provider\b/];
  for (const b of banned) if (b.test(p.text) && !(fm.section === "legal")) r.push(`unverifiable claim pattern ${b}`);
}

// ---------- exact + near duplicates ----------
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const a = pages[i], b = pages[j];
    if (a.hash === b.hash) {
      report.duplicates.exact.push([a.fm.path, b.fm.path]);
      fail(a, `exact duplicate of ${b.fm.path}`);
      fail(b, `exact duplicate of ${a.fm.path}`);
      continue;
    }
    const s = jaccard(a.sh, b.sh);
    if (s >= 0.05) report.duplicates.near.push({ a: a.fm.path, b: b.fm.path, similarity: +s.toFixed(3) });
    if (s >= NEAR_DUP_THRESHOLD) {
      fail(a, `near-duplicate of ${b.fm.path} (${(s * 100).toFixed(0)}%)`);
      fail(b, `near-duplicate of ${a.fm.path} (${(s * 100).toFixed(0)}%)`);
    }
  }
}
let maxSim = 0;
for (let i = 0; i < pages.length; i++) for (let j = i + 1; j < pages.length; j++) maxSim = Math.max(maxSim, jaccard(pages[i].sh, pages[j].sh));

// ---------- orphan check (inbound links from body, related, or hub listing) ----------
const inbound = new Map(pages.map((p) => [p.fm.path, 0]));
// Header and footer links render on every page, so they count as inbound links.
const chrome = ["components/Header.tsx", "components/Footer.tsx", "lib/site.ts"].map((f) => fs.readFileSync(path.join(ROOT, f), "utf8")).join(" ");
const navPaths = [...new Set([...chrome.matchAll(/["'](\/[a-z0-9\-\/]*)["']/g)].map((m) => m[1]))];
for (const n of navPaths) if (inbound.has(n)) inbound.set(n, inbound.get(n) + 1);
for (const p of pages) {
  for (const m of p.content.matchAll(/\]\((\/[^)#\s]*)/g)) if (inbound.has(m[1]) && m[1] !== p.fm.path) inbound.set(m[1], inbound.get(m[1]) + 1);
  for (const rel of p.fm.related ?? []) if (inbound.has(rel)) inbound.set(rel, inbound.get(rel) + 1);
  // hub pages list every child of their section
  const depth = p.fm.path.split("/").length;
  if (depth > 2) {
    const hub = "/" + p.fm.path.split("/")[1];
    if (inbound.has(hub)) inbound.set(p.fm.path, inbound.get(p.fm.path) + 1);
  }
}
for (const [pa, n] of inbound) if (n === 0) reasons.get(pa).push("orphan page: no internal links point here");

// ---------- copy hero/og image dims for all public images used by templates ----------
for (const f of fs.readdirSync(path.join(ROOT, "public", "img"))) {
  const key = `/img/${f}`;
  if (!imageDims[key]) {
    const meta = await sharp(path.join(ROOT, "public", "img", f)).metadata();
    imageDims[key] = { width: meta.width, height: meta.height };
  }
}

async function scanImagesRec(dir, prefix) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const rel = `${prefix}/${item}`;
    if (fs.statSync(full).isDirectory()) {
      await scanImagesRec(full, rel);
    } else if (/\.(webp|png|jpg|jpeg)$/i.test(item)) {
      if (!imageDims[rel]) {
        try {
          const meta = await sharp(full).metadata();
          imageDims[rel] = { width: meta.width || 1200, height: meta.height || 675 };
        } catch (e) {}
      }
    }
  }
}
await scanImagesRec(path.join(ROOT, "public", "images"), "/images");

// ---------- write outputs ----------
const indexability = {};
for (const p of pages) {
  const r = reasons.get(p.fm.path);
  const w = warn.get(p.fm.path);
  const score = Math.max(0, 100 - r.length * 25 - w.length * 5);
  const status = r.length === 0 ? "index" : "noindex";
  indexability[p.fm.path] = { status, score, reasons: r };
  report.pages.push({ path: p.fm.path, file: p.file, section: p.fm.section, words: p.words, status, score, reasons: r, warnings: w });
}
report.pages.sort((a, b) => a.path.localeCompare(b.path));
report.totals = {
  pages: pages.length,
  indexable: report.pages.filter((p) => p.status === "index").length,
  noindex: report.pages.filter((p) => p.status === "noindex").length,
  exactDuplicates: report.duplicates.exact.length,
  nearDuplicatesOverThreshold: report.pages.filter((p) => p.reasons.some((x) => x.startsWith("near-duplicate"))).length,
  maxPairwiseSimilarity: +maxSim.toFixed(3),
  cannibalizationConflicts: report.cannibalization.length,
  keywordClusters: keywordMap.clusters.length,
};
report.duplicates.near.sort((a, b) => b.similarity - a.similarity);
report.duplicates.near = report.duplicates.near.slice(0, 25);

fs.writeFileSync(path.join(ROOT, "seo", "indexability.json"), JSON.stringify(indexability, null, 1));
fs.writeFileSync(path.join(ROOT, "seo", "images.json"), JSON.stringify(imageDims, null, 1));
fs.writeFileSync(path.join(ROOT, "seo", "quality-report.json"), JSON.stringify(report, null, 1));

console.log(`Quality gate: ${report.totals.indexable}/${report.totals.pages} pages indexable, max similarity ${report.totals.maxPairwiseSimilarity}`);
for (const p of report.pages.filter((x) => x.status === "noindex")) console.log(`  noindex ${p.path}: ${p.reasons.join("; ")}`);
