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
  },
  {
    title: "Web3 & Blockchain",
    description: "Build the web3 future and explore blockchain technology",
    icon: Link,
    color: "bg-yellow-400",
    textColor: "text-black",
  },
  {
    title: "Cloud & DevOps",
    description: "Scale your infrastructure",
    icon: Cloud,
    color: "bg-violet-500",
    textColor: "text-white",
  },
  {
    title: "Mobile & Web",
    description: "Create amazing user experiences",
    icon: Smartphone,
    color: "bg-lime-400",
    textColor: "text-black",
  },
  {
    title: "Data Engineering",
    description: "Power insights with data",
    icon: Database,
    color: "bg-orange-400",
    textColor: "text-black",
  },
  {
    title: "Cyber Security",
    description: "Protect and secure systems and data",
    icon: Shield,
    color: "bg-pink-400",
    textColor: "text-black",
  },
]

export function TracksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      // Heading animation - simple fade in
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      )

      // Cards - simple stagger fade in without movement that causes overlap
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
            },
          }
        )
      }
      // Removed floating effect that was causing overlap
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tracks" className="py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-10 md:mb-12">
          <h2 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-7xl uppercase inline-block">
            <span className="bg-fuchsia-500 text-white px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block">
              Event Tracks
            </span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tracks.map((track) => (
            <div
              key={track.title}
              className={`${track.color} ${track.textColor} border-[3px] border-black p-5 md:p-6 brutal-shadow-lg cursor-pointer transition-transform duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000]`}
            >
              <track.icon className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4" strokeWidth={2.5} />
              <h3 className="font-[var(--font-display)] text-xl md:text-2xl font-black uppercase mb-2">{track.title}</h3>
              <p className="font-medium opacity-80 text-sm md:text-base">{track.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
