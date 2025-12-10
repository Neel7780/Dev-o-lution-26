import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MarqueeStrip } from "@/components/marquee-strip"
import { AboutSection } from "@/components/about-section"
import { TimelineSection } from "@/components/timeline-section"
import { SpeakersSection } from "@/components/speakers-section"
import { FAQs } from "@/components/FAQs"
import PartnerWithUs from "@/components/Partner-with-us"
import { Footer } from "@/components/footer"
import { OurTeam } from "@/components/our-team"
import { JoinTheConversation } from "@/components/join-the-conversation"

// Animated components
import { HorizontalScrollSection } from "@/components/horizontal-scroll-section"
import { VelocityScrollSection } from "@/components/scroll-velocity"
import { MorphingBackground, FloatingParticles } from "@/components/morphing-background"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden relative">
      {/* Animated background elements */}
      <MorphingBackground />
      <FloatingParticles />
      
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      
      {/* Horizontal scroll tracks section */}
      <HorizontalScrollSection />
      
      <TimelineSection />
      <SpeakersSection />
      
      {/* Velocity-based scroll section */}
      <VelocityScrollSection />
      
      <JoinTheConversation />
      <OurTeam />
      <PartnerWithUs />
      <FAQs />
      <Footer />
    </main>
  )
}
