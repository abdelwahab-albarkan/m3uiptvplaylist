/**
 * Analytics-ready event layer. Events are pushed to window.dataLayer, which
 * Google Tag Manager / GA4 (or any compatible tool) reads once installed.
 * Nothing leaves the browser until a tag manager is added.
 *
 * Events: page_view, cta_click, pricing_view, contact_submit,
 * checkout_start, purchase (only once a payment integration exists).
 */
type Payload = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}
