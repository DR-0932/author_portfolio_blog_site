"use client"

import Link from "next/link"

type TestimonialCardProps = {
  quote: string
  name: string
  designation?: string
  link?: string
}

const styles = {
  card: "bg-black  rounded-2xl p-8 w-100 shadow-sm",

  quoteIcon: "text-3xl text-gray-400 mb-4",

  text: "text-white leading-relaxed mb-6",

  name: "text-lg font-semibold text-white",

  designation: "text-sm text-white",

  link: "text-xl text-blue-500 hover:underline mt-2 inline-block"
}

export default function TestimonialCard({
  quote,
  name,
  designation,
  link
}: TestimonialCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.quoteIcon}>“</div>

      <p className={styles.text}>{quote}</p>

      <div>
        <p className={styles.name}>— {name}</p>

        {designation && (
          <p className={styles.designation}>{designation}</p>
        )}

        {link && (
          <Link href={link} className={styles.link}>
            Learn more
          </Link>
        )}
      </div>
    </div>
  )
}