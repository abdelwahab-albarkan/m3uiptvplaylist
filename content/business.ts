/**
 * Single source of truth for real business facts.
 */

export type Plan = {
  id: string;
  name: string;
  months: number;
  priceUsd: number;
  accounts: number;
  checkoutUrl?: string;
};

export type Business = {
  brand: string;
  domain: string;
  siteUrl: string;
  email: string | null;
  whatsapp: string | null; // E.164, e.g. "+15551234567"
  telegram: string | null; // username without @
  supportHours: string | null;
  plans: Plan[] | null;
  trial: { available: boolean; hours: number; howToRequest: string } | null;
  paymentMethods: string[] | null; // e.g. ["PayPal", "Visa", "Mastercard"]
  refundPolicy: string | null;
  checkoutMethod: string | null; // short description of how an order is placed
  contentRightsConfirmed: boolean; // true only if the owner confirms distribution rights
  legalEntity: string | null;
  reseller: { available: boolean; details: string } | null;
  socials?: {
    facebook?: string;
    instagram?: string;
    x?: string;
    discord?: string;
  };
};

import data from "./business.json";

export const business = data as unknown as Business;

/** Which business facts each gated widget needs before its page may be indexed. */
export const businessRequirements: Record<string, (b: Business) => string[]> = {
  pricing: (b) => [...(b.plans ? [] : ["plans"]), ...(b.checkoutMethod ? [] : ["checkoutMethod"]), ...(b.contentRightsConfirmed ? [] : ["contentRightsConfirmed"])],
  trial: (b) => (b.trial ? [] : ["trial"]),
  contact: (b) => (b.email || b.whatsapp || b.telegram ? [] : ["email|whatsapp|telegram"]),
  reseller: (b) => (b.reseller ? [] : ["reseller"]),
  refund: (b) => (b.refundPolicy ? [] : ["refundPolicy"]),
  legal: (b) => (b.legalEntity && (b.email || b.whatsapp) ? [] : ["legalEntity", "contact"]),
};

export function hasContact(): boolean {
  return Boolean(business.email || business.whatsapp || business.telegram);
}

export function whatsappLink(text?: string): string | null {
  if (!business.whatsapp) return null;
  const digits = business.whatsapp.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
