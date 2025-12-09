"use client"

export function MarqueeStrip() {
  const items = [
    "WEB3",
    "AI & ML",
    "CLOUD NATIVE",
    "OPEN SOURCE",
    "DEVOLUTION 2026",
    "GDG DAU",
    "HACKATHON",
    "WORKSHOPS",
  ]

  return (
    <div className="bg-yellow-400 border-y-4 border-black py-4 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-(--font-display) text-2xl md:text-3xl uppercase mx-6 flex items-center gap-4 text-black"
          >
            <span>///</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
