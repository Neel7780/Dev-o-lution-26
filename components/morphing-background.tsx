"use client"

import { useEffect, useRef, useMemo } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getDeviceCapabilities, shouldDisableAnimation } from "@/lib/mobile-optimization"

gsap.registerPlugin(ScrollTrigger)

// SVG blob paths for morphing (memoized)
const blobPaths = [
  "M45.3,-58.9C57.9,-47.7,67.2,-32.6,70.9,-15.9C74.6,0.8,72.7,19.1,64.3,33.5C55.9,47.9,41.1,58.4,24.5,65.2C7.9,72,-10.6,75.1,-27.8,70.5C-45,65.9,-60.9,53.6,-70.4,37.3C-79.9,21,-83,-0.4,-78.1,-19.4C-73.2,-38.4,-60.4,-55,-44.6,-65.5C-28.8,-76,-14.4,-80.4,1.3,-82C17,-83.6,32.7,-70.1,45.3,-58.9Z",
  "M43.2,-54.8C55.7,-44.3,65.2,-30.4,69.1,-14.7C73,1,71.4,18.5,63.8,32.7C56.2,46.9,42.7,57.8,27.4,64.1C12.1,70.4,-5,72.1,-21.4,68.4C-37.8,64.7,-53.5,55.6,-63.1,42.1C-72.7,28.6,-76.2,10.7,-73.1,-5.8C-70,-22.3,-60.3,-37.4,-47.3,-47.9C-34.3,-58.4,-17.2,-64.3,-0.4,-63.8C16.4,-63.3,30.7,-65.3,43.2,-54.8Z",
  "M42.7,-53.8C54.9,-43.5,64,-29.5,68.5,-13.3C73,2.9,72.9,21.3,65.4,35.9C57.9,50.5,43,61.3,26.5,67.3C10,73.3,-8.1,74.5,-24.2,69.2C-40.3,63.9,-54.4,52.1,-63.4,37C-72.4,21.9,-76.3,3.4,-72.4,-12.6C-68.5,-28.7,-56.8,-42.4,-43.1,-52.5C-29.4,-62.6,-14.7,-69.1,0.7,-70C16.1,-70.9,30.5,-64.1,42.7,-53.8Z",
  "M39.5,-49.4C51.7,-39.3,62.6,-27.3,67.3,-12.6C72,2.1,70.5,19.5,62.5,33.1C54.5,46.7,40,56.5,24.1,62.3C8.2,68.1,-9.1,69.9,-24.9,65.3C-40.7,60.7,-55,49.7,-63.8,35.2C-72.6,20.7,-75.9,2.8,-72.4,-13.4C-68.9,-29.6,-58.6,-44.1,-45.2,-54C-31.8,-63.9,-15.9,-69.2,-0.6,-68.5C14.7,-67.8,27.3,-59.5,39.5,-49.4Z",
]

