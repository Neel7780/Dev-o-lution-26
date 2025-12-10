"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Code, Calendar, Trophy, Coffee, GitBranch } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Attendees Expected",
    color: "bg-yellow-400",
  },
  {
    icon: Code,
    value: 48,
    suffix: "hrs",
    label: "of Non-Stop Coding",
    color: "bg-cyan-400",
  },
  {
    icon: Calendar,
    value: 2,
    suffix: "",
    label: "Days of Innovation",
    color: "bg-fuchsia-500",
  },
  {
    icon: Trophy,
    value: 50,
    suffix: "K+",
    label: "in Prizes",
    color: "bg-lime-400",
  },
  {
    icon: Coffee,
    value: 1000,
    suffix: "+",
    label: "Cups of Coffee",
    color: "bg-orange-400",
  },
  {
    icon: GitBranch,
    value: 6,
    suffix: "",
    label: "Tech Tracks",
    color: "bg-violet-500",
  },
]

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const countersRef = useRef<HTMLDivElement[]>([])
  const numberRefs = useRef<HTMLSpanElement[]>([])
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading animation with glitch effect
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })

      headingTl
        .fromTo(
          headingRef.current,
          {
            y: 50,
            opacity: 0,
            skewX: -10,
          },
          {
            y: 0,
            opacity: 1,
            skewX: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        )
        // Glitch effect
        .to(headingRef.current, {
          x: 5,
          duration: 0.05,
          repeat: 3,
          yoyo: true,
        })

      // Counter cards entrance with 3D effect
      countersRef.current.forEach((counter, index) => {
        if (!counter) return

        gsap.fromTo(
          counter,
          {
            opacity: 0,
            y: 100,
            rotateX: 45,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: counter,
              start: "top 90%",
            },
          }
        )
      })

      // Number counting animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          if (!hasAnimated) {
            setHasAnimated(true)
            animateNumbers()
          }
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [hasAnimated])

  const animateNumbers = () => {
    numberRefs.current.forEach((ref, index) => {
      if (!ref) return

      const target = stats[index].value
      const duration = 2 + Math.random() * 0.5 // Slightly varied durations

      gsap.fromTo(
        { value: 0 },
        { value: target },
        {
          duration,
          ease: "power2.out",
          onUpdate: function () {
            const current = Math.round(this.targets()[0].value)
            ref.textContent = current.toLocaleString()
          },
        }
      )

      // Add a bounce effect at the end
      gsap.to(ref, {
        scale: 1.1,
        duration: 0.15,
        delay: duration - 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
    })
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 px-4 relative overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl font-black uppercase inline-block">
            <span className="bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent relative">
              By The Numbers
              {/* Decorative underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6C50 0 150 12 200 6"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-black"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                if (el) countersRef.current[index] = el
              }}
              className={`${stat.color} border-[3px] border-black p-6 md:p-8 brutal-shadow-lg relative overflow-hidden group cursor-default`}
              style={{
                transformStyle: "preserve-3d",
                transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (index % 3)}deg)`,
              }}
            >
              {/* Hover shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Icon */}
              <div className="mb-4 inline-block p-2 bg-black/10 border-2 border-black/20">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-black" strokeWidth={2.5} />
              </div>

              {/* Number */}
              <div className="font-(--font-display) text-4xl md:text-5xl lg:text-6xl font-black text-black flex items-baseline gap-1">
                <span
                  ref={(el) => {
                    if (el) numberRefs.current[index] = el
                  }}
                >
                  0
                </span>
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              </div>

              {/* Label */}
              <p className="mt-2 font-bold text-sm md:text-base uppercase text-black/70">
                {stat.label}
              </p>

              {/* Corner decoration */}
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-black/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

