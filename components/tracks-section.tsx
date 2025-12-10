"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Brain, Link, Cloud, Smartphone, Database, Shield } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const tracks = [
  {
    title: "AI/ML & GenAI",
    description: "Explore the future of artificial intelligence",
    icon: Brain,
    color: "bg-cyan-400",
    textColor: "text-black",
    accent: "#22d3ee",
  },
  {
    title: "Web3 & Blockchain",
    description: "Build the web3 future and explore blockchain technology",
    icon: Link,
    color: "bg-yellow-400",
    textColor: "text-black",
    accent: "#facc15",
  },
  {
    title: "Cloud & DevOps",
    description: "Scale your infrastructure",
    icon: Cloud,
    color: "bg-violet-500",
    textColor: "text-white",
    accent: "#8b5cf6",
  },
  {
    title: "Mobile & Web",
    description: "Create amazing user experiences",
    icon: Smartphone,
    color: "bg-lime-400",
    textColor: "text-black",
    accent: "#a3e635",
  },
  {
    title: "Data Engineering",
    description: "Power insights with data",
    icon: Database,
    color: "bg-orange-400",
    textColor: "text-black",
    accent: "#fb923c",
  },
  {
    title: "Cyber Security",
    description: "Protect and secure systems and data",
    icon: Shield,
    color: "bg-pink-400",
    textColor: "text-black",
    accent: "#f472b6",
  },
]

export function TracksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // Heading animation with character split effect
      if (headingRef.current) {
        const headingText = headingRef.current.querySelector("span")
        if (headingText) {
          gsap.fromTo(
            headingRef.current,
            {
              opacity: 0,
              y: 50,
              rotateX: -15,
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
              },
            }
          )
        }
      }

      // Cards - dramatic stagger with 3D rotation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 100,
            rotateY: isMobile ? 0 : -15,
            rotateX: isMobile ? 0 : 10,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            stagger: {
              each: 0.1,
              from: "start",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
            },
          }
        )
      }

      // Parallax effect for the entire section on scroll
      if (!isMobile) {
        gsap.to(containerRef.current, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        })
      }
    }, sectionRef)

    // Add 3D tilt effect to cards on mouse move
    const handleMouseMove = (e: MouseEvent, card: HTMLElement) => {
      if (isMobile) return
      
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1.05,
        boxShadow: "12px 12px 0px 0px #000",
        duration: 0.3,
        ease: "power2.out",
      })

      // Move icon based on tilt
      const icon = card.querySelector(".track-icon")
      if (icon) {
        gsap.to(icon, {
          x: rotateY * 2,
          y: -rotateX * 2,
          duration: 0.3,
        })
      }
    }

    const handleMouseLeave = (card: HTMLElement) => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        boxShadow: "6px 6px 0px 0px #000",
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      })

      const icon = card.querySelector(".track-icon")
      if (icon) {
        gsap.to(icon, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        })
      }
    }

    // Attach listeners to cards
    const cardElements = cardsRef.current?.querySelectorAll(".track-card")
    cardElements?.forEach((card) => {
      const cardEl = card as HTMLElement
      cardEl.addEventListener("mousemove", (e) => handleMouseMove(e, cardEl))
      cardEl.addEventListener("mouseleave", () => handleMouseLeave(cardEl))
    })

    return () => {
      ctx.revert()
      cardElements?.forEach((card) => {
        const cardEl = card as HTMLElement
        cardEl.removeEventListener("mousemove", (e) => handleMouseMove(e, cardEl))
        cardEl.removeEventListener("mouseleave", () => handleMouseLeave(cardEl))
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="tracks" className="py-16 md:py-24 px-4 overflow-hidden" style={{ perspective: "1200px" }}>
      <div ref={containerRef} className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-12 md:mb-16" style={{ transformStyle: "preserve-3d" }}>
          <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-7xl uppercase inline-block">
            <span className="bg-fuchsia-500 text-white px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block">
              Event Tracks
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-black/60 font-medium">
            Choose your adventure
          </p>
        </div>

        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          {tracks.map((track, index) => (
            <div
              key={track.title}
              data-magnetic="0.15"
              className={`track-card ${track.color} ${track.textColor} border-[3px] border-black p-6 md:p-8 brutal-shadow-lg cursor-pointer relative overflow-hidden group`}
              style={{ 
                transformStyle: "preserve-3d",
                transform: `rotate(${(index % 3 - 1) * 1}deg)`,
              }}
            >
              {/* Animated background gradient on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${track.accent} 0%, transparent 70%)`,
                }}
              />
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/30 opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                      animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <div className="track-icon inline-block p-3 bg-white/20 border-2 border-black/20 mb-4 transition-transform duration-300">
                  <track.icon className="w-10 h-10 md:w-12 md:h-12" strokeWidth={2.5} />
                </div>
                <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-black uppercase mb-3">
                  {track.title}
                </h3>
                <p className="font-medium opacity-80 text-sm md:text-base leading-relaxed">
                  {track.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-sm font-bold uppercase">Explore</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.2); }
        }
      `}</style>
    </section>
  )
}
