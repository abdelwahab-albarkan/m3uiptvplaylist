"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Delegated analytics and campaign attribution tracker.
 * Captures UTM parameters from Facebook, Instagram, X, Discord, etc.
 * Stores attribution and enriches conversion CTAs with referral tags.
 */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get("utm_source");
        const utmMedium = params.get("utm_medium");
        const utmCampaign = params.get("utm_campaign");

        if (utmSource || utmMedium || utmCampaign) {
          const attribution = {
            source: utmSource || "",
            medium: utmMedium || "",
            campaign: utmCampaign || "",
          };
          sessionStorage.setItem("iptv_utm", JSON.stringify(attribution));
          track("campaign_visit", attribution);
        }
      }
    } catch {
      // Ignore storage restrictions
    }

    track("page_view", { path: pathname });
    if (pathname === "/pricing") track("pricing_view", { path: pathname });
    if (pathname === "/free-trial") track("trial_view", { path: pathname });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;

      let href = el.getAttribute("href") ?? undefined;

      // If user clicks a WhatsApp CTA, enrich the message with campaign source
      if (href && href.includes("wa.me")) {
        try {
          const rawUtm = sessionStorage.getItem("iptv_utm");
          if (rawUtm) {
            const utm = JSON.parse(rawUtm);
            if (utm.source && !href.includes("Ref:")) {
              const tag = ` [Ref: ${utm.source}${utm.campaign ? `/${utm.campaign}` : ""}]`;
              const url = new URL(href);
              const text = url.searchParams.get("text");
              if (text) {
                url.searchParams.set("text", `${text}${tag}`);
                href = url.toString();
                el.setAttribute("href", href);
              }
            }
          }
        } catch {
          // Graceful fallback
        }
      }

      track(el.dataset.track as string, {
        label: el.dataset.trackLabel ?? el.textContent?.trim().slice(0, 60),
        href,
        path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
