import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "pages");

const titleOverrides = {
  "home.md": "M3U IPTV Playlist: 4K/8K Streams & Setup | IPTV M3U Playlist",
  "blog.md": "M3U IPTV Playlist Blog: Setup Guides | IPTV M3U Playlist",
  "blog-setup-m3u.md": "How to Setup an M3U IPTV Playlist: Guide | IPTV M3U Playlist",
  "blog-free-vs-premium.md": "Free vs Premium M3U IPTV Playlist Guide | IPTV M3U Playlist",
  "blog-firestick-m3u.md": "M3U IPTV Playlist on Firestick: Setup | IPTV M3U Playlist",
  "blog-smart-tv-m3u.md": "M3U IPTV Playlist on Smart TV: Setup | IPTV M3U Playlist",
  "blog-buffering-fix.md": "Why Your M3U Playlist Buffers: 7 Fixes | IPTV M3U Playlist",
  "blog-m3u-vs-xtream-codes.md": "M3U URL vs Xtream Codes API: Which Is Best | IPTV M3U Playlist",
  "blog-uk-m3u.md": "Best UK M3U IPTV Playlist for Sports & TV | IPTV M3U Playlist",
  "blog-best-players.md": "Best M3U IPTV Playlist Players 2026: Apps | IPTV M3U Playlist",
  "contact.md": "Contact IPTV M3U Playlist Support | Setup Help & Plans",
  "free-trial.md": "IPTV Free Trial: 24-Hour Test Account | IPTV M3U Playlist",
  "guide-iptv-servers.md": "IPTV Servers Guide: Architecture | IPTV M3U Playlist",
  "pricing.md": "IPTV Subscription Plans & Pricing | IPTV M3U Playlist",
  "privacy.md": "Privacy Policy | IPTV M3U Playlist",
  "refund-policy.md": "Refund Policy | IPTV M3U Playlist",
  "reseller-servers.md": "IPTV Reseller Server List & Panels | IPTV M3U Playlist",
  "reseller.md": "IPTV Reseller Program & Panels | IPTV M3U Playlist",
  "terms.md": "Terms of Service | IPTV M3U Playlist"
};

const h1Overrides = {
  "contact.md": "Contact IPTV M3U Playlist support team",
  "free-trial.md": "Test our M3U IPTV playlist with a 24-hour trial"
};

const descOverrides = {
  "contact.md": "Contact IPTV M3U Playlist for setup help, plan questions, trial requests or reseller inquiries. Tell us your device and player app so we can help faster.",
  "pricing.md": "Compare IPTV M3U Playlist subscription plans: plan lengths, simultaneous connections, what's included, how ordering works, and answers to common billing questions.",
  "privacy.md": "How the IPTV M3U Playlist website handles your information: what we collect through contact and orders, how it's used, analytics, cookies, and your choices.",
  "refund-policy.md": "The IPTV M3U Playlist refund policy: when refunds apply, how to request one, what information we need, and how long processing takes.",
  "reseller.md": "Join our IPTV reseller program: access 47+ multi-server panels, credit-based wholesale rates, sub-reseller management, and 24/7 dedicated support.",
  "terms.md": "The terms that apply when you use the IPTV M3U Playlist website and subscription: accounts, acceptable use, connection limits, service availability and liability."
};

const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));

for (const file of files) {
  const filePath = path.join(dir, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  let modified = false;

  if (titleOverrides[file]) {
    parsed.data.title = titleOverrides[file];
    modified = true;
  }
  if (h1Overrides[file]) {
    parsed.data.h1 = h1Overrides[file];
    modified = true;
  }
  if (descOverrides[file]) {
    parsed.data.description = descOverrides[file];
    modified = true;
  }

  // Update intro
  if (parsed.data.intro && /IPTVSubs8K|iptv-usa8k/i.test(parsed.data.intro)) {
    parsed.data.intro = parsed.data.intro
      .replace(/IPTVSubs8K/g, "IPTV M3U Playlist")
      .replace(/iptv-usa8k\.com/g, "iptvm3uplaylist.com");
    modified = true;
  }

  // Update faqs
  if (parsed.data.faqs) {
    for (const faq of parsed.data.faqs) {
      if (/IPTVSubs8K|iptv-usa8k/i.test(faq.q)) {
        faq.q = faq.q.replace(/IPTVSubs8K/g, "IPTV M3U Playlist").replace(/iptv-usa8k\.com/g, "iptvm3uplaylist.com");
        modified = true;
      }
      if (/IPTVSubs8K|iptv-usa8k/i.test(faq.a)) {
        faq.a = faq.a.replace(/IPTVSubs8K/g, "IPTV M3U Playlist").replace(/iptv-usa8k\.com/g, "iptvm3uplaylist.com");
        modified = true;
      }
    }
  }

  // Update content body
  if (/IPTVSubs8K|iptv-usa8k/i.test(parsed.content)) {
    parsed.content = parsed.content
      .replace(/IPTVSubs8K/g, "IPTV M3U Playlist")
      .replace(/iptv-usa8k\.com/g, "iptvm3uplaylist.com");
    modified = true;
  }

  if (modified) {
    const updatedRaw = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, updatedRaw, "utf8");
    console.log("Updated:", file);
  }
}

console.log("Domain and brand migration across content/pages completed.");

