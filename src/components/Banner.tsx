"use client"

import Image from 'next/image';

interface BannerProps {
    name: string;
    photo: string;
}

const BannerCard: React.FC<BannerProps> = ({ name, photo }) => (
    <div className="bg-[#ff6b6b] p-3 border-[3px] border-[#1a1a1a] shadow-neo-banner">
        <div className="flex flex-col">
            <Image src={photo} alt={name} width={1500} height={1500} className="mx-auto rounded-md border-[3px] border-[#1a1a1a] mb-2" />
            <h3 className="text-lg text-center font-bold">{name}</h3>
        </div>
    </div>
)

const speakers: BannerProps[] = [
    {
        name: "Rohan Hundia",
        photo: "/RohanHundia.jpg",
    },
    {
        name: "Hiren Dave",
        photo: "/HirenDave.jpg",
    },
    {
        name: "Paresh Mayani",
        photo: "/PareshMayani.jpg",
    },
    {
        name: "Abhinav Raj",
        photo: "/AbhinavRaj.jpg",
    },
    {
        name: "Jaydip Parikh",
        photo: "/JaydipParikh.jpg",
    },
    {
        name: "Ashish Patel",
        photo: "/AshishPatel.jpg",
    },
    {
        name: "Vrijraj Singh",
        photo: "/VrijrajSingh.jpg",
    },
    {
        name: "Jaydip Biniwale",
        photo: "/JaydipBiniwale.jpg"
    },
    {
        name: "Harsh Shah",
        photo: "/HarshShah.jpg",
    },
    {
        name: "Piyush Raj",
        photo: "/PiyushRaj.jpg",
    },
    {
        name: "Anirudh Khurana",
        photo: "/AnirudhK.jpg",
    },
    {
        name: "Kartik Derasari",
        photo: "/KartikD.jpg",
    },
    {
        name: "Amit Chopra",
        photo: "/AmitChopra.jpg",
    },
    {
        name: "Harsh Manvar",
        photo: "/HarshM.jpg",
    }
]

export default function Banner() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5e6d3] font-mono text-[#1a1a1a] overflow-x-hidden scroll-smooth">
            <div className="zigzag-bg fixed inset-0 z-0 opacity-20 pointer-events-none"></div>
            <main className="container mx-auto px-4 relative z-10 lg:px-16">
                <div className="bg-[#4ecdc4] p-4 border-[3px] border-[#1a1a1a] shadow-neo-banner">
                    <div className="grid grid-cols-2 lg:grid-cols-7 gap-2">
                        {speakers.map((speaker, index) => (
                            <BannerCard key={index} {...speaker} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}