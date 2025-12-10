"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!progressRef.current) return

    const ctx = gsap.context(() => {
      // Animate scroll progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      })

      // Update percentage counter
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (percentRef.current) {
            const percent = Math.round(self.progress * 100)
            percentRef.current.textContent = `${percent}%`
            
            // Color transition based on progress
            const hue = gsap.utils.interpolate([48, 180, 270], self.progress)
            gsap.set(progressRef.current, {
              background: `linear-gradient(90deg, 
                hsl(${hue}, 90%, 60%) 0%, 
                hsl(${hue + 30}, 90%, 50%) 100%
              )`,
            })
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to from-yellow-400 via-cyan-400 to-violet-500 z-[9998] origin-left"
        style={{ transform: "scaleX(0)" }}
      />
      
      {/* Progress percentage indicator */}
      <div
        ref={percentRef}
        className="fixed bottom-4 right-4 z-[9997] bg-black text-white border-2 border-black px-3 py-1 font-mono text-sm font-bold brutal-shadow hidden lg:block"
      >
        0%
      </div>
    </>
  )
}

