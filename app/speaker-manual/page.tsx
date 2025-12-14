"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { ArrowLeft, Calendar, Users, Mic, Star, Brain, Link as LinkIcon, Cloud, Smartphone, Database, Shield, Rocket } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DesktopOnlyBackgrounds } from "@/components/desktop-only-backgrounds"

gsap.registerPlugin(ScrollTrigger)

const sessionFormats = [
  {
    title: "Keynote Talks",
    duration: "30–45 minutes",
    description: "Share your groundbreaking work and vision with the community.",
    color: "bg-cyan-400",
  },
  {
    title: "Technical Workshops",
    duration: "90–120 minutes",
    description: "Lead an immersive, hands-on session sharing your specialized expertise.",
    color: "bg-violet-500",
  },
]

const tracks = [
  {
    title: "AI/ML & GenAI",
    description: "Artificial Intelligence & Machine Learning",
    icon: Brain,
    color: "bg-cyan-400",
  },
  {
    title: "Web3 & Blockchain",
    description: "Decentralized Technologies",
    icon: LinkIcon,
    color: "bg-yellow-400",
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure & Operations",
    icon: Cloud,
    color: "bg-violet-500",
  },
  {
    title: "Mobile & Web",
    description: "Application Development",
    icon: Smartphone,
    color: "bg-lime-400",
  },
  {
    title: "Data Engineering",
    description: "Data Architecture & Analytics",
    icon: Database,
    color: "bg-orange-400",
  },
  {
    title: "Cyber Security",
    description: "Security & Privacy",
    icon: Shield,
    color: "bg-pink-400",
  },
  {
    title: "Startup & Innovation",
    description: "Entrepreneurship & Product Development",
    icon: Rocket,
    color: "bg-fuchsia-500",
  },
]

const benefits = [
  {
    icon: Star,
    title: "Industry Recognition",
    description: "Position yourself as a thought leader in your domain and expand your professional influence.",
  },
  {
    icon: Users,
    title: "Elite Network Access",
    description: "Connect with top-tier speakers, innovators, and decision-makers from leading organizations.",
  },
  {
    icon: Mic,
    title: "Platform Amplification",
    description: "Leverage our extensive community reach to amplify your message and personal brand.",
  },
]

const perks = [
  "VIP access to all conference sessions and exclusive speaker lounge",
  "Direct engagement with 500+ developers, technologists, and industry professionals",
  "Featured promotion across GDG on Campus DA-IICT's social media and marketing channels",
  "Professional photography and videography of your session",
  "Certificate of appreciation and speaker recognition",
]

