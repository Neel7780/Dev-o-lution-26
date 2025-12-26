"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { HelpCircle, Lock, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

type Speaker = {
  name: string
  photo: string
  position: string
  talkTitle?: string
  intro?: string
  isRevealed: boolean
}

const speakers: (Speaker | null)[] = [
  {
    name: "Abhishek Doshi",
    photo: "/current-chapter/speaker-images/abhishek_doshi.png",
    position: "Google Developer Expert (GDE) for Dart, Flutter & Firebase",
    talkTitle: "The Dynamic Duo: Introduction to Modern App Development with Flutter & Firebase",
    intro: "Abhishek Doshi is a Google Developer Expert for Dart, Flutter & Firebase with over 7+ years of experience in app development, currently working as Tech Lead at a US-based health-tech company as well as Founder of Zeth Technologies",
    isRevealed: true,
  },
  {
    name: "Vaibhav Malpani",
    photo: "/current-chapter/speaker-images/Vaibhav_malpani.jpg",
    position: "Google Developer Expert (GDE) in CLoud",
    talkTitle: "Intro to AI agents and ADK",
    intro: "Vaibhav is Technical Lead with 9+ years of expertise working with Cloud Technologies. He is also a Google developer expert in GCP. He like to write blogs on medium and share his knowledge in such events.",
    isRevealed: true,
  },
  null, // Placeholder for speaker 2
  null, // Placeholder for speaker 3
]

// Glitch text characters for mystery effect
const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"

