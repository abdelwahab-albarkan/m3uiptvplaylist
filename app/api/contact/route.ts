import { NextResponse } from "next/server";

/**
 * Contact form endpoint. Validates input, drops bot submissions and forwards
 * the message to CONTACT_WEBHOOK_URL (e.g. a Zapier/Make/Slack/email webhook).
 * Without that env var it answers 503 so the visitor is never told a message
 * was delivered when it was not.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot hit: pretend success

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const topic = String(body.topic ?? "other").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 80) return NextResponse.json({ message: "Please enter your name." }, { status: 422 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120)
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 422 });
  if (message.length < 10 || message.length > 2000)
    return NextResponse.json({ message: "Please write a message of at least 10 characters." }, { status: 422 });

  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (!hook) {
    return NextResponse.json(
      { message: "Our contact form isn’t connected yet. Please use another contact option on this page." },
      { status: 503 },
    );
  }

  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, topic, message, receivedAt: new Date().toISOString() }),
  }).catch(() => null);

  if (!res || !res.ok) return NextResponse.json({ message: "We couldn’t send your message. Please try again." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
