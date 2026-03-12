"use client"
import { useState, useRef, useEffect } from "react"

type AccordianType = {
  title: string
  text: string
}

export default function Accordian({ title, text }: AccordianType) {
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState<number | undefined>(0)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [])

  const styles = {
    wrapper:
      "w-full border-t border-[#BF7950] py-10 cursor-pointer",

    container:
      "flex justify-between items-center",

    title:
      "text-2xl md:text-3xl font-semibold text-[#AE572C] tracking-wide",

    content:
      "overflow-hidden transition-all duration-500",

    subtext:
      "columns-1 lg:columns-2 gap-12 max-w-5xl mx-auto text-[#BF7950] text-lg lg:text-xl leading-relaxed mt-6"
  }

  return (
    <div
      className={styles.wrapper}
      onClick={() => setOpen(!open)}
    >
      <div className={styles.container}>
        <span className={styles.title}>{title}</span>
      </div>

      <div
        ref={contentRef}
        className={styles.content}
        style={{
          height: open ? height : 0
        }}
      >
        <div className={styles.subtext}>
          {text}
        </div>
      </div>
    </div>
  )
}