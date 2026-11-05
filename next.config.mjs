/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1344],
    imageSizes: [64, 96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "iptv-usa8k.com" }],
        destination: "https://iptvm3uplaylist.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.iptvm3uplaylist.com" }],
        destination: "https://iptvm3uplaylist.com/:path*",
        permanent: true,
      },
      // Legacy paths from the earlier draft architecture -> their single canonical owner.
      { source: "/blog/fire-stick-setup", destination: "/blog/m3u-iptv-playlist-firestick-setup", permanent: true },
      { source: "/blog/firestick-setup", destination: "/blog/m3u-iptv-playlist-firestick-setup", permanent: true },
      { source: "/blog/firestick", destination: "/blog/m3u-iptv-playlist-firestick-setup", permanent: true },
      { source: "/trial", destination: "/free-trial", permanent: true },
      { source: "/setup/smart-tv", destination: "/setup/samsung-tv", permanent: true },
      { source: "/setup/fire-stick", destination: "/setup/firestick", permanent: true },
      { source: "/setup/kodi", destination: "/apps/kodi", permanent: true },
      { source: "/setup/android", destination: "/setup/android-tv", permanent: true },
      { source: "/setup/iphone", destination: "/setup/apple-tv-iphone", permanent: true },
      { source: "/setup/windows", destination: "/setup/windows-mac", permanent: true },
      { source: "/setup/mag", destination: "/setup/mag-box", permanent: true },
      { source: "/fix/buffering", destination: "/troubleshooting/iptv-buffering", permanent: true },
      { source: "/fix/not-working", destination: "/troubleshooting/iptv-not-working", permanent: true },
      { source: "/fix/m3u-not-loading", destination: "/blog/m3u-playlist-buffering-fix", permanent: true },
      { source: "/setup/apple-tv", destination: "/setup/apple-tv-iphone", permanent: true },
      { source: "/setup/pc-mac", destination: "/setup/windows-mac", permanent: true },
      { source: "/setup/mag-formuler", destination: "/guides/iptv-box", permanent: true },
      { source: "/troubleshooting/vpn-isp-throttling", destination: "/troubleshooting/vpn-for-iptv", permanent: true },
      { source: "/vs/cable", destination: "/compare/iptv-vs-cable", permanent: true },
      { source: "/vs/competitor", destination: "/compare/live-tv-streaming-services", permanent: true },
      { source: "/compare/cable-vs-iptv", destination: "/compare/iptv-vs-cable", permanent: true },
      { source: "/guides/iptv-scams-guide", destination: "/guides/iptv-scams", permanent: true },
      { source: "/guides/best-iptv-providers-usa", destination: "/guides/how-to-choose-iptv-provider", permanent: true },
    ];
  },
};
export default nextConfig;
