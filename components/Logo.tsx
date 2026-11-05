import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="IPTV M3U Playlist home">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 10 12">
          <path d="M0 0l10 6-10 6z" />
        </svg>
      </span>
      <span>
        IPTV<b>M3U</b>Playlist
      </span>
    </Link>
  );
}
