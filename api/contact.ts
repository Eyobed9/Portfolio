/**
 * Contact form handler (Vercel Function).
 *
 * Runs server-side on purpose: the Resend API key and the recipient address
 * must never reach the browser. Anything bundled by Vite is public, and Resend
 * rejects browser-origin calls, so this endpoint is the only safe place to send
 * from.
 *
 * Required environment variables (Vercel > Settings > Environment Variables):
 *   RESEND_API_KEY  Server-side Resend key. Never prefix with VITE_.
 *   CONTACT_TO      Where enquiries are delivered.
 *   CONTACT_FROM    Verified sender, e.g. "Portfolio <noreply@example.com>".
 */

const MAX = { name: 120, email: 200, project: 200, details: 5000 } as const;

type Payload = {
  name?: unknown;
  email?: unknown;
  project?: unknown;
  details?: unknown;
  /** Honeypot. Real people leave this empty; bots fill every field. */
  company?: unknown;
};

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const asText = (value: unknown, limit: number) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

/** Good enough to catch typos; real validation is the reply bouncing. */
const looksLikeEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string,
  );

// Basic in-memory rate limiting (1 request per 60 seconds per IP)
const rateLimitMap = new Map<string, number>();

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  // CSRF Protection via custom header
  if (request.headers.get("x-csrf-token") !== "portfolio-contact-submit") {
    return json({ error: "invalid_csrf_token" }, 403);
  }

  // Server-side rate limiting by IP
  const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
  const now = Date.now();
  const lastRequestTime = rateLimitMap.get(ip);
  
  if (lastRequestTime && now - lastRequestTime < 60000) {
    return json({ error: "rate_limited" }, 429);
  }
  rateLimitMap.set(ip, now);
  // Clean up old entries periodically to prevent memory leaks in long-running instances
  if (rateLimitMap.size > 1000) {
      rateLimitMap.clear();
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    // Configuration problem, not the visitor's fault. Log for the operator and
    // stay vague to the client.
    console.error("contact: missing RESEND_API_KEY, CONTACT_TO or CONTACT_FROM");
    return json({ error: "server_misconfigured" }, 500);
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Bots that fill every field get a success response and no email, so they do
  // not learn the honeypot exists and retry.
  if (asText(payload.company, 100) !== "") {
    return json({ ok: true }, 200);
  }

  const name = asText(payload.name, MAX.name);
  const email = asText(payload.email, MAX.email);
  const project = asText(payload.project, MAX.project);
  const details = asText(payload.details, MAX.details);

  if (!name || !email || !details || !looksLikeEmail(email)) {
    return json({ error: "invalid_input" }, 400);
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project: ${project || "(not given)"}`,
    "",
    details,
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      // Replying in the mail client goes straight back to the visitor.
      reply_to: email,
      subject: `Portfolio enquiry from ${name}`,
      text: lines.join("\n"),
      html: `<div style="font-family:system-ui,sans-serif;line-height:1.6">
  <h2 style="margin:0 0 12px">New portfolio enquiry</h2>
  <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p style="margin:0 0 16px"><strong>Project:</strong> ${escapeHtml(project) || "(not given)"}</p>
  <p style="white-space:pre-wrap;margin:0">${escapeHtml(details)}</p>
</div>`,
    }),
  });

  if (!response.ok) {
    // Resend's body can name the account or domain, so it is logged, not returned.
    console.error("contact: resend failed", response.status, await response.text());
    return json({ error: "send_failed" }, 502);
  }

  return json({ ok: true }, 200);
}
