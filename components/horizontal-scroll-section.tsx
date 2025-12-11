"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Brain, Link, Cloud, Smartphone, Database, Shield } from "lucide-react"
import { getDeviceCapabilities, getRAFInterval } from "@/lib/mobile-optimization"

gsap.registerPlugin(ScrollTrigger)

const tracks = [
  {
    icon: Brain,
    title: "AI/ML & GenAI",
    description: "Explore the future of artificial intelligence and machine learning",
    color: "bg-cyan-400",
    textColor: "text-black",
    accent: "#22d3ee",
  },
  {
    icon: Link,
    title: "Web3 & Blockchain",
    description: "Build the decentralized web and explore blockchain technology",
    color: "bg-yellow-400",
    textColor: "text-black",
    accent: "#facc15",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Scale your infrastructure and automate deployments",
    color: "bg-violet-500",
    textColor: "text-white",
    accent: "#8b5cf6",
  },
  {
    icon: Smartphone,
    title: "Mobile & Web",
    description: "Create amazing cross-platform user experiences",
    color: "bg-lime-400",
    textColor: "text-black",
    accent: "#a3e635",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Power insights with data pipelines and analytics",
    color: "bg-orange-400",
    textColor: "text-black",
    accent: "#fb923c",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    description: "Protect and secure systems, networks and data",
    color: "bg-pink-400",
    textColor: "text-black",
    accent: "#f472b6",
  },
]

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const mobileCardsRef = useRef<HTMLDivElement[]>([])
  const headingRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mm = gsap.matchMedia()

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean }
      setIsMobile(isMobile)
    })

    return () => mm.revert()
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const { isLowEndDevice, prefersReducedMotion } = getDeviceCapabilities()

    const ctx = gsap.context(() => {
      if (isMobile) {
        // MOBILE: Vertical scroll with staggered card animations

        // Heading animation
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 85%",
              },
            }
          )
        }

        // Cards stagger in on mobile
        mobileCardsRef.current.forEach((card, index) => {
          if (!card) return

          gsap.fromTo(
            card,
            {
              y: 60,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
              },
            }
          )

          // Icon floating animation
          const icon = card.querySelector(".feature-icon")
          if (icon) {
            gsap.to(icon, {
              y: -8,
              duration: 2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.1,
            })
          }
        })

      } else {
        // DESKTOP: Horizontal scroll experience
        if (!trackRef.current) return

        const track = trackRef.current
        const scrollDistance = track.scrollWidth - window.innerWidth

        // Main horizontal scroll animation
        const horizontalScroll = gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleX: self.progress,
                })
              }
            },
          },
        })

        // Individual card animations during scroll
        cardsRef.current.forEach((card, index) => {
          if (!card) return

          gsap.to(card, {
            rotateY: 0,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalScroll,
              start: "left 80%",
              end: "left 20%",
              scrub: true,
              onUpdate: (self) => {
                const center = 0.5
                const diff = self.progress - center
                const rotation = diff * -20

                gsap.set(card, {
                  rotateY: rotation,
                  scale: 1 - Math.abs(diff) * 0.1,
                })
              },
            },
          })

          const icon = card.querySelector(".feature-icon")
          if (icon) {
            gsap.to(icon, {
              y: -10,
              rotation: 5,
              duration: 2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.2,
            })
          }
        })

        // Parallax background elements
        const bgElements = sectionRef.current?.querySelectorAll(".parallax-bg-element")
        bgElements?.forEach((el, index) => {
          gsap.to(el, {
            x: (index % 2 === 0 ? 1 : -1) * 200,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${scrollDistance}`,
              scrub: 2,
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  // Prevent hydration mismatch - always render desktop layout on server
  // Client will switch to mobile layout after mount if needed
  if (!mounted) {
    return null
  }

  // Mobile Layout - Vertical scrolling cards
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="tracks"
        className="relative bg-black py-16 px-4 overflow-hidden"
        data-cursor-light
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-48 h-48 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-10">
            <h2 className="font-(--font-display) text-4xl text-white uppercase mb-4">
              <span className="bg-linear-to-r from-yellow-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                Event
              </span>{" "}
              Tracks
            </h2>
            <p className="text-white/60 text-base">
              Choose your adventure and dive deep into cutting-edge tech
            </p>
          </div>

          {/* Cards Grid */}
          <div className="space-y-6">
            {tracks.map((track, index) => (
              <div
                key={track.title}
                ref={(el) => {
                  if (el) mobileCardsRef.current[index] = el
                }}
                className={`${track.color} ${track.textColor} border-3 border-black p-6 brutal-shadow relative overflow-hidden`}
                style={{
                  transform: `rotate(${(index % 2 === 0 ? -1 : 1)}deg)`,
                }}
              >
                {/* Card number */}
                <div className="absolute top-2 right-3 font-(--font-display) text-5xl text-current opacity-10">
                  0{index + 1}
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="feature-icon inline-block p-3 bg-white/20 border-2 border-black/20 mb-4">
                    <track.icon className="w-8 h-8" strokeWidth={2.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-(--font-display) text-2xl uppercase mb-2">
                    {track.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm opacity-70 font-medium">
                    {track.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <a
              href="#waitlist"
              className="inline-block bg-yellow-400 text-black border-3 border-black px-6 py-3 font-bold text-lg uppercase brutal-shadow hover:bg-white transition-colors duration-300"
            >
              Get Notified →
            </a>
          </div>
        </div>
      </section>
    )
  }

  // Desktop Layout - Horizontal scroll experience
  return (
    <section
      ref={sectionRef}
      id="tracks"
      className="relative bg-black overflow-hidden"
      data-cursor-light
      style={{ perspective: "1200px" }}
    >
      {/* Progress bar - desktop only */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/20 z-50 hidden md:block">
        <div
          ref={progressRef}
          className="h-full origin-left bg-linear-to-r from-yellow-400 via-fuchsia-500 to-cyan-400"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="parallax-bg-element absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="parallax-bg-element absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="parallax-bg-element absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative min-h-screen flex items-center">

        {/* Section header - fixed on left */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
          <div className="transform -rotate-90 origin-bottom-left whitespace-nowrap translate-y-1/2">
            <span className="font-(--font-display) text-6xl text-white/10 uppercase tracking-widest">
              Event Tracks
            </span>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex items-center gap-8 px-8 lg:px-32 py-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Intro card */}
          <div className="shrink-0 w-[60vw] lg:w-[40vw] flex items-center justify-center">
            <div className="text-center">
              <h2 className="font-(--font-display) text-5xl lg:text-7xl text-white uppercase mb-6">
                <span className="bg-linear-to-r from-yellow-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                  Event
                </span>
                <br />
                Tracks
              </h2>
              <p className="text-white/60 text-lg lg:text-xl max-w-md mx-auto">
                Choose your adventure and dive deep into cutting-edge tech
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-white/40">
                <span className="text-sm uppercase tracking-wider">Scroll</span>
                <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Track cards */}
          {tracks.map((track, index) => (
            <div
              key={track.title}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className={`shrink-0 w-[50vw] lg:w-[35vw] ${track.color} ${track.textColor} border-4 border-black p-8 lg:p-12 brutal-shadow-lg relative overflow-hidden group`}
              style={{
                transformStyle: "preserve-3d",
                transform: `rotate(${(index % 2 === 0 ? -2 : 2)}deg)`,
              }}
            >
              {/* Animated gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, white 0%, transparent 70%)`,
                }}
              />

              {/* Floating decorative circles */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-black/10 blur-xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />

              {/* Card number */}
              <div className="absolute top-4 right-4 font-(--font-display) text-6xl lg:text-8xl text-current opacity-10">
                0{index + 1}
              </div>

              <div className="relative z-10">
                {/* Icon */}
                <div className="feature-icon inline-block p-4 bg-white/20 border-3 border-black mb-6">
                  <track.icon className="w-12 h-12 lg:w-16 lg:h-16" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="font-(--font-display) text-3xl lg:text-5xl uppercase mb-4">
                  {track.title}
                </h3>

                {/* Description */}
                <p className="text-lg lg:text-xl opacity-70 font-medium max-w-sm">
                  {track.description}
                </p>

                {/* Arrow */}
                <div className="mt-8 flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-colors">
                  <span className="font-bold uppercase tracking-wider">Explore Track</span>
                  <svg
                    className="w-6 h-6 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-4 border-l-4 border-black/20" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-4 border-r-4 border-black/20" />
            </div>
          ))}

          {/* End card */}
          <div className="shrink-0 w-[50vw] lg:w-[35vw] flex items-center justify-center">
            <div className="text-center">
              <h3 className="font-(--font-display) text-4xl lg:text-5xl text-white uppercase mb-4">
                Ready to<br />
                <span className="text-yellow-400">Join?</span>
              </h3>
              <a
                href="#waitlist"
                className="inline-block bg-yellow-400 text-black border-4 border-black px-8 py-4 font-bold text-xl uppercase brutal-shadow-lg hover:bg-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#facc15] transition-all duration-300"
              >
                Get Notified →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

