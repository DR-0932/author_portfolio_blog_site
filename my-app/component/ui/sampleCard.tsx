"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

type Sample = { _id: string; title: string; text: string }

const styles = {
  overlay:    "fixed inset-0 z-50 flex items-center justify-center p-6",
  backdrop:   "absolute inset-0 bg-black/60 backdrop-blur-sm",
  modal:      "relative z-10 bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto px-20 py-16 shadow-2xl",
  closeBtn:   "absolute top-6 right-8 text-stone-400 hover:text-[#AE572C] text-2xl transition",
  label:      "text-xs tracking-widest text-[#AE572C] uppercase mb-4",
  title:      "text-5xl font-bold text-[#171717] mb-10 leading-tight",
  body:       "text-stone-500 text-2xl leading-relaxed whitespace-pre-wrap",
}

export default function SampleCard({
  sample,
  onClose,
}: {
  sample: Sample | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!sample) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [sample, onClose])

  return (
    <AnimatePresence>
      {sample && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.backdrop} onClick={onClose} />

          <motion.div
            className={styles.modal}
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <button onClick={onClose} className={styles.closeBtn}>✕</button>

            <p className={styles.label}>Work Sample</p>
            <h2 className={styles.title}>{sample.title}</h2>
            <p className={styles.body}>{sample.text}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
