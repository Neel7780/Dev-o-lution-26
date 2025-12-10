"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SplitTextRevealProps {
  children: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  ease?: string
  animation?: "chars" | "words" | "lines" | "wave" | "scramble" | "typewriter"
  trigger?: "scroll" | "immediate"
  scrub?: boolean
  tag?: keyof JSX.IntrinsicElements
}

export function SplitTextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  ease = "power3.out",
  animation = "chars",
  trigger = "scroll",
  scrub = false,
  tag: Tag = "div",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const chars = charsRef.current.filter(Boolean)
      
      const scrollConfig = trigger === "scroll" ? {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: scrub ? "top 20%" : undefined,
          scrub: scrub ? 1 : false,
        },
      } : {}

      switch (animation) {
        case "chars":
          gsap.fromTo(
            chars,
            {
              y: 80,
              opacity: 0,
              rotateX: -90,
              transformOrigin: "top center",
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration,
              stagger,
              ease,
              delay,
              ...scrollConfig,
            }
          )
          break

        case "words":
          // Group chars by words for word animation
          const wordGroups: HTMLSpanElement[][] = []
          let currentWord: HTMLSpanElement[] = []
          
          chars.forEach((char, i) => {
            if (char.textContent === " " || char.textContent === "\u00A0") {
              if (currentWord.length) {
                wordGroups.push(currentWord)
                currentWord = []
              }
            } else {
              currentWord.push(char)
            }
          })
          if (currentWord.length) wordGroups.push(currentWord)

          wordGroups.forEach((word, wordIndex) => {
            gsap.fromTo(
              word,
              {
                y: 50,
                opacity: 0,
                scale: 0.8,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration,
                ease,
                delay: delay + wordIndex * 0.15,
                ...scrollConfig,
              }
            )
          })
          break

        case "wave":
          gsap.fromTo(
            chars,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration,
              stagger: {
                each: stagger,
                from: "center",
              },
              ease: "elastic.out(1, 0.5)",
              delay,
              ...scrollConfig,
            }
          )
          break

        case "scramble":
          const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          
          chars.forEach((char, index) => {
            const originalChar = char.textContent || ""
            let iteration = 0
            
            const startScramble = () => {
              const interval = setInterval(() => {
                char.textContent = iteration > index * 2 
                  ? originalChar 
                  : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
                
                iteration++
                if (iteration > chars.length * 2) {
                  clearInterval(interval)
                  char.textContent = originalChar
                }
              }, 40)
            }

            if (trigger === "scroll") {
              ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 85%",
                onEnter: () => setTimeout(startScramble, delay * 1000 + index * 30),
              })
            } else {
              setTimeout(startScramble, delay * 1000 + index * 30)
            }
          })
          break

        case "typewriter":
          gsap.set(chars, { opacity: 0 })
          
          const typewriter = () => {
            chars.forEach((char, index) => {
              gsap.to(char, {
                opacity: 1,
                duration: 0.05,
                delay: delay + index * 0.05,
              })
            })
          }

          if (trigger === "scroll") {
            ScrollTrigger.create({
              trigger: containerRef.current,
              start: "top 85%",
              onEnter: typewriter,
            })
          } else {
            typewriter()
          }
          break

        case "lines":
          gsap.fromTo(
            chars,
            {
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
              y: 20,
            },
            {
              clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
              y: 0,
              duration,
              stagger,
              ease,
              delay,
              ...scrollConfig,
            }
          )
          break
      }
    }, containerRef)

    return () => ctx.revert()
  }, [animation, delay, duration, ease, stagger, trigger, scrub])

  // Split text into characters
  const characters = children.split("").map((char, index) => (
    <span
      key={index}
      ref={(el) => {
        if (el) charsRef.current[index] = el
      }}
      className="inline-block"
      style={{ 
        whiteSpace: char === " " ? "pre" : "normal",
        willChange: "transform, opacity",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))

  return (
    <Tag
      ref={containerRef as any}
      className={className}
      style={{ perspective: "1000px" }}
    >
      {characters}
    </Tag>
  )
}

// Magnetic text that follows cursor
interface MagneticTextProps {
  children: string
  className?: string
  strength?: number
}

export function MagneticText({ children, className = "", strength = 0.3 }: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined" || window.innerWidth < 768) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current!.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      charsRef.current.forEach((char, index) => {
        if (!char) return
        
        const charRect = char.getBoundingClientRect()
        const charCenterX = charRect.left + charRect.width / 2
        const charCenterY = charRect.top + charRect.height / 2
        
        const distX = e.clientX - charCenterX
        const distY = e.clientY - charCenterY
        const distance = Math.sqrt(distX * distX + distY * distY)
        const maxDist = 200
        
        if (distance < maxDist) {
          const factor = (1 - distance / maxDist) * strength
          gsap.to(char, {
            x: distX * factor,
            y: distY * factor,
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })
    }

    const handleMouseLeave = () => {
      charsRef.current.forEach((char) => {
        if (!char) return
        gsap.to(char, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        })
      })
    }

    document.addEventListener("mousemove", handleMouseMove)
    containerRef.current.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  const characters = children.split("").map((char, index) => (
    <span
      key={index}
      ref={(el) => {
        if (el) charsRef.current[index] = el
      }}
      className="inline-block cursor-default"
      style={{ willChange: "transform" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))

  return (
    <div ref={containerRef} className={className}>
      {characters}
    </div>
  )
}

