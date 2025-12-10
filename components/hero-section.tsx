"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Sparkles, Zap, Star, Cloud } from "lucide-react"
import { GDGLogo } from "./gdg-logo"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const dateCardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const isMobile = window.innerWidth < 768
    
    const ctx = gsap.context(() => {
      // Master timeline for orchestrated entrance
      const masterTL = gsap.timeline({
        defaults: { ease: "power3.out" }
      })

      // Badge entrance - slides down with slight rotation
      masterTL.fromTo(
        badgeRef.current,
        { y: -30, opacity: 0, rotate: -5 },
        { y: 0, opacity: 1, rotate: 2, duration: 0.7 }
      )

      // Logo container fade in
      masterTL.fromTo(
        logoContainerRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.3"
      )

      // Title entrance - smooth scale and fade
      masterTL.fromTo(
        titleRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )

      // Subtitle card - slides up with subtle bounce
      masterTL.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0, rotate: 3 },
        { y: 0, opacity: 1, rotate: 1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.3"
      )

      // Date cards - stagger in from sides
      if (dateCardsRef.current) {
        const cards = dateCardsRef.current.children
        masterTL.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 0.5, 
            stagger: 0.15,
            ease: "back.out(1.3)"
          },
          "-=0.2"
        )
      }

      // CTA button - bounces in
      masterTL.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
        "-=0.2"
      )

      // Floating stickers entrance
      const stickers = sectionRef.current?.querySelectorAll(".floating-sticker")
      if (stickers && stickers.length > 0) {
        masterTL.fromTo(
          stickers,
          { scale: 0, opacity: 0, rotation: -20 },
          { 
            scale: 1, 
            opacity: 1, 
            rotation: 0, 
            duration: 0.5, 
            stagger: { each: 0.1, from: "random" },
            ease: "back.out(2)"
          },
          "-=0.4"
        )
      }

      // Parallax on scroll - only title moves for depth
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: isMobile ? 50 : 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        })
      }

      // Decorative shapes parallax - only on desktop
      if (!isMobile) {
        const shapes = sectionRef.current?.querySelectorAll(".parallax-shape")
        shapes?.forEach((shape, index) => {
          const speed = 0.1 + (index * 0.08)
          const direction = index % 2 === 0 ? 1 : -1
          
          gsap.to(shape, {
            y: 80 * speed * direction,
            x: 15 * speed * -direction,
            rotation: 8 * direction,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 2,
            },
          })
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen pt-24 md:pt-32 pb-16 px-4 overflow-hidden"
    >
      {/* Background gradient layers for depth */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-cyan-400/10" />
      </div>

      {/* Floating geometric shapes - parallax layers */}
      <div className="parallax-shape absolute top-20 left-[5%] hidden md:block">
        <FloatingSticker className="rotate-12" color="bg-cyan-400">
          <Sparkles className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>
      
      <div className="parallax-shape absolute top-32 right-[8%] hidden md:block">
        <FloatingSticker className="-rotate-6" color="bg-yellow-400">
          <Zap className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>
      
      <div className="parallax-shape absolute bottom-40 left-[10%] hidden md:block">
        <FloatingSticker className="rotate-6" color="bg-lime-400">
          <Star className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>
      
      <div className="parallax-shape absolute top-48 left-[15%] hidden lg:block">
        <FloatingSticker className="-rotate-12" color="bg-pink-400">
          <Cloud className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>

      {/* Grid pattern overlay for texture */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Organizer Badge */}
        <div ref={badgeRef} className="inline-block mb-6">
          <div className="bg-violet-500 text-white border-[3px] border-black px-5 py-2 brutal-shadow rotate-2">
            <span className="font-bold uppercase tracking-wider text-sm">✦ Organized by GDG DAU ✦</span>
          </div>
        </div>

        {/* Animated Logo */}
        <div ref={logoContainerRef} className="flex justify-center mb-6">
          <GDGLogo size={140} animate={true} delay={0.3} className="drop-shadow-lg" />
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-(--font-display) text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase leading-none mb-6 tracking-tighter"
          style={{
            WebkitTextStroke: "2px black",
            textShadow: "5px 5px 0px #000",
          }}
        >
          <span className="text-yellow-400">DEVO</span>
          <span className="text-cyan-400">LUTION</span>
          <br />
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">2026</span>
        </h1>

        {/* Subtitle Card */}
        <div ref={subtitleRef} className="relative inline-block mb-10">
          {/* Tape decorations */}
          <div className="absolute -top-3 left-6 md:left-8 w-12 md:w-16 h-5 md:h-6 bg-yellow-400/80 rotate-[-5deg] border border-black/20" />
          <div className="absolute -top-3 right-6 md:right-8 w-12 md:w-16 h-5 md:h-6 bg-yellow-400/80 rotate-[5deg] border border-black/20" />

          <div className="bg-white border-[3px] border-black px-6 md:px-8 py-3 md:py-4 brutal-shadow rotate-1">
            <p className="font-bold text-base md:text-lg lg:text-xl uppercase tracking-wide text-black">
              Where Coding Meets Chaos & Creativity
            </p>
          </div>
        </div>

        {/* Date & Location Cards */}
        <div ref={dateCardsRef} className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6">
          <StampSticker rotation="-rotate-3" color="bg-orange-400">
            <span className="font-bold text-xs md:text-sm uppercase text-black">Date:</span>
            <span className="font-(--font-display) text-xl md:text-2xl lg:text-3xl text-black">TBA 2026</span>
          </StampSticker>

          <StampSticker rotation="rotate-2" color="bg-cyan-400">
            <span className="font-bold text-xs md:text-sm uppercase text-black">Location:</span>
            <span className="font-(--font-display) text-xl md:text-2xl lg:text-3xl text-black">DAU Campus</span>
          </StampSticker>
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-10 md:mt-12">
          <a
            href="#waitlist"
            className="inline-block bg-black text-white border-[3px] border-black px-8 md:px-10 py-3 md:py-4 font-bold text-lg md:text-xl uppercase tracking-wide brutal-shadow-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]"
          >
            Get Notified →
          </a>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-16 md:bottom-20 left-0 w-full h-0.5 border-b-2 border-dashed border-black/20" />
    </section>
  )
}

function FloatingSticker({
  children,
  className,
  color,
}: { children: React.ReactNode; className?: string; color: string }) {
  return (
    <div
      className={`floating-sticker ${className} ${color} border-[3px] border-black p-3 brutal-shadow cursor-pointer transition-transform duration-300 hover:scale-110 hover:rotate-6`}
    >
      {children}
    </div>
  )
}

function StampSticker({ children, rotation, color }: { children: React.ReactNode; rotation: string; color: string }) {
  return (
    <div
      className={`${color} ${rotation} border-[3px] border-black px-5 md:px-6 py-3 md:py-4 brutal-shadow flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:rotate-0`}
    >
      {children}
    </div>
  )
}
