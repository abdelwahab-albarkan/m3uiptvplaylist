#!/usr/bin/env node
/**
 * Shifts the green illustrations to the brand's orange. Reads the untouched
 * originals listed in scripts/images.map, so it is safe to run repeatedly.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const ILLUSTRATIONS = [
  "setup-install", "pricing-plans", "free-trial-play", "m3u-playlist", "epg-tv-guide",
  "iptv-legal-scales", "iptv-security-shield", "provider-comparison", "buffering-fix",
  "no-picture", "vpn-shield", "support-chat", "server-infrastructure", "faq-checklist",
  "home-network", "macbook-streaming", "4k-quality", "how-iptv-works", "iptv-apps-dashboard",
];
const map = new Map(
  fs.readFileSync(path.join(ROOT, "scripts", "images.map"), "utf8").split(/\r?\n/).filter(Boolean)
    .map((line) => line.split("|").reverse()),
);

for (const name of ILLUSTRATIONS) {
  const file = `${name}.webp`;
  const source = map.get(file);
  if (!source) throw new Error(`${file} is not in scripts/images.map`);
  await sharp(path.join(ROOT, "images", source))
    .modulate({ hue: -80 })
    .webp({ quality: 88 })
    .toFile(path.join(ROOT, "public", "img", file));
}
console.log(`Recolored ${ILLUSTRATIONS.length} images`);
