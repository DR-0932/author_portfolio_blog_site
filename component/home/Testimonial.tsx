"use client"

import TestimonialCard from "../ui/testimonialcard"

type Testimonial = {
  quote: string
  name: string
  designation?: string
  link?: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Placeholder testimonial text.",
    name: "Person Name",
    designation: "Role / Description",
    link: "/profile"
  },
  {
    quote: "we really liked your approach towards. Although we had the content written from our end, we needed someone to rewrite it from an outsider perspective. We loved the angle and the concept you brought.",
    name: "Tenaz Cardoz",
    designation: "Client",
    link:"https://dribbble.com/shots/25108110-UnifiedUI-Testimonial-Sections"
  },
  {
    quote: "Placeholder testimonial text.",
    name: "Person Name",
    designation: "Role / Description"
  }
]

const styles = {
  section: " text-white py-32 mx-24",

  container: " mx-auto",

  header: "text-xl text-[#AE572C] mb-20 tracking-widest",

  grid: "grid md:grid-cols-3",

  column:
    "relative px-12 py-12 border-neutral-800 md:border-r last:border-r-0",

  number: "text-xl text-[#AE572C] mb-10",

  quote: "text-2xl mb-6",

  text: "text-[#AE572C] text-2xl leading-relaxed mb-10",

  author: "text-black text-xl",

  designation: "text-blue-600 text-md"
}

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>/// TESTIMONIALS</div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.column}>

              <div className={styles.number}>
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className={styles.text}>
                {t.quote}
              </div>

              <div>
                <div className={styles.author}>
                  — {t.name}
                </div>

                {t.designation && (
                  <div className={styles.designation}>
                    {t.designation}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}