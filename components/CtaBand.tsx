import Link from "next/link";
import { whatsappLink } from "@/content/business";

export function CtaBand({
  title = "Ready to set up your screens?",
  text = "Compare plans, or tell us which devices you use and we’ll point you to the right setup.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-band">
      <div className="container row">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="hero-cta">
          <Link href="/pricing" className="btn btn-primary" data-track="cta_click" data-track-label="band_pricing">
            See plans
          </Link>
          <a
            href={whatsappLink("Hi, I have a question about IPTV M3U Playlist.") ?? "/contact"}
            className="btn btn-ghost"
            data-track="cta_click"
            data-track-label="band_whatsapp"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
