import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | IPTV M3U Playlist",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1>We couldn’t find that page</h1>
      <p style={{ color: "var(--text-2)", maxWidth: 520, margin: "0 auto 24px" }}>
        The link may be old or mistyped. These are the pages people usually look for:
      </p>
      <div className="hero-cta" style={{ justifyContent: "center" }}>
        <Link href="/setup" className="btn btn-primary">
          Setup guides
        </Link>
        <Link href="/troubleshooting" className="btn btn-ghost">
          Troubleshooting
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
