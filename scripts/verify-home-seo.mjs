import fs from "node:fs";
import matter from "gray-matter";

const raw = fs.readFileSync("content/pages/home.md", "utf8");
const { data, content } = matter(raw);
const faqText = (data.faqs ?? []).map((x) => `${x.q} ${x.a}`).join(" ");
const fullText = `${data.intro ?? ""} ${content} ${faqText}`.toLowerCase();
const words = fullText.split(/\s+/).filter(Boolean).length;
const countExact = (fullText.match(/m3u iptv playlist/g) || []).length;
const countM3u = (fullText.match(/\bm3u\b/g) || []).length;
const countUrl = (fullText.match(/m3u playlist url/g) || []).length;
const countSetup = (fullText.match(/m3u playlist setup/g) || []).length;
const density = (countExact * 3) / words;

console.log("\n=======================================================");
console.log(" HOMEPAGE (/) - SEO & CONTENT AUDIT");
console.log("=======================================================");
console.log(`Total Words              : ${words} words`);
console.log(`Exact "m3u iptv playlist": ${countExact} occurrences`);
console.log(`"m3u playlist url"       : ${countUrl} occurrences`);
console.log(`"m3u playlist setup"     : ${countSetup} occurrences`);
console.log(`Total "m3u" token count  : ${countM3u} occurrences`);
console.log(`PK Exact Density         : ${(density * 100).toFixed(2)}% (Quality gate limit: 3.00%)`);
console.log("=======================================================\n");

