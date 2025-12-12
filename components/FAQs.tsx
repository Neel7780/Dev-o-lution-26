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
    <section ref={sectionRef} className="px-4 py-16 md:py-24" style={{ perspective: "1200px" }}>
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="font-(--font-display) text-4xl sm:text-5xl md:text-7xl uppercase inline-block"
          >
            <span className="bg-pink-400 text-black px-3 md:px-4 py-2 border-[3px] border-black brutal-shadow rotate-1 inline-block">
              FAQs
            </span>
          </h2>
        </div>

        <div 
          ref={containerRef}
          className="grid gap-5"
          style={{ transformStyle: "preserve-3d" }}
        >
          {faqs.map((item, idx) => (
            <article 
              key={idx} 
              ref={(el) => { faqItemsRef.current[idx] = el }}
              className="bg-yellow-400 border-[3px] border-black brutal-shadow-lg hover:shadow-[8px_8px_0px_0px_#000] cursor-pointer group overflow-hidden transition-all duration-300"
              onClick={() => toggleFaq(idx)}
              style={{ transformStyle: "preserve-3d" }}
              data-magnetic="0.05"
            >
              {/* Question header */}
              <div className="p-5 md:p-6 flex items-center justify-between gap-4">
                <h3 className="faq-question font-bold text-base md:text-lg tracking-wide transition-colors duration-200 flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-black text-yellow-400 font-mono text-sm font-black shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {item.q}
                </h3>
                <div className="faq-icon shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
              
              {/* Answer content - starts hidden */}
              <div className="faq-content overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <div className="border-t-[3px] border-black/20 pt-4 pl-11">
                    <p className="text-sm md:text-base leading-relaxed font-semibold text-black/90">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQs
