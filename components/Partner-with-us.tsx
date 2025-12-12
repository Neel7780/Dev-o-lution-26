"use client"

import React, { useState, useEffect, useRef } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import emailjs from "@emailjs/browser"
import { toast } from "sonner"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Handshake, Sparkles } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

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
	const sectionRef = useRef<HTMLElement>(null)
	const cardRef = useRef<HTMLDivElement>(null)
	const headingRef = useRef<HTMLHeadingElement>(null)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SponsorFormValues>({ resolver: zodResolver(sponsorSchema) })

	const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
	const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
	const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_USER_ID

	useEffect(() => {
		if (!sectionRef.current) return

		const ctx = gsap.context(() => {
			// Card entrance animation
			gsap.fromTo(
				cardRef.current,
				{
					opacity: 0,
					y: 80,
					scale: 0.95,
				},
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
					},
				}
			)

			// Heading reveal
			if (headingRef.current) {
				gsap.fromTo(
					headingRef.current,
					{
						clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
						opacity: 0,
					},
					{
						clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
						opacity: 1,
						duration: 0.8,
						ease: "power3.inOut",
						scrollTrigger: {
							trigger: cardRef.current,
							start: "top 80%",
						},
					}
				)
			}
		}, sectionRef)

		return () => ctx.revert()
	}, [])

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
		<section ref={sectionRef} className="px-4 py-16 md:py-24" id="partner-with-us">
			<div className="max-w-6xl mx-auto">
				{/* Heading */}
				<div className="text-center mb-12 md:mb-16">
					<h2 
						ref={headingRef}
						className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl uppercase inline-block"
					>
						<span className="bg-orange-400 text-black px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block">
							Partner With Us
						</span>
					</h2>
				</div>

				{/* Intro text */}
				<div className="max-w-3xl mx-auto mb-8">
					<div className="bg-yellow-400 border-[3px] border-black p-5 md:p-6 brutal-shadow-lg">
						<p className="text-base md:text-lg font-bold text-black/90 text-center">
							Want to sponsor DEVOLUTION 2026? Fill out the form below and we'll get back to you with our sponsorship packages!
						</p>
					</div>
				</div>

				{/* Form */}
				<div 
					ref={cardRef}
					className="max-w-3xl mx-auto bg-lime-400 border-[3px] border-black p-6 md:p-8 brutal-shadow-lg"
				>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div>
							<label className="block text-sm font-black mb-2 uppercase tracking-wide">Name of your Organization *</label>
							<Input
								{...register("organization_name")}
								placeholder="ACME Corp"
								aria-invalid={!!errors.organization_name}
								className="w-full bg-white border-[3px] border-black text-base px-4 py-3 font-semibold placeholder:text-black/40 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow"
							/>
							{errors.organization_name && <p className="text-sm text-red-600 mt-2 font-bold">{errors.organization_name.message}</p>}
						</div>

						<div>
							<label className="block text-sm font-black mb-2 uppercase tracking-wide">Contact Person *</label>
							<Input
								{...register("contact_person")}
								placeholder="Jane Doe"
								aria-invalid={!!errors.contact_person}
								className="w-full bg-white border-[3px] border-black text-base px-4 py-3 font-semibold placeholder:text-black/40 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow"
							/>
							{errors.contact_person && <p className="text-sm text-red-600 mt-2 font-bold">{errors.contact_person.message}</p>}
						</div>

						<div>
							<label className="block text-sm font-black mb-2 uppercase tracking-wide">Organization Email *</label>
							<Input
								{...register("organization_email")}
								type="email"
								placeholder="contact@organization.com"
								aria-invalid={!!errors.organization_email}
								className="w-full bg-white border-[3px] border-black text-base px-4 py-3 font-semibold placeholder:text-black/40 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow"
							/>
							{errors.organization_email && <p className="text-sm text-red-600 mt-2 font-bold">{errors.organization_email.message}</p>}
						</div>

						<div>
							<label className="block text-sm font-black mb-2 uppercase tracking-wide">Contact Number *</label>
							<Input
								{...register("contact_number")}
								placeholder="+91 98765 43210"
								aria-invalid={!!errors.contact_number}
								className="w-full bg-white border-[3px] border-black text-base px-4 py-3 font-semibold placeholder:text-black/40 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow"
							/>
							{errors.contact_number && <p className="text-sm text-red-600 mt-2 font-bold">{errors.contact_number.message}</p>}
						</div>

						<div>
							<label className="block text-sm font-black mb-2 uppercase tracking-wide">Message or Proposal Details *</label>
							<Textarea
								{...register("message")}
								rows={6}
								placeholder="Tell us about your sponsorship proposal, packages, expectations, etc."
								aria-invalid={!!errors.message}
								className="w-full bg-white border-[3px] border-black text-base px-4 py-3 font-semibold placeholder:text-black/40 focus:shadow-[4px_4px_0px_0px_#000] transition-shadow resize-none"
							/>
							{errors.message && <p className="text-sm text-red-600 mt-2 font-bold">{errors.message.message}</p>}
						</div>

						<div className="pt-4">
							<Button 
								type="submit" 
								className="w-full bg-black text-white px-8 py-4 border-[3px] border-black text-base font-black uppercase tracking-wide brutal-shadow-lg hover:bg-pink-500 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
								disabled={isLoading}
							>
								{isLoading ? "Sending..." : "Submit Proposal →"}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}
