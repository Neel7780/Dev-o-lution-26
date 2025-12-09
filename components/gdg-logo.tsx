"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

interface GDGLogoProps {
  className?: string
  size?: number
  animate?: boolean
  delay?: number
}

export function GDGLogo({ className = "", size = 120, animate = true, delay = 0 }: GDGLogoProps) {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animate || !logoRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay })

      // Set initial state
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
      })

      // Logo entrance animation
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      })

      // Subtle continuous floating animation
      tl.to(logoRef.current, {
        y: -5,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      }, "+=0.2")

    }, logoRef)

    return () => ctx.revert()
  }, [animate, delay])

  return (
    <div ref={logoRef} className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/gdg-logo.png"
        alt="GDG Logo"
        width={size}
        height={size}
        className="object-contain drop-shadow-lg"
        priority
      />
    </div>
  )
}

// Simplified version for smaller uses (navbar, footer)
export function GDGLogoSimple({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/gdg-logo.png"
        alt="GDG Logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  )
}
