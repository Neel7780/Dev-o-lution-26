import type React from "react"
import type { Metadata } from "next"
import { Archivo_Black, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollProgress } from "@/components/scroll-progress"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-archivo",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

export const metadata: Metadata = {
  title: "DEVOLUTION 2026 | DSC DAU",
  description: "Devolution 2026 - Where Coding Meets Chaos & Creativity. DSC DAU's (formerly GDG on Campus DAU) flagship tech conference.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${spaceGrotesk.variable} font-sans antialiased cursor-auto lg:cursor-none`}>
        <CustomCursor />
        <ScrollProgress />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
