"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { PCWindow, GlitchText } from "./UIComponents";
import { TypeAnimation } from "react-type-animation";
import { Linkedin, ArrowUpRight } from 'lucide-react';
import SpaceButton from './ui/spacebutton';

interface SpeakerProps {
    name: string;
    photo: string;
    linkedin: string;
    position: string;
    about: string;
    link: string;
    linkText: string;
}

const SpeakerCard: React.FC<SpeakerProps> = ({ name, photo, linkedin, position, about, link, linkText }) => (
    <div className="bg-[#ff6b6b] p-6 border-4 border-[#1a1a1a] shadow-neo hover:translate-x-1 hover:-translate-y-1 transition-transform">
        <div className="flex flex-col mb-4">
            <Image src={photo} alt={name} width={1500} height={1500} className="mx-auto w-40 lg:w-52 rounded-md border-4 border-[#1a1a1a] mb-4" />
            <h3 className="text-lg font-bold mb-2">{name}</h3>
            <p className="text-base font-bold mb-2">{position}</p>
            {link && (<a href={link} target="_blank" rel="noopener noreferrer" className="flex gap-2 text-[#1a1a1a] hover:text-[#4ecdc4] underline mb-2"><ArrowUpRight />{linkText}</a>)}
            <div className="flex space-x-4">
                {linkedin && (
                    <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a] hover:text-[#4ecdc4]">
                        <Linkedin size={24} />
                    </Link>
                )}
            </div>
        </div>
        <p className="text-sm">{about}</p>
    </div>
);

