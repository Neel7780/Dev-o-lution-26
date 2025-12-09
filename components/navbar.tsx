"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import { GDGLogoSimple } from "./gdg-logo"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Timeline", href: "#timeline" },
  { label: "Speakers", href: "#speakers" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Animate navbar entrance
    gsap.fromTo(
      ".navbar-container",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
    )

    // Track scroll for navbar style change
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl">
      <div
        className={`navbar-container bg-white border-[3px] border-black brutal-shadow px-4 py-3 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "shadow-[6px_6px_0px_0px_#000]" : ""
        }`}
      >
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-2 group">
          <GDGLogoSimple size={36} className="transition-transform duration-300 group-hover:scale-110" />
          <div className="bg-yellow-400 border-[3px] border-black px-3 py-1 brutal-shadow transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105">
            <span className="font-(--font-display) text-lg md:text-xl font-black tracking-tight text-black">
              GDG DAU
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 font-semibold text-sm uppercase tracking-wide text-black hover:bg-black hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="ml-2 bg-fuchsia-500 text-white border-[3px] border-black px-4 py-2 font-bold text-sm uppercase tracking-wide brutal-shadow hover:bg-fuchsia-600 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] transition-all duration-300"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden bg-black text-white p-2 border-[3px] border-black transition-transform duration-200 active:scale-95"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden mt-2 bg-white border-[3px] border-black brutal-shadow p-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 font-semibold uppercase tracking-wide text-black hover:bg-yellow-400 transition-colors border-b-2 border-black last:border-b-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setIsOpen(false)}
            className="block mt-4 bg-fuchsia-500 text-white text-center border-[3px] border-black px-4 py-3 font-bold uppercase tracking-wide brutal-shadow"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  )
}
