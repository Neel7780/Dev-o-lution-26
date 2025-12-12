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
    "WORKSHOPS",
  ]

  // Duplicate items enough times to cover large screens
  // We create a "set" of items that is definitely wider than the screen
  const REPEAT_IN_SET = 5
  const singleSet = Array(REPEAT_IN_SET).fill(items).flat()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el1 = track1Ref.current
      const el2 = track2Ref.current

      if (!el1 || !el2) return

      // We have two identical sets in each track.
      // Total width = 2 * WidthOfSet
      // We want to move by WidthOfSet, which is 50% of the total width.
      
      // Calculate duration based on width to maintain consistent speed
      const totalWidth = el1.offsetWidth
      const distance = totalWidth / 2 // We move by half the width
      const speed = 100 // px per second
      const duration = distance / speed

      // Track 1: Moves Left (0 -> -50%)
      gsap.fromTo(el1, 
        { xPercent: 0 },
        { 
          xPercent: -50, 
          duration: duration, 
          ease: "none", 
          repeat: -1 
        }
      )

      // Track 2: Moves Right (-50% -> 0)
      gsap.fromTo(el2,
        { xPercent: -50 },
        { 
          xPercent: 0, 
          duration: duration, 
          ease: "none", 
          repeat: -1 
        }
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-[#FFD700] border-y-4 border-black py-8 overflow-hidden relative z-10">
      {/* Track 1 - moves left */}
      <div ref={track1Ref} className="flex whitespace-nowrap w-fit">
        {/* Render two sets of items */}
        {[...singleSet, ...singleSet].map((item, i) => (
          <span
            key={`t1-${i}`}
            className="font-[var(--font-display)] text-4xl md:text-6xl font-black uppercase mx-8 flex items-center gap-8 text-black"
          >
            <span className="text-black/30">///</span>
            <span>{item}</span>
          </span>
        ))}
      </div>

      {/* Track 2 - moves right */}
      <div ref={track2Ref} className="flex whitespace-nowrap w-fit mt-4">
        {/* Render two sets of items */}
        {[...singleSet, ...singleSet].map((item, i) => (
          <span
            key={`t2-${i}`}
            className="font-[var(--font-display)] text-4xl md:text-6xl font-black uppercase mx-8 flex items-center gap-8 text-black stroke-text"
            style={{
              WebkitTextStroke: "1px black",
              color: "transparent"
            }}
          >
            <span className="text-black/30">///</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
