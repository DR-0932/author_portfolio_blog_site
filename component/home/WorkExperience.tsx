"use client"

const styles = {
  section: "w-full mx-24 py-32",

  header: "text-2xl text-[#AE572C] mb-20 tracking-widest",

  container: "space-y-20",

  company: "text-[#5d8172] text-xl",

  role: "text-2xl text-[#AE572C] font-semibold mt-2",

  description: "text-xl text-[#BF7950] mt-4 leading-relaxed max-w-4xl",

  date: "text-xl text-[#5d8172] mt-4"
}

export default function WorkExperience() {
  return (
    <section className={styles.section}>

      <div className={styles.header}>
        /// EXPERIENCE
      </div>

      <div className={styles.container}>

        <div>
          <div className={styles.company}>
            Loyola Tutoring · Full-time
          </div>

          <div className={styles.role}>
            Content Developer – Subject Matter Expert (English)
          </div>

          <p className={styles.description}>
            Developing English learning content and educational material while
            contributing as a subject matter expert. Focused on structured
            curriculum writing and high-quality educational resources for learners.
          </p>

          <div className={styles.date}>
            Nov 2025 – Present · Remote · Perth, Western Australia, Australia
          </div>
        </div>


        <div>
          <div className={styles.company}>
            Freelance
          </div>

          <div className={styles.role}>
            Content Writer
          </div>

          <p className={styles.description}>
            Writing and editing long-form and technical content for various
            clients, focusing on clarity, research-driven storytelling,
            and structured information design.
          </p>

          <div className={styles.date}>
            Jun 2025 – Present
          </div>
        </div>


        <div>
          <div className={styles.company}>
            Advance Agility · Internship
          </div>

          <div className={styles.role}>
            Content Writer
          </div>

          <p className={styles.description}>
            Created content for digital platforms and assisted with editorial
            workflows, research, and documentation while working remotely
            with an international team.
          </p>

          <div className={styles.date}>
            Dec 2023 – May 2025 · United Kingdom · Remote
          </div>
        </div>

      </div>

    </section>
  )
}