"use client"

import React, { useState } from "react"

export default function PartnerWithUs() {
  const [form, setForm] = useState({
    organization: "",
    contactPerson: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus("success")
        setForm({ organization: "", contactPerson: "", email: "", phone: "", message: "" })
      } else {
        const json = await res.json().catch(() => ({}))
        setStatus(json?.error || "error")
      }
    } catch (err) {
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-cyan-300 border-4 border-black p-6 brutal-shadow">
          <div className="absolute -top-6 left-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-400 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-yellow-300 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-cyan-200 border-2 border-black" />
          </div>

          <h2 className="font-(--font-display) text-3xl mb-6" style={{ WebkitTextStroke: "2px black" }}>
            Partner with Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name of your Organization *" value={form.organization} onChange={(v) => update("organization", v)} />
            <Input label="Contact Person *" value={form.contactPerson} onChange={(v) => update("contactPerson", v)} />
            <Input label="Organization Email *" value={form.email} onChange={(v) => update("email", v)} type="email" />
            <Input label="Contact Number *" value={form.phone} onChange={(v) => update("phone", v)} />

            <div>
              <label className="block text-sm mb-2 font-semibold">Message or Proposal Details *</label>
              <textarea
                className="w-full min-h-[120px] p-3 bg-rose-50 border-2 border-black rounded-sm font-mono"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-rose-400 text-black border-2 border-black py-3 font-mono rounded-sm brutal-shadow hover:brightness-95 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Sending…" : "Submit Sponsor Proposal"}
              </button>
            </div>

            {status === "success" && <p className="text-green-800">Thanks — submission received.</p>}
            {status && status !== "success" && status !== "error" && <p className="text-red-800">{status}</p>}
            {status === "error" && <p className="text-red-800">Something went wrong. Try again later.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="block text-sm mb-2 font-semibold">{label}</label>
      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="w-full p-3 bg-rose-50 border-2 border-black rounded-sm font-mono"
      />
    </div>
  )
}
