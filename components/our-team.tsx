"use client"

const teamData = {
  "Core Team": [
    "Pranshu Patel",
    "Kalp Chaniyara",
    "Atik Vohra",
    "Param Savjani",
    "Neel Khatri",
    "Aditya Vaish",
    "Nisarg Trivedi",
    "Zalak Thakkar",
    "Dhruvam Panchal"

  ],
  "Speaker Team": [
    "Nisarg Trivedi",
    "Neel Khatri",
    "Kalp Chaniyara",
    "Hrithik Patel",
    "Dhruvam Panchal",
    "Aditya Vaish"
  ],
  "Sponsorship Team": [
    "Pushkar Patel",
    "Jeel Aghera",
    "Khushi Gandhi",
    "Param Savjani"
  ],
  "PR Team": [
    "Anushree Katuri",
    "Ashka Pathak",
    "Sakina Kheraj",
    "Sumit Goyal"
  ]
}

export function OurTeam() {
  return (
    <section id="our-team" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 -z-10 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              currentColor 35px,
              currentColor 70px
            )`,
          }} />
        </div>

        {/* Main content card */}
        <div className="relative bg-linear-to-br from-red-300 via-red-400 to-pink-400 dark:from-red-400 dark:to-pink-500 rounded-2xl p-8 md:p-12 lg:p-16 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Mac-style window buttons */}
          <div className="flex gap-2 mb-8">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black" />
            <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black" />
            <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
          </div>

          {/* Heading */}
          <h2 className="font-black text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-12 text-black" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
          }}>
            Our Team
          </h2>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {Object.entries(teamData).map(([teamName, members]) => (
              <div key={teamName} className="space-y-4">
                {/* Team Name */}
                <h3 className="font-bold text-xl md:text-2xl text-black mb-6">
                  {teamName}
                </h3>
                
                {/* Team Members */}
                <ul className="space-y-3">
                  {members.map((member) => (
                    <li 
                      key={member}
                      className="font-mono text-sm md:text-base text-black"
                    >
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}