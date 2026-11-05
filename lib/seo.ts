import type { Metadata } from "next";
import { business } from "@/content/business";
import { absoluteUrl, BRAND, SITE_URL } from "./site";
import { getImage, isIndexable, type Page } from "./content";

const DEFAULT_OG = "/img/og-default.webp";

export function pageMetadata(page: Page): Metadata {
  const url = absoluteUrl(page.path);
  const index = isIndexable(page.path);
  const img = getImage(page.image) ?? getImage(DEFAULT_OG);
  const images = img ? [{ url: img.src, width: img.width, height: img.height, alt: page.imageAlt ?? page.h1 }] : [];
  const isArticle = page.schema === "article" || page.schema === "howto";
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: isArticle ? "article" : "website",
      url,
      title: page.title,
      description: page.description,
      siteName: BRAND,
      locale: "en_US",
      images,
      ...(isArticle ? { modifiedTime: page.updated, publishedTime: page.published ?? page.updated } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: images.map((i) => i.url),
    },
  };
}

export function organizationSchema() {
  const contactPoint = business.email || business.whatsapp
    ? [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          ...(business.email ? { email: business.email } : {}),
          ...(business.whatsapp ? { telephone: business.whatsapp } : {}),
          areaServed: ["US", "GB", "CA", "EU"],
          availableLanguage: ["English", "French", "Spanish", "Arabic", "German"],
        },
      ]
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: business.legalEntity ?? BRAND,
    alternateName: business.legalEntity ? BRAND : undefined,
    url: SITE_URL,
    logo: `${SITE_URL}/img/og-default.webp`,
    sameAs: [
      "https://web.facebook.com/profile.php?id=61591545360371",
      "https://www.instagram.com/streamb4tv/",
      "https://x.com/streamb4t",
      "https://discord.gg/BFr5HSZfk",
    ],
    ...(contactPoint ? { contactPoint } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND,
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema(page: Page) {
  const img = getImage(page.image);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.description,
    mainEntityOfPage: absoluteUrl(page.path),
    datePublished: page.published ?? page.updated,
    dateModified: page.updated,
    inLanguage: "en-US",
    author: { "@type": "Organization", name: BRAND, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(img ? { image: [absoluteUrl(img.src)] } : {}),
  };
}

export function faqSchema(page: Page) {
  if (!page.faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: { href: string; label: string }[]) {
  if (!crumbs || crumbs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: c.label,
      item: absoluteUrl(c.href),
    })),
  };
}

export function howToSchema(page: Page) {
  if (page.schema !== "howto") return null;
  const img = getImage(page.image);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.h1,
    description: page.description,
    mainEntityOfPage: absoluteUrl(page.path),
    inLanguage: "en-US",
    ...(img ? { image: absoluteUrl(img.src) } : {}),
    step: page.toc.map((t, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: t.text,
      url: `${absoluteUrl(page.path)}#${t.id}`,
    })),
  };
}

/** Product and Offer markup for all 12 confirmed subscription plans. */
export function offersSchema() {
  if (!business.plans?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/#subscription-product`,
    name: `${BRAND} Subscription (3, 6, 12 Months)`,
    description: `High-speed M3U IPTV playlist URL and Xtream Codes access with 4K/8K sports, live channels, and active EPG across 1 to 4 devices.`,
    brand: { "@type": "Brand", name: BRAND },
    image: `${SITE_URL}/img/hero-living-room.webp`,
    sku: "IPTV-M3U-SUB-2026",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "380",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "39.99",
      highPrice: "179.99",
      offerCount: String(business.plans.length),
      offers: business.plans.map((p) => ({
        "@type": "Offer",
        name: `${BRAND} - ${p.name}`,
        price: p.priceUsd.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: absoluteUrl("/pricing"),
        seller: { "@id": `${SITE_URL}/#organization` },
      })),
    },
  };
}

/** Broadcast Service schema for live television channel bouquets. */
export function broadcastServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BroadcastService",
    "@id": `${SITE_URL}/#broadcast-service`,
    name: `${BRAND} Live TV Streams`,
    broadcastDisplayName: BRAND,
    broadcaster: { "@id": `${SITE_URL}/#organization` },
    inLanguage: ["en", "es", "fr", "de", "ar"],
    areaServed: ["US", "GB", "CA", "EU"],
  };
}

/** VideoObject schema for video setup walkthroughs and demos. */
export function videoObjectSchema({
  title,
  description,
  uploadDate,
  thumbnailUrl,
  contentUrl,
}: {
  title: string;
  description: string;
  uploadDate: string;
  thumbnailUrl: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    uploadDate,
    thumbnailUrl: absoluteUrl(thumbnailUrl),
    contentUrl,
  };
}
