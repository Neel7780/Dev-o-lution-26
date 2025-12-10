"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Sparkles, Zap, Star, Heart, Flame, Music, 
  Rocket, Coffee, Code, Gamepad2, Pizza, PartyPopper 
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stickerIcons = [
  { Icon: Sparkles, color: "bg-yellow-400" },
  { Icon: Zap, color: "bg-cyan-400" },
  { Icon: Star, color: "bg-fuchsia-500" },
  { Icon: Heart, color: "bg-red-400" },
  { Icon: Flame, color: "bg-orange-400" },
  { Icon: Music, color: "bg-lime-400" },
  { Icon: Rocket, color: "bg-violet-500" },
  { Icon: Coffee, color: "bg-amber-400" },
  { Icon: Code, color: "bg-emerald-400" },
  { Icon: Gamepad2, color: "bg-pink-400" },
  { Icon: Pizza, color: "bg-yellow-500" },
  { Icon: PartyPopper, color: "bg-cyan-500" },
]

interface StickerExplosionProps {
  children: React.ReactNode
  className?: string
}

export function StickerExplosion({ children, className = "" }: StickerExplosionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickersRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Initial state - hidden
      gsap.set(stickersRef.current, {
        scale: 0,
        opacity: 0,
        rotation: () => Math.random() * 360,
      })

      // Explosion animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        onEnter: () => {
          // Stickers explode outward
          stickersRef.current.forEach((sticker, index) => {
            if (!sticker) return

            const angle = (index / stickersRef.current.length) * Math.PI * 2
            const distance = 150 + Math.random() * 100
            const targetX = Math.cos(angle) * distance
            const targetY = Math.sin(angle) * distance

            gsap.to(sticker, {
              x: targetX,
              y: targetY,
              scale: 1,
              opacity: 1,
              rotation: Math.random() * 40 - 20,
              duration: 0.8,
              delay: index * 0.05,
              ease: "back.out(2)",
            })

            // Continuous floating after explosion
            gsap.to(sticker, {
              y: `+=${Math.random() * 20 - 10}`,
              x: `+=${Math.random() * 10 - 5}`,
              rotation: `+=${Math.random() * 10 - 5}`,
              duration: 2 + Math.random() * 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 0.8 + index * 0.05,
            })
          })
        },
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Stickers container */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {stickerIcons.map(({ Icon, color }, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) stickersRef.current[index] = el
            }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${color} border-2 border-black p-2 brutal-shadow z-10`}
            style={{ willChange: "transform, opacity" }}
          >
            <Icon className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}

export function ConfettiBurst({ trigger }: { trigger?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const confettiRef = useRef<HTMLDivElement[]>([])
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const colors = ["#facc15", "#22d3ee", "#d946ef", "#a3e635", "#fb923c", "#8b5cf6"]
    const confettiCount = 30 // Reduced from 50 for performance

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: trigger || containerRef.current,
        start: "top 80%",
        onEnter: () => {
          // Create confetti particles
          for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement("div")
            confetti.className = "absolute w-2 h-2"
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)]
            confetti.style.left = "50%"
            confetti.style.top = "50%"
            confetti.style.willChange = "transform"
            containerRef.current?.appendChild(confetti)
            confettiRef.current.push(confetti)

            const angle = Math.random() * Math.PI * 2
            const velocity = 100 + Math.random() * 200
            const targetX = Math.cos(angle) * velocity
            const targetY = Math.sin(angle) * velocity - 100

            const tween = gsap.fromTo(
              confetti,
              {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                rotation: 0,
              },
              {
                x: targetX,
                y: targetY + 300, // Gravity
                rotation: Math.random() * 720 - 360,
                scale: 0,
                opacity: 0,
                duration: 1.5 + Math.random(),
                ease: "power2.out",
                onComplete: () => {
                  confetti.remove()
                  // Remove from array to free memory
                  const idx = confettiRef.current.indexOf(confetti)
                  if (idx > -1) {
                    confettiRef.current.splice(idx, 1)
                  }
                },
              }
            )
            tweensRef.current.push(tween)
          }
        },
        once: true, // Only trigger once
      })
    }, containerRef)

    return () => {
      ctx.revert()
      // Clean up tweens
      tweensRef.current.forEach(tween => tween.kill())
      tweensRef.current = []
      
      // Clean up confetti elements
      confettiRef.current.forEach(el => {
        try {
          el.remove()
        } catch (e) {
          // Already removed
        }
      })
      confettiRef.current = []
      
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
    }
  }, [trigger])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-visible" />
}

// Reveal on scroll with masking
interface RevealOnScrollProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}

export function RevealOnScroll({ 
  children, 
  className = "", 
  direction = "up",
  delay = 0,
}: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const directionMap = {
      up: { y: 100, x: 0 },
      down: { y: -100, x: 0 },
      left: { y: 0, x: 100 },
      right: { y: 0, x: -100 },
    }

    const { x, y } = directionMap[direction]

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        {
          y,
          x,
          opacity: 0,
        },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [direction, delay])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef} style={{ willChange: "transform, opacity" }}>
        {children}
      </div>
    </div>
  )
}

// Parallax image/card component
interface ParallaxCardProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function ParallaxCard({ children, className = "", speed = 0.5 }: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        y: 100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // 3D tilt on hover (desktop only)
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = cardRef.current!.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateX = (y - centerY) / 20
          const rotateY = (centerX - x) / 20

          gsap.to(cardRef.current, {
            rotateX: -rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        cardRef.current.addEventListener("mousemove", handleMouseMove)
        cardRef.current.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          cardRef.current?.removeEventListener("mousemove", handleMouseMove)
          cardRef.current?.removeEventListener("mouseleave", handleMouseLeave)
        }
      }
    }, cardRef)

    return () => ctx.revert()
  }, [speed])

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  )
}

