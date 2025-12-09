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
    <section id="our-team" className="py-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Decorative background removed */}
        {/* Main content card */}
        <div className="relative bg-linear-to-br from-red-300 via-red-400 to-pink-400 dark:from-red-400 dark:to-pink-500 rounded-2xl p-6 md:p-8 lg:p-10 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          {/* Mac-style window buttons (positioned outside like other sections) */}
          <div className="absolute -top-6 left-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 border-2 border-black" />
            <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
          </div>

          {/* Heading */}
          <h2 className="font-black text-2xl md:text-3xl lg:text-4xl uppercase mb-8 text-black" style={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
          }}>
            Our Team
          </h2>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {Object.entries(teamData).map(([teamName, members]) => (
              <div key={teamName} className="space-y-4">
                {/* Team Name */}
                <h3 className="font-bold text-lg md:text-xl text-black mb-4">
                  {teamName}
                </h3>
                
                {/* Team Members */}
                <ul className="space-y-3">
                  {members.map((member) => (
                    <li key={member} className="font-mono text-xs md:text-sm text-black">
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