export function MorphingBackground() {
  const path1Ref = useRef<SVGPathElement>(null)
  const path2Ref = useRef<SVGPathElement>(null)
  const path3Ref = useRef<SVGPathElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const tweensRef = useRef<gsap.core.Tween[]>([])

  useEffect(() => {
    const { isMobile, isLowEndDevice, prefersReducedMotion } = getDeviceCapabilities()
    
    // Disable morphing on low-end devices or reduced motion
    if (isLowEndDevice || prefersReducedMotion) return
    
    const ctx = gsap.context(() => {
      // Morphing animation for each blob - optimized
      const morphBlob = (pathRef: React.RefObject<SVGPathElement | null>, index: number) => {
        if (!pathRef.current || !pathRef.current.parentElement) return

        const paths = [...blobPaths]
        // Rotate the paths array based on index for variety
        for (let i = 0; i < index; i++) {
          paths.push(paths.shift()!)
        }

        // Cache tweens for cleanup
        const tween1 = gsap.to(pathRef.current, {
          attr: { d: paths[1] },
          duration: isMobile ? 6 : 4, // Slower on mobile
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          repeatDelay: isMobile ? 1 : 0.5,
        })

        // Add rotation - separate animation (disable on mobile)
        const tween2 = isMobile ? null : gsap.to(pathRef.current.parentElement, {
          rotation: 360,
          duration: 40 + index * 10,
          ease: "none",
          repeat: -1,
        })

        // Subtle scale pulsing (disable on mobile)
        const tween3 = isMobile ? null : gsap.to(pathRef.current, {
          scale: 1.05, // Less scale on mobile
          duration: 4 + index,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        })

        tweensRef.current.push(tween1)
        if (tween2) tweensRef.current.push(tween2)
        if (tween3) tweensRef.current.push(tween3)
      }

      morphBlob(path1Ref, 0)
      morphBlob(path2Ref, 1)
      morphBlob(path3Ref, 2)

      // Scroll-linked color shift - single trigger (throttled on mobile)
      let lastColorUpdate = 0
      const colorThrottle = isMobile ? 200 : 0
      
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const now = Date.now()
          if (now - lastColorUpdate < colorThrottle) return
          lastColorUpdate = now
          const hue1 = gsap.utils.interpolate([48, 280, 180, 48], self.progress)
          const hue2 = gsap.utils.interpolate([180, 48, 280, 180], self.progress)
          const hue3 = gsap.utils.interpolate([280, 180, 48, 280], self.progress)

          // Use native DOM updates instead of GSAP for color
          if (path1Ref.current) {
            path1Ref.current.style.fill = `hsla(${hue1}, 80%, 60%, 0.15)`
          }
          if (path2Ref.current) {
            path2Ref.current.style.fill = `hsla(${hue2}, 80%, 60%, 0.1)`
          }
          if (path3Ref.current) {
            path3Ref.current.style.fill = `hsla(${hue3}, 80%, 60%, 0.08)`
          }
        },
      })
    })

    return () => {
      ctx.revert()
      tweensRef.current.forEach(tween => tween.kill())
      tweensRef.current = []
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Blob 1 - Top left */}
      <svg
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] opacity-60"
        viewBox="-100 -100 200 200"
        style={{ willChange: "transform" }}
      >
        <g style={{ transformOrigin: "center" }}>
          <path
            ref={path1Ref}
            d={blobPaths[0]}
            fill="rgba(250, 204, 21, 0.15)"
            style={{ filter: "blur(40px)", willChange: "d, fill" }}
          />
        </g>
      </svg>

      {/* Blob 2 - Bottom right */}
      <svg
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] opacity-50"
        viewBox="-100 -100 200 200"
        style={{ willChange: "transform" }}
      >
        <g style={{ transformOrigin: "center" }}>
          <path
            ref={path2Ref}
            d={blobPaths[1]}
            fill="rgba(34, 211, 238, 0.1)"
            style={{ filter: "blur(50px)", willChange: "d, fill" }}
          />
        </g>
      </svg>

      {/* Blob 3 - Center */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40"
        viewBox="-100 -100 200 200"
        style={{ willChange: "transform" }}
      >
        <g style={{ transformOrigin: "center" }}>
          <path
            ref={path3Ref}
            d={blobPaths[2]}
            fill="rgba(168, 85, 247, 0.08)"
            style={{ filter: "blur(60px)", willChange: "d, fill" }}
          />
        </g>
      </svg>
    </div>
  )
}

