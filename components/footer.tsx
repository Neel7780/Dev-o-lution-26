"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Twitter, Linkedin, Instagram, Mail, Phone, Github } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { icon: Twitter, label: "Twitter/X", href: "x.com/gdgdaiict.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/gdg-on-campus-daiict/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/gdg.daiict/" },
  { icon: Github, label: "GitHub", href: "https://github.com/ossdaiict" }
]

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const contactCardRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      // Smooth content reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
        defaults: { ease: "power2.out" }
      })

      // Title and tagline fade in smoothly
      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )

      // Social icons - smooth stagger
      if (socialRef.current) {
        const socialIcons = socialRef.current.children
        tl.fromTo(
          socialIcons,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1,
          },
          "-=0.4"
        )
      }

      // Contact card - slides in from right with subtle rotation
      tl.fromTo(
        contactCardRef.current,
        { x: 40, opacity: 0, rotate: 5 },
        { x: 0, opacity: 1, rotate: 2, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )

      // Bottom bar fade in
      tl.fromTo(
        bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.3"
      )

    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer 
      ref={footerRef}
      id="contact" 
      className="bg-black text-white border-t-4 border-black pt-16 pb-8 px-4"
      data-cursor-light
    >
      <div ref={contentRef} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Column */}
          <div>
            <div ref={titleRef} className="mb-6">
              <h3 className="font-(--font-display) text-3xl md:text-4xl uppercase mb-4">
                <span className="text-yellow-400">DEVOLUTION</span> 2026
              </h3>
              <p className="text-white/80 text-lg">by DSC DAU (formerly GDG on Campus DAU)</p>
            </div>

            <a
              href="https://devolution25.dscdaiict.in"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 mb-8 text-sm uppercase tracking-wide hover:text-yellow-400 transition-colors"
            >
              Devolution 2025 (Previous Year)
            </a>

            {/* Social Links */}
            <div ref={socialRef} className="flex gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black border-[3px] border-white p-3 brutal-shadow hover:bg-yellow-400 hover:-translate-y-1 transition-all duration-300"
                  aria-label={social.label}
                  data-magnetic="0.3"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Card */}
          <div
            ref={contactCardRef}
            className="relative bg-yellow-400 text-black border-[3px] border-black p-6 brutal-shadow-lg max-w-sm ml-auto"
          >
            <h4 className="font-(--font-display) text-xl uppercase mb-4 border-b-2 border-black pb-2">
              📌 Contact Us
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span className="font-medium">dsc@dau.ac.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span className="font-medium">+91 8238722211</span>
              </div>
            </div>

            {/* Pin decoration */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-2 border-red-700 shadow-lg" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={bottomRef} className="border-t-2 border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm uppercase tracking-wide">© 2026 DSC DAU. All rights reserved.</p>
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 border border-zinc-700/50 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm text-zinc-300 font-medium">All systems online</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
