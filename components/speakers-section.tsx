"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HelpCircle, Lock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const speakers = [1, 2, 3, 4]

export function SpeakersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading animation - simple fade up
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Top secret badge - pops in with bounce
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, opacity: 0, rotate: -20 },
        {
          scale: 1,
          opacity: 1,
          rotate: -12,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      )

      // Speaker cards - staggered fade in
      if (cardsRef.current) {
        const cards = cardsRef.current.children
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
            },
          }
        )
      }

      // Bottom text fade in
      gsap.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 92%",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="speakers" className="py-16 md:py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl font-black uppercase inline-block">
            <span className="bg-orange-400 text-black px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block">
              The Lineup
            </span>
          </h2>
        </div>

        {/* Top Secret Badge */}
        <div
          ref={badgeRef}
          className="absolute top-24 md:top-32 right-4 md:right-20 z-20"
        >
          <div className="bg-red-600 text-white border-4 border-red-800 px-4 md:px-6 py-2 md:py-3 brutal-shadow -rotate-12">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-(--font-display) text-lg md:text-2xl font-black uppercase">Top Secret</span>
            </div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">TBA</span>
          </div>
        </div>

        {/* Speaker Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {speakers.map((_, index) => (
            <div
              key={index}
              className="bg-white border-[3px] border-black p-3 brutal-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000]"
              style={{ 
                transform: `rotate(${(index - 1.5) * 1.5}deg)`,
              }}
            >
              <div className="aspect-square bg-gradient-to-br from-black/5 to-black/10 border-2 border-black flex flex-col items-center justify-center mb-3">
                <HelpCircle className="w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 text-black/30 mb-2" />
                <span className="font-bold text-black/40 text-sm uppercase">???</span>
              </div>

              <div className="text-center py-2">
                <p className="font-(--font-display) text-sm md:text-base font-black uppercase text-black/60">
                  Speaker {index + 1}
                </p>
                <p className="text-xs md:text-sm font-bold uppercase text-violet-600">Coming Soon</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <p
          ref={textRef}
          className="text-center mt-10 md:mt-12 text-base md:text-lg lg:text-xl font-bold text-black/60"
        >
          🎤 Industry experts & community legends incoming... Stay tuned!
        </p>
      </div>
    </section>
  )
}
