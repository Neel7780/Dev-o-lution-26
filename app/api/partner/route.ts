import { Resend } from "resend"

type PartnerForm = {
  organization?: string
  contactPerson?: string
  email?: string
  phone?: string
  message?: string
}

export async function POST(req: Request) {
  try {
    const data: PartnerForm = await req.json()

    if (!data.organization || !data.contactPerson || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    const RESEND_KEY = process.env.RESEND_API_KEY
    const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@dau.ac.in"

    if (!RESEND_KEY) {
      return new Response(JSON.stringify({ error: "Resend API key missing (RESEND_API_KEY)" }), { status: 500 })
    }

    const resend = new Resend(RESEND_KEY)

    const html = `
      <h3>New Partner Proposal</h3>
      <p><strong>Organization:</strong> ${escapeHtml(data.organization || "")}</p>
      <p><strong>Contact Person:</strong> ${escapeHtml(data.contactPerson || "")}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email || "")}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone || "")}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(data.message || "").replace(/\n/g, "<br/>")}</p>
    `

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: "dsc@dau.ac.in",
      replyTo: data.email,
      subject: `Partner proposal — ${data.organization || "(unknown)"}`,
      html,
      text: `Partner proposal from ${data.organization || "(unknown)"}\n\n${data.message || ""}`,
    })

    if (error) {
      console.error("Resend error:", error)
      return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 502 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err: any) {
    console.error("Resend send error:", err)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}

function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
