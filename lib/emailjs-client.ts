"use client"

import emailjs from "@emailjs/browser"

export type SponsorTemplateParams = {
  organization_name: string
  contact_person: string
  organization_email: string
  contact_number: string
  message: string
  club_email?: string
}

/**
 * Send sponsor proposal via EmailJS.
 * Reads required IDs from `process.env.NEXT_PUBLIC_EMAILJS_*` variables.
 */
export async function sendSponsorProposal(params: SponsorTemplateParams) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your env.")
  }

  // Add club email for convenience in the template
  const templateParams = {
    ...params,
    club_email: params.club_email ?? "dsc@dau.ac.in",
  }

  // EmailJS client-side send
  return emailjs.send(serviceId, templateId, templateParams, publicKey)
}
