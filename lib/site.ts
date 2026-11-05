import { business } from "@/content/business";

export const SITE_URL = business.siteUrl;
export const BRAND = business.brand;

export function absoluteUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export const NAV = [
  { href: "/setup", label: "Setup guides" },
  { href: "/pricing", label: "Pricing" },
  { href: "/apps", label: "Apps" },
  { href: "/guides/iptv-servers", label: "Servers" },
  { href: "/troubleshooting", label: "Help" },
  { href: "/reseller", label: "Reseller" },
  { href: "/blog", label: "Blog" },
];
