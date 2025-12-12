"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function MarqueeStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)

  const items = [
    "WEB3",
    "AI & ML",
    "CLOUD NATIVE",
    "OPEN SOURCE",
    "DEVOLUTION 2026",
    "DSC DAU",
    "HACKATHON",
    "WORKSHOPS",
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Base marquee animation
      const marqueeAnimation1 = gsap.to(track1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      })

      const marqueeAnimation2 = gsap.to(track2Ref.current, {
        xPercent: 50,
        ease: "none",
        duration: 30,
        repeat: -1,
      })

      // Scroll-triggered speed boost
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity()) / 1000
          const speedMultiplier = 1 + Math.min(velocity, 3)
          
          marqueeAnimation1.timeScale(speedMultiplier)
          marqueeAnimation2.timeScale(speedMultiplier)
          
          // Reset speed smoothly
          gsap.to(marqueeAnimation1, {
            timeScale: 1,
            duration: 0.5,
            delay: 0.1,
            overwrite: true,
          })
          gsap.to(marqueeAnimation2, {
            timeScale: 1,
            duration: 0.5,
            delay: 0.1,
            overwrite: true,
          })
        },
      })

      // Scale effect on scroll
      gsap.fromTo(
        containerRef.current,
        {
          scaleX: 0.98,
        },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      )

      // Skew effect based on scroll direction
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const skew = self.direction * Math.min(Math.abs(self.getVelocity()) / 500, 3)
          gsap.to(containerRef.current, {
            skewX: skew,
            duration: 0.3,
            ease: "power2.out",
          })
        },
        onLeave: () => {
          gsap.to(containerRef.current, {
            skewX: 0,
            duration: 0.5,
          })
        },
        onLeaveBack: () => {
          gsap.to(containerRef.current, {
            skewX: 0,
            duration: 0.5,
          })
        },
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-yellow-400 border-y-4 border-black py-4 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-(--font-display) text-2xl md:text-3xl uppercase mx-6 flex items-center gap-4 text-black"
          >
            <span className="text-black/40">///</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
      
      {/* Second track - moves right (opposite direction) */}
      <div ref={track2Ref} className="flex whitespace-nowrap -translate-x-1/2">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={`track2-${i}`}
            className="font-[var(--font-display)] text-xl md:text-2xl font-black uppercase mx-6 flex items-center gap-4 text-black/60"
          >
            <span className="text-black/30">◆</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
