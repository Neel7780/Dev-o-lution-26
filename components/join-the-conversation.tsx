"use client"

import { Twitter } from "lucide-react"

export function JoinTheConversation() {
  return (
    <section id="join-the-conversation" className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Decorative background removed */}
        {/* Main content card */}
        <div className="relative bg-linear-to-br from-teal-400 to-teal-500 dark:from-teal-500 dark:to-teal-600 rounded-2xl p-6 md:p-8 lg:p-10 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          {/* Mac-style window buttons (positioned outside like other sections) */}
          <div className="absolute -top-6 left-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
          </div>

          {/* Heading */}
          <h2 className="font-(--font-display) text-2xl md:text-3xl lg:text-4xl uppercase mb-6 text-black text-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
          }}>
            Join the Conversation
          </h2>

          {/* CTA Text */}
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-black mb-4 text-center">
            Use our hashtag and win prizes!
          </p>

          {/* Hashtag with Twitter Icon */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Twitter className="w-6 h-6 md:w-8 md:h-8 text-black" fill="currentColor" />
            <span className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-black">
              #dev_o_lution
            </span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base lg:text-lg text-black text-center max-w-3xl mx-auto">
            Share your excitement, ideas, or projects on Twitter using our hashtag for a chance to win amazing prizes!
          </p>
        </div>
      </div>
    </section>
  )
}