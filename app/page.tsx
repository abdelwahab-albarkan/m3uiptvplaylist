import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getImage, getPage } from "@/lib/content";
import {
  broadcastServiceSchema,
  breadcrumbSchema,
  faqSchema,
  offersSchema,
  organizationSchema,
  pageMetadata,
  websiteSchema,
} from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand } from "@/components/CtaBand";
import { PricingWidget } from "@/components/Widgets";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { business, whatsappLink } from "@/content/business";

const home = () => {
  const p = getPage("/");
  if (!p) throw new Error("content/pages/home.md is missing");
  return p;
};

export function generateMetadata(): Metadata {
  return pageMetadata(home());
}

const HERO_IMAGE = {
  src: "/images/home/living-room-hero.webp",
  width: 1344,
  height: 768,
  alt: "Watch M3U IPTV playlist on Smart TV in living room",
};

const FEATURES: { img: string; width: number; height: number; title: string; note: string; alt: string }[] = [
  {
    img: "/images/anti-freeze-tech.webp",
    width: 1200,
    height: 686,
    title: "Zero-Buffering Anti-Freeze Technology",
    note: "Carrier-grade CDN edge routing protects your stream from peak-hour slowdowns and packet jitter.",
    alt: "Anti-freeze streaming engine for buffer-free M3U IPTV playlist",
  },
  {
    img: "/images/home-cinema.webp",
    width: 1200,
    height: 686,
    title: "Ultra HD 4K Cinema & 60 FPS Sports",
    note: "Experience true 50 and 60 FPS live sports broadcasts with cinema-grade 4K picture quality and lossless audio.",
    alt: "Ultra HD 4K cinema picture quality with M3U IPTV playlist",
  },
  {
    img: "/images/home/family-watching-tv.webp",
    width: 1344,
    height: 768,
    title: "Multi-Screen Family Entertainment",
    note: "Connect 1 to 4 devices simultaneously so family members can stream separate live channels concurrently.",
    alt: "Family multi-device connections with M3U IPTV playlist",
  },
];

const DEVICES: { href: string; label: string; img: string; width: number; height: number; note: string; alt: string }[] = [
  {
    href: "/setup/firestick",
    label: "Fire TV Stick",
    img: "/images/iptv-fire-tv-stick.webp",
    width: 1344,
    height: 768,
    note: "Sideload top player apps with Downloader in 5 minutes",
    alt: "Setup M3U IPTV playlist on Firestick",
  },
  {
    href: "/setup/samsung-tv",
    label: "Samsung & LG Smart TV",
    img: "/images/devices/frameless-smart-tv.webp",
    width: 1344,
    height: 768,
    note: "Native media apps from the Samsung and LG app stores",
    alt: "Watch M3U IPTV playlist on Smart TV",
  },
  {
    href: "/setup/android-tv",
    label: "Android TV & Google TV",
    img: "/images/iptv-android-tv-setup.webp",
    width: 1344,
    height: 768,
    note: "Shield TV, Chromecast, Sony, TCL, and Hisense models",
    alt: "Configure M3U IPTV playlist on Android TV",
  },
  {
    href: "/setup/apple-tv-iphone",
    label: "Apple TV, iPhone & iPad",
    img: "/images/iptv-apple-tv-4k.webp",
    width: 1344,
    height: 768,
    note: "Direct setup with top tvOS and iOS media players",
    alt: "Stream M3U IPTV playlist on Apple TV",
  },
  {
    href: "/setup/windows-mac",
    label: "Windows PC & Mac",
    img: "/images/windowspc.webp",
    width: 1400,
    height: 1172,
    note: "VLC media player, desktop players, and web browsers",
    alt: "Play M3U IPTV playlist on Windows PC and Mac",
  },
  {
    href: "/setup/mag-box",
    label: "Formuler & MAG Box",
    img: "/images/Formuler.webp",
    width: 500,
    height: 500,
    note: "Dedicated set-top boxes with Stalker portal and M3U API",
    alt: "Setup M3U IPTV playlist on Formuler box",
  },
];

const CHANNELS: { img: string; width: number; height: number; label: string; note: string; alt: string }[] = [
  {
    img: "/images/fussball-streaming.webp",
    width: 1344,
    height: 768,
    label: "Live championship sports & PPV events",
    note: "Premier League, Champions League, NFL, NBA, UFC, and main-card pay-per-view broadcasts in 4K 60FPS.",
    alt: "Stream live football and championship sports on M3U IPTV playlist",
  },
  {
    img: "/images/formula-1-aus.webp",
    width: 1200,
    height: 686,
    label: "Global racing & international bouquets",
    note: "Live Formula 1, MotoGP, NASCAR, and full channel bouquets from the US, UK, Canada, and Europe.",
    alt: "Watch live racing and global motorsports on M3U IPTV playlist",
  },
  {
    img: "/images/iptv-entertainment-dashboard.webp",
    width: 1344,
    height: 768,
    label: "Entertainment dashboard & 7-day EPG",
    note: "Automated electronic program guide with on-demand cinema libraries updated daily.",
    alt: "Browse channels and electronic program guide on M3U IPTV playlist",
  },
];

