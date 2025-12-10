"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const teamData = {
  "Core Team": [
    "Pranshu Patel",
    "Kalp Chaniyara",
    "Atik Vohra",
    "Param Savjani",
    "Neel Khatri",
    "Aditya Vaish",
    "Nisarg Trivedi",
    "Zalak Thakkar",
    "Dhruvam Panchal"
  ],
  "Speaker Team": [
    "Nisarg Trivedi",
    "Neel Khatri",
    "Kalp Chaniyara",
    "Hrithik Patel",
    "Dhruvam Panchal",
    "Aditya Vaish"
  ],
  "Sponsorship Team": [
    "Pushkar Patel",
    "Jeel Aghera",
    "Khushi Gandhi",
    "Param Savjani"
  ],
  "PR Team": [
    "Anushree Katuri",
    "Ashka Pathak",
    "Sakina Kheraj",
    "Sumit Goyal"
  ]
}

export function OurTeam() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const columnsRef = useRef<HTMLDivElement[]>([])
  const membersRef = useRef<HTMLLIElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Card entrance with 3D perspective
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 80,
          rotateX: 10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      )

      // Heading glitch animation
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      })

      headingTl
        .fromTo(
          headingRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            x: -30,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            x: 0,
            duration: 0.8,
            ease: "power3.inOut",
          }
        )
        // Glitch flicker
        .to(headingRef.current, {
          x: 3,
          duration: 0.05,
          repeat: 2,
          yoyo: true,
        })

      // Team columns stagger in
      columnsRef.current.forEach((column, colIndex) => {
        if (!column) return

        gsap.fromTo(
          column,
          {
            opacity: 0,
            y: 50,
            rotateY: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.7,
            delay: colIndex * 0.15,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: column,
              start: "top 90%",
            },
          }
        )
      })

      // Individual member names - typewriter reveal
      membersRef.current.forEach((member, index) => {
        if (!member) return

        gsap.fromTo(
          member,
          {
            opacity: 0,
            x: -20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: index * 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: member,
              start: "top 95%",
            },
          }
        )

        // Hover effect setup
        member.addEventListener("mouseenter", () => {
          gsap.to(member, {
            x: 10,
            color: "#fff",
            duration: 0.3,
            ease: "power2.out",
          })
        })

        member.addEventListener("mouseleave", () => {
          gsap.to(member, {
            x: 0,
            color: "#000",
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })

      // Mac buttons bounce on enter
      const buttons = sectionRef.current?.querySelectorAll(".mac-button")
      buttons?.forEach((button, index) => {
        gsap.fromTo(
          button,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            delay: 0.5 + index * 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  let memberIndex = 0

  return (
    <section ref={sectionRef} id="our-team" className="py-12 px-4 relative overflow-hidden" style={{ perspective: "1200px" }}>
      <div className="max-w-6xl mx-auto">
        {/* Main content card */}
        <div 
          ref={cardRef}
          className="relative bg-gradient-to-br from-red-300 via-red-400 to-pink-400 dark:from-red-400 dark:to-pink-500 rounded-2xl p-6 md:p-8 lg:p-10 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Mac-style window buttons */}
          <div className="absolute -top-6 left-6 flex items-center gap-2">
            <span className="mac-button w-3 h-3 rounded-full bg-red-500 border-2 border-black" />
            <span className="mac-button w-3 h-3 rounded-full bg-yellow-400 border-2 border-black" />
            <span className="mac-button w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
          </div>

          {/* Decorative floating elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-black/10 rounded-full blur-xl" />

          {/* Heading */}
          <h2 
            ref={headingRef}
            className="font-black text-2xl md:text-3xl lg:text-4xl uppercase mb-8 text-black" 
            style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
            }}
          >
            Our Team
          </h2>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Object.entries(teamData).map(([teamName, members], colIndex) => (
              <div 
                key={teamName} 
                ref={(el) => {
                  if (el) columnsRef.current[colIndex] = el
                }}
                className="space-y-4 bg-white/10 p-4 rounded-lg border-2 border-black/10 hover:bg-white/20 transition-colors duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Team Name */}
                <h3 className="font-bold text-lg md:text-xl text-black mb-4 border-b-2 border-black/20 pb-2">
                  {teamName}
                </h3>
                
                {/* Team Members */}
                <ul className="space-y-3">
                  {members.map((member) => {
                    const currentIndex = memberIndex++
                    return (
                      <li 
                        key={member} 
                        ref={(el) => {
                          if (el) membersRef.current[currentIndex] = el
                        }}
                        className="font-mono text-xs md:text-sm text-black cursor-default transition-colors duration-200 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                        {member}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}