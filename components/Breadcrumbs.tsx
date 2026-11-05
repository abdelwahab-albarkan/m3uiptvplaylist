import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { absoluteUrl } from "@/lib/site";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ href: "/", label: "Home" }, ...items];
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {all.map((c, i) =>
          i === all.length - 1 ? (
            <li key={c.href} aria-current="page">
              {c.label}
            </li>
          ) : (
            <li key={c.href}>
              <Link href={c.href}>{c.label}</Link>
            </li>
          ),
        )}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: absoluteUrl(c.href),
          })),
        }}
      />
    </nav>
  );
}
