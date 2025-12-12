"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Sparkles, Zap, Star, Cloud, Code, Rocket } from "lucide-react"
import { GDGLogo } from "./gdg-logo"
import { getDeviceCapabilities } from "@/lib/mobile-optimization"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const dateCardsRef = useRef<HTMLDivElement>(null)
  const countdownRef = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const devoCharsRef = useRef<(HTMLSpanElement | null)[]>([])
  const lutionCharsRef = useRef<(HTMLSpanElement | null)[]>([])
  const yearRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const { isLowEndDevice, prefersReducedMotion } = getDeviceCapabilities()

    const mm = gsap.matchMedia()

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean }

      // Master timeline for orchestrated entrance
      const masterTL = gsap.timeline({
        defaults: { ease: "power3.out" }
      })

      // Badge entrance - slides down with glitch effect
      masterTL.fromTo(
        badgeRef.current,
        { y: -50, opacity: 0, rotate: -10, scale: 0.8 },
        { y: 0, opacity: 1, rotate: 2, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      )

      // Add glitch flicker to badge
      masterTL.to(badgeRef.current, {
        x: 3,
        duration: 0.05,
        repeat: 3,
        yoyo: true,
      }, "-=0.3")

      // Logo container morphs in with elastic effect
      masterTL.fromTo(
        logoContainerRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.4"
      )

      // Title entrance - 3D character flip animation (simplified on mobile)
      const devoChars = devoCharsRef.current.filter(Boolean)
      const lutionChars = lutionCharsRef.current.filter(Boolean)

      if (devoChars.length && lutionChars.length && yearRef.current) {
        // DEVO - characters flip in from bottom (no 3D on mobile)
        const fromState = isLowEndDevice || isMobile
          ? { y: 60, opacity: 0, scale: 0.8 }
          : { y: 120, opacity: 0, rotateX: -90, scale: 0.5, transformOrigin: "bottom center" }

        const toState = isLowEndDevice || isMobile
          ? { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" }
          : { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.8, stagger: 0.08, ease: "back.out(1.7)" }

        masterTL.fromTo(
          devoChars,
          fromState,
          toState,
          "-=0.3"
        )

        // LUTION - characters flip in with slight delay (simplified on mobile)
        const lutionFrom = isLowEndDevice || isMobile
          ? { y: 60, opacity: 0, scale: 0.8 }
          : { y: 120, opacity: 0, rotateX: -90, scale: 0.5, transformOrigin: "bottom center" }

        const lutionTo = isLowEndDevice || isMobile
          ? { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.04, ease: "power2.out" }
          : { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.8, stagger: 0.06, ease: "back.out(1.7)" }

        masterTL.fromTo(
          lutionChars,
          lutionFrom,
          lutionTo,
          "-=0.6"
        )

        // Add a subtle bounce wave after reveal (skip on low-end)
        if (!isLowEndDevice && !prefersReducedMotion) {
          masterTL.to([...devoChars, ...lutionChars], {
            y: -8,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.out",
          }, "-=0.2")

          masterTL.to([...devoChars, ...lutionChars], {
            y: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: "bounce.out",
          })
        }

        // Year with elastic pop
        masterTL.fromTo(
          yearRef.current,
          { scale: 0, opacity: 0, y: 40, rotateX: -45 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.8"
        )
      }

      // Subtitle card - 3D flip in
      masterTL.fromTo(
        subtitleRef.current,
        {
          rotateX: -90,
          opacity: 0,
          y: -20,
          transformOrigin: "top center"
        },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          rotate: 1,
          duration: 0.8,
          ease: "back.out(1.4)"
        },
        "-=0.4"
      )

      // Date cards - stagger in with bounce and rotation
      if (dateCardsRef.current) {
        const cards = dateCardsRef.current.children
        masterTL.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            scale: 0.5,
            rotateZ: (i) => (i === 0 ? -15 : 15),
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateZ: (i) => (i === 0 ? -3 : 2),
            duration: 0.7,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)"
          },
          "-=0.3"
        )
      }

      // Countdown entrance
      masterTL.fromTo(
        countdownRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.6)" },
        "-=0.2"
      )

      // Floating stickers entrance with physics-like bounce (simplified on mobile)
      const stickers = sectionRef.current?.querySelectorAll(".floating-sticker")
      if (stickers && stickers.length > 0 && !isLowEndDevice) {
        stickers.forEach((sticker, index) => {
          masterTL.fromTo(
            sticker,
            {
              scale: 0,
              opacity: 0,
              rotation: isMobile ? 0 : -30 + Math.random() * 60,
              y: isMobile ? -50 : -100,
            },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              y: 0,
              duration: isMobile ? 0.5 : 0.8,
              ease: isMobile ? "power2.out" : "bounce.out",
            },
            `-=${0.6 - index * 0.1}`
          )

          // Continuous floating animation (skip on mobile)
          if (!isMobile && !prefersReducedMotion) {
            gsap.to(sticker, {
              y: "random(-15, 15)",
              x: "random(-10, 10)",
              rotation: "random(-8, 8)",
              duration: "random(2, 4)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.3,
            })
          }
        })
      }

      // Parallax on scroll - dramatic title movement
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          y: isMobile ? 80 : 150,
          scale: 0.95,
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      }

      // Decorative shapes parallax - only on desktop
      if (!isMobile) {
        const shapes = sectionRef.current?.querySelectorAll(".parallax-shape")
        shapes?.forEach((shape, index) => {
          const speed = 0.15 + (index * 0.1)
          const direction = index % 2 === 0 ? 1 : -1

          gsap.to(shape, {
            y: 120 * speed * direction,
            x: 30 * speed * -direction,
            rotation: 15 * direction,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          })
        })
      }

      // Background gradient shift on scroll
      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-24 md:pt-32 pb-16 px-4 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Animated background gradient layers
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-yellow-400/5 to-cyan-400/10" /> */}
        {/* Moving gradient orbs */}
        {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-400/5 rounded-full blur-3xl" />
      </div> */}

      {/* Floating geometric shapes - parallax layers */}
      {/* <div className="parallax-shape absolute top-20 left-[5%] hidden md:block">
        <FloatingSticker className="rotate-12" color="bg-cyan-400">
          <Sparkles className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div> */}

      {/* <div className="parallax-shape absolute top-32 right-[8%] hidden md:block">
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

      <div className="parallax-shape absolute bottom-60 right-[12%] hidden lg:block">
        <FloatingSticker className="rotate-3" color="bg-violet-400">
          <Code className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>

      <div className="parallax-shape absolute top-72 right-[20%] hidden lg:block">
        <FloatingSticker className="-rotate-8" color="bg-orange-400">
          <Rocket className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div> */}

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
          <div className="bg-violet-500 text-white border-[3px] border-black px-5 py-2 brutal-shadow rotate-2 relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform" data-magnetic="0.2">
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <span className="font-bold uppercase tracking-wider text-sm">✦ Organized by DSC DAU (formerly GDG on Campus DAU) ✦</span>
          </div>
        </div>

        {/* Main Title with Dev-o-lution Header Image */}
        <div
          ref={titleRef}
          className="mb-6 flex flex-col items-center"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* DEVOLUTION Header SVG */}
          <div className="relative w-full max-w-4xl mb-4">
            <Image
              src="/Dev-o-lution header.svg"
              alt="DEVOLUTION 2026"
              width={1200}
              height={300}
              className="w-full h-auto drop-shadow-[5px_5px_0px_#000]"
              priority
            />
          </div>
          <span
            ref={yearRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white inline-block relative font-(--font-display) uppercase"
            style={{ 
              transformStyle: "preserve-3d",
              WebkitTextStroke: "2px black",
              textShadow: "5px 5px 0px #000",
            }}
          >
            2026
            {/* Year underline animation - gradient with all GDG colors */}
            <span
              className="absolute -bottom-2 left-0 w-0 h-1 animate-[expand_0.5s_ease-out_2s_forwards]"
              style={{ background: "linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853)" }}
            />
          </span>
        </div>

        {/* Subtitle Card */}
        <div ref={subtitleRef} className="relative inline-block mb-10" style={{ transformStyle: "preserve-3d" }}>
          {/* Tape decorations with hover effect */}
          <div className="absolute -top-3 left-6 md:left-8 w-12 md:w-16 h-5 md:h-6 bg-yellow-400/80 rotate-[-5deg] border border-black/20 hover:rotate-[-8deg] transition-transform" />
          <div className="absolute -top-3 right-6 md:right-8 w-12 md:w-16 h-5 md:h-6 bg-yellow-400/80 rotate-[5deg] border border-black/20 hover:rotate-[8deg] transition-transform" />

          <div className="bg-white border-[3px] border-black px-6 md:px-8 py-3 md:py-4 brutal-shadow rotate-1 hover:rotate-0 transition-transform duration-300">
            <p className="font-bold text-base md:text-lg lg:text-xl uppercase tracking-wide text-black">
              Where Coding Meets Chaos & Creativity
            </p>
          </div>
        </div>

        {/* Date & Location Cards */}
        <div ref={dateCardsRef} className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6">
          <StampSticker rotation="-rotate-3" color="bg-orange-400">
            <span className="font-bold text-xs md:text-sm uppercase text-black">Date:</span>
            <span className="font-(--font-display) text-xl md:text-2xl lg:text-3xl text-black">18th Jan 2026</span>
          </StampSticker>

          <StampSticker rotation="rotate-2" color="bg-cyan-400">
            <span className="font-bold text-xs md:text-sm uppercase text-black">Location:</span>
            <span className="font-(--font-display) text-xl md:text-2xl lg:text-3xl text-black">DAU Campus</span>
          </StampSticker>
        </div>

        {/* Countdown Timer */}
        <div ref={countdownRef} className="mt-10 md:mt-12">
          <Countdown targetDate="2026-01-18T00:00:00" />
        </div>


      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-16 md:bottom-20 left-0 w-full h-0.5 border-b-2 border-dashed border-black/20" />

      {/* Custom keyframes */}
      <style jsx>{`
        @keyframes expand {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
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
      className={`floating-sticker ${className} ${color} border-[3px] border-black p-3 brutal-shadow cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-[8px_8px_0px_0px_#000]`}
      data-magnetic="0.4"
    >
      {children}
    </div>
  )
}

function StampSticker({ children, rotation, color }: { children: React.ReactNode; rotation: string; color: string }) {
  return (
    <div
      className={`${color} ${rotation} border-[3px] border-black px-5 md:px-6 py-3 md:py-4 brutal-shadow flex flex-col items-center transition-all duration-300 hover:scale-110 hover:rotate-0 hover:shadow-[8px_8px_0px_0px_#000] cursor-pointer`}
      data-magnetic="0.2"
    >
      {children}
    </div>
  )
}

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-6">
      {timeUnits.map((unit, i) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="bg-black text-white border-2 border-black w-16 h-16 md:w-20 md:h-20 flex items-center justify-center brutal-shadow relative overflow-hidden group">
            <span className="font-(--font-display) text-2xl md:text-3xl relative z-10">
              {unit.value.toString().padStart(2, "0")}
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </div>
          <span className="font-bold text-xs md:text-sm uppercase mt-2 bg-yellow-400 px-2 border border-black shadow-[2px_2px_0px_0px_#000]">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
