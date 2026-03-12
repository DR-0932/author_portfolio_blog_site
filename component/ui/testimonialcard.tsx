"use client"

type TestimonialCardProps = {
  quote: string
  name: string
  designation?: string
}

const styles = {
  card:
    "bg-[#FAF6F1] rounded-2xl p-10 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1",

  quoteIcon: "w-8 h-8 text-[#AE572C] mb-8",

  text: "text-[#AE572C] text-xl leading-relaxed mb-10",

  author: "text-black text-lg font-semibold",

  designation: "text-gray-500 text-md"
}

export default function TestimonialCard({
  quote,
  name,
  designation
}: TestimonialCardProps) {
  return (
    <div className={styles.card}>

      <img
        src="/quoteIcon.svg"
        alt="quote"
        className={styles.quoteIcon}
      />

      <div className={styles.text}>
        {quote}
      </div>

      <div>
        <div className={styles.author}>
          — {name}
        </div>

        {designation && (
          <div className={styles.designation}>
            {designation}
          </div>
        )}
      </div>

    </div>
  )
}