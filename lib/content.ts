import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import indexability from "@/seo/indexability.json";
import imageDims from "@/seo/images.json";

export type Faq = { q: string; a: string };

export type PageFrontmatter = {
  path: string;
  title: string;
  description: string;
  h1: string;
  breadcrumb: string;
  section: "home" | "setup" | "apps" | "guides" | "compare" | "troubleshooting" | "company" | "legal" | "blog";
  primaryKeyword: string;
  secondaryKeywords?: string[];
  image?: string;
  imageAlt?: string;
  schema?: "article" | "howto" | "none";
  widget?: "pricing" | "trial" | "contact" | "reseller" | "refund";
  requires?: string;
  faqs?: Faq[];
  related?: string[];
  updated: string;
  published?: string;
  intro?: string;
};

export type Page = PageFrontmatter & {
  file: string;
  html: string;
  toc: { id: string; text: string }[];
  wordCount: number;
};

type IndexEntry = { status: "index" | "noindex"; score: number; reasons: string[] };

const DIR = path.join(process.cwd(), "content", "pages");

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function render(md: string) {
  const toc: { id: string; text: string }[] = [];
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = renderer.parser.parseInline(tokens);
    const id = slugify(text);
    if (depth === 2)
      toc.push({ id, text: text.replace(/<[^>]+>/g, "").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&") });
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };
  renderer.link = ({ href, title, tokens }) => {
    const text = renderer.parser.parseInline(tokens);
    const external = /^https?:\/\//.test(href);
    const t = title ? ` title="${title}"` : "";
    return external
      ? `<a href="${href}"${t} rel="nofollow noopener" target="_blank">${text}</a>`
      : `<a href="${href}"${t}>${text}</a>`;
  };
  renderer.table = (token) => {
    const head = token.header.map((c) => `<th>${renderer.parser.parseInline(c.tokens)}</th>`).join("");
    const body = token.rows
      .map((r) => `<tr>${r.map((c) => `<td>${renderer.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
      .join("");
    return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  };
  const html = marked.parse(md, { renderer, async: false }) as string;
  return { html, toc };
}

let cache: Page[] | null = null;

export function getAllPages(): Page[] {
  if (cache) return cache;
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  cache = files.map((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as PageFrontmatter;
    const { html, toc } = render(content);
    const wordCount = content.replace(/[#>*`|_\-\[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
    return { ...fm, updated: String(fm.updated), file, html, toc, wordCount };
  });
  return cache;
}

export function getPage(p: string) {
  return getAllPages().find((x) => x.path === p) ?? null;
}

export function getIndexStatus(p: string): IndexEntry {
  const e = (indexability as Record<string, IndexEntry>)[p];
  return e ?? { status: "noindex", score: 0, reasons: ["not evaluated by quality gate"] };
}

export function isIndexable(p: string) {
  return getIndexStatus(p).status === "index";
}

export function getImage(src?: string) {
  if (!src) return null;
  const d = (imageDims as Record<string, { width: number; height: number }>)[src];
  return d ? { src, ...d } : null;
}

export function childrenOf(section: Page["section"], exclude?: string) {
  return getAllPages()
    .filter((p) => p.section === section && p.path !== exclude && p.path.split("/").length > 2)
    .sort((a, b) => a.breadcrumb.localeCompare(b.breadcrumb));
}

/** Internal linking engine: explicit related links first, then same-section siblings. */
export function relatedFor(page: Page, limit = 6): Page[] {
  const all = getAllPages();
  const explicit = (page.related ?? []).map((r) => all.find((p) => p.path === r)).filter(Boolean) as Page[];
  const siblings = all.filter(
    (p) => p.section === page.section && p.path !== page.path && !explicit.includes(p) && p.path.split("/").length > 2,
  );
  return [...explicit, ...siblings].slice(0, limit);
}
