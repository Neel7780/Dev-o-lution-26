"use client"

import { motion } from "framer-motion"
import { HelpCircle, Lock } from "lucide-react"

const speakers = [1, 2, 3, 4]

export function SpeakersSection() {
  return (
    <section id="speakers" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl font-black uppercase inline-block">
            <span className="bg-orange-400 text-black px-4 py-2 border-[3px] border-black brutal-shadow -rotate-1 inline-block">
              The Lineup
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute top-32 right-4 md:right-20 z-20"
        >
          <div className="bg-red-600 text-white border-[4px] border-red-800 px-6 py-3 brutal-shadow transform">
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6" />
              <span className="font-[var(--font-display)] text-xl md:text-2xl font-black uppercase">Top Secret</span>
            </div>
            <span className="text-sm font-bold uppercase tracking-wider">TBA</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {speakers.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotate: index % 2 === 0 ? 3 : -3, scale: 1.05 }}
              className="bg-white border-[3px] border-black p-3 brutal-shadow-lg"
              style={{ transform: `rotate(${(index - 1.5) * 2}deg)` }}
            >
              <div className="aspect-square bg-black/10 border-2 border-black flex flex-col items-center justify-center mb-3">
                <HelpCircle className="w-16 h-16 md:w-20 md:h-20 text-black/30 mb-2" />
                <span className="font-bold text-black/40 text-sm uppercase">???</span>
              </div>

              <div className="text-center py-2">
                <p className="font-[var(--font-display)] text-sm md:text-base font-black uppercase text-black/60">
                  Speaker Reveal
                </p>
                <p className="text-xs md:text-sm font-bold uppercase text-violet-600">Coming Soon</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-lg md:text-xl font-bold text-black/60"
        >
          🎤 Industry experts & community legends incoming... Stay tuned!
        </motion.p>
      </div>
    </section>
  )
}
