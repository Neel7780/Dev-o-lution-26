"use client"

import { useEffect, useState } from "react"
import { MorphingBackground, FloatingParticles } from "@/components/morphing-background"

/**
 * Wrapper component that only renders heavy background animations on desktop.
 * This is the single biggest performance win for mobile devices.
 */
export function DesktopOnlyBackgrounds() {
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        // Check if desktop on mount and on resize
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024)
        }

        checkDesktop()
        window.addEventListener("resize", checkDesktop)
        return () => window.removeEventListener("resize", checkDesktop)
    }, [])

    // Only render on desktop (1024px+)
    if (!isDesktop) return null

    return (
        <>
            <MorphingBackground />
            <FloatingParticles />
        </>
    )
}