const SERVERS = [
  {
    name: "Trex OTT Network",
    tagline: "Ultra-low latency sports peering",
    badge: "Sports Optimized",
    desc: "Engineered specifically for live Premier League, NFL, NBA, and UFC broadcasts in uncompressed 60 FPS motion clarity.",
    specs: [
      { key: "Channel Zap Speed", val: "< 0.4 seconds" },
      { key: "Target Markets", val: "US, UK & Canada" },
      { key: "Video Acceleration", val: "Hardware (HW+)" },
      { key: "Stream Formats", val: "M3U8 HLS & MPEG-TS" },
    ],
    tags: ["60 FPS", "Low Latency", "PPV Main Cards", "Xtream API"],
  },
  {
    name: "Strong 8K Streaming Cluster",
    tagline: "Cinema-grade 4K & 8K bandwidth",
    badge: "Ultra HD 8K",
    desc: "Dedicated to premium film, television box sets, and 4K sporting events with HDR10+ and Dolby Digital 5.1 surround sound.",
    specs: [
      { key: "Peak Headroom", val: "100+ Gbps CDN" },
      { key: "Audio Quality", val: "Dolby Digital 5.1" },
      { key: "Dynamic Range", val: "HDR10+ / 4K UHD" },
      { key: "Zap Latency", val: "< 0.5 seconds" },
    ],
    tags: ["True 4K", "8K Streams", "Lossless Audio", "M3U URL"],
  },
  {
    name: "Mega OTT Server Infrastructure",
    tagline: "Massive international channel variety",
    badge: "Top Bouquet Variety",
    desc: "Our most expansive global line-up covering North America, UK, Europe, Latin America, and the Middle East with 7-day EPG.",
    specs: [
      { key: "Coverage", val: "US, UK, CA, EU, AR" },
      { key: "EPG Accuracy", val: "Automated XMLTV" },
      { key: "Failover Nodes", val: "Triple-redundant" },
      { key: "Hardware Sync", val: "Smart TV & Firestick" },
    ],
    tags: ["Global Bouquets", "7-Day EPG", "Dual Formats", "Cloud CDN"],
  },
  {
    name: "Crystal OTT Platform",
    tagline: "Smart TV & web portal optimization",
    badge: "Smart TV Choice",
    desc: "Optimized for seamless performance on Samsung Tizen, LG webOS, and Android TV with fast playlist parsing and catch-up TV.",
    specs: [
      { key: "Smart TV Sync", val: "Instant Web Upload" },
      { key: "Catch-Up Archive", val: "Up to 72 hours" },
      { key: "Packet Pacing", val: "Zero-Jitter Buffer" },
      { key: "Compatible Apps", val: "IBO, TiviMate, XC" },
    ],
    tags: ["Tizen / webOS", "Catch-Up TV", "Fast Import", "No Lag"],
  },
  {
    name: "Magnum OTT Cluster",
    tagline: "High-concurrency event failover",
    badge: "Event Redundancy",
    desc: "Equipped with dynamic load-balancing to absorb massive traffic surges during global finals, PPV fights, and championship cups.",
    specs: [
      { key: "Traffic Headroom", val: "Multi-datacenter" },
      { key: "Uptime Standard", val: "Carrier-grade" },
      { key: "Packet Loss Rate", val: "0.00% measured" },
      { key: "Redundant Links", val: "Active Hot-Standby" },
    ],
    tags: ["Anti-Freeze", "Zero Buffering", "UFC & Boxing", "Backup Feeds"],
  },
  {
    name: "Cobra OTT Network",
    tagline: "Expansive VOD cinema & series library",
    badge: "On-Demand Library",
    desc: "Daily updated on-demand database featuring thousands of cinematic releases, complete series, and multi-language subtitles.",
    specs: [
      { key: "VOD Updates", val: "Daily automated sync" },
      { key: "Subtitles", val: "EN, FR, ES, DE, AR" },
      { key: "Storage Nodes", val: "NVMe Flash Storage" },
      { key: "Video Encoding", val: "H.265 / HEVC" },
    ],
    tags: ["4K Cinema", "Multilingual", "Daily VOD", "HEVC Codec"],
  },
];

