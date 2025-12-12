"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Twitter, Sparkles } from "lucide-react"
import { getDeviceCapabilities } from "@/lib/mobile-optimization"

gsap.registerPlugin(ScrollTrigger)

export function JoinTheConversation() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLParagraphElement>(null)
  const hashtagRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return
    
    const { isLowEndDevice, prefersReducedMotion } = getDeviceCapabilities()

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      // Card entrance animation - simpler on mobile for better performance
      gsap.fromTo(
        cardRef.current,
        {
          scale: isMobile ? 0.95 : 0.9,
          opacity: 0,
          y: isMobile ? 40 : 60,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      )

      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
            },
          }
        )
      }

      // CTA text animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
            },
          }
        )
      }

      // Hashtag pop animation
      if (hashtagRef.current) {
        gsap.fromTo(
          hashtagRef.current,
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 0.4,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
            },
          }
        )
      }

      // Description fade up
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          {
            y: 15,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
            },
          }
        )
      }

      // Sparkles animation - only on desktop
      if (sparklesRef.current && !isMobile) {
        const sparkles = sparklesRef.current.children
        if (sparkles.length > 0) {
          gsap.fromTo(
            sparkles,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: cardRef.current,
                start: "top 70%",
              },
            }
          )

          // Floating animation for sparkles
          Array.from(sparkles).forEach((sparkle, index) => {
            gsap.to(sparkle, {
              y: index % 2 === 0 ? -8 : 8,
              duration: 2 + index * 0.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            })
          })
        }
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      id="join-the-conversation" 
      className="py-16 md:py-24 px-4 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Floating sparkles */}
        <div ref={sparklesRef} className="hidden md:block">
          <Sparkles className="absolute top-8 left-[10%] w-6 h-6 text-yellow-400 opacity-70" />
          <Sparkles className="absolute top-16 right-[15%] w-5 h-5 text-cyan-400 opacity-70" />
          <Sparkles className="absolute bottom-12 left-[20%] w-4 h-4 text-pink-400 opacity-70" />
        </div>

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl uppercase inline-block"
          >
            <span className="bg-cyan-400 text-black px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow rotate-1 inline-block">
              Join the Conversation
            </span>
          </h2>
        </div>

        {/* Main content card */}
        <div 
          ref={cardRef}
          className="max-w-3xl mx-auto bg-teal-400 border-[3px] border-black brutal-shadow-lg p-8 md:p-10 will-change-transform"
          style={{ perspective: "1000px" }}
        >
          {/* CTA Text */}
          <p 
            ref={ctaRef}
            className="text-xl md:text-2xl font-black text-black mb-6 text-center uppercase tracking-wide"
          >
            Use our hashtag and win prizes!
          </p>

          {/* Hashtag with Twitter Icon */}
          <div 
            ref={hashtagRef}
            className="flex items-center justify-center gap-3 mb-6 bg-black text-cyan-400 p-5 md:p-6 border-[3px] border-black"
          >
            <Twitter className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" />
            <span className="font-mono text-2xl md:text-3xl lg:text-4xl font-black">
              #dev_o_lution
            </span>
          </div>

          {/* Description */}
          <p 
            ref={descRef}
            className="text-base md:text-lg text-black/90 text-center font-semibold leading-relaxed"
          >
            Share your excitement, ideas, or projects on Twitter using our hashtag for a chance to win amazing prizes!
          </p>
        </div>
      </div>
    </section>
  )
}
