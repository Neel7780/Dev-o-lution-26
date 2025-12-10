"use client"

import React, { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown, MessageCircleQuestion } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    q: "Who can participate?",
    a: "Dev-o-lution is open to all students and recent graduates passionate about technology and innovation.",
  },
  {
    q: "Is there a participation fee?",
    a: "Yes, There is! Please checkout the tickets on Unstop.",
  },
  {
    q: "What should I bring?",
    a: "Bring your laptop, charger, and any other devices you need for development. We'll provide a great coding atmosphere!",
  },
  {
    q: "Can I join as a speaker?",
    a: "We welcome speakers to share their knowledge. Check our timeline for speaker registration dates.",
  },
]

export function FAQs() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const faqItemsRef = useRef<(HTMLElement | null)[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Container entrance with 3D perspective
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 80,
          rotateX: 10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      )

      // Heading reveal with scramble effect
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 0.8,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        )
      }

      // FAQ items staggered entrance
      faqItemsRef.current.forEach((item, index) => {
        if (!item) return

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            rotateY: index % 2 === 0 ? -5 : 5,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.7,
            delay: index * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          }
        )
      })

      // Window controls bouncing entrance
      const windowControls = containerRef.current?.querySelector(".window-controls")
      if (windowControls) {
        gsap.fromTo(
          windowControls.children,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleFaq = (index: number) => {
    const item = faqItemsRef.current[index]
    if (!item) return

    const content = item.querySelector(".faq-content") as HTMLElement
    const icon = item.querySelector(".faq-icon") as HTMLElement
    const question = item.querySelector(".faq-question") as HTMLElement

    if (openIndex === index) {
      // Close
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      })
      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(question, {
        color: "inherit",
        duration: 0.2,
      })
      setOpenIndex(null)
    } else {
      // Close previously open item
      if (openIndex !== null) {
        const prevItem = faqItemsRef.current[openIndex]
        if (prevItem) {
          const prevContent = prevItem.querySelector(".faq-content") as HTMLElement
          const prevIcon = prevItem.querySelector(".faq-icon") as HTMLElement
          const prevQuestion = prevItem.querySelector(".faq-question") as HTMLElement
          
          gsap.to(prevContent, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          })
          gsap.to(prevIcon, {
            rotation: 0,
            duration: 0.3,
          })
          gsap.to(prevQuestion, {
            color: "inherit",
            duration: 0.2,
          })
        }
      }

      // Open clicked item
      gsap.set(content, { height: "auto", opacity: 1 })
      const autoHeight = content.offsetHeight
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: autoHeight,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      )
      gsap.to(icon, {
        rotation: 180,
        duration: 0.4,
        ease: "back.out(1.5)",
      })
      gsap.to(question, {
        color: "#8b5cf6",
        duration: 0.2,
      })

      // Bounce effect on the card
      gsap.fromTo(
        item,
        { scale: 1 },
        {
          scale: 1.02,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
        }
      )

      setOpenIndex(index)
    }
  }

  return (
    <section ref={sectionRef} className="px-4 py-16 md:py-20" style={{ perspective: "1200px" }}>
      <div className="max-w-6xl mx-auto">
        <div 
          ref={containerRef}
          className="relative bg-rose-400 border-4 border-black p-8 md:p-10 brutal-shadow-lg"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Window controls */}
          <div className="window-controls absolute -top-6 left-6 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-black hover:scale-110 transition-transform cursor-pointer" />
            <span className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black hover:scale-110 transition-transform cursor-pointer" />
            <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-black hover:scale-110 transition-transform cursor-pointer" />
          </div>

          {/* Decorative icon */}
          <div className="absolute -top-8 right-8 bg-violet-500 text-white p-3 border-3 border-black brutal-shadow rotate-6">
            <MessageCircleQuestion className="w-6 h-6" />
          </div>

          <h2 
            ref={headingRef}
            className="font-(--font-display) text-4xl md:text-5xl lg:text-6xl uppercase mb-8" 
            style={{ WebkitTextStroke: "2px black" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="grid gap-4 md:gap-5">
            {faqs.map((item, idx) => (
              <article 
                key={idx} 
                ref={(el) => { faqItemsRef.current[idx] = el }}
                className="bg-cyan-300 border-3 border-black brutal-shadow-sm cursor-pointer group overflow-hidden"
                onClick={() => toggleFaq(idx)}
                style={{ transformStyle: "preserve-3d" }}
                data-magnetic="0.05"
              >
                {/* Question header */}
                <div className="p-5 md:p-6 flex items-center justify-between gap-4">
                  <h3 className="faq-question font-bold text-lg md:text-xl tracking-wide transition-colors duration-200 flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-cyan-300 font-mono text-sm border-2 border-black">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.q}
                  </h3>
                  <div className="faq-icon flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center transition-transform">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
                
                {/* Answer content - starts hidden */}
                <div className="faq-content overflow-hidden" style={{ height: 0, opacity: 0 }}>
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <div className="border-t-2 border-black/20 pt-4">
                      <p className="text-sm md:text-base leading-relaxed font-mono text-black/90 pl-11">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover indicator line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-violet-500 group-hover:w-full transition-all duration-300" />
              </article>
            ))}
          </div>

          {/* Decorative corner elements */}
          <div className="absolute bottom-4 right-4 w-20 h-20 border-b-4 border-r-4 border-black/10 rounded-br-2xl" />
          <div className="absolute top-16 left-4 w-10 h-10 border-t-4 border-l-4 border-black/10 rounded-tl-2xl" />
        </div>
      </div>
    </section>
  )
}

export default FAQs