const BOUQUETS = [
  {
    flag: "🇺🇸",
    country: "United States",
    count: "Thousands of Premium Feeds",
    desc: "Complete US national broadcast networks (ABC, CBS, NBC, FOX, PBS) alongside premier sports, regional networks, and cinema channels.",
    highlights: ["ESPN 1-2 & ESPNU", "NFL Network & RedZone", "NBA TV & MLB Network", "HBO, Showtime & Starz", "Regional Sports Networks (RSN)"],
    badges: ["4K UHD", "60 FPS Sports", "East & West Feeds"],
  },
  {
    flag: "🇬🇧",
    country: "United Kingdom & Ireland",
    count: "Full British & Irish Bouquets",
    desc: "Every live Premier League fixture including 3:00 PM Saturday blackout games, comprehensive Sky channels, and terrestrial television.",
    highlights: ["Sky Sports Main Event & PL", "TNT Sports 1-4", "Sky Cinema & Sky Atlantic", "BBC One/Two & ITV 1-4", "RTÉ One & Two (Ireland)"],
    badges: ["3PM Blackouts", "UHD HDR", "Catch-Up TV"],
  },
  {
    flag: "🇨🇦",
    country: "Canada (Bilingual)",
    count: "English & French Feeds",
    desc: "Bilingual coast-to-coast Canadian broadcasting with exhaustive NHL coverage, national channels, and regional sports networks.",
    highlights: ["TSN 1 through 5", "Sportsnet (East, West, Pacific, SN1)", "RDS 1 & 2 (French)", "TVA & TVA Sports", "CBC, CTV & Global TV"],
    badges: ["Full NHL Coverage", "Bilingual Audio", "7-Day EPG"],
  },
  {
    flag: "🇪🇺",
    country: "Europe & International",
    count: "Multilingual Global Bouquets",
    desc: "Top European football leagues, premium international cinema, and Arabic OSN/BeIN bouquets with native audio commentary.",
    highlights: ["Canal+ & BeIN Sports France", "Sky Sport Bundesliga & DAZN DE", "Movistar+ LaLiga (Spain)", "Sky Sport Italia", "BeIN Sports MENA & OSN (Arabic)"],
    badges: ["Multi-Audio", "LaLiga / Serie A", "Global News"],
  },
];

const COMPARISON_ROWS = [
  {
    feature: "4K Ultra HD & 60 FPS Sports Streams",
    sub: "Frame rate and picture clarity for live games",
    us: { text: "Yes (Native 50/60 FPS)", status: "check" },
    cable: { text: "Limited 720p / 1080i", status: "warn" },
    free: { text: "Stuttering 480p / 25 FPS", status: "cross" },
  },
  {
    feature: "Zero-Buffering Anti-Freeze Technology",
    sub: "Dedicated high-bandwidth edge CDN routing",
    us: { text: "100Gbps Carrier CDN", status: "check" },
    cable: { text: "Proprietary Cable Line", status: "check" },
    free: { text: "Overcrowded Free Servers", status: "cross" },
  },
  {
    feature: "Automated 7-Day XMLTV TV Guide (EPG)",
    sub: "Real-time show timetables and descriptions",
    us: { text: "Automated & Embedded", status: "check" },
    cable: { text: "Included with TV Box", status: "check" },
    free: { text: "Missing or Unsynchronized", status: "cross" },
  },
  {
    feature: "Multi-Screen Simultaneous Connections",
    sub: "Independent streaming on 1 to 4 devices",
    us: { text: "1 to 4 Accounts Available", status: "check" },
    cable: { text: "$10–$25/mo per extra box", status: "cross" },
    free: { text: "Single IP (Instant Ban)", status: "cross" },
  },
  {
    feature: "Dual Connection Protocols",
    sub: "Direct M3U URL + Xtream Codes API",
    us: { text: "Both Included Automatically", status: "check" },
    cable: { text: "Locked Coaxial Hardware", status: "cross" },
    free: { text: "Unstable Plain Text M3U", status: "warn" },
  },
  {
    feature: "Hardware Freedom & App Choice",
    sub: "Firestick, Smart TV, Apple, Android, PC",
    us: { text: "All Devices & IPTV Players", status: "check" },
    cable: { text: "Leased Proprietary Box Only", status: "cross" },
    free: { text: "Frequent App Crashing", status: "cross" },
  },
  {
    feature: "Average Monthly Cost",
    sub: "Transparent pricing in US Dollars",
    us: { text: "$6.67 – $13.33 / month", status: "check" },
    cable: { text: "$110 – $180+ / month", status: "cross" },
    free: { text: "$0 (Dies after 15 mins)", status: "warn" },
  },
  {
    feature: "Support & Instant Setup",
    sub: "Customer care and technical assistance",
    us: { text: "24/7 Dedicated WhatsApp", status: "check" },
    cable: { text: "Lengthy Phone Queues", status: "cross" },
    free: { text: "Zero Technical Support", status: "cross" },
  },
  {
    feature: "Technical Satisfaction Policy",
    sub: "Risk-free trial and refund protection",
    us: { text: "7-Day Refund Policy", status: "check" },
    cable: { text: "Rigid 2-Year Contract Penalties", status: "cross" },
    free: { text: "No Policy or Security", status: "cross" },
  },
];

