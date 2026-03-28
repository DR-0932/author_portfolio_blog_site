"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useDarkMode } from "@/context/DarkModeContext"

const experiences = [
  {
    company: "Loyola Tutoring · Full-time",
    role: "Content Developer – Subject Matter Expert (English)",
    description:
    "Developing English learning content and educational material while contributing as a subject matter expert. Focused on structured curriculum writing and high-quality educational resources for learners.",
    date: "Nov 2025 – Present · Remote · Perth, Western Australia, Australia",
    number:"01"
  },
  {
    company: "Freelance",
    role: "Content Writer",
    description:
    "Writing and editing long-form and technical content for various clients, focusing on clarity, research-driven storytelling, and structured information design.",
    date: "Jun 2025 – Present",
    number:"02"
  },
  {
    company: "Advance Agility · Internship",
    role: "Content Writer",
    description:
    "Created content for digital platforms and assisted with editorial workflows, research, and documentation while working remotely with an international team.",
    date: "Dec 2023 – May 2025 · United Kingdom · Remote",
    number:"03"
  },
]

export default function WorkExperience() {
  const { dark } = useDarkMode()
  const timelineRef = useRef<HTMLDivElement>(null)
  const [sectionTop, setSectionTop] = useState(0)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const update = () => {
      setSectionTop(el.offsetTop)
      setSectionHeight(el.offsetHeight)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const { scrollY } = useScroll()
  const rawHeight = useTransform(scrollY, (y) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 0
    return Math.min(Math.max(y - sectionTop + vh * 0.5, 0), sectionHeight)
  })
  const lineHeight = rawHeight

  const accent = dark ? "#ec4899" : "#AE572C"
  const bg = dark ? "#0f0f0f" : "transparent"
  const text = dark ? "#f0f0f0" : "#171717"
  const headingColor = dark ? "#f0f0f0" : "#AE572C"
  const bodyText = dark ? "#a0a0a0" : "#000000"
  const trackColor = dark ? "#2a2a2a" : "#e7e5e4"
  const dotShadow = dark ? "0 0 0 6px #0f0f0f" : "0 0 0 6px white"

  return (
    <div style={{ backgroundColor: bg }}>
      {/* Heading */}
      <div style={{ backgroundColor: bg }}>
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-12 md:py-30">
          <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: accent }}>
            Career
          </p>
          <h2
            className="text-3xl md:text-6xl font-bold tracking-tight"
            style={{ color: headingColor }}
          >
            Professional Experience
          </h2>
          <p className="mt-4 text-sm md:text-lg max-w-lg" style={{ color: bodyText }}>
            A record of roles where I&apos;ve written, edited, and shaped content across industries.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ backgroundColor: bg }} ref={timelineRef}>
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 relative">

          {/* Desktop center track line */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-[calc(50%-1.5px)] w-[3px] z-0"
            style={{ backgroundColor: trackColor }}
          />
          <motion.div
            className="hidden md:block absolute top-0 left-[calc(50%-1.5px)] w-[3px] z-1"
            style={{ height: lineHeight, backgroundColor: accent }}
          />

          {/* Mobile + desktop inner wrapper */}
          <div className="relative pl-7 md:pl-0">

            {/* Mobile left track line */}
            <div
              className="md:hidden absolute top-0 bottom-0 left-0 w-0.5 z-0"
              style={{ backgroundColor: trackColor }}
            />
            <motion.div
              className="md:hidden absolute top-0 left-0 w-0.5 z-1"
              style={{ height: lineHeight, backgroundColor: accent }}
            />

            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative py-8 md:grid md:grid-cols-[1fr_40px_1fr] md:gap-0 md:py-20"
              >
                {/* Mobile dot */}
                <div
                  className="md:hidden absolute -left-5.5 top-10 w-3 h-3 rounded-full z-10"
                  style={{ backgroundColor: accent, boxShadow: dotShadow }}
                />

                {/* Date — mobile: above content, desktop: left column */}
                <div className="flex md:justify-end items-start md:pr-8 mb-2 md:mb-0">
                  <p
                    className="text-xs md:text-xl font-semibold leading-snug tracking-wide md:sticky md:top-[50vh] md:text-right"
                    style={{ color: accent }}
                  >
                    {exp.date}
                  </p>
                </div>

                {/* Desktop center dot */}
                <div className="hidden md:flex justify-center items-start">
                  <div
                    className="w-3.75 h-3.75 rounded-full sticky top-[50vh] z-10 mt-2"
                    style={{ backgroundColor: accent, boxShadow: dotShadow }}
                  />
                </div>

                {/* Content */}
                <div className="md:pl-8">
                  <p
                    className="text-base md:text-2xl font-semibold leading-snug mb-2 md:mb-8"
                    style={{ color: text }}
                  >
                    {exp.company} <span className="font-normal">— {exp.role}</span>
                  </p>
                  <p
                    className="text-sm md:text-lg leading-relaxed mb-6 md:mb-14"
                    style={{ color: bodyText }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[30vh] md:h-[50vh]" />
      </div>
    </div>
  )
}