const speakers: SpeakerProps[] = [
    {
        name: "Rohan Hundia",
        photo: "/RohanHundia.jpg",
        linkedin: "https://www.linkedin.com/in/rohan-hundia-38a94692/",
        position: "CEO at Unada Labs",
        about: "Rohan is the Co-Founder and CEO of Unada Labs. As tech entrepreneur driving Unada Labs and as a serial entrepreneur, Rohan and team are poised to transform three major industries - real estate, finance and healthcare with disruptive tech.",
        link: "",
        linkText: ""
    },
    {
        name: "Hiren Dave",
        photo: "/HirenDave.jpg",
        linkedin: "https://www.linkedin.com/in/davehiren/",
        position: "Senior Principal Software Engineer at iBASEt",
        about: "CTO, Product Manager, Entrepreneur, Tech Author, Blogger and Speaker with more than 11 years of industry experience.",
        link: "",
        linkText: ""
    },
    {
        name: "Paresh Mayani",
        photo: "/PareshMayani.jpg",
        linkedin: "https://www.linkedin.com/in/pareshmayani/",
        position: "Founder & CEO at SolGuruz",
        about: "Tech Innovator | Crafting Pixel-Perfect Software Solutions | Expert in Offshore Development Teams | Bespoke Software Development Specialist | Organizer, Google Developers Group Ahmedabad",
        link: "https://solguruz.com/",
        linkText: "SolGuruz"
    },
    {
        name: "Abhinav Raj",
        photo: "/AbhinavRaj.jpg",
        linkedin: "https://www.linkedin.com/in/abhinav-raj-234497159/",
        position: "Senior Software Engineer at Headout ",
        about: "Experienced Developer with a demonstrated history of working in the information technology and services industry.",
        link: "",
        linkText: ""
    },
    {
        name: "Jaydip Parikh",
        photo: "/JaydipParikh.jpg",
        linkedin: "https://www.linkedin.com/in/jaydipparikh/",
        position: "Founder at Tej SolPro",
        about: "Jaydip Parikh is a Digital Marketing Expert with over 20 years of experience in SEO, B2B Marketing, Digital Lead Generation, eCommerce, SaaS Marketing and other aspects.",
        link: "",
        linkText: ""
    },
    {
        name: "Ashish Patel",
        photo: "/AshishPatel.jpg",
        linkedin: "https://www.linkedin.com/in/ashishpatel2604",
        position: "Senior AWS AI/ML Solution Architect at IBM",
        about: "Ashish has over 12+ years, Author, Data Scientist and Researcher with 8+ Years of Experience of Data Science technology and Research experience in wide functions including predictive modelling, data preprocessing, feature engineering, machine learning and deep learning.",
        link: "",
        linkText: ""
    },
    {
        name: "Vrijraj Singh",
        photo: "/VrijrajSingh.jpg",
        linkedin: "https://www.linkedin.com/in/vrijrajsingh/",
        position: "GDE Firebase",
        about: "Vrijraj is a community champion by passion. He was an organizer for GDG Jalandhar for 7 years. He is a Google Developers Expert for Firebase and Web Technologies.",
        link: "",
        linkText: ""
    },
    {
        name: "Jaydip Biniwale",
        photo: "/JaydipBiniwale.jpg",
        linkedin: "https://www.linkedin.com/in/biniwale/",
        position: "Sr. Software Engineer - AI, TrackWizz",
        about: "NVIDIA Certified AI Engineer | IIM-A | Sr. Software Engineer- AI | TrackWizz | Data Scientist | Python | Ex-CTO at Downtown | Generative AI | Computer Vision | NLP | Pytorch",
        link: "",
        linkText: ""
    },
    {
        name: "Harsh Shah",
        photo: "/HarshShah.jpg",
        linkedin: "https://www.linkedin.com/in/harshcrop/",
        position: "CTO at Pedals Up",
        about: "Harsh Shah is a self-taught developer and the CTO at Pedals Up. With a passion for technology and a curiosity that knows no bounds, he has mastered various programming languages, including C, C++, HTML, CSS, JavaScript, Python, and SQL.",
        link: "",
        linkText: ""
    },
    {
        name: "Piyush Raj",
        photo: "/PiyushRaj.jpg",
        linkedin: "https://in.linkedin.com/in/piyushella",
        position: "Founder, CEO at Vedilink",
        about: "Product designer and programmer who enjoys solving real-life problems. Currently building a haven for students trying to improve our education system a little.",
        link: "",
        linkText: ""
    },
    {
        name: "Anirudh Khurana",
        photo: "/AnirudhK.jpg",
        linkedin: "https://www.linkedin.com/in/anirudh-khurana",
        position: "Founder at Code and Debug",
        about: "Founder at Code and Debug | Full Stack Developer | DSA Trainer | Educator with a Mission",
        link: "",
        linkText: ""
    },
    {
        name: "Kartik Derasari",
        photo: "/KartikD.jpg",
        linkedin: "https://www.linkedin.com/in/kartikderasari/",
        position: "Engineering Lead at Persistent Systems | Google Developer Expert",
        about: "Kartik Derasari is a highly skilled and passionate Solutions Engineer and a Developer Advocate with a proven track record of success in designing and implementing innovative technology solutions.",
        link: "",
        linkText: ""
    },
    {
        name: "Amit Chopra",
        photo: "/AmitChopra.jpg",
        linkedin: "https://www.linkedin.com/in/amitchopra/",
        position: "Product Management Consultant (Ex-Microsoft, Ex-Amazon, Ex-Google, Ex-Meta)",
        about: "Amit is a technology enthusiast who thrives on exploring the latest advancements. As an engaging speaker, he captivate audiences with his passion, expertise, and ability to translate complex concepts into compelling narratives.",
        link: "",
        linkText: ""
    },
    {
        name: "Harsh Manvar",
        photo: "/HarshM.jpg",
        linkedin: "https://www.linkedin.com/in/harsh-manvar-64a30aa3/",
        position: "GDE, Docker Captain, CNCF Ambassador",
        about: "Harsh is Seasoned Senior Software Engineer at Oracle. With over half decade of experience in the tech industry as Software & DevOps Engineer.",
        link: "",
        linkText: ""
    },
    {
        name: "Shubham Pachori",
        photo: "/ShubhamP.jpg",
        linkedin: "https://www.linkedin.com/in/shubham-pachori-b5703a86/",
        position: "Head of Product & Founding Member at Shipmnts",
        about: "Passionate about building products that solve real-world complex problems in the most simplified and user-centric way. Have successfully built, launched, and monetized over 5 enterprise B2B SaaS products in the domain of supply chain and fintech",
        link: "",
        linkText: ""
    },
    {
        name: "Saurabh Mishra",
        photo: "/Saurabh.png",
        linkedin: "https://www.linkedin.com/in/connectsaurabhmishra/",
        position: "DevOps Lead at TSYS | GDE Cloud",
        about: "IT Professional with 13 years + experience in DevOps, Cloud Infrastructure Architect, Automation and System Engineering.",
        link: "",
        linkText: ""
    }
]

export default function SpeakersPage() {
    return (
        <div className="min-h-screen bg-[#f5e6d3] font-mono text-[#1a1a1a] overflow-x-hidden scroll-smooth">
            <div className="zigzag-bg fixed inset-0 z-0 opacity-20 pointer-events-none"></div>
            <SpaceButton />
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
                    <GlitchText text="Our Speakers" className="text-6xl font-bold mb-4 retro-text text-[#1a1a1a]" />
                    <TypeAnimation
                        sequence={["Meet the speakers who will be sharing their knowledge and expertise at Dev-o-lution 2025."]}
                        style={{ display: "inline-block" }}
                        className="text-base md:text-2xl mb-8 myfont font-normal bold"
                    />
                </section>
                <PCWindow title="" className="mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {speakers.map((speaker, index) => (
                            <SpeakerCard key={index} {...speaker} />
                        ))}
                    </div>
                </PCWindow>
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