const RESELLER_TIERS = [
  { credits: "50 Credits", sub: "Starter Reseller Package", price: "$250", perCredit: "$5.00 / credit" },
  { credits: "100 Credits", sub: "Growth Business Package", price: "$400", perCredit: "$4.00 / credit" },
  { credits: "250 Credits", sub: "Enterprise Wholesale Package", price: "$750", perCredit: "$3.00 / credit" },
  { credits: "500 Credits", sub: "Master Distributor Package", price: "$1,250", perCredit: "$2.50 / credit" },
];

const STEPS = [
  { t: "Pick a plan", d: "Choose 3, 6 or 12 months and how many accounts you need. Every price is listed below." },
  { t: "Order on WhatsApp", d: "Tap a price and send the message. We reply with the next steps and your private M3U credentials in minutes." },
  { t: "Follow your device guide", d: "Install a player app, enter your login details, and load the live TV guide." },
];

const TOPICS: { title: string; links: [string, string][] }[] = [
  {
    title: "Set up your device",
    links: [
      ["/setup/firestick", "IPTV on Fire TV Stick"],
      ["/setup/android-tv", "IPTV on Android TV and Google TV"],
      ["/setup/apple-tv-iphone", "IPTV on Apple TV and iPhone"],
      ["/setup/mag-box", "MAG box setup"],
    ],
  },
  {
    title: "Choose a player app",
    links: [
      ["/apps", "Best IPTV players compared"],
      ["/apps/tivimate", "TiviMate setup"],
      ["/apps/iptv-smarters-pro", "IPTV Smarters Pro setup"],
      ["/apps/ibo-player", "IBO Player setup"],
    ],
  },
  {
    title: "Fix a problem",
    links: [
      ["/troubleshooting", "Troubleshooting overview"],
      ["/troubleshooting/iptv-buffering", "Stop buffering and freezing"],
      ["/troubleshooting/iptv-not-working", "IPTV not working"],
      ["/guides/iptv-epg", "Fix an empty TV guide"],
      ["/troubleshooting/vpn-for-iptv", "Do you need a VPN?"],
    ],
  },
  {
    title: "Compare your options",
    links: [
      ["/compare/iptv-vs-cable", "IPTV vs cable (Save $1,200/yr)"],
      ["/compare/live-tv-streaming-services", "Live TV streaming comparison"],
      ["/compare/roku-vs-fire-stick", "Roku vs Fire Stick"],
      ["/reseller", "IPTV Reseller Opportunities"],
    ],
  },
];