export function SpeakersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const glitchTextRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const isMobile = window.innerWidth < 768
    const timeoutIds: ReturnType<typeof setTimeout>[] = []

    const ctx = gsap.context(() => {
      // Heading animation - dramatic reveal with clip path
      gsap.fromTo(
        headingRef.current,
        {
          y: 50,
          opacity: 0,
          clipPath: isMobile ? "none" : "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        },
        {
          y: 0,
          opacity: 1,
          clipPath: isMobile ? "none" : "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          duration: isMobile ? 0.6 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Top secret badge - glitchy entrance (simplified on mobile)
      const badgeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      })

      if (isMobile) {
        // Simple entrance on mobile
        badgeTl.fromTo(
          badgeRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, rotate: -12, duration: 0.5, ease: "back.out(1.7)" }
        )
      } else {
        badgeTl
          .fromTo(
            badgeRef.current,
            { scale: 0, opacity: 0, rotate: 180 },
            { scale: 1.2, opacity: 1, rotate: -20, duration: 0.3, ease: "power2.out" }
          )
          .to(badgeRef.current, { scale: 0.9, rotate: -8, duration: 0.1 })
          .to(badgeRef.current, { scale: 1.1, rotate: -15, duration: 0.1 })
          .to(badgeRef.current, { scale: 1, rotate: -12, duration: 0.2, ease: "elastic.out(1, 0.5)" })
      }

      // Add pulsing glow to badge (skip on mobile)
      if (!isMobile) {
        gsap.to(badgeRef.current, {
          boxShadow: "0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3)",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
        })
      }

      // Speaker cards - staggered reveal (no glitch on mobile)
      if (cardsRef.current) {
        const cards = cardsRef.current.children

        Array.from(cards).forEach((card, index) => {
          const cardEl = card as HTMLElement

          // Initial reveal animation
          gsap.fromTo(
            cardEl,
            {
              y: 60,
              opacity: 0,
              scale: 0.9,
              filter: isMobile ? "none" : "blur(10px)",
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.6,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
              },
            }
          )

          // Continuous subtle glitch effect - DESKTOP ONLY to avoid memory leak
          if (!isMobile) {
            const glitchCard = () => {
              if (!cardEl.matches(":hover")) {
                const randomX = (Math.random() - 0.5) * 4
                const randomY = (Math.random() - 0.5) * 4
                const randomSkew = (Math.random() - 0.5) * 2

                gsap.to(cardEl, {
                  x: randomX,
                  y: randomY,
                  skewX: randomSkew,
                  duration: 0.05,
                  onComplete: () => {
                    gsap.to(cardEl, {
                      x: 0,
                      y: 0,
                      skewX: 0,
                      duration: 0.05,
                    })
                  },
                })
              }
            }

            // Random glitch intervals - store IDs for cleanup
            const startGlitch = () => {
              const randomDelay = 2000 + Math.random() * 4000
              const timeoutId = setTimeout(() => {
                glitchCard()
                startGlitch()
              }, randomDelay)
              timeoutIds.push(timeoutId)
            }

            startGlitch()
          }
        })
      }

      // Bottom text - typewriter effect
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 92%",
            },
          }
        )
      }

      // Glitch text animation for "???" elements - DESKTOP ONLY
      if (!isMobile) {
        glitchTextRefs.current.forEach((ref, index) => {
          if (!ref) return

          const glitchText = () => {
            const originalText = "???"
            let iterations = 0
            const maxIterations = 10

            const interval = setInterval(() => {
              ref.textContent = originalText
                .split("")
                .map((_, i) => {
                  if (iterations > i * 3) return originalText[i]
                  return glitchChars[Math.floor(Math.random() * glitchChars.length)]
                })
                .join("")

              iterations++
              if (iterations > maxIterations) {
                clearInterval(interval)
                ref.textContent = originalText
              }
            }, 50)
          }

          // Trigger glitch on scroll into view
          ScrollTrigger.create({
            trigger: ref,
            start: "top 90%",
            onEnter: () => {
              const timeoutId = setTimeout(() => glitchText(), index * 200)
              timeoutIds.push(timeoutId)
            },
          })

          // Also glitch on hover
          ref.parentElement?.addEventListener("mouseenter", glitchText)
        })
      }

    }, sectionRef)

    return () => {
      ctx.revert()
      // Clear all timeouts to prevent memory leaks
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [])

  return (
    <section ref={sectionRef} id="speakers" className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Scanline overlay effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
        }}
      />

      {/* Glitch color channels - decorative */}
      <div className="absolute top-1/4 -left-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl font-black uppercase inline-block">
            <span className="bg-orange-400 text-black px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block relative">
              The Lineup
              {/* Glitch overlay */}
              <span className="absolute inset-0 bg-orange-400 mix-blend-multiply opacity-0 hover:opacity-100 transition-opacity"
                style={{ clipPath: "polygon(0 45%, 100% 45%, 100% 55%, 0 55%)" }} />
            </span>
          </h2>
        </div>

        {/* Top Secret Badge */}
        <div
          ref={badgeRef}
          className="absolute top-24 md:top-32 right-4 md:right-20 z-20"
        >
          <div className="bg-red-600 text-white border-4 border-red-800 px-4 md:px-6 py-2 md:py-3 brutal-shadow -rotate-12 relative overflow-hidden">
            {/* Animated stripe */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.2) 10px, rgba(0,0,0,0.2) 20px)",
                animation: "stripe-move 1s linear infinite",
              }}
            />
            <div className="flex items-center gap-2 relative">
              <Lock className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
              <span className="font-(--font-display) text-lg md:text-2xl font-black uppercase tracking-wider">
                Top Secret
              </span>
            </div>
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider relative">
              Classified • TBA
            </span>
          </div>
        </div>

        {/* Speaker Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {speakers.map((speaker, index) => {
            const isRevealed = speaker?.isRevealed ?? false
            
            return (
              <div
                key={index}
                className="speaker-card bg-white border-[3px] border-black p-3 brutal-shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000] group relative overflow-hidden"
                style={{
                  transform: `rotate(${(index - 1.5) * 1.5}deg)`,
                }}
                data-magnetic="0.1"
              >
                {/* Content wrapper that gets blurred on hover */}
                <div className={`relative transition-all duration-300 ${isRevealed && speaker?.intro ? 'group-hover:blur-[4px]' : ''}`}>
                  {/* Hover glitch effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-fuchsia-500/0 to-yellow-500/0 group-hover:from-cyan-500/10 group-hover:via-fuchsia-500/10 group-hover:to-yellow-500/10 transition-all duration-300 z-10" />

                  <div className="aspect-square bg-gradient-to-br from-black/5 to-black/10 border-2 border-black flex flex-col items-center justify-center mb-3 relative overflow-hidden">
                  {/* Animated scan line */}
                  <div
                    className="absolute w-full h-1 bg-white/20 top-0 left-0 z-10"
                    style={{
                      animation: "scan 2s ease-in-out infinite",
                      animationDelay: `${index * 0.5}s`,
                    }}
                  />

                  {isRevealed && speaker ? (
                    <>
                      {/* Revealed speaker image */}
                      <Image
                        src={speaker.photo}
                        alt={speaker.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      {/* GDE Badge overlay */}
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 border-2 border-black brutal-shadow text-xs font-black uppercase z-20">
                        GDE
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Mystery icon with glitch */}
                      <div className="relative">
                        <HelpCircle className="w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 text-black/30 mb-2 group-hover:text-violet-500/50 transition-colors" />
                        <Eye className="absolute inset-0 w-12 h-12 md:w-16 lg:w-20 md:h-16 lg:h-20 text-transparent group-hover:text-black/10 transition-all duration-300 opacity-0 group-hover:opacity-100" />
                      </div>

                      <span
                        ref={(el) => { glitchTextRefs.current[index] = el }}
                        className="font-bold text-black/40 text-sm uppercase font-mono tracking-wider"
                      >
                        ???
                      </span>

                      {/* Corner decorations */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-black/20" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-black/20" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-black/20" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-black/20" />
                    </>
                  )}
                  </div>

                  <div className="text-center py-2 relative">
                    {isRevealed && speaker ? (
                      <>
                        <p className="font-(--font-display) text-sm md:text-base font-black uppercase text-black group-hover:text-cyan-600 transition-colors mb-1">
                          {speaker.name}
                        </p>
                        <p className="text-xs md:text-sm font-bold text-black/70 mb-1 leading-tight">
                          {speaker.position}
                        </p>
                        {speaker.talkTitle && (
                          <p className="text-[10px] md:text-xs font-semibold text-violet-600 mt-1 line-clamp-2 italic">
                            "{speaker.talkTitle}"
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="font-(--font-display) text-sm md:text-base font-black uppercase text-black/60 group-hover:text-black transition-colors">
                          Speaker {index + 1}
                        </p>
                        <p className="text-xs md:text-sm font-bold uppercase text-violet-600 flex items-center justify-center gap-1">
                          <span className="inline-block w-2 h-2 bg-violet-600 rounded-full animate-pulse" />
                          Coming Soon
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Intro overlay - shows on hover for revealed speakers */}
                {isRevealed && speaker?.intro && (
                  <div className="absolute inset-0 bg-white z-50 p-4 md:p-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="border-[3px] border-black p-4 md:p-5 w-full h-full flex items-center justify-center">
                      <p className="text-xs md:text-sm font-semibold text-black leading-relaxed text-center">
                        {speaker.intro}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Text */}
        <p
          ref={textRef}
          className="text-center mt-10 md:mt-12 text-base md:text-lg lg:text-xl font-bold text-black/60"
        >
          {speakers.filter(s => s?.isRevealed).length > 0 
            ? "🎤 More industry experts & community legends incoming... Stay tuned!"
            : "🎤 Industry experts & community legends incoming... Stay tuned!"
          }
        </p>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 0.5; }
        }
        @keyframes stripe-move {
          0% { background-position: 0 0; }
          100% { background-position: 28px 0; }
        }
      `}</style>
    </section>
  )
}
