"use client";

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { PCWindow } from './UIComponents'
import SpaceStrip from './ui/spacebutton';
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PreviousEditions() {
    const speakers2015 = [
        {
            name: "Samir Motwani",
            topic: "Material UI",
            designation: "Entrepreneur, Creative Director, RapidOps Solutions",
            description: "Co-Founded RapidOps Solutions, a digital product development company. He follows practice of \"Being Real and Agile\". Samir is passionate about minimalistic design and love to conceptualize disruptive marketing ideas",
            image: "/Samir.jpeg"
        },
        {
            name: "Jayesh Anandani",
            topic: "Guest Talk - 1",
            designation: "Representative from Webelight Solutions",
            description: "",
            image: "/Jayesh.jpeg"
        },
        {
            name: "Dhrumil Shah",
            topic: "Android",
            designation: "Android Developer, Bugletech",
            description: "Co-Organizer of GDG Ahmedabad, A Passionate Android Developer, A researcher, A Techno-Freak, Great Sense of Humour, Funky Guy :)",
            image: "/Dhrumil.jpeg"
        },
        {
            name: "Jayesh Anandani",
            topic: "AngularJS",
            designation: "Founder, Webelight Solutions",
            description: "Founder of Webelight Solutions http://www.webelight.co.in, Web Service company. Intrapreneur, Growth Hacker, Technophile. Conducts meet-ups on AngularJS and UI/UX to empower local tech community with emerging technologies and concepts.",
            image: "/Jayesh.jpeg"
        },
        {
            name: "Dhaval Pandit",
            topic: "Guest Talk - 2",
            designation: "RapidOps Solutions",
            description: "RapidOps is a passionate team of designers and developers who are building creative application of the technology",
            image: "/Dhaval.jpeg"
        },
        {
            name: "Dushyant Jadeja",
            topic: "Deep Dive: Polymer and Material UI",
            designation: "GDG Bangalore",
            description: "",
            image: "/placeholder.jpeg"
        },
        {
            name: "Ishit",
            topic: "Guest Talk - 3",
            designation: "Startups and Business Strategies",
            description: "",
            image: "/placeholder.jpeg"
        },
    ];
    const speakers2016 = [
        {
            name: "Ankit and Kushan",
            topic: "Firebase and PWA",
            description: "This included a brief introduction followed by a hands-on session.",
            image: "/Ankit.jpeg"
        },
        {
            name: "Dipesh Patel",
            topic: "Angular 2.0",
            designation: "CTO at RapidOps",
            description: "The session started with a detailed introduction of Angular 2.0 including a structured breakdown of Angular 2.0 and the new features/improvements from Angular 1. Further typescript was introduced and how to use it was explained. A hands-on session for Angular 2.0 followed. By the end of the session everybody had developed a basic web page which used Angular 2.0 in it.",
            image: "/Dipesh.jpg"
        },
        {
            name: "Aakash Muttineni & Rishabh Bhardwaj",
            topic: "Android Nougat",
            description: "They showed all the new features that have been introduced this year along with some really good materialistic animations. Features like multi window, new notification panel design, minor ui changes were discussed. They also talked about the new virtual reality project introduced by Google known as Daydream. They ended the session with a bucket list for android I/O.",
            image: "/Aakash.jpg"
        },
        {
            name: "Chintan Soni",
            topic: "Material Design 2.0",
            description: "The session was very interactive and hands on. He provided detailed step by step guide on how to implement material design on Android studio. He also provided his GitHub ID for reference. He ended the session with a short Q&A.",
            image: "/Chintan.jpg"
        },
    ];
    const [selectedYear, setSelectedYear] = useState<'2015' | '2016'>('2015')

    return (
        <div className="min-h-screen bg-[#f5e6d3] font-mono text-[#1a1a1a] overflow-x-hidden">
            <div className="zigzag-bg fixed inset-0 z-0 opacity-20 pointer-events-none"></div>
            <SpaceStrip />
            <header className="fixed top-7 z-50 bg-[#ff6b6b] text-[#1a1a1a] p-4 border-b-4 border-[#1a1a1a] w-full">
                <nav className="container mx-auto flex justify-between items-center px-16">
                    <Link href="/" className="flex items-center md:space-x-1  retro-text">
                        <span className="text-xl md:text-3xl font-bold text-[#1a1a1a]">DEV</span>
                        <Image src="/planet.png" alt="Planet" width={40} height={40} className="ml-0.5 w-6 h-6 md:w-9 md:h-9 animate-spin" style={{ animation: "spin 10s linear infinite" }} />
                        <span className="text-xl md:text-3xl font-bold text-[#1a1a1a]">LUTION</span>
                    </Link>
                    <Button asChild>
                        <Link href="/" className=" bg-[#1a1a1a] text-[#f5e6d3] hover:bg-[#4ecdc4] hover:text-[#1a1a1a] transition-colors border hover:border-2 border-slate-200 hover:border-[#1a1a1a]">
                            Home
                        </Link>
                    </Button>
                </nav>
            </header>
            <main className="container mx-auto px-4 py-16 relative z-10 lg:px-16 mt-24">
                <section className="text-center mb-16">
                    <h1 className="text-4xl lg:text-6xl font-bold retro-text text-[#1a1a1a] mb-8">
                        Previous Editions
                    </h1>
                    <Tabs defaultValue="2015">
                        <TabsList className="flex mb-16 gap-4">
                        <TabsTrigger value="2015" onClick={() => setSelectedYear('2015')} className={`${selectedYear === '2015' ? 'bg-[#ff6b6b] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-[#f5e6d3]'} hover:bg-[#4ecdc4] hover:text-[#1a1a1a] border-2 border-[#1a1a1a]`}>2015</TabsTrigger>
                        <TabsTrigger value="2016" onClick={() => setSelectedYear('2016')} className={`${selectedYear === '2016' ? 'bg-[#ff6b6b] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-[#f5e6d3]'} hover:bg-[#4ecdc4] hover:text-[#1a1a1a] border-2 border-[#1a1a1a]`}>2016</TabsTrigger>
                        </TabsList>
                        <TabsContent value="2015">
                            <PCWindow title="GDG DA-IICT DevFest15 Report" className="mb-16">
                                <div className="space-y-8">
                                    {speakers2015.map((speaker, index) => (
                                        <div key={index} className="flex flex-col lg:flex-row gap-6 bg-[#ff6b6b] p-3 mt-4 border-4 border-[#1a1a1a] slide-in-animation">
                                            <div className="lg:w-1/4 flex-shrink-0 mx-auto">
                                                <Image src={speaker.image} alt={speaker.name} width={200} height={200} className="w-full aspect-square object-cover rounded-lg border-4 border-[#1a1a1a]" />
                                            </div>
                                            <div className="flex-grow">
                                                <h1 className="text-2xl font-extrabold text-center">{speaker.topic}</h1>
                                                <p className="text-left text-lg"><strong>Speaker:</strong> {speaker.name}</p>
                                                {speaker.designation && <p className="mb-2 text-left text-lg"><strong>Designation:</strong> {speaker.designation}</p>}
                                                {speaker.description && <p className="text-left text-lg font-bold">About Speaker</p>}
                                                <p className="text-left">{speaker.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PCWindow>
                        </TabsContent>
                        <TabsContent value="2016">
                            <PCWindow title="GDG DA-IICT DevFest16 Report" className="mb-16">
                                <div className="mb-6">
                                    <Button asChild className="bg-[#4ecdc4] text-[#1a1a1a] hover:bg-[#ff6b6b] text-lg px-8 py-6 rounded-none border-4 border-[#1a1a1a] transform hover:translate-x-2 hover:-translate-y-2 transition-transform shadow-neo">
                                        <Link target="_blank" href="https://ankit-m.github.io/gdgdaiict-website/">DevFest 2016 website</Link>
                                    </Button>
                                </div>
                                <div className="space-y-8">
                                    {speakers2016.map((speaker, index) => (
                                        <div key={index} className="flex flex-col lg:flex-row gap-6 bg-[#ff6b6b] p-3 mt-4 border-4 border-[#1a1a1a] slide-in-animation">
                                            <div className="lg:w-1/4 flex-shrink-0 mx-auto">
                                                <Image src={speaker.image} alt={speaker.name} width={200} height={200} className="w-full aspect-square object-cover rounded-lg border-4 border-[#1a1a1a]" />
                                            </div>
                                            <div className="flex-grow">
                                                <h1 className="text-2xl font-extrabold text-center">{speaker.topic}</h1>
                                                <p className="text-left text-lg"><strong>Speaker:</strong> {speaker.name}</p>
                                                {speaker.designation && <p className="mb-2 text-left text-lg"><strong>Designation:</strong> {speaker.designation}</p>}
                                                {speaker.description && <p className="text-left text-lg font-bold">About Session</p>}
                                                <p className="text-left">{speaker.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PCWindow>
                        </TabsContent>
                    </Tabs>
                </section>
                <div className="text-center">
                    <Button asChild className="bg-[#4ecdc4] text-[#1a1a1a] hover:bg-[#ff6b6b] text-lg px-8 py-4 rounded-none border-4 border-[#1a1a1a] transform hover:translate-x-2 hover:-translate-y-2 transition-transform shadow-neo">
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </main>
            <footer className="bg-gray-950 text-[#f5e6d3] py-8 z-20 relative">
                <div className="container mx-auto">
                    <p className="lg:text-center md:text-center">
                        &copy; 2025 Dev-o-lution | Organized by GDG on Campus DA-IICT
                    </p>
                    <div className="flex text-center flex-col lg:flex-row lg:justify-center mt-4 gap-2 z-20">
                        <div className="sm:text-center sm:block flex-col flex gap-1">
                            <Link target="_blank" href="https://github.com/ossdaiict" className="text-[#4ecdc4] hover:text-[#ff6b6b] transition-colors hover-lift p-2">OSS-GitHub</Link>
                            <Link target="_blank" href="https://github.com/gdg-da" className="text-[#4ecdc4] hover:text-[#ff6b6b] transition-colors hover-lift p-2">GDG-GitHub</Link>
                            <Link target="_blank" href="https://www.linkedin.com/company/gdg-on-campus-daiict/" className="text-[#4ecdc4] hover:text-[#ff6b6b] transition-colors hover-lift p-2">LinkedIn</Link>
                            <Link target="_blank" href="https://www.instagram.com/gdg.daiict/" className="text-[#4ecdc4] hover:text-[#ff6b6b] transition-colors hover-lift p-2">Instagram</Link>
                            <Link target="_blank" href="https://x.com/gdgdaiict" className="text-[#4ecdc4] hover:text-[#ff6b6b] transition-colors hover-lift p-2">X(Twitter)</Link>
                            <Link target="_blank" href="https://slop.dscdaiict.in/" className="text-[#4ecdc4] hover:text-[#ff6b6b] transition-colors hover-lift p-2">SLoP</Link>
                            <Link target="_blank" href="https://dscdaiict.in/" className="text-[#4ecdc4] hover:text-[#ff6b6b] transition-colors hover-lift p-2">GDG on Campus DA-IICT</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}