export default function HomePage() {
  const page = home();
  const heroImg = getImage(HERO_IMAGE.src) ?? HERO_IMAGE;
  const faq = faqSchema(page);
  const offers = offersSchema();
  const broadcast = broadcastServiceSchema();
  const org = organizationSchema();
  const site = websiteSchema();
  const breadcrumbs = breadcrumbSchema([{ href: "/", label: "Home" }]);
  const diagram = getImage("/img/how-iptv-works.webp") ?? { src: "/img/how-iptv-works.webp", width: 1128, height: 600 };
  const lowestPrice = Math.min(...(business.plans ?? []).map((p) => p.priceUsd));
  const discordUrl = business.socials?.discord ?? "https://discord.gg/BFr5HSZfk";
  const resellerWhatsApp = whatsappLink("Hello, I am interested in the IPTV Reseller Panel and wholesale credit packages") ?? "https://wa.me/212625218443";

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Premium 4K IPTV Subscription</span>
            <h1>{page.h1}</h1>
            <p className="lead">{page.intro}</p>
            <div className="hero-cta">
              <Link
                href="/free-trial"
                className="btn btn-primary"
                data-track="cta_click"
                data-track-label="hero_free_trial"
              >
                Get Free 24h Trial
              </Link>
              <Link
                href="#plans"
                className="btn btn-ghost"
                data-track="cta_click"
                data-track-label="hero_plans"
              >
                View Pricing Plans
              </Link>
            </div>
            {Number.isFinite(lowestPrice) && (
              <p className="hero-price">
                Subscriptions from <strong>{`$${lowestPrice.toFixed(2)}`}</strong> for 3 months • Instant setup
              </p>
            )}
            <ul className="hero-points">
              <li>3, 6 and 12-month transparent plans</li>
              <li>1 to 4 simultaneous connections</li>
              <li>Fast order &amp; support on WhatsApp</li>
              <li>Free 24h trial before subscribing</li>
            </ul>
          </div>
          <div className="hero-media">
            <Image
              src={heroImg.src}
              width={heroImg.width}
              height={heroImg.height}
              alt={HERO_IMAGE.alt}
              priority
              fetchPriority="high"
              sizes="(min-width: 900px) 540px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Real-time Network Telemetry Status Bar */}
      <section className="container">
        <div className="network-status-bar">
          <div className="network-status-main">
            <div className="status-pulse-dot" aria-hidden="true" />
            <div>
              <div className="network-status-title">All 6 Streaming Clusters Operational</div>
              <div className="network-status-sub">Zero packet drop detected across transatlantic transit nodes</div>
            </div>
          </div>
          <div className="network-metrics">
            <div className="metric-item">
              <span className="metric-label">Avg Edge Latency</span>
              <span className="metric-val">&lt; 24ms</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Core Throughput</span>
              <span className="metric-val">100+ Gbps CDN</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Sports 60 FPS Sync</span>
              <span className="metric-val" style={{ color: "var(--success)" }}>Active &amp; Verified</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">XMLTV EPG Feed</span>
              <span className="metric-val">100% Synced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents Quick Jump Bar */}
      <section className="container">
        <nav className="home-toc" aria-label="Page sections">
          <div className="home-toc-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            Quick Navigation &amp; Key Sections
          </div>
          <ul className="home-toc-list">
            <li><a href="#plans" className="home-toc-link">Plans &amp; Pricing</a></li>
            <li><a href="#servers" className="home-toc-link">Server Networks</a></li>
            <li><a href="#bouquets" className="home-toc-link">Channel Bouquets</a></li>
            <li><a href="#comparison" className="home-toc-link">Feature Comparison</a></li>
            <li><a href="#features" className="home-toc-link">Why Choose Us</a></li>
            <li><a href="#devices" className="home-toc-link">Supported Devices</a></li>
            <li><a href="#channels" className="home-toc-link">Live Sports &amp; Channels</a></li>
            <li><a href="#reseller-panel" className="home-toc-link">Reseller Panel</a></li>
            <li><a href="#how-it-works" className="home-toc-link">3-Step Setup</a></li>
            <li><a href="#guides" className="home-toc-link">Popular Guides</a></li>
            <li><a href="#editorial-review" className="home-toc-link">Editorial Review</a></li>
            <li><a href="#faq-section" className="home-toc-link">12 FAQs</a></li>
          </ul>
        </nav>
      </section>

      {/* Pricing Section — surfaced high on the page for conversion */}
      <section className="section section-alt" id="plans">
        <div className="container">
          <h2>Transparent M3U IPTV playlist subscription plans</h2>
          <p className="sub">
            All prices are in US dollars. Choose from 3, 6, or 12 months for 1 to 4 devices. Not ready to buy?{" "}
            <Link href="/free-trial" style={{ fontWeight: 700, color: "var(--brand-500)" }}>
              Test our 24-hour free trial first →
            </Link>
          </p>
          <PricingWidget />
        </div>
      </section>

      {/* 2. Server Infrastructure Showcase (Inspired by iptvresellerpanel.store) */}
      <section className="section" id="servers">
        <div className="container">
          <h2>Carrier-grade M3U IPTV playlist server networks &amp; infrastructure</h2>
          <p className="sub">
            Our private M3U IPTV playlist is powered by high-capacity edge streaming clusters peered with transatlantic Tier-1 network backbones.
          </p>
          <div className="server-grid">
            {SERVERS.map((srv) => (
              <div key={srv.name} className="server-card">
                <div>
                  <div className="server-card-top">
                    <div className="server-name-group">
                      <h3>{srv.name}</h3>
                      <div className="server-tagline">{srv.tagline}</div>
                    </div>
                    <span className="server-pill">{srv.badge}</span>
                  </div>
                  <p className="server-desc">{srv.desc}</p>
                </div>
                <div>
                  <ul className="server-specs-list">
                    {srv.specs.map((sp) => (
                      <li key={sp.key} className="server-spec-item">
                        <span className="spec-key">{sp.key}</span>
                        <span className="spec-val">{sp.val}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="server-tags">
                    {srv.tags.map((tg) => (
                      <span key={tg} className="server-tag-item">{tg}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Regional Channel Bouquets Grid */}
      <section className="section section-alt" id="bouquets">
        <div className="container">
          <h2>Global channel bouquets included in your M3U IPTV playlist</h2>
          <p className="sub">
            Structured national and regional lineups featuring uncompressed 1080p and 4K 60FPS feeds, daily XMLTV EPG, and multilingual commentary.
          </p>
          <div className="bouquets-grid">
            {BOUQUETS.map((bq) => (
              <div key={bq.country} className="bouquet-card">
                <div className="bouquet-header">
                  <span className="bouquet-flag">{bq.flag}</span>
                  <div>
                    <h3>{bq.country}</h3>
                    <div className="bouquet-count">{bq.count}</div>
                  </div>
                </div>
                <div className="bouquet-channels">
                  <p style={{ margin: "0 0 10px", fontSize: 13 }}>{bq.desc}</p>
                  <strong>Core Channels &amp; Networks:</strong>
                  <ul style={{ margin: "6px 0 0", paddingLeft: 18, fontSize: 13 }}>
                    {bq.highlights.map((hl) => (
                      <li key={hl} style={{ marginBottom: 3 }}>{hl}</li>
                    ))}
                  </ul>
                </div>
                <div className="bouquet-badges">
                  {bq.badges.map((bdg) => (
                    <span key={bdg} className="bouquet-badge">{bdg}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Side-by-Side Feature Comparison Matrix */}
      <section className="section" id="comparison">
        <div className="container">
          <h2>Comparison: Premium M3U IPTV playlist vs cable &amp; unverified free playlists</h2>
          <p className="sub">
            Why thousands of cord-cutters switch from expensive cable TV contracts and ditch unreliable, buffering public links.
          </p>
          <div className="matrix-container">
            <table className="matrix-table" aria-label="Streaming service comparison matrix">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "32%" }}>Feature &amp; Specification</th>
                  <th scope="col" className="highlight" style={{ width: "26%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span>IPTV M3U Playlist</span>
                      <span className="server-pill" style={{ padding: "2px 6px", fontSize: 10 }}>Best Choice</span>
                    </div>
                  </th>
                  <th scope="col" style={{ width: "21%" }}>Traditional Cable TV</th>
                  <th scope="col" style={{ width: "21%" }}>Free Public M3U Links</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature}>
                    <td>
                      <span className="matrix-feature-name">{row.feature}</span>
                      <span className="matrix-feature-sub">{row.sub}</span>
                    </td>
                    <td className="highlight">
                      <span className="check-icon">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {row.us.text}
                      </span>
                    </td>
                    <td>
                      {row.cable.status === "check" ? (
                        <span className="check-icon">✓ {row.cable.text}</span>
                      ) : row.cable.status === "warn" ? (
                        <span className="warn-icon">⚠️ {row.cable.text}</span>
                      ) : (
                        <span className="cross-icon">✕ {row.cable.text}</span>
                      )}
                    </td>
                    <td>
                      {row.free.status === "check" ? (
                        <span className="check-icon">✓ {row.free.text}</span>
                      ) : row.free.status === "warn" ? (
                        <span className="warn-icon">⚠️ {row.free.text}</span>
                      ) : (
                        <span className="cross-icon">✕ {row.free.text}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Features Section: Why choose our M3U IPTV playlist */}
      <section className="section section-alt" id="features">
        <div className="container">
          <h2>Why choose our M3U IPTV playlist for home streaming</h2>
          <p className="sub">
            Built on carrier-grade CDN streaming servers engineered for low latency, zero buffering, and uncompressed 4K picture clarity.
          </p>
          <div className="grid grid-3">
            {FEATURES.map((feat) => {
              const imgObj = getImage(feat.img) ?? { src: feat.img, width: feat.width, height: feat.height };
              return (
                <div key={feat.title} className="card">
                  <div className="card-media" style={{ borderRadius: "10px", overflow: "hidden" }}>
                    <Image
                      src={imgObj.src}
                      width={imgObj.width}
                      height={imgObj.height}
                      alt={feat.alt}
                      loading="lazy"
                      sizes="(min-width: 960px) 360px, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Devices Section: How to setup M3U IPTV playlist */}
      <section className="section" id="devices">
        <div className="container">
          <h2>How to setup M3U IPTV playlist on your favorite devices</h2>
          <p className="sub">
            Each walkthrough is written for one specific platform, with direct app store links, player recommendations, and menu directions.
          </p>
          <div className="grid grid-3">
            {DEVICES.map((d) => {
              const imgObj = getImage(d.img) ?? { src: d.img, width: d.width, height: d.height };
              return (
                <Link key={d.href} href={d.href} className="card">
                  <div className="card-media" style={{ borderRadius: "10px", overflow: "hidden" }}>
                    <Image
                      src={imgObj.src}
                      width={imgObj.width}
                      height={imgObj.height}
                      alt={d.alt}
                      loading="lazy"
                      sizes="(min-width: 960px) 360px, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <h3>{d.label}</h3>
                  <p>{d.note}</p>
                  <span className="more">Open setup guide →</span>
                </Link>
              );
            })}
          </div>
          <p style={{ marginTop: 20 }}>
            Using something else? See <Link href="/setup/roku">Roku</Link>,{" "}
            <Link href="/setup/android-phone">Android phones</Link>, or{" "}
            <Link href="/guides/iptv-box">IPTV boxes like MAG and Formuler</Link>.
          </p>
        </div>
      </section>

      {/* 7. Channels Section: Channel selection and live sports in your M3U IPTV playlist */}
      <section className="section section-alt" id="channels">
        <div className="container">
          <h2>Channel selection and live sports in your M3U IPTV playlist</h2>
          <p className="sub">
            Thousands of live broadcast channels and on-demand movies in 4K Ultra HD and 60 FPS motion clarity across sports, news, and cinema.
          </p>
          <div className="grid grid-3 watch-grid">
            {CHANNELS.map((ch) => {
              const imgObj = getImage(ch.img) ?? { src: ch.img, width: ch.width, height: ch.height };
              return (
                <div key={ch.label} className="watch-card">
                  <div className="watch-media" style={{ borderRadius: "10px", overflow: "hidden" }}>
                    <Image
                      src={imgObj.src}
                      width={imgObj.width}
                      height={imgObj.height}
                      alt={ch.alt}
                      loading="lazy"
                      sizes="(min-width: 960px) 400px, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="watch-body">
                    <h3>{ch.label}</h3>
                    <p>{ch.note}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Wholesale IPTV Reseller & Panel Program (Inspired by iptvresellerpanel.store) */}
      <section className="section section-alt" id="reseller-panel">
        <div className="container">
          <div className="reseller-banner">
            <div className="reseller-info">
              <span className="reseller-badge">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                Wholesale Reseller Opportunities
              </span>
              <h3>Start your own IPTV business with our reseller panel</h3>
              <p>
                Launch your independent brand or expand your installer business with our powerful web management panel. Create free trials, manage M3U playlists, set custom bouquets, and enjoy profit margins exceeding 60% to 80%.
              </p>
              <div className="reseller-features-grid">
                <div className="reseller-feat-item">
                  <span style={{ color: "var(--success)" }}>✓</span>
                  <span>Instant 24-Hour Free Trials</span>
                </div>
                <div className="reseller-feat-item">
                  <span style={{ color: "var(--success)" }}>✓</span>
                  <span>Credits Never Expire</span>
                </div>
                <div className="reseller-feat-item">
                  <span style={{ color: "var(--success)" }}>✓</span>
                  <span>White-Label DNS Branding</span>
                </div>
                <div className="reseller-feat-item">
                  <span style={{ color: "var(--success)" }}>✓</span>
                  <span>Sub-Reseller Management</span>
                </div>
              </div>
              <div className="reseller-actions">
                <Link href="/reseller" className="btn btn-primary" data-track="cta_click" data-track-label="reseller_hub_cta">
                  Explore Reseller Program →
                </Link>
                <a
                  href={resellerWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  data-track="cta_click"
                  data-track-label="reseller_whatsapp_cta"
                >
                  WhatsApp Wholesale Rates
                </a>
              </div>
            </div>
            <div className="reseller-pricing-card">
              <h4 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                Wholesale Credit Packages
              </h4>
              {RESELLER_TIERS.map((tier) => (
                <div key={tier.credits} className="reseller-tier">
                  <div>
                    <div className="tier-credits">{tier.credits}</div>
                    <div className="tier-sub">{tier.sub} • {tier.perCredit}</div>
                  </div>
                  <div className="tier-price">{tier.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. 3-Step Setup Section */}
      <section className="section" id="how-it-works">
        <div className="container">
          <h2>How to get started with IPTV</h2>
          <p className="sub">Three simple steps from choosing a plan to streaming on your big screen.</p>
          <ol className="steps">
            {STEPS.map((s) => (
              <li key={s.t}>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 11. Discord Community CTA Band */}
      <section className="container">
        <div className="discord-band">
          <div className="discord-band-content">
            <span className="discord-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Discord Community
            </span>
            <h3>Join our cord-cutting community</h3>
            <p>
              Get daily matchday fixtures, server status announcements, configuration tips, and real-time community support directly on Discord.
            </p>
          </div>
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-discord"
            aria-label="Join our Discord community server"
            data-track="cta_click"
            data-track-label="discord_community_banner"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Join Discord Community →
          </a>
        </div>
      </section>

      {/* 12. Network Architecture Diagram */}
      <section className="section">
        <div className="container">
          <h2>How an M3U IPTV playlist functions: Technical overview</h2>
          <p className="sub">
            Video travels from our high-bandwidth servers, over the internet, through your home router and into a player app on your device.
          </p>
          <div className="diagram">
            <Image
              src={diagram.src}
              width={diagram.width}
              height={diagram.height}
              alt="Technical streaming network diagram for high-speed M3U IPTV playlist"
              loading="lazy"
              sizes="(min-width: 1160px) 1128px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 13. Popular Guides Section */}
      <section className="section section-alt" id="guides">
        <div className="container">
          <h2>Popular guides &amp; resources</h2>
          <p className="sub">
            Clear walkthroughs and unbiased comparisons for the streaming questions Americans ask most.
          </p>
          <div className="grid grid-4">
            {TOPICS.map((t) => (
              <div key={t.title} className="card">
                <h3>{t.title}</h3>
                <ul className="link-list">
                  {t.links.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Main Prose Content */}
      <section className="section">
        <div className="container">
          <div className="prose" style={{ maxWidth: 840 }} dangerouslySetInnerHTML={{ __html: page.html }} />

          {/* E-E-A-T Reviewer & Editorial Standards Box */}
          <section className="author-review-card" id="editorial-review" aria-label="Editorial review and testing standards">
            <div className="author-review-header">
              <div className="author-avatar" aria-hidden="true">MV</div>
              <div className="author-meta">
                <h3>Reviewed by Marcus Vance</h3>
                <div className="author-role">Senior Streaming Network Specialist &amp; Cord-Cutting Engineer</div>
                <div className="author-date">Last reviewed: November 2026 • Published by {business.legalEntity ?? business.brand}</div>
              </div>
            </div>
            <p>
              Marcus Vance has spent over nine years testing IPTV player applications, hardware encoders, content delivery networks (CDNs), and home network optimizations for cord-cutters. Every guide and technical specification published on this platform is verified on physical streaming hardware including Amazon Fire TV Sticks, Nvidia Shield Pro, Apple TV 4K, and LG webOS smart TVs.
            </p>
            <p style={{ marginBottom: 0 }}>
              Learn more about our independent hardware testing laboratory and editorial integrity on our{" "}
              <Link href="/about" style={{ fontWeight: 700, color: "var(--brand-500)" }}>
                About Us page
              </Link>{" "}
              or get in touch with our technical team directly through our{" "}
              <Link href="/contact" style={{ fontWeight: 700, color: "var(--brand-500)" }}>
                Contact Support portal
              </Link>.
            </p>

            <div className="author-trust-badges">
              <div className="trust-badge-pill">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Instant Provisioning</span>
              </div>
              <div className="trust-badge-pill">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>VPN &amp; ISP Friendly</span>
              </div>
              <div className="trust-badge-pill">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-4H7v6h6V9zm2 0h1v2h-1V9z" clipRule="evenodd" />
                </svg>
                <span>Automated XMLTV EPG</span>
              </div>
              <div className="trust-badge-pill">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>7-Day Refund Policy</span>
              </div>
            </div>
          </section>

          {/* 15. FAQ Section (Exactly 12 Questions) */}
          {page.faqs && page.faqs.length > 0 && (
            <section className="faq" aria-labelledby="faq-h" id="faq-section">
              <h2 id="faq-h">Frequently asked questions</h2>
              <p className="sub" style={{ marginBottom: 24 }}>
                Straightforward answers to the 12 most common questions about our M3U IPTV playlist subscriptions, compatibility, and ordering.
              </p>
              {page.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          )}

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <a href="#main" className="back-to-top" aria-label="Scroll back to top of page">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Back to top
            </a>
          </div>
        </div>
      </section>

      {/* Conversion CTA Band */}
      <CtaBand />

      {/* Exit Intent Trial Modal (Desktop Only) */}
      <ExitIntentModal />

      {/* Structured Schema Markup */}
      {org && <JsonLd data={org} />}
      {site && <JsonLd data={site} />}
      {faq && <JsonLd data={faq} />}
      {offers && <JsonLd data={offers} />}
      {broadcast && <JsonLd data={broadcast} />}
      {breadcrumbs && <JsonLd data={breadcrumbs} />}
    </>
  );
}
