"use client"

import { useDarkMode } from "@/context/DarkModeContext"

type TestimonialCardProps = {
  quote: string
  name: string
  designation?: string
}

export default function TestimonialCard({
  quote,
  name,
  designation
}: TestimonialCardProps) {
  const { dark } = useDarkMode()

  return (
    <div
      className="rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: dark ? "#161616" : "#FAF6F1" }}
    >
      <img
        src="/quoteIcon.svg"
        alt="quote"
        className="w-8 h-8 text-[#AE572C] mb-8"
        style={{ filter: dark ? "invert(1) sepia(1) saturate(5) hue-rotate(280deg)" : "none" }}
      />

      <div
        className="text-xl leading-relaxed mb-10"
        style={{ color: dark ? "#f0f0f0" : "#AE572C" }}
      >
        {quote}
      </div>

      <div>
        <div
          className="text-lg font-semibold"
          style={{ color: dark ? "#ec4899" : "#000000" }}
        >
          — {name}
        </div>

        {designation && (
          <div
            className="text-md"
            style={{ color: dark ? "#888888" : "#6b7280" }}
          >
            {designation}
          </div>
        )}
      </div>
    </div>
  )
}
