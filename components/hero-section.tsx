"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Sparkles, Zap, Star, Cloud } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-16 px-4 overflow-hidden">
      <FloatingSticker className="absolute top-24 left-[5%] rotate-12" color="bg-cyan-400">
        <Sparkles className="w-6 h-6 text-black" />
      </FloatingSticker>
      <FloatingSticker className="absolute top-40 right-[8%] -rotate-6" color="bg-yellow-400">
        <Zap className="w-6 h-6 text-black" />
      </FloatingSticker>
      <FloatingSticker className="absolute bottom-32 left-[10%] rotate-6" color="bg-lime-400">
        <Star className="w-6 h-6 text-black" />
      </FloatingSticker>
      <FloatingSticker className="absolute top-60 left-[15%] -rotate-12" color="bg-pink-400">
        <Cloud className="w-6 h-6 text-black" />
      </FloatingSticker>

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
          initial={{ opacity: 0, y: 20, rotate: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative inline-block mb-12"
        >
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
}: { children: React.ReactNode; className: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
      whileHover={{ scale: 1.2, rotate: 10 }}
      className={`${className} ${color} border-[3px] border-black p-3 brutal-shadow cursor-pointer`}
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
    >
      {children}
    </motion.div>
  )
}