export default function SpeakersPage() {
  const heroRef = useRef<HTMLElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const isLowEndDevice = window.innerWidth < 768 || navigator.hardwareConcurrency <= 4

    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          {
            opacity: 0,
            y: isMobile ? 30 : 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.6 : 0.8,
            stagger: 0.1,
            ease: "power3.out",
          }
        )
      }

      // Section animations
      sectionsRef.current.forEach((section) => {
        if (!section) return

        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: isMobile ? 40 : 60,
            rotateX: isMobile || isLowEndDevice ? 0 : 5,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: isMobile ? 0.5 : 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      {/* Animated background elements - desktop only for performance */}
      <DesktopOnlyBackgrounds />

      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors mb-12 group font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-wide">Back to Home</span>
          </Link>

          <div className="text-center mb-8">
            <div className="inline-block mb-8">
              <div className="bg-yellow-400 border-[3px] border-black px-6 py-2 brutal-shadow -rotate-2">
                <span className="font-(--font-display) text-sm md:text-base text-black tracking-wider uppercase">
                  Call For Speakers
                </span>
              </div>
            </div>

            <h1 className="font-(--font-display) text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase mb-8 leading-tight">
              <span className="inline-block bg-cyan-400 text-black px-3 md:px-4 border-[3px] border-black brutal-shadow rotate-1 mb-2">SHARE YOUR </span>
              <span className="inline-block bg-orange-400 text-black px-3 md:px-4 border-[3px] border-black brutal-shadow -rotate-1 mb-2">EXPERTISE AT </span>
              <span className="inline-block bg-violet-500 text-white px-3 md:px-4 border-[3px] border-black brutal-shadow rotate-1">DEV-O-LUTION</span>
            </h1>

            <p className="text-lg md:text-2xl font-bold text-black/70 max-w-3xl mx-auto">
              Inspire 500+ developers and shape the future of technology
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section 
        ref={(el) => { sectionsRef.current[0] = el }}
        className="py-12 md:py-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border-[3px] border-black brutal-shadow-lg p-8 md:p-12">
            <h2 className="font-(--font-display) text-3xl md:text-4xl uppercase mb-6 inline-block">
              <span className="bg-lime-400 text-black px-3 py-1 border-[3px] border-black brutal-shadow -rotate-1">
                Your Expertise Matters
              </span>
            </h2>
            <p className="text-lg md:text-xl text-black/80 leading-relaxed mb-6">
              Dev-o-lution 2026 is seeking exceptional speakers like you to inspire, educate, and lead our community of 500+ developers and technologists.
            </p>
            <p className="text-lg md:text-xl text-black/80 leading-relaxed">
              As an industry expert, your unique insights and experiences will shape the future of technology in Gandhinagar and beyond. We invite you to share your groundbreaking work, innovative solutions, and vision for the tech landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section 
        ref={(el) => { sectionsRef.current[1] = el }}
        className="py-12 md:py-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border-[3px] border-black brutal-shadow-lg p-8 md:p-12">
            <h2 className="font-(--font-display) text-3xl md:text-4xl uppercase mb-6 inline-block">
              <span className="bg-fuchsia-500 text-white px-3 py-1 border-[3px] border-black brutal-shadow rotate-1">
                Your Audience
              </span>
            </h2>
            <p className="text-lg text-black/80 mb-6">
              You&apos;ll be presenting to an eager audience of passionate technologists, including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Aspiring Developers & Engineers", "Tech Innovators & Designers", "ML/AI Enthusiasts", "Data Scientists & Analysts", "Startup Founders & Entrepreneurs", "Technology Leaders"].map((audience, index) => (
                <div key={index} className="bg-yellow-400 border-2 border-black p-4 flex items-center gap-3">
                  <Star className="w-5 h-5 text-black shrink-0" />
                  <span className="font-bold text-black">{audience}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Formats */}
      <section 
        ref={(el) => { sectionsRef.current[2] = el }}
        className="py-12 md:py-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border-[3px] border-black brutal-shadow-lg p-8 md:p-12">
            <h2 className="font-(--font-display) text-3xl md:text-4xl uppercase mb-8 inline-block">
              <span className="bg-orange-400 text-black px-3 py-1 border-[3px] border-black brutal-shadow -rotate-1">
                Session Formats
              </span>
            </h2>
            <div className="space-y-6">
              {sessionFormats.map((format, index) => (
                <div key={index} className={`${format.color} ${format.color === 'bg-violet-500' ? 'text-white' : 'text-black'} border-[3px] border-black p-6 brutal-shadow`}>
                  <h3 className="font-(--font-display) text-2xl uppercase mb-2">
                    {format.title}
                  </h3>
                  <p className="text-sm font-bold mb-2">Duration: {format.duration}</p>
                  <p className="font-bold">{format.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section 
        ref={(el) => { sectionsRef.current[3] = el }}
        className="py-12 md:py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-[3px] border-black brutal-shadow-lg p-8 md:p-12">
            <h2 className="font-(--font-display) text-3xl md:text-4xl uppercase mb-6 inline-block">
              <span className="bg-cyan-400 text-black px-3 py-1 border-[3px] border-black brutal-shadow rotate-1">
                Conference Tracks
              </span>
            </h2>
            <p className="text-lg text-black/80 mb-8">
              Choose the track that aligns with your expertise. We welcome innovative topics and fresh perspectives within these domains:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tracks.map((track, index) => {
                const Icon = track.icon
                return (
                  <div key={index} className={`${track.color} border-[3px] border-black p-6 brutal-shadow-lg transform hover:-translate-y-1 transition-transform`}>
                    <Icon className="w-12 h-12 text-black mb-4" />
                    <h3 className="font-(--font-display) text-xl uppercase mb-2 text-black">
                      {track.title}
                    </h3>
                    <p className="text-black/80 font-bold text-sm">{track.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section 
        ref={(el) => { sectionsRef.current[4] = el }}
        className="py-12 md:py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-[3px] border-black brutal-shadow-lg p-8 md:p-12">
            <h2 className="font-(--font-display) text-3xl md:text-4xl uppercase mb-8 inline-block">
              <span className="bg-violet-500 text-white px-3 py-1 border-[3px] border-black brutal-shadow -rotate-1">
                Speaker Benefits
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="bg-lime-400 border-[3px] border-black p-6 brutal-shadow-lg transform hover:-translate-y-1 transition-transform">
                    <Icon className="w-12 h-12 text-black mb-4" />
                    <h3 className="font-(--font-display) text-xl uppercase mb-3 text-black">
                      {benefit.title}
                    </h3>
                    <p className="text-black/80 font-bold text-sm">{benefit.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section 
        ref={(el) => { sectionsRef.current[5] = el }}
        className="py-12 md:py-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white border-[3px] border-black brutal-shadow-lg p-8 md:p-12">
            <h2 className="font-(--font-display) text-3xl md:text-4xl uppercase mb-6 inline-block">
              <span className="bg-fuchsia-500 text-white px-3 py-1 border-[3px] border-black brutal-shadow rotate-1">
                What You&apos;ll Receive
              </span>
            </h2>
            <div className="space-y-4">
              {perks.map((perk, index) => (
                <div key={index} className="bg-yellow-400 border-2 border-black p-4 flex items-start gap-3">
                  <Star className="w-6 h-6 text-black shrink-0 mt-0.5" />
                  <span className="font-bold text-black">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Dates */}
      <section 
        ref={(el) => { sectionsRef.current[6] = el }}
        className="py-12 md:py-20 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-500 border-[3px] border-black brutal-shadow-lg p-8 md:p-12 text-center">
            <Calendar className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="font-(--font-display) text-3xl md:text-4xl uppercase mb-4 text-white">
              Submission Deadline
            </h2>
            <p className="font-(--font-display) text-2xl md:text-3xl uppercase text-white">
              December 31, 2024
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => { sectionsRef.current[7] = el }}
        className="py-12 md:py-32 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-r from-cyan-400 via-yellow-400 to-violet-500 border-[3px] border-black brutal-shadow-lg p-12 md:p-16 text-center">
            <h2 className="font-(--font-display) text-3xl md:text-5xl uppercase mb-6 text-black">
              Ready to Inspire?
            </h2>
            <p className="text-lg md:text-xl font-bold text-black/80 mb-8 max-w-2xl mx-auto">
              Submit your proposal and join us in creating an unforgettable experience for the tech community.
            </p>
            <a
              href="https://forms.gle/YourFormLink"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white border-[3px] border-black px-8 py-4 font-(--font-display) text-xl uppercase brutal-shadow-lg hover:shadow-[8px_8px_0px_0px_#000] hover:-translate-y-1 transition-all"
            >
              Submit Your Proposal
            </a>
            <p className="mt-8 text-black/70 font-bold">
              Questions? Reach out to us at <a href="mailto:dsc@daiict.ac.in" target="_blank" rel="noopener noreferrer" className="text-black underline hover:text-white transition-colors">dsc@daiict.ac.in</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
