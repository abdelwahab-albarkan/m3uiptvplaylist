#!/usr/bin/env node
/**
 * Post-build QA crawler. Run against a production server:
 *   npm run build && npm start   (in one terminal)
 *   npm run qa                   (in another; BASE=http://localhost:3000 by default)
 *
 * Checks every content route plus robots/sitemap/404/redirects for: HTTP
 * status, exactly one H1, title/description, canonical, robots meta vs the
 * quality gate, Open Graph/Twitter tags, JSON-LD validity, image alt text,
 * and every internal link. Writes seo/qa-report.json.
 */
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3000";
const SITE = "https://iptvm3uplaylist.com";
const ROOT = process.cwd();
const indexability = JSON.parse(fs.readFileSync(path.join(ROOT, "seo", "indexability.json"), "utf8"));
const routes = Object.keys(indexability);

const errors = [];
const results = [];
const linkCache = new Map();
const err = (route, msg) => errors.push({ route, msg });

const attr = (tag, name) => (tag.match(new RegExp(`${name}="([^"]*)"`, "i")) ?? [])[1];
const metaContent = (html, key, val) => {
  const re = new RegExp(`<meta[^>]+${key}="${val}"[^>]*>`, "i");
  const tag = (html.match(re) ?? [])[0];
  return tag ? attr(tag, "content") : undefined;
};

async function status(url) {
  if (linkCache.has(url)) return linkCache.get(url);
  const res = await fetch(BASE + url, { redirect: "manual" });
  linkCache.set(url, res.status);
  return res.status;
}

for (const route of routes) {
  const res = await fetch(BASE + route);
  const html = await res.text();
  const r = { route, status: res.status };
  if (res.status !== 200) err(route, `HTTP ${res.status}`);

  const h1s = html.match(/<h1[\s>]/g) ?? [];
  r.h1 = h1s.length;
  if (h1s.length !== 1) err(route, `${h1s.length} H1 tags`);

  r.title = (html.match(/<title>([^<]*)<\/title>/) ?? [])[1];
  if (!r.title) err(route, "missing <title>");
  r.description = metaContent(html, "name", "description");
  if (!r.description) err(route, "missing meta description");

  const canonTag = (html.match(/<link[^>]+rel="canonical"[^>]*>/) ?? [])[0];
  r.canonical = canonTag ? attr(canonTag, "href") : undefined;
  const expected = route === "/" ? SITE : SITE + route;
  if (r.canonical !== expected) err(route, `canonical ${r.canonical} != ${expected}`);

  const robots = metaContent(html, "name", "robots") ?? "index, follow";
  r.robots = robots;
  const wantIndex = indexability[route].status === "index";
  if (wantIndex && /noindex/.test(robots)) err(route, "approved page is noindex");
  if (!wantIndex && !/noindex/.test(robots)) err(route, "unapproved page is indexable");

  for (const k of ["og:title", "og:description", "og:url", "og:image"]) if (!metaContent(html, "property", k)) err(route, `missing ${k}`);
  if (!metaContent(html, "name", "twitter:card")) err(route, "missing twitter:card");

  // JSON-LD must parse and carry @context/@type
  r.schema = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      for (const d of Array.isArray(data) ? data : [data]) {
        if (!d["@context"] || !d["@type"]) err(route, "JSON-LD without @context/@type");
        r.schema.push(d["@type"]);
        if (d["@type"] === "FAQPage") {
          for (const q of d.mainEntity) if (!html.includes(q.name.replace(/'/g, "&#x27;")) && !html.includes(q.name)) err(route, `FAQ schema question not visible: ${q.name}`);
        }
      }
    } catch {
      err(route, "invalid JSON-LD");
    }
  }
  if (route !== "/" && !r.schema.includes("BreadcrumbList")) err(route, "missing BreadcrumbList");

  // images need alt attributes (decorative images use alt="")
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) err(route, `img without alt: ${m[0].slice(0, 80)}`);

  // internal links
  const links = new Set([...html.matchAll(/<a[^>]+href="(\/[^"#?]*)/g)].map((m) => m[1]));
  r.internalLinks = links.size;
  for (const l of links) {
    const s = await status(l);
    if (s !== 200) err(route, `link ${l} -> HTTP ${s}`);
  }
  results.push(r);
}

// duplicate titles / descriptions across rendered pages
for (const key of ["title", "description"]) {
  const seen = new Map();
  for (const r of results) {
    if (seen.has(r[key])) err(r.route, `duplicate ${key} with ${seen.get(r[key])}`);
    else seen.set(r[key], r.route);
  }
}

// robots.txt
const robotsTxt = await (await fetch(BASE + "/robots.txt")).text();
if (!robotsTxt.includes(`Sitemap: ${SITE}/sitemap.xml`)) err("/robots.txt", "sitemap line missing");

// sitemap must equal the approved set
const sm = await (await fetch(BASE + "/sitemap.xml")).text();
const smUrls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const approved = routes.filter((r) => indexability[r].status === "index").map((r) => (r === "/" ? SITE : SITE + r));
for (const u of approved) if (!smUrls.includes(u)) err("/sitemap.xml", `approved page missing: ${u}`);
for (const u of smUrls) if (!approved.includes(u)) err("/sitemap.xml", `unapproved page listed: ${u}`);

// 404 + redirects
const nf = await fetch(BASE + "/this-page-does-not-exist");
if (nf.status !== 404) err("/this-page-does-not-exist", `expected 404, got ${nf.status}`);
const rd = await fetch(BASE + "/setup/smart-tv", { redirect: "manual" });
if (rd.status !== 308 || !rd.headers.get("location")?.endsWith("/setup/samsung-tv")) err("/setup/smart-tv", `redirect ${rd.status} ${rd.headers.get("location")}`);

// displayed prices must match business.json exactly
const business = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "business.json"), "utf8"));
const pricingHtml = (await (await fetch(BASE + "/pricing")).text()).replace(/<script[\s\S]*?<\/script>/g, "");
const tables = [...pricingHtml.matchAll(/<table class="price-table">[\s\S]*?<\/table>/g)].map((m) => m[0]).join("");
const totals = [...tables.matchAll(/<strong>\$([\d.]+)<\/strong>/g)].map((m) => Number(m[1])).sort((a, b) => a - b);
const expectedTotals = (business.plans ?? []).map((p) => p.priceUsd).sort((a, b) => a - b);
if (JSON.stringify(totals) !== JSON.stringify(expectedTotals)) err("/pricing", `prices ${totals} != business data ${expectedTotals}`);

// contact API validation
const bad = await fetch(BASE + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "", email: "x" }) });
if (bad.status !== 422) err("/api/contact", `invalid input should be 422, got ${bad.status}`);
const good = await fetch(BASE + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "QA Test", email: "qa@example.com", topic: "setup", message: "QA crawler test message" }) });
const goodStatus = good.status;

const report = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  routesTested: results.length,
  internalLinksChecked: linkCache.size,
  sitemapUrls: smUrls.length,
  contactApiValidStatus: goodStatus,
  errors,
  results,
};
fs.writeFileSync(path.join(ROOT, "seo", "qa-report.json"), JSON.stringify(report, null, 1));
console.log(`QA: ${results.length} routes, ${linkCache.size} unique internal links, sitemap ${smUrls.length} URLs, contact API (valid input) -> ${goodStatus}`);
console.log(errors.length ? errors.map((e) => `  ✗ ${e.route}: ${e.msg}`).join("\n") : "  ✓ no errors");
process.exitCode = errors.length ? 1 : 0;
