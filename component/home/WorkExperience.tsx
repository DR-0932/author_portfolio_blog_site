"use client"

import ExpCard from "../ui/expCard"
import ExpCardinverted from "../ui/expcardinverted"

const styles = {
  section: "w-full mx-24 py-32",
  header: "text-2xl text-[#AE572C] mb-20 tracking-widest",
  container: "space-y-20"
}

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
  }
]

export default function WorkExperience() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>/// EXPERIENCE</div>

      <div className={styles.container}>
        {experiences.map((exp, i) =>
          i % 2 === 0 ? (
            <ExpCard key={i} {...exp} />
          ) : (
            <ExpCardinverted key={i} {...exp} />
          )
        )}
      </div>
    </section>
  )
}