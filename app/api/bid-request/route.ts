import { site } from "@/data/site";
import { emptyBidForm, validateBidForm, type BidFormValues } from "@/lib/bid-form";

/**
 * Bid / plan-review intake.
 *
 * Delivery: when RESEND_API_KEY, BID_INBOX_EMAIL and BID_FROM_EMAIL are set,
 * the request is emailed through Resend's REST API. Without them the route
 * validates and responds `{ ok: true, delivered: false }`, and the form shows
 * an honest "preview mode — not sent" notice. See README → "Form delivery".
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot filled → silently accept so bots get no signal.
  if (typeof body.website === "string" && body.website.trim()) {
    return Response.json({ ok: true, delivered: true });
  }

  const values = Object.fromEntries(
    Object.keys(emptyBidForm).map((k) => [k, typeof body[k] === "string" ? (body[k] as string) : ""]),
  ) as BidFormValues;
  if (!values.preferredContact) values.preferredContact = "email";

  const errors = validateBidForm(values, { projectTypes: site.contact.projectTypes });
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const attachmentNames = Array.isArray(body.attachmentNames)
    ? body.attachmentNames.filter((n): n is string => typeof n === "string").slice(0, 50).map((n) => n.slice(0, 200))
    : [];

  const { RESEND_API_KEY, BID_INBOX_EMAIL, BID_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !BID_INBOX_EMAIL || !BID_FROM_EMAIL) {
    return Response.json({ ok: true, delivered: false });
  }

  const rows: Array<[string, string]> = [
    ["Name", values.name],
    ["Company", values.company],
    ["Email", values.email],
    ["Phone", values.phone || "—"],
    ["Preferred contact", values.preferredContact],
    ["Project location", values.location],
    ["Project type", values.projectType],
    ["Bid due date", values.bidDueDate || "—"],
    ["Plans link", values.plansLink || "—"],
    ["Files noted (not uploaded)", attachmentNames.join(", ") || "—"],
  ];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Project details:", values.details].join("\n");
  const html = `
    <h2 style="font-family:Arial,sans-serif">New plan review request</h2>
    <table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#5a5751;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`).join("")}
    </table>
    <h3 style="font-family:Arial,sans-serif">Project details</h3>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${esc(values.details)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: BID_FROM_EMAIL,
      to: BID_INBOX_EMAIL.split(",").map((s) => s.trim()),
      reply_to: values.email,
      subject: `Plan review request — ${values.projectType} — ${values.company}`.slice(0, 180),
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Bid request email failed", res.status, await res.text().catch(() => ""));
    return Response.json({ ok: false, message: "Delivery failed." }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
