"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

type State = { kind: "idle" | "sending" | "ok" | "err"; msg?: string };

export function ContactForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(body.message || "Something went wrong.");
      track("contact_submit", { topic: String(data.topic ?? "") });
      form.reset();
      setState({ kind: "ok", msg: "Thanks, your message was sent. We usually reply by email." });
    } catch (err) {
      setState({ kind: "err", msg: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false} aria-describedby="form-status">
      <label>
        Your name
        <input name="name" autoComplete="name" required maxLength={80} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required maxLength={120} />
      </label>
      <label>
        Topic
        <select name="topic" defaultValue="setup">
          <option value="setup">Help setting up a device</option>
          <option value="plans">Questions about plans</option>
          <option value="trial">Trial request</option>
          <option value="reseller">Reseller program</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label>
        Message <span className="hint">Tell us your device and app so we can help faster.</span>
        <textarea name="message" rows={5} required minLength={10} maxLength={2000} />
      </label>
      {/* Honeypot field for bots; hidden from people and screen readers. */}
      <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-primary" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Send message"}
      </button>
      <div id="form-status" aria-live="polite">
        {state.kind === "ok" && <p className="form-status ok">{state.msg}</p>}
        {state.kind === "err" && <p className="form-status err">{state.msg}</p>}
      </div>
    </form>
  );
}
