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

    // Basic validation
    if (!data.organization || !data.contactPerson || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 })
    }

    // Free path: forward submission to FormSubmit (https://formsubmit.co)
    const formUrl = `https://formsubmit.co/dsc@dau.ac.in`
    const params = new URLSearchParams()
    params.append("Organization", data.organization || "")
    params.append("Contact Person", data.contactPerson || "")
    params.append("Email", data.email || "")
    params.append("Phone", data.phone || "")
    params.append("Message", data.message || "")

    try {
      const resp = await fetch(formUrl, { method: "POST", body: params })
      if (!resp.ok) {
        return new Response(JSON.stringify({ error: "Failed to forward via FormSubmit" }), { status: 502 })
      }
    } catch (e) {
      console.error("FormSubmit forwarding error:", e)
      return new Response(JSON.stringify({ error: "Failed to forward via FormSubmit" }), { status: 502 })
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err: any) {
    console.error("Partner API error:", err)
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
