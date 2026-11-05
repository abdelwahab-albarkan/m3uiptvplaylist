"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/content/business";

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only run on desktop devices (width >= 1024px)
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    const seen = sessionStorage.getItem("exit_intent_shown");
    if (seen) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves out towards browser chrome/tabs (clientY <= 5)
      if (e.clientY <= 5 && !sessionStorage.getItem("exit_intent_shown")) {
        sessionStorage.setItem("exit_intent_shown", "true");
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!isOpen) return null;

  const trialWhatsApp = whatsappLink("Hi, I would like to request a 24-hour free trial for IPTV M3U Playlist.") ?? "#";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 md:p-8 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          aria-label="Close free trial offer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800 mb-4">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          Limited Trial Available
        </div>

        {/* Headline */}
        <h3 id="modal-title" className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
          Test Our 4K M3U Playlist Free for 24 Hours
        </h3>

        <p className="mt-2 text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
          Before you commit, verify our buffer-free stream stability, 4K/8K sports performance, and automated EPG guide directly on your Firestick, Smart TV, or phone.
        </p>

        {/* Feature List */}
        <ul className="mt-4 space-y-2 text-sm text-stone-700 dark:text-stone-300">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Instant M3U URL + Xtream API credentials
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Live sports events in 4K &amp; FHD 60FPS
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No credit card or contract required
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/free-trial"
            onClick={() => setIsOpen(false)}
            className="flex-1 text-center font-semibold py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition shadow-sm hover:shadow"
            data-track="cta_click"
            data-track-label="exit_modal_trial_page"
          >
            Claim 24h Free Trial →
          </Link>
          <a
            href={trialWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex-1 text-center font-semibold py-3 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
            data-track="cta_click"
            data-track-label="exit_modal_whatsapp"
          >
            Request on WhatsApp
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-stone-500 dark:text-stone-400">
          Setup instructions delivered in under 5 minutes. 100% free with zero obligations.
        </p>
      </div>
    </div>
  );
}

