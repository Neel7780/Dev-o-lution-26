"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ScrollVelocityTextProps {
  children: string
  className?: string
  baseVelocity?: number
  direction?: "left" | "right"
}

export function ScrollVelocityText({
  children,
  className = "",
  baseVelocity = 50,
  direction = "left",
}: ScrollVelocityTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const velocityRef = useRef(0)
  const scrollVelocityRef = useRef(0)
  const xRef = useRef(0)
  const directionFactor = useRef(direction === "left" ? -1 : 1)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    const textWidth = textRef.current.offsetWidth / 4 // Divide by number of repetitions
    let animationFrameId: number

    // Track scroll velocity
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollVelocityRef.current = self.getVelocity() / 1000
      },
    })

    const animate = () => {
      // Calculate velocity with scroll influence
      const targetVelocity = baseVelocity + Math.abs(scrollVelocityRef.current) * 5
      velocityRef.current += (targetVelocity - velocityRef.current) * 0.1

      // Update direction based on scroll
      if (scrollVelocityRef.current < -1) {
        directionFactor.current = direction === "left" ? -1 : 1
      } else if (scrollVelocityRef.current > 1) {
        directionFactor.current = direction === "left" ? 1 : -1
      }

      // Update position
      xRef.current += velocityRef.current * directionFactor.current * 0.016 // 60fps

      // Loop the text
      if (xRef.current <= -textWidth) {
        xRef.current = 0
      } else if (xRef.current >= 0) {
        xRef.current = -textWidth
      }

      gsap.set(textRef.current, {
        x: xRef.current,
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [baseVelocity, direction])

  // Create 4 repetitions for seamless loop
  const repeatedText = Array(4).fill(children).join(" • ")

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        ref={textRef}
        className="inline-block"
        style={{ willChange: "transform" }}
      >
        {repeatedText}
      </div>
    </div>
  )
}

// Skew on scroll - elements that skew based on scroll velocity
interface SkewOnScrollProps {
  children: React.ReactNode
  className?: string
  maxSkew?: number
}

export function SkewOnScroll({ children, className = "", maxSkew = 10 }: SkewOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const velocity = self.getVelocity()
        const skew = gsap.utils.clamp(-maxSkew, maxSkew, velocity / 300)
        
        gsap.to(elementRef.current, {
          skewY: skew,
          duration: 0.5,
          ease: "power2.out",
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [maxSkew])

  return (
    <div ref={elementRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}

// Velocity-based section reveal
export function VelocityScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Create velocity-based animations for each line
      [line1Ref, line2Ref, line3Ref].forEach((ref, index) => {
        if (!ref.current) return

        const direction = index % 2 === 0 ? 1 : -1
        const speed = 50 + index * 20

        // Base animation
        gsap.set(ref.current, { x: direction * -100 })

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = self.getVelocity()
            const progress = self.progress
            
            // Calculate x position based on scroll progress and velocity
            const baseX = (progress - 0.5) * speed * direction
            const velocityInfluence = velocity / 500 * direction
            
            gsap.to(ref.current, {
              x: baseX + velocityInfluence,
              duration: 0.5,
              ease: "power2.out",
            })
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-black overflow-hidden relative"
      data-cursor-light
    >
      {/* Animated text lines */}
      <div className="space-y-4 md:space-y-8">
        <div
          ref={line1Ref}
          className="font-(--font-display) text-6xl md:text-8xl lg:text-9xl font-black text-transparent uppercase whitespace-nowrap"
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.1)",
          }}
        >
          DEVOLUTION • DEVOLUTION • DEVOLUTION • DEVOLUTION •
        </div>
        
        <div
          ref={line2Ref}
          className="font-(--font-display) text-6xl md:text-8xl lg:text-9xl font-black text-white/5 uppercase whitespace-nowrap"
        >
          GDG DAU • GDG DAU • GDG DAU • GDG DAU • GDG DAU •
        </div>
        
        <div
          ref={line3Ref}
          className="font-(--font-display) text-6xl md:text-8xl lg:text-9xl font-black text-transparent uppercase whitespace-nowrap"
          style={{
            WebkitTextStroke: "2px rgba(250,204,21,0.2)",
          }}
        >
          2026 • CODE • CREATE • INNOVATE • 2026 • CODE •
        </div>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center pointer-events-auto">
          <h2 className="font-(--font-display) text-4xl md:text-6xl font-black text-white uppercase mb-4">
            Be Part of
            <br />
            <span className="text-yellow-400">Something Big</span>
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Join the most exciting tech event of 2026
          </p>
        </div>
      </div>
    </section>
  )
}

