"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowDown, Code, Users, Lightbulb } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white border-[3px] border-black brutal-shadow-lg p-8 md:p-12 torn-paper-top torn-paper-bottom"
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

          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-black">
            <p>
              <strong className="text-violet-600">DEVOLUTION</strong> is GDG DAU&apos;s flagship tech event. It&apos;s
              not just a conference; it&apos;s a{" "}
              <span className="bg-yellow-400 px-2 font-bold">collision of ideas</span>, code, and future tech.
            </p>
            <p>
              Join us for <span className="bg-cyan-400 px-2 font-bold">workshops</span>,
              <span className="bg-fuchsia-500 text-white px-2 font-bold ml-1">hackathons</span>, and
              <span className="bg-lime-400 px-2 font-bold ml-1">mind-blowing talks</span> from industry experts and
              community leaders.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <FeatureTag icon={<Code />} label="Code" color="bg-violet-500 text-white" />
            <FeatureTag icon={<Users />} label="Community" color="bg-cyan-400 text-black" />
            <FeatureTag icon={<Lightbulb />} label="Innovation" color="bg-yellow-400 text-black" />
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="absolute -bottom-16 right-8 text-black"
          >
            <ArrowDown size={48} strokeWidth={3} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function FeatureTag({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: -3 }}
      className={`${color} border-[3px] border-black px-4 py-2 brutal-shadow flex items-center gap-2 font-bold uppercase text-sm`}
    >
      {icon}
      {label}
    </motion.div>
  )
}
