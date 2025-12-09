"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Twitter, Sparkles } from "lucide-react"

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
      className="py-12 md:py-16 px-4 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Floating sparkles - only visible on larger screens */}
        <div ref={sparklesRef} className="hidden md:block">
          <Sparkles className="absolute top-8 left-[10%] w-6 h-6 text-yellow-400 opacity-70" />
          <Sparkles className="absolute top-16 right-[15%] w-5 h-5 text-cyan-400 opacity-70" />
          <Sparkles className="absolute bottom-12 left-[20%] w-4 h-4 text-pink-400 opacity-70" />
        </div>

        {/* Main content card */}
        <div 
          ref={cardRef}
          className="relative bg-linear-to-br from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600 rounded-2xl p-6 md:p-8 lg:p-10 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] will-change-transform"
          style={{ perspective: "1000px" }}
        >
          {/* Mac-style window buttons */}
          <div className="absolute -top-6 left-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
          </div>

          {/* Heading */}
          <h2 
            ref={headingRef}
            className="font-(--font-display) text-2xl md:text-3xl lg:text-4xl uppercase mb-6 text-black"
            style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}
          >
            Join the Conversation
          </h2>

          {/* CTA Text */}
          <p 
            ref={ctaRef}
            className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-4 text-center"
          >
            Use our hashtag and win prizes!
          </p>

          {/* Hashtag with Twitter Icon */}
          <div 
            ref={hashtagRef}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <Twitter className="w-6 h-6 md:w-8 md:h-8 text-black" fill="currentColor" />
            <span className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-black">
              #dev_o_lution
            </span>
          </div>

          {/* Description */}
          <p 
            ref={descRef}
            className="text-sm md:text-base lg:text-lg text-black text-center max-w-3xl mx-auto"
          >
            Share your excitement, ideas, or projects on Twitter using our hashtag for a chance to win amazing prizes!
          </p>

          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 w-16 md:w-20 h-16 md:h-20 border-t-4 border-r-4 border-black/10 rounded-tr-xl" />
          <div className="absolute bottom-4 left-4 w-16 md:w-20 h-16 md:h-20 border-b-4 border-l-4 border-black/10 rounded-bl-xl" />
        </div>
      </div>
    </section>
  )
}
