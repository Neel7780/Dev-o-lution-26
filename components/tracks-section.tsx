"use client"

import { motion } from "framer-motion"
import { Brain, Link, Cloud, Smartphone, Database, Shield } from "lucide-react"

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
  return (
    <section id="tracks" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl uppercase inline-block">
            <span className="bg-fuchsia-500 text-white px-4 py-2 border-[3px] border-black brutal-shadow rotate-[-1deg] inline-block">
              Event Tracks
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotate: index % 2 === 0 ? 2 : -2, scale: 1.02 }}
              className={`${track.color} ${track.textColor} border-[3px] border-black p-6 brutal-shadow-lg cursor-pointer transition-all hover:brutal-shadow`}
            >
              <track.icon className="w-12 h-12 mb-4" strokeWidth={2.5} />
              <h3 className="font-[var(--font-display)] text-2xl font-black uppercase mb-2">{track.title}</h3>
              <p className="font-medium opacity-80">{track.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
