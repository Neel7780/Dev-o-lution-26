"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Code, Users, Lightbulb } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  // Rebuild component
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphsRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // Card entrance with 3D perspective (simplified on mobile)
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: isMobile ? 50 : 100,
          rotateX: isMobile ? 0 : 10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: isMobile ? 0.6 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Heading reveal - simple fade on mobile, clip-path on desktop
      if (isMobile) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        )
      } else {
        gsap.fromTo(
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
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%",
            },
          }
        )
      }

      // Paragraphs stagger with highlight effect
      const paragraphs = paragraphsRef.current?.children
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          {
            opacity: 0,
            y: isMobile ? 20 : 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.7,
            stagger: isMobile ? 0.15 : 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraphsRef.current,
              start: "top 75%",
            },
          }
        )
      }

      // Highlight spans animation (skip on mobile - expensive)
      if (!isMobile) {
        const highlights = sectionRef.current?.querySelectorAll(".highlight-text")
        highlights?.forEach((highlight, index) => {
          gsap.fromTo(
            highlight,
            {
              backgroundSize: "0% 100%",
            },
            {
              backgroundSize: "100% 100%",
              duration: 0.6,
              delay: 0.3 + index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: highlight,
                start: "top 85%",
              },
            }
          )
        })
      }

      // Feature tags bounce in (simplified on mobile)
      const tags = tagsRef.current?.children
      if (tags) {
        gsap.fromTo(
          tags,
          {
            opacity: 0,
            scale: 0,
            rotation: isMobile ? 0 : -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: isMobile ? 0.4 : 0.5,
            stagger: 0.1,
            ease: isMobile ? "power2.out" : "back.out(1.7)",
            scrollTrigger: {
              trigger: tagsRef.current,
              start: "top 85%",
            },
          }
        )
      }

      // Parallax for tape decorations - DESKTOP ONLY
      if (!isMobile) {
        const tapes = sectionRef.current?.querySelectorAll(".tape-decoration")
        tapes?.forEach((tape, index) => {
          gsap.to(tape, {
            y: index % 2 === 0 ? -20 : 20,
            rotation: index % 2 === 0 ? -5 : 5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          })
        })

        // Card subtle parallax tilt on scroll - DESKTOP ONLY
        gsap.to(cardRef.current, {
          rotateY: 2,
          rotateX: -2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4" style={{ perspective: "1200px" }}>
      <div className="max-w-4xl mx-auto">
        <div
          ref={cardRef}
          className="relative bg-white border-[3px] border-black brutal-shadow-lg p-8 md:p-12 torn-paper-top torn-paper-bottom will-change-transform"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute -top-2 left-1/4 w-20 h-8 bg-yellow-400/80 rotate-3 border border-black/20" />
          <div className="absolute -top-2 right-1/4 w-20 h-8 bg-cyan-400/80 rotate-3 border border-black/20" />

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-(--font-display) text-4xl md:text-6xl uppercase mb-8 inline-block bg-black text-white px-4 py-2 rotate-1"
          >
            What is This?
          </motion.h2>

          <div ref={paragraphsRef} className="space-y-6 text-lg md:text-xl leading-relaxed text-black">
            <p>
              <strong className="text-violet-600">DEVOLUTION</strong> is DSC DAU&apos;s (formerly GDG on Campus DAU) flagship tech event. It&apos;s
              not just a conference; it&apos;s a{" "}
              <span
                className="highlight-text bg-yellow-400 px-2 font-bold"
                style={{
                  backgroundImage: "linear-gradient(to right, rgb(250 204 21) 0%, rgb(250 204 21) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                }}
              >
                collision of ideas
              </span>
              , code, and future tech.
            </p>
            <p>
              Join us for{" "}
              <span
                className="highlight-text bg-cyan-400 px-2 font-bold"
                style={{
                  backgroundImage: "linear-gradient(to right, rgb(34 211 238) 0%, rgb(34 211 238) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                }}
              >
                workshops
              </span>
              
              {/* <span
                className="highlight-text bg-fuchsia-500 text-white px-2 font-bold ml-1"
                style={{
                  backgroundImage: "linear-gradient(to right, rgb(217 70 239) 0%, rgb(217 70 239) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                }}
              >
                hackathons
              </span> */}
              and
              <span
                className="highlight-text bg-lime-400 px-2 font-bold ml-1"
                style={{
                  backgroundImage: "linear-gradient(to right, rgb(163 230 53) 0%, rgb(163 230 53) 100%)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                }}
              >
                mind-blowing talks
              </span>{" "}
              from industry experts and community leaders.
            </p>
          </div>

          <div ref={tagsRef} className="flex flex-wrap gap-4 mt-8">
            <FeatureTag icon={<Code />} label="Code" color="bg-violet-500 text-white" />
            <FeatureTag icon={<Users />} label="Community" color="bg-cyan-400 text-black" />
            <FeatureTag icon={<Lightbulb />} label="Innovation" color="bg-yellow-400 text-black" />
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="absolute -bottom-16 right-8 text-black"
          >
            {/* <ArrowDown size={48} strokeWidth={3} /> */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FeatureTag({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: -3 }}
      className={`${color} border-[3px] border-black px-4 py-2 brutal-shadow flex items-center gap-2 font-bold uppercase text-sm cursor-pointer`}
      data-magnetic="0.2"
    >
      {icon}
      {label}
    </motion.div>
  )
}
