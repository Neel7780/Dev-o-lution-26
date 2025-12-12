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
    <section ref={sectionRef} id="our-team" className="py-16 md:py-24 px-4 relative overflow-hidden" style={{ perspective: "1200px" }}>
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl uppercase inline-block"
          >
            <span className="bg-violet-500 text-white px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block">
              Meet Our Team
            </span>
          </h2>
        </div>

        {/* Team Grid */}
        <div 
          ref={cardRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          {Object.entries(teamData).map(([teamName, members], colIndex) => (
            <div 
              key={teamName} 
              ref={(el) => {
                if (el) columnsRef.current[colIndex] = el
              }}
              className="bg-pink-400 border-[3px] border-black brutal-shadow-lg hover:shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 transition-all duration-300 cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Team Name Header */}
              <div className="bg-black text-white px-4 py-3 border-b-[3px] border-black">
                <h3 className="font-black text-sm md:text-base uppercase tracking-wide">
                  {teamName}
                </h3>
              </div>
              
              {/* Team Members */}
              <ul className="p-5 space-y-3">
                {members.map((member) => {
                  const currentIndex = memberIndex++
                  return (
                    <li 
                      key={member} 
                      ref={(el) => {
                        if (el) membersRef.current[currentIndex] = el
                      }}
                      className="font-mono text-xs md:text-sm text-black hover:text-violet-600 transition-colors duration-200 flex items-center gap-2 group font-semibold"
                    >
                      <span className="w-2 h-2 bg-black group-hover:bg-violet-600 transition-colors shrink-0" />
                      <span>{member}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}