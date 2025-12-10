"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Rocket, Users, Calendar, Trophy } from "lucide-react"
import { getDeviceCapabilities } from "@/lib/mobile-optimization"

gsap.registerPlugin(ScrollTrigger)

const timelineSteps = [
  {
    title: "Registration Kicks Off",
    date: "TBA",
    description: "Be the first to secure your spot",
    icon: Rocket,
    color: "bg-yellow-400",
    textColor: "text-black",
  },
  {
    title: "Speaker Reveal Phase 1",
    date: "TBA",
    description: "Meet the industry experts",
    icon: Users,
    color: "bg-cyan-400",
    textColor: "text-black",
  },
  {
    title: "DEVOLUTION DAY 1",
    date: "TBA",
    description: "Workshops & Keynotes",
    icon: Calendar,
    color: "bg-violet-500",
    textColor: "text-white",
  },
  {
    title: "DEVOLUTION DAY 2",
    date: "TBA",
    description: "Hackathons & Closing Ceremony",
    icon: Trophy,
    color: "bg-lime-400",
    textColor: "text-black",
  },
]

const marqueeItems = ["Welcome to", "◆", "DEVOLUTION", "◆", "2026", "◆", "GDG DAU", "◆"]

export function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return

    const { isLowEndDevice, prefersReducedMotion } = getDeviceCapabilities()

    const mm = gsap.matchMedia()

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean }

      // Marquee animation (slower on mobile, skip on reduced motion/low-end)
      if (marqueeRef.current && !prefersReducedMotion && !isLowEndDevice) {
        const marqueeWidth = marqueeRef.current.scrollWidth / 2
        const duration = isMobile ? 30 : 15 // Much slower on mobile

        gsap.to(marqueeRef.current, {
          x: -marqueeWidth,
          ease: "none",
          duration,
          repeat: -1,
        })
      }

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: isMobile ? 20 : 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.5 : 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      )

      // Animate the timeline line drawing (simpler on mobile)
      gsap.fromTo(
        lineRef.current,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: isMobile ? 1 : 0.5, // Less aggressive scrub on mobile
          },
        }
      )

      // Timeline items - simple fade in
      const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item")
      timelineItems?.forEach((item) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: isMobile ? 20 : 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        )

        // Dot fade in (simplified on mobile)
        const dot = item.querySelector(".timeline-dot")
        if (dot) {
          gsap.fromTo(
            dot,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: isMobile ? 0.3 : 0.4,
              ease: isMobile ? "power2.out" : "back.out(2)",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
              },
            }
          )
        }
      })
    })

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      mm.revert()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section ref={sectionRef} id="timeline" className="py-16 md:py-20 bg-black/5 overflow-hidden">
      {/* GSAP Marquee */}
      <div className="relative mb-10 md:mb-14">
        <div className="overflow-hidden py-3 bg-black border-y-4 border-black">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="font-(--font-display) text-3xl md:text-5xl lg:text-6xl uppercase mx-4 md:mx-8 text-white tracking-tight"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="max-w-4xl mx-auto">
          <div ref={headingRef} className="text-center mb-12 md:mb-16">
            <h2 className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl uppercase inline-block">
              <span className="bg-black text-white px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow rotate-1 inline-block">
                The Flow
              </span>
            </h2>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div
              ref={lineRef}
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-yellow-400 via-cyan-400 to-violet-500 transform md:-translate-x-1/2 rounded-full"
              style={{ transformOrigin: "top center" }}
            />

            {timelineSteps.map((step, index) => (
              <div
                key={step.title}
                className={`timeline-item relative mb-10 md:mb-12 last:mb-0 md:flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-6 md:left-1/2 w-5 h-5 md:w-6 md:h-6 bg-black rounded-full transform -translate-x-1/2 z-10 top-6 md:top-7 border-4 border-white shadow-lg" />

                {/* Card container */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? "md:pr-10" : "md:pl-10"}`}>
                  <div
                    className={`${step.color} ${step.textColor} border-[3px] border-black p-5 md:p-6 brutal-shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000]`}
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-3">
                      <step.icon className="w-7 h-7 md:w-8 md:h-8 shrink-0" strokeWidth={2.5} />
                      <span className="bg-white text-black border-2 border-black px-2 md:px-3 py-1 font-bold text-xs md:text-sm uppercase">
                        {step.date}
                      </span>
                    </div>
                    <h3 className="font-(--font-display) text-lg md:text-xl lg:text-2xl uppercase mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="font-medium opacity-80 text-sm md:text-base">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
