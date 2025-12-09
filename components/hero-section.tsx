"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Sparkles, Zap, Star, Cloud, Hexagon, Triangle, Circle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title parallax - moves slower than scroll for depth
      gsap.to(titleRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      })

      // Subtitle parallax - moves at different rate
      gsap.to(subtitleRef.current, {
        y: 100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: 0.5,
        },
      })

      // Decorative shapes parallax (different speeds for depth)
      const shapes = sectionRef.current?.querySelectorAll(".parallax-shape")
      shapes?.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.15)
        const direction = index % 2 === 0 ? 1 : -1
        
        gsap.to(shape, {
          y: 150 * speed * direction,
          x: 30 * speed * -direction,
          rotation: 15 * direction,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
      })

      // Scale down hero on scroll for dramatic exit
      gsap.to(sectionRef.current, {
        scale: 0.95,
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-16 px-4 overflow-hidden"
      style={{ transformOrigin: "center top" }}
    >
      {/* Background gradient layers for depth */}
      <div className="absolute inset-0 -z-20 parallax-bg" data-speed="0.1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/5 to-cyan-400/10" />
      </div>

      {/* Floating geometric shapes - parallax layers */}
      <div className="parallax-shape absolute top-20 left-[5%]" data-float="30">
        <FloatingSticker className="rotate-12" color="bg-cyan-400">
          <Sparkles className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>
      
      <div className="parallax-shape absolute top-32 right-[8%]" data-float="50">
        <FloatingSticker className="-rotate-6" color="bg-yellow-400">
          <Zap className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>
      
      <div className="parallax-shape absolute bottom-40 left-[10%]" data-float="40">
        <FloatingSticker className="rotate-6" color="bg-lime-400">
          <Star className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>
      
      <div className="parallax-shape absolute top-48 left-[15%]" data-float="25">
        <FloatingSticker className="-rotate-12" color="bg-pink-400">
          <Cloud className="w-6 h-6 text-black" />
        </FloatingSticker>
      </div>

      {/* Additional decorative shapes for richer parallax */}
      <div className="parallax-shape absolute top-1/3 right-[15%] opacity-40" data-float="60">
        <Hexagon className="w-20 h-20 text-violet-500/30" strokeWidth={1} />
      </div>
      
      <div className="parallax-shape absolute bottom-1/4 right-[20%] opacity-30" data-float="35">
        <Triangle className="w-16 h-16 text-cyan-500/30" strokeWidth={1} />
      </div>
      
      <div className="parallax-shape absolute top-1/2 left-[8%] opacity-30" data-float="45">
        <Circle className="w-12 h-12 text-yellow-500/30" strokeWidth={1} />
      </div>

      {/* Grid pattern overlay for texture */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8"
        >
          <div className="bg-violet-500 text-white border-[3px] border-black px-6 py-2 brutal-shadow rotate-2">
            <span className="font-bold uppercase tracking-wider text-sm md:text-base">✦ Organized by GDG DAU ✦</span>
          </div>
        </motion.div>

        <motion.h1
          ref={titleRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-(--font-display) text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none mb-6 tracking-tighter"
          style={{
            WebkitTextStroke: "3px black",
            textShadow: "6px 6px 0px #000",
          }}
        >
          <span className="text-yellow-400">DEVO</span>
          <span className="text-cyan-400">LUTION</span>
          <br />
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">2026</span>
        </motion.h1>

        <motion.div
          ref={subtitleRef}
          initial={{ opacity: 0, y: 20, rotate: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative inline-block mb-12 will-change-transform"
        >
          {/* Tape decorations */}
          <div className="absolute -top-3 left-8 w-16 h-6 bg-yellow-400/80 rotate-[-5deg] border border-black/20" />
          <div className="absolute -top-3 right-8 w-16 h-6 bg-yellow-400/80 rotate-[5deg] border border-black/20" />

          <div className="bg-white border-[3px] border-black px-8 py-4 brutal-shadow rotate-1">
            <p className="font-bold text-lg md:text-xl uppercase tracking-wide text-black">
              Where Coding Meets Chaos & Creativity
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
          data-parallax="0.1"
        >
          <StampSticker rotation="-rotate-3" color="bg-orange-400">
            <span className="font-bold text-sm uppercase text-black">Date:</span>
            <span className="font-(--font-display) text-2xl md:text-3xl text-black">TBA 2026</span>
          </StampSticker>

          <StampSticker rotation="rotate-2" color="bg-cyan-400">
            <span className="font-bold text-sm uppercase text-black">Location:</span>
            <span className="font-(--font-display) text-2xl md:text-3xl text-black">DAU Campus</span>
          </StampSticker>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-black text-white border-[3px] border-black px-10 py-4 font-bold text-xl uppercase tracking-wide brutal-shadow-lg hover:bg-yellow-400 hover:text-black transition-colors"
            data-magnetic="0.3"
          >
            Get Notified →
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-0 w-full h-0.5 border-b-2 border-dashed border-black/20" />
    </section>
  )
}

function FloatingSticker({
  children,
  className,
  color,
}: { children: React.ReactNode; className?: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      className={`${className} ${color} border-[3px] border-black p-3 brutal-shadow cursor-pointer will-change-transform`}
    >
      {children}
    </motion.div>
  )
}

function StampSticker({ children, rotation, color }: { children: React.ReactNode; rotation: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0 }}
      className={`${color} ${rotation} border-[3px] border-black px-6 py-4 brutal-shadow flex flex-col items-center`}
      data-magnetic="0.2"
    >
      {children}
    </motion.div>
  )
}
