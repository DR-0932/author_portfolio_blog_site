"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "motion/react"

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

const styles = {
  headingWrapper: "bg-[#f8ecdc57]",
  headingContainer: "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-12 md:py-[120px]",
  headingInner: "text-center max-w-[800px] mx-auto",
  heading: "text-2xl md:text-[40px] font-bold text-[#AE572C] tracking-wide",

  timelineWrapper: "bg-[#f8ecdc57]",
  timelineContainer: "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 relative",
  timelineTrack: "hidden md:block absolute top-0 bottom-0 left-[calc(50%-1.5px)] w-[3px] bg-stone-200 z-0",
  timelineProgress: "hidden md:block absolute top-0 left-[calc(50%-1.5px)] w-[3px] bg-[#AE572C] z-1",
  timelineRow: "flex flex-col gap-2 py-8 md:grid md:grid-cols-[1fr_40px_1fr] md:py-20",
  dateCell: "flex md:justify-end items-start md:pr-8",
  dateText: "text-black font-bold text-base md:text-xl leading-[1.2] tracking-wide md:sticky md:top-[50vh] md:text-right text-[#AE572C]",
  dotCell: "hidden md:flex justify-center items-start",
  dot: "w-[15px] h-[15px] rounded-full bg-[#AE572C] sticky top-[50vh] shadow-[0_0_0_8px_white] z-10 mt-2",
  contentCell: "md:pl-8",
  contentTitle: "text-[#171717] text-base md:text-2xl font-medium leading-[1.3] mb-4 md:mb-8",
  contentBody: "text-black mb-8 md:mb-14 text-base md:text-lg",
  spacer: "h-[50vh]",
}

export default function WorkExperience() {
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

  return (
    <div>
      {/* Heading */}
      <div className={styles.headingWrapper}>
        <div className={styles.headingContainer}>
          <div className={styles.headingInner}>
            <h2 className={styles.heading}>
              Professional Experience
            </h2>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className={styles.timelineWrapper} ref={timelineRef}>
        <div className={styles.timelineContainer}>

          {/* Grey background line */}
          <div className={styles.timelineTrack} />

          {/* Accent scroll-progress line */}
          <motion.div
            className={styles.timelineProgress}
            style={{ height: lineHeight }}
          />

          {experiences.map((exp, i) => (
            <div key={i} className={styles.timelineRow}>

              {/* Left: date */}
              <div className={styles.dateCell}>
                <p className={styles.dateText}>
                  {exp.date}
                </p>
              </div>

              {/* Center: circle aligned with line */}
              <div className={styles.dotCell}>
                <div className={styles.dot} />
              </div>

              {/* Right: content */}
              <div className={styles.contentCell}>
                <p className={styles.contentTitle}>
                  <strong>{exp.company}</strong> — {exp.role}
                </p>
                <p className={styles.contentBody}>{exp.description}</p>
              </div>

            </div>
          ))}
        </div>
        <div className={styles.spacer} />
      </div>
    </div>
  )
}
