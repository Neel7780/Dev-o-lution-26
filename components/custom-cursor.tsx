"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMagnetic, setIsMagnetic] = useState(false)
  const [isOnDark, setIsOnDark] = useState(false)
  const interactiveElementsRef = useRef<Set<Element>>(new Set())
  const animationFrameRef = useRef<number | null>(null)
  const mouseXRef = useRef(0)
  const mouseYRef = useRef(0)
  const cursorXRef = useRef(0)
  const cursorYRef = useRef(0)

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window === "undefined" || window.innerWidth < 1024) return

    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current

    if (!cursor || !dot || !ring) return

    // Check if element or its parents have dark background
    const isOverDarkSection = (element: Element | null): boolean => {
      if (!element) return false
      
      // Check for data attribute
      if (element.closest('[data-cursor-light]')) return true
      
      // Check for common dark background classes (limit depth for performance)
      const darkClasses = ['bg-black', 'bg-zinc-900', 'bg-gray-900', 'bg-slate-900']
      let current: Element | null = element
      let depth = 0
      
      while (current && depth < 5) {
        if (darkClasses.some(cls => current?.classList.contains(cls))) {
          return true
        }
        current = current.parentElement
        depth++
      }
      
      return false
    }

    // Smooth cursor following with GSAP
    const updateCursor = () => {
      const diffX = mouseXRef.current - cursorXRef.current
      const diffY = mouseYRef.current - cursorYRef.current

      cursorXRef.current += diffX * 0.15
      cursorYRef.current += diffY * 0.15

      gsap.set(ring, {
        x: cursorXRef.current,
        y: cursorYRef.current,
      })

      gsap.set(dot, {
        x: mouseXRef.current,
        y: mouseYRef.current,
      })

      animationFrameRef.current = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
      mouseYRef.current = e.clientY

      // Check if over dark section
      const target = e.target as HTMLElement
      const onDark = isOverDarkSection(target)
      
      if (onDark !== isOnDark) {
        setIsOnDark(onDark)
        
        // Update cursor colors based on background
        if (onDark) {
          gsap.to(dot, {
            backgroundColor: "white",
            duration: 0.3,
          })
          gsap.to(ring, {
            borderColor: isHovering ? "rgba(250, 204, 21, 0.8)" : "rgba(255, 255, 255, 0.6)",
            duration: 0.3,
          })
        } else {
          gsap.to(dot, {
            backgroundColor: "black",
            duration: 0.3,
          })
          gsap.to(ring, {
            borderColor: isHovering ? "rgba(250, 204, 21, 0.8)" : "rgba(0, 0, 0, 0.5)",
            duration: 0.3,
          })
        }
      }

      // Check for magnetic elements
      const magneticEl = target.closest("[data-magnetic]") as HTMLElement

      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect()
        const strength = parseFloat(magneticEl.dataset.magnetic || "0.3")
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distX = (e.clientX - centerX) * strength
        const distY = (e.clientY - centerY) * strength

        gsap.to(magneticEl, {
          x: distX,
          y: distY,
          duration: 0.3,
          ease: "power2.out",
        })

        setIsMagnetic(true)
      } else if (isMagnetic) {
        // Reset all magnetic elements
        document.querySelectorAll("[data-magnetic]").forEach((el) => {
          gsap.to(el, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          })
        })
        setIsMagnetic(false)
      }
    }

    const handleMouseEnterInteractive = () => {
      setIsHovering(true)
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "rgba(250, 204, 21, 0.8)",
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(dot, {
        scale: 0.5,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeaveInteractive = () => {
      setIsHovering(false)
      gsap.to(ring, {
        scale: 1,
        borderColor: isOnDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.5)",
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.15,
        ease: "power2.out",
      })
    }

    const handleMouseUp = () => {
      setIsClicking(false)
      gsap.to(ring, {
        scale: isHovering ? 1.8 : 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.4)",
      })
    }

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Track interactive elements - cache in set
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'
    )
    
    interactiveElements.forEach((el) => {
      interactiveElementsRef.current.add(el)
      el.addEventListener("mouseenter", handleMouseEnterInteractive)
      el.addEventListener("mouseleave", handleMouseLeaveInteractive)
    })

    // Start animation loop
    updateCursor()

    // Show cursor after a small delay
    gsap.fromTo(
      cursor,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, delay: 0.5, ease: "back.out(1.7)" }
    )

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      
      // Clean up event listeners from cached elements
      interactiveElementsRef.current.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive)
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive)
      })
      
      interactiveElementsRef.current.clear()
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovering, isMagnetic, isOnDark])

  // Don't render on mobile/tablet
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null
  }

  return (
    <div ref={cursorRef} className="pointer-events-none fixed inset-0 z-9999 hidden lg:block">
      {/* Main cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full"
        style={{ willChange: "transform" }}
      />
      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-black/50 rounded-full"
        style={{ willChange: "transform" }}
      />
    </div>
  )
}

