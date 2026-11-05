import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const PAGES_DIR = path.join(ROOT, "content", "pages");

const blogFiles = [
  "blog.md",
  "blog-setup-m3u.md",
  "blog-free-vs-premium.md",
  "blog-firestick-m3u.md",
  "blog-smart-tv-m3u.md",
  "blog-buffering-fix.md",
  "blog-m3u-vs-xtream-codes.md",
  "blog-uk-m3u.md",
  "blog-best-players.md"
];

let totalMasterKw = 0;
let totalWords = 0;

console.log("\n=======================================================");
console.log(" M3U IPTV PLAYLIST - BLOG SEO DENSITY & AUDIT");
console.log("=======================================================");

for (const f of blogFiles) {
  const raw = fs.readFileSync(path.join(PAGES_DIR, f), "utf8");
  const { data, content } = matter(raw);
  const faqText = (data.faqs ?? []).map(x => `${x.q} ${x.a}`).join(" ");
  const fullText = `${data.intro ?? ""} ${content} ${faqText}`.toLowerCase();
  const words = fullText.split(/\s+/).filter(Boolean).length;
  const countExact = (fullText.match(/m3u iptv playlist/g) || []).length;
  const countM3u = (fullText.match(/\bm3u\b/g) || []).length;
  totalMasterKw += countExact;
  totalWords += words;

  console.log(`- ${f.padEnd(30)}: ${String(words).padStart(4)} words | "m3u iptv playlist": ${String(countExact).padStart(2)} times | total "m3u": ${String(countM3u).padStart(2)} times`);
}

console.log("-------------------------------------------------------");
console.log(`TOTAL BLOG SECTION WORDS : ${totalWords}`);
console.log(`TOTAL EXACT "m3u iptv playlist" IN BLOGS : ${totalMasterKw} times`);
console.log("=======================================================\n");