// Floating particles component - optimized
export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    
    const { isMobile, isLowEndDevice, prefersReducedMotion } = getDeviceCapabilities()
    
    // Disable on reduced motion
    if (prefersReducedMotion) return

    const particles = containerRef.current.querySelectorAll(".particle")
    
    const ctx = gsap.context(() => {
      particles.forEach((particle, index) => {
        // Random starting position
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        })

        // Floating animation - cache tweens (simplified on mobile)
        const duration = isMobile ? 8 + Math.random() * 4 : 5 + Math.random() * 5
        const distance = isMobile ? 50 + Math.random() * 100 : 100 + Math.random() * 200
        
        const tween1 = gsap.to(particle, {
          y: `-=${distance}`,
          x: `+=${(Math.random() - 0.5) * (isMobile ? 50 : 100)}`,
          opacity: 0,
          duration,
          repeat: -1,
          delay: index * 0.5,
          ease: "none",
          onRepeat: function() {
            gsap.set(particle, {
              y: window.innerHeight + 50,
              x: Math.random() * window.innerWidth,
              opacity: 1,
            })
          },
        })

        // Subtle rotation
        const tween2 = gsap.to(particle, {
          rotation: 360,
          duration: 10 + Math.random() * 10,
          repeat: -1,
          ease: "none",
        })

        tweensRef.current.push(tween1, tween2)
      })

      // Scroll-linked movement - use throttling
      let lastUpdate = 0
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const now = Date.now()
          if (now - lastUpdate < 50) return // Throttle to 20fps for particles
          lastUpdate = now

          const velocity = self.getVelocity() / 1000
          particles.forEach((particle) => {
            gsap.to(particle, {
              y: `-=${velocity * 2}`,
              duration: 0.5,
              ease: "power2.out",
              overwrite: false,
            })
          })
        },
      })
    }, containerRef)

    return () => {
      ctx.revert()
      tweensRef.current.forEach(tween => tween.kill())
      tweensRef.current = []
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
    }
  }, [])

  const { isMobile, isLowEndDevice } = getDeviceCapabilities()
  
  // Reduce particles based on device
  const particleCount = isLowEndDevice ? 5 : isMobile ? 8 : 15
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-5 pointer-events-none overflow-hidden"
    >
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 rounded-full"
          style={{
            background: [
              "rgba(250, 204, 21, 0.6)",
              "rgba(34, 211, 238, 0.6)",
              "rgba(168, 85, 247, 0.6)",
              "rgba(236, 72, 153, 0.6)",
            ][i % 4],
            boxShadow: `0 0 ${4 + i % 3 * 2}px currentColor`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  )
}

// Gradient mesh background - optimized
export function GradientMesh() {
  const meshRef = useRef<HTMLDivElement>(null)
  const tweensRef = useRef<gsap.core.Tween[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!meshRef.current) return

    const ctx = gsap.context(() => {
      const gradients = meshRef.current!.querySelectorAll(".gradient-orb")

      gradients.forEach((gradient, index) => {
        // Floating motion - optimized
        const tween1 = gsap.to(gradient, {
          x: () => Math.random() * 100 - 50, // Smaller movement
          y: () => Math.random() * 100 - 50,
          duration: 15 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        // Scale pulsing - reduced
        const tween2 = gsap.to(gradient, {
          scale: 0.9 + Math.random() * 0.2,
          duration: 8 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        tweensRef.current.push(tween1, tween2)
      })

      // Color shift on scroll - throttled
      let lastColorUpdate = 0
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const now = Date.now()
          if (now - lastColorUpdate < 100) return // Throttle
          lastColorUpdate = now

          const progress = self.progress
          const hueShift = progress * 60

          gradients.forEach((gradient, index) => {
            const baseHue = [48, 180, 280, 320][index % 4]
            ;(gradient as HTMLElement).style.background = `radial-gradient(circle, hsla(${baseHue + hueShift}, 70%, 60%, 0.3) 0%, transparent 70%)`
          })
        },
      })
    }, meshRef)

    return () => {
      ctx.revert()
      tweensRef.current.forEach(tween => tween.kill())
      tweensRef.current = []
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
    }
  }, [])

  return (
    <div
      ref={meshRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <div
        className="gradient-orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="gradient-orb absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="gradient-orb absolute top-1/2 left-1/2 w-72 h-72 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="gradient-orb absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </div>
  )
}

