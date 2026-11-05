"use client";

import { useState } from "react";
import { business, whatsappLink } from "@/content/business";

export function PricingSection() {
  const plans = business.plans ?? [];
  const terms = [...new Set(plans.map((p) => p.months))].sort((a, b) => a - b);
  const [activeTerm, setActiveTerm] = useState<number>(terms[terms.length - 1] ?? 12);

  if (plans.length === 0) return null;

  const currentPlans = plans.filter((p) => p.months === activeTerm).sort((a, b) => a.accounts - b.accounts);

  return (
    <div className="pricing-system">
      {/* Social proof & Trust badges */}
      <div className="pricing-trust-bar">
        <div className="trust-badge-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
          <span>Secure checkout &amp; zero hidden fees</span>
        </div>
        <div className="trust-badge-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.77-9 9.95 0 5.52 4.48 10 10 10 2.45 0 4.69-.89 6.43-2.36l-2.14-2.14c-1.21.94-2.7 1.5-4.29 1.5zm7-7c0-.34-.04-.67-.09-1l-2.09 1.25c.12.55.18 1.13.18 1.75 0 1.93-.78 3.68-2.05 4.95l2.14 2.14C19.78 17.38 21 14.83 21 12z"/></svg>
          <span>Instant M3U URL delivery</span>
        </div>
        <div className="trust-badge-item">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          <span>Rated 4.9 / 5 by 380+ subscribers</span>
        </div>
      </div>

      {/* Duration Pill Switcher Tabs */}
      <div className="pricing-tabs" role="tablist" aria-label="Subscription duration">
        {terms.map((term) => (
          <button
            key={term}
            type="button"
            role="tab"
            aria-selected={activeTerm === term}
            onClick={() => setActiveTerm(term)}
            className={`pricing-tab-btn ${activeTerm === term ? "active" : ""}`}
          >
            <span>{term} Months</span>
            {term === 12 && <span className="tab-badge">Best Value (Save 50%)</span>}
          </button>
        ))}
      </div>

      <p className="price-sub-hint">
        Select your required simultaneous screens below. Tap any plan to order instantly on WhatsApp or send an email inquiry.
      </p>

      {/* 4-Account Tiers Responsive Grid */}
      <div className="pricing-grid">
        {currentPlans.map((p) => {
          const isPopular = p.accounts === 1;
          const monthlyPrice = (p.priceUsd / p.months).toFixed(2);
          const orderMsg = `Hi, I want to buy the ${p.months} month ${p.accounts} account plan for $${p.priceUsd.toFixed(2)}.`;
          const waUrl = whatsappLink(orderMsg) ?? "/contact";

          return (
            <div
              key={p.id}
              className={`pricing-card ${isPopular ? "featured" : ""}`}
            >
              {isPopular && <div className="card-popular-badge">Most Popular</div>}

              <div className="card-header">
                <span className="card-accounts-tag">
                  {p.accounts} {p.accounts > 1 ? "Screens / Accounts" : "Screen / Account"}
                </span>
                <h3 className="card-title">{p.months}-Month Pass</h3>
              </div>

              <div className="card-price-block">
                <span className="currency">$</span>
                <span className="amount">{p.priceUsd.toFixed(2)}</span>
                <span className="period">total</span>
              </div>
              <div className="card-monthly-rate">
                Just <strong>${monthlyPrice}</strong> / month
              </div>

              <ul className="card-features">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>4K Ultra HD &amp; 8K HDR streams</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>60 FPS live sports &amp; PPV events</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Direct M3U URL &amp; Xtream Codes API</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Active XMLTV EPG program guide</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Anti-buffering gigabit CDN network</span>
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  <span>Priority WhatsApp &amp; Email support</span>
                </li>
              </ul>

              <div className="card-cta-group">
                <a
                  href={waUrl}
                  className="btn btn-primary card-btn"
                  data-track="checkout_start"
                  data-track-label={p.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                  </svg>
                  Order on WhatsApp
                </a>

                <a
                  href={`mailto:${business.email}?subject=Order inquiry for ${p.months}-month ${p.accounts}-account plan ($${p.priceUsd.toFixed(2)})`}
                  className="card-secondary-cta"
                  data-track="cta_click"
                  data-track-label={`email_order_${p.id}`}
                >
                  Or order via email: {business.email}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Static Fallback for Search Engines & Screen Readers */}
      <noscript>
        <div style={{ marginTop: "30px" }}>
          <h3>All 12 Subscription Packages</h3>
          <ul>
            {plans.map((p) => (
              <li key={p.id}>
                {p.months} Months ({p.accounts} Account{p.accounts > 1 ? "s" : ""}): ${p.priceUsd.toFixed(2)} -{" "}
                <a href={whatsappLink(`Hi, I want to buy the ${p.months} month ${p.accounts} account plan for $${p.priceUsd.toFixed(2)}.`) ?? "/contact"}>
                  Order on WhatsApp
                </a>
              </li>
            ))}
          </ul>
        </div>
      </noscript>
    </div>
  );
}

