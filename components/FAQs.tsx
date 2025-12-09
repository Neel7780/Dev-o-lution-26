
"use client"

import React from "react"

const faqs = [
	{
		q: "Who can participate?",
		a: "Dev-o-lution is open to all students and recent graduates passionate about technology and innovation.",
	},
	{
		q: "Is there a participation fee?",
		a: "Yes, There is! Please checkout the tickets on Unstop.",
	},
	{
		q: "What should I bring?",
		a: "Bring your laptop, charger, and any other devices you need for development. We'll provide a great coding atmosphere!",
	},
	{
		q: "Can I join as a speaker?",
		a: "We welcome speakers to share their knowledge. Check our timeline for speaker registration dates.",
	},
]

export function FAQs() {
	return (
		<section className="px-4 py-12">
			<div className="max-w-6xl mx-auto">
				<div className="relative bg-rose-400 border-4 border-black p-8 brutal-shadow">
					{/* window controls */}
					<div className="absolute -top-6 left-6 flex items-center gap-2">
						<span className="w-3 h-3 rounded-full bg-pink-400 border-2 border-black" />
						<span className="w-3 h-3 rounded-full bg-yellow-300 border-2 border-black" />
						<span className="w-3 h-3 rounded-full bg-cyan-300 border-2 border-black" />
					</div>

					<h2 className="font-(--font-display) text-4xl md:text-5xl uppercase mb-6" style={{ WebkitTextStroke: "2px black" }}>
						Frequently Asked Questions
					</h2>

					<div className="grid gap-6">
						{faqs.map((item, idx) => (
							<article key={idx} className="bg-cyan-300 border-2 border-black p-6 brutal-shadow-sm">
								<h3 className="font-semibold text-lg mb-2 tracking-wide">{item.q}</h3>
								<p className="text-sm leading-relaxed font-mono text-black/90">{item.a}</p>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default FAQs
