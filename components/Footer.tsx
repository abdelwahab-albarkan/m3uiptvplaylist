import Link from "next/link";
import { business, whatsappLink } from "@/content/business";
import { Logo } from "./Logo";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Setup",
    links: [
      ["/setup/firestick", "Fire TV Stick"],
      ["/setup/android-tv", "Android TV & Google TV"],
      ["/setup/samsung-tv", "Samsung TV"],
      ["/setup/lg-tv", "LG TV"],
      ["/setup/apple-tv-iphone", "Apple TV & iPhone"],
      ["/setup/mag-box", "MAG Box Setup"],
    ],
  },
  {
    title: "Apps & players",
    links: [
      ["/apps", "Best IPTV apps"],
      ["/apps/tivimate", "TiviMate"],
      ["/apps/iptv-smarters-pro", "IPTV Smarters Pro"],
      ["/apps/ibo-player", "IBO Player"],
      ["/apps/xciptv", "XCIPTV Player"],
      ["/apps/iptv-web-player", "Web Player"],
    ],
  },
  {
    title: "Servers & reseller",
    links: [
      ["/reseller", "Reseller program"],
      ["/reseller/iptv-servers", "47+ Server catalog"],
      ["/guides/iptv-servers", "Server architecture"],
      ["/guides/iptv-box", "IPTV box guide"],
      ["/guides/m3u-playlist", "M3U & Xtream API"],
      ["/guides/what-is-iptv", "What is IPTV?"],
    ],
  },
  {
    title: "Help & guides",
    links: [
      ["/troubleshooting", "Troubleshooting hub"],
      ["/troubleshooting/iptv-buffering", "Fix buffering"],
      ["/troubleshooting/iptv-not-working", "IPTV not working"],
      ["/troubleshooting/vpn-for-iptv", "VPN for IPTV"],
      ["/guides/is-iptv-legal-usa", "Is IPTV legal?"],
      ["/guides/iptv-scams", "Avoid IPTV scams"],
    ],
  },
  {
    title: "Company & plans",
    links: [
      ["/pricing", "Subscription plans"],
      ["/about", "About us"],
      ["/free-trial", "24-Hour free trial"],
      ["/blog", "M3U Blog & guides"],
      ["/contact", "Contact support"],
      ["/faq", "FAQ"],
      ["/refund-policy", "Refund policy"],
      ["/privacy", "Privacy policy"],
      ["/terms", "Terms of service"],
    ],
  },
];

// Keyword-rich internal links for SEO (natural anchor text to real pages)
const FOOTER_KEYWORDS: [string, string][] = [
  ["/setup/firestick", "M3U IPTV playlist for Firestick"],
  ["/setup/samsung-tv", "M3U playlist for Smart TV"],
  ["/setup/android-tv", "IPTV playlist on Android TV"],
  ["/setup/apple-tv-iphone", "IPTV playlist on Apple TV"],
  ["/setup/windows-mac", "M3U playlist on Windows & Mac"],
  ["/setup/mag-box", "MAG box M3U setup"],
  ["/setup/formuler", "Formuler IPTV setup"],
  ["/apps/tivimate", "TiviMate M3U playlist setup"],
  ["/apps/iptv-smarters-pro", "IPTV Smarters Pro"],
  ["/apps/ibo-player", "IBO Player"],
  ["/apps", "Best IPTV player apps"],
  ["/guides/m3u-playlist", "M3U playlist URL guide"],
  ["/guides/m3u-playlist", "Xtream Codes API"],
  ["/guides/iptv-epg", "IPTV EPG & XMLTV"],
  ["/guides/what-is-iptv", "What is IPTV?"],
  ["/guides/4k-8k-iptv", "4K & 8K IPTV streaming"],
  ["/guides/sports-on-iptv", "Live sports on IPTV"],
  ["/compare/iptv-vs-cable", "IPTV vs cable TV"],
  ["/troubleshooting/iptv-buffering", "Fix IPTV buffering"],
  ["/free-trial", "Free 24-hour IPTV trial"],
  ["/reseller", "IPTV reseller panel"],
  ["/pricing", "M3U IPTV playlist plans"],
];

export function Footer() {
  const socials = business.socials ?? {
    facebook: "https://web.facebook.com/profile.php?id=61591545360371",
    instagram: "https://www.instagram.com/streamb4tv/",
    x: "https://x.com/streamb4t",
    discord: "https://discord.gg/BFr5HSZfk",
  };

  return (
    <footer className="site-footer">
      {/* Footer call-to-action band */}
      <div className="container">
        <div className="footer-cta">
          <div>
            <h2 className="footer-cta-title">Get your premium M3U IPTV playlist today</h2>
            <p className="footer-cta-sub">
              Plans from $39.99 with instant setup, a free 24-hour trial, and 1 to 4 device connections. Order on
              WhatsApp in minutes.
            </p>
          </div>
          <div className="footer-cta-actions">
            <Link href="/pricing" className="btn btn-primary" data-track="cta_click" data-track-label="footer_pricing">
              See pricing plans
            </Link>
            <a
              href={whatsappLink("Hi, I'd like to order an M3U IPTV playlist.") ?? "/contact"}
              className="btn btn-whatsapp"
              data-track="cta_click"
              data-track-label="footer_whatsapp"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p style={{ marginTop: 12, maxWidth: 320 }}>
              Plain-English setup guides, app walkthroughs and troubleshooting for IPTV on the devices Americans
              actually use.
            </p>
            {business.whatsapp && <p style={{ marginBottom: 4 }}>WhatsApp: {business.whatsapp}</p>}
            {business.email && (
              <p style={{ marginBottom: 12 }}>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </p>
            )}

            {/* Social Links Row */}
            <div className="footer-socials" style={{ display: "flex", gap: "10px", marginTop: "14px", flexWrap: "wrap" }}>
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow IPTV M3U Playlist on Facebook"
                  className="social-icon-btn"
                  title="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow IPTV M3U Playlist on Instagram"
                  className="social-icon-btn"
                  title="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {socials.x && (
                <a
                  href={socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow IPTV M3U Playlist on X (Twitter)"
                  className="social-icon-btn"
                  title="X (Twitter)"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {socials.discord && (
                <a
                  href={socials.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join IPTV M3U Playlist Discord Community"
                  className="social-icon-btn"
                  title="Discord"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 empiric 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {COLS.map((c) => (
            <div key={c.title}>
              <h2>{c.title}</h2>
              <ul>
                {c.links.map(([href, label]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SEO keyword link cloud */}
        <div className="footer-keywords">
          <h2>Popular M3U IPTV playlist topics</h2>
          <div className="footer-keyword-cloud">
            {FOOTER_KEYWORDS.map(([href, label], i) => (
              <Link key={`${href}-${i}`} href={href} className="footer-keyword-chip">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-legal">
          <p style={{ margin: 0 }}>
            Amazon, Fire TV, Roku, Samsung, LG, Apple, Google, TiviMate, IPTV Smarters, Kodi and other names are
            trademarks of their respective owners. {business.brand} is not affiliated with or endorsed by them.
          </p>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} {business.legalEntity ?? business.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
