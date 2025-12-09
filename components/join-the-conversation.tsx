"use client"

import { Twitter } from "lucide-react"

export function JoinTheConversation() {
  return (
    <section id="join-the-conversation" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              currentColor 35px,
              currentColor 70px
            )`,
          }} />
        </div>

        {/* Main content card */}
        <div className="relative bg-gradient-to-br from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600 rounded-2xl p-8 md:p-12 lg:p-16 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Mac-style window buttons */}
          <div className="flex gap-2 mb-8">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black" />
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black" />
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
          </div>

          {/* Heading */}
          <h2 className="font-[var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-8 text-black text-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
          }}>
            Join the Conversation
          </h2>

          {/* CTA Text */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-black mb-6 text-center">
            Use our hashtag and win prizes!
          </p>

          {/* Hashtag with Twitter Icon */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <Twitter className="w-8 h-8 md:w-10 md:h-10 text-black" fill="currentColor" />
            <span className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              #dev_o_lution
            </span>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-black text-center max-w-4xl mx-auto">
            Share your excitement, ideas, or projects on Twitter using our hashtag for a chance to win amazing prizes!
          </p>
        </div>
      </div>
    </section>
  )
}