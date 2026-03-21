"use client"
import { useState } from "react"
import ReactMarkdown from "react-markdown"

type AccordianType = {
  title: string
  text: string
}

export default function Accordian({ title, text }: AccordianType) {
  const [open, setOpen] = useState(false)

  const styles = {
    wrapper:
      "w-full border border-[#BF7950]/30 rounded-2xl px-10 py-8 cursor-pointer hover:border-[#AE572C] hover:bg-[#FAF6F1] transition-all duration-300",

    container:
      "flex justify-between items-center",

    title:
      "text-3xl md:text-4xl font-semibold text-[#AE572C] tracking-wide",

    icon:
      "text-2xl text-[#AE572C] transition-transform duration-300",

    content:
      "overflow-hidden transition-all duration-500",

    scroll:
      "mt-8 max-h-[500px] overflow-y-auto pr-4",

    subtext:
      "text-black text-xl lg:text-2xl leading-relaxed"
  }

  return (
    <div className={styles.wrapper} onClick={() => setOpen(!open)}>

      <div className={styles.container}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon} style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
      </div>

      <div
        className={styles.content}
        style={{ maxHeight: open ? "500px" : "0px" }}
      >
        <div className={styles.scroll} onClick={(e) => e.stopPropagation()}>
          <div className={styles.subtext}>
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      </div>

    </div>
  )
}
