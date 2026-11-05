import Image from "next/image";
import Link from "next/link";
import type { Page } from "@/lib/content";
import { childrenOf, getImage, getPage, relatedFor } from "@/lib/content";
import { articleSchema, breadcrumbSchema, faqSchema, howToSchema, offersSchema } from "@/lib/seo";
import { isIndexable } from "@/lib/content";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { Widget } from "./Widgets";
import { whatsappLink } from "@/content/business";
import { CtaBand } from "./CtaBand";

function crumbsFor(page: Page): Crumb[] {
  const parts = page.path.split("/").filter(Boolean);
  const out: Crumb[] = [];
  if (parts.length > 1) {
    const hubPath = `/${parts[0]}`;
    const hub = getPage(hubPath);
    if (hub) out.push({ href: hubPath, label: hub.breadcrumb });
  }
  out.push({ href: page.path, label: page.breadcrumb });
  return out;
}

const DATE = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export function PageView({ page }: { page: Page }) {
  const img = getImage(page.image);
  const isHub = page.path.split("/").length === 2 && ["setup", "apps", "troubleshooting", "blog"].includes(page.section);
  const children = isHub ? childrenOf(page.section, page.path) : [];
  const related = isHub ? [] : relatedFor(page);
  const faq = faqSchema(page);
  const offers = page.widget === "pricing" && isIndexable(page.path) ? offersSchema() : null;
  const isArticle = page.schema === "article";
  const isHowTo = page.schema === "howto";
  const breadcrumbLd = breadcrumbSchema(crumbsFor(page));
  const howToLd = isHowTo ? howToSchema(page) : null;

  return (
    <article>
      <div className="container page-head">
        <Breadcrumbs items={crumbsFor(page)} />
        <h1>{page.h1}</h1>
        {page.intro && <p className="intro">{page.intro}</p>}
        {isArticle && (
          <p className="meta-line">
            <span>Updated {DATE.format(new Date(page.updated))}</span>
            <span>{Math.max(3, Math.round(page.wordCount / 230))} min read</span>
          </p>
        )}
        {img && (
          <div className="article-hero">
            <Image
              src={img.src}
              width={img.width}
              height={img.height}
              alt={page.imageAlt ?? ""}
              priority
              sizes="(min-width: 1160px) 1128px, 100vw"
              style={{ width: "100%", height: "auto", maxHeight: 460, objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      <div className="container layout">
        <div>
          {page.toc.length > 2 && (
            <nav className="toc-mobile" aria-label="On this page">
              <details>
                <summary>On this page</summary>
                <ol>
                  {page.toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </details>
            </nav>
          )}

          {page.widget && (
            <div style={{ margin: "24px 0 8px" }}>
              <Widget name={page.widget} />
            </div>
          )}

          <div className="prose" dangerouslySetInnerHTML={{ __html: page.html }} />

          {children.length > 0 && (
            <section className="related" aria-labelledby="hub-list">
              <h2 id="hub-list">All {page.breadcrumb.toLowerCase()}</h2>
              <div className="grid grid-2">
                {children.map((c) => {
                  const ci = getImage(c.image);
                  return (
                    <Link key={c.path} href={c.path} className="card">
                      {ci && (
                        <div className="card-media">
                          <Image src={ci.src} width={ci.width} height={ci.height} alt="" sizes="(min-width: 640px) 50vw, 100vw" loading="lazy" />
                        </div>
                      )}
                      <h3>{c.h1}</h3>
                      <p>{c.description}</p>
                      <span className="more">Read guide →</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {page.faqs && page.faqs.length > 0 && (
            <section className="faq" aria-labelledby="faq-h">
              <h2 id="faq-h">Frequently asked questions</h2>
              {page.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>
          )}

          {related.length > 0 && (
            <section className="related" aria-labelledby="related-h">
              <h2 id="related-h">Keep reading</h2>
              <div className="grid grid-2">
                {related.map((r) => (
                  <Link key={r.path} href={r.path} className="card">
                    <span className="pill" style={{ alignSelf: "flex-start" }}>
                      {r.section === "setup" ? "Setup" : r.section === "apps" ? "App guide" : r.section === "troubleshooting" ? "Fix" : r.section === "compare" ? "Comparison" : "Guide"}
                    </span>
                    <h3>{r.h1}</h3>
                    <p>{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="toc-desktop" aria-label="Page navigation">
          <div className="toc">
            {page.toc.length > 2 && (
              <>
                <h2>On this page</h2>
                <ol>
                  {page.toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </>
            )}
            <div className="aside-cta">
              <strong>Need a hand?</strong>
              <p>Tell us your device and app, and we’ll walk you through setup.</p>
              <a
                href={whatsappLink("Hi, I need help with my setup.") ?? "/contact"}
                className="btn btn-primary btn-sm"
                data-track="cta_click"
                data-track-label="aside_whatsapp"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      <CtaBand />

      {breadcrumbLd && <JsonLd data={breadcrumbLd} />}
      {isArticle && <JsonLd data={articleSchema(page)} />}
      {howToLd && <JsonLd data={howToLd} />}
      {faq && <JsonLd data={faq} />}
      {offers && <JsonLd data={offers} />}
    </article>
  );
}
