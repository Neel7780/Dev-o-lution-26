"use client"

import React, { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const sponsorSchema = z.object({
	organization_name: z.string().min(2, "Organization name is required"),
	contact_person: z.string().min(2, "Contact person is required"),
	organization_email: z.string().email("Invalid email address"),
	contact_number: z
		.string()
		.min(6, "Enter a valid phone number")
		.max(20, "Enter a valid phone number")
		.regex(/^[+0-9 ()-]+$/, "Invalid phone number"),
	message: z.string().min(10, "Please provide a message or proposal details"),
})

type SponsorFormValues = z.infer<typeof sponsorSchema>

export default function PartnerWithUs() {
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SponsorFormValues>({ resolver: zodResolver(sponsorSchema) })

	const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
	const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
	const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_USER_ID

	const onSubmit = async (values: SponsorFormValues) => {
		if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
			toast.error("Email sending is not configured. Contact the site admin.")
			return
		}

		setIsLoading(true)

		const templateParams = {
			organization_name: values.organization_name,
			contact_person: values.contact_person,
			organization_email: values.organization_email,
			contact_number: values.contact_number,
			message: values.message,
			club_email: process.env.NEXT_PUBLIC_FROM_EMAIL || "dsc@dau.ac.in",
		}

		try {
			await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
			toast.success("Proposal Sent! We'll contact you soon.")
			reset()
		} catch (err) {
			console.error("EmailJS send error:", err)
			toast.error("Failed to send proposal. Please try again later.")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<section className="px-4 py-12">
			<div className="max-w-6xl mx-auto">
				<div className="mx-auto max-w-xl">
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pl-6">
						<div>
							<label className="block text-xs font-semibold mb-2">Name of your Organization *</label>
							<Input
								{...register("organization_name")}
								placeholder="ACME Corp"
								aria-invalid={!!errors.organization_name}
								className="w-full bg-white border border-gray-200 text-sm px-4 py-3 rounded-sm shadow-sm placeholder:text-gray-400"
							/>
							{errors.organization_name && <p className="text-sm text-red-600 mt-1">{errors.organization_name.message}</p>}
						</div>

						<div>
							<label className="block text-xs font-semibold mb-2">Contact Person *</label>
							<Input
								{...register("contact_person")}
								placeholder="Jane Doe"
								aria-invalid={!!errors.contact_person}
								className="w-full bg-white border border-gray-200 text-sm px-4 py-3 rounded-sm shadow-sm placeholder:text-gray-400"
							/>
							{errors.contact_person && <p className="text-sm text-red-600 mt-1">{errors.contact_person.message}</p>}
						</div>

						<div>
							<label className="block text-xs font-semibold mb-2">Organization Email *</label>
							<Input
								{...register("organization_email")}
								type="email"
								placeholder="contact@organization.com"
								aria-invalid={!!errors.organization_email}
								className="w-full bg-white border border-gray-200 text-sm px-4 py-3 rounded-sm shadow-sm placeholder:text-gray-400"
							/>
							{errors.organization_email && <p className="text-sm text-red-600 mt-1">{errors.organization_email.message}</p>}
						</div>

						<div>
							<label className="block text-xs font-semibold mb-2">Contact Number *</label>
							<Input
								{...register("contact_number")}
								placeholder="+91 98765 43210"
								aria-invalid={!!errors.contact_number}
								className="w-full bg-white border border-gray-200 text-sm px-4 py-3 rounded-sm shadow-sm placeholder:text-gray-400"
							/>
							{errors.contact_number && <p className="text-sm text-red-600 mt-1">{errors.contact_number.message}</p>}
						</div>

						<div>
							<label className="block text-xs font-semibold mb-2">Message or Proposal Details *</label>
							<Textarea
								{...register("message")}
								rows={6}
								placeholder="Tell us about your sponsorship proposal, packages, expectations, etc."
								aria-invalid={!!errors.message}
								className="w-full bg-white border border-gray-200 text-sm px-4 py-3 rounded-sm shadow-sm placeholder:text-gray-400"
							/>
							{errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
						</div>

						<div className="pt-6">
							<Button type="submit" className="inline-block bg-black text-white px-5 py-2 border border-black text-sm ml-6" disabled={isLoading}>
								{isLoading ? "Sending..." : "Submit Sponsor Proposal"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}
