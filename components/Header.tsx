"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";
import { business, whatsappLink } from "@/content/business";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const socials = business.socials ?? {
    facebook: "https://web.facebook.com/profile.php?id=61591545360371",
    instagram: "https://www.instagram.com/streamb4tv/",
    x: "https://x.com/streamb4t",
    discord: "https://discord.gg/BFr5HSZfk",
  };

  const supportWhatsApp =
    whatsappLink("Hello, I need quick support or have a question about IPTV M3U Playlist") ??
    "https://wa.me/212625218443";

  // Auto-close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-row">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="nav-desktop" aria-label="Main navigation">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={n.href === "/pricing" ? "nav-pricing" : undefined}
            >
              {n.label}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>

          {/* Social Media Quick Links */}
          <div className="header-socials-group" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IPTV M3U Playlist Facebook page"
                className="header-social-link"
                title="Facebook"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IPTV M3U Playlist Instagram profile"
                className="header-social-link"
                title="Instagram"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
            {socials.x && (
              <a
                href={socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IPTV M3U Playlist on X (Twitter)"
                className="header-social-link"
                title="X (Twitter)"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
            {socials.discord && (
              <a
                href={socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord community"
                className="header-social-link"
                title="Discord Community"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            )}
          </div>

          <Link
            href="/pricing"
            className="btn btn-primary btn-sm"
            data-track="cta_click"
            data-track-label="header_pricing"
          >
            See plans
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="header-mobile-controls">
          <Link
            href="/pricing"
            className="btn btn-primary btn-sm mobile-cta"
            data-track="cta_click"
            data-track-label="mobile_header_pricing"
          >
            See plans
          </Link>
          <ThemeToggle />

          {/* Interactive Mobile Menu Toggle Button */}
          <button
            type="button"
            className={`nav-toggle-btn ${isOpen ? "is-open" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-panel"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Backdrop Overlay when Mobile Menu is Open */}
      {isOpen && (
        <div
          className="nav-mobile-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Down Navigation Panel */}
      <nav
        id="mobile-nav-panel"
        className={`nav-panel ${isOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="nav-panel-links">
          {NAV.map((n) => {
            const isPricing = n.href === "/pricing";
            const isActive = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setIsOpen(false)}
                className={`nav-panel-link ${isPricing ? "nav-panel-pricing" : ""} ${isActive ? "active" : ""}`}
              >
                <span>{n.label}</span>
                {isPricing && <span className="nav-pricing-badge">Plans from $39.99</span>}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`nav-panel-link ${pathname === "/contact" ? "active" : ""}`}
          >
            <span>Contact Support</span>
          </Link>
          <Link
            href="/faq"
            onClick={() => setIsOpen(false)}
            className={`nav-panel-link ${pathname === "/faq" ? "active" : ""}`}
          >
            <span>Frequently Asked Questions</span>
          </Link>
          <Link
            href="/free-trial"
            onClick={() => setIsOpen(false)}
            className={`nav-panel-link nav-panel-trial ${pathname === "/free-trial" ? "active" : ""}`}
          >
            <span>Free 24h Trial</span>
            <span className="nav-trial-badge">Instant</span>
          </Link>
        </div>

        {/* Mobile Action Buttons */}
        <div className="nav-panel-ctas">
          <Link
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary"
            data-track="cta_click"
            data-track-label="mobile_menu_pricing_cta"
          >
            View All 12 Pricing Plans →
          </Link>
          <a
            href={supportWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "center" }}
            data-track="cta_click"
            data-track-label="mobile_menu_whatsapp_cta"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.072-1.028-.052-.733-.232-1.72-.857-2.576-1.712-.856-.856-1.48-1.843-1.712-2.576-.124-.394-.097-.716-.052-1.028.05-.333.419-1.026.824-1.17.2-.07.41-.052.56.096.16.157.48.56.64.76.16.2.19.33.09.52-.1.19-.24.36-.36.49-.12.13-.24.27-.11.5.26.46.72 1.07 1.25 1.54.67.6 1.34.88 1.69 1.02.26.11.41-.01.54-.16.14-.16.59-.69.75-.93.16-.24.31-.2.53-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.08.98z" />
            </svg>
            WhatsApp Instant Support
          </a>
        </div>

        {/* Mobile Community Social Links */}
        <div className="nav-panel-socials">
          <span className="nav-panel-socials-title">Join Our Community</span>
          <div className="nav-panel-socials-row">
            {socials.discord && (
              <a
                href={socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="Discord"
                aria-label="Discord Community"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            )}
            {socials.x && (
              <a
                href={socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="X (Twitter)"
                aria-label="X (Twitter)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
