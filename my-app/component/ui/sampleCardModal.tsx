"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type Sample = { _id: string; title: string; text: string };

const styles = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center p-6 ",
  backdrop: "absolute inset-0 bg-black/60 backdrop-blur-sm ",

  modal:
    "relative z-10 max-w-4xl w-full shadow-2xl rounded-sm overflow-hidden flex ",

  spine: "w-4 bg-gradient-to-r from-stone-500 to-stone-300 flex-shrink-0",

  page: "flex-1 bg-[#f5f0e8] flex flex-col px-10 md:px-16 py-10 md:py-14 max-h-[90vh] overflow-y-auto overscroll-contain",

  topBar:
    "flex justify-between items-baseline border-b border-stone-400 pb-3 mb-8",

  bookTitle: "text-xl tracking-[0.25em] uppercase text-stone-500 font-semibold",

  pageNumber: "text-[0.6rem] tracking-widest text-stone-500",

  closeBtn:
    "absolute top-4 right-5 text-stone-400 hover:text-[#AE572C] text-xl transition z-20",

  body: "text-sm md:text-2xl leading-[2] text-stone-800 text-justify font-serif flex-1 whitespace-pre-wrap",

  firstLetter:
    "float-left text-6xl font-bold leading-[0.8] mr-2 mt-1 text-stone-700 font-serif",

  cta: "mt-8 text-[0.65rem] tracking-widest uppercase text-stone-400 border-t border-stone-300 pt-4",
};

export default function SampleCardModal({
  sample,
  onClose,
}: {
  sample: Sample | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!sample) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sample, onClose]);

  const firstLetter = sample?.text.trimStart()[0] ?? "";
  const restOfText = sample?.text.trimStart().slice(1) ?? "";

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
            <button onClick={onClose} className={styles.closeBtn}>
              ✕
            </button>

            {/* Spine */}
            <div className={styles.spine} />

            {/* Page */}
            <div className={styles.page}>
              <div className={styles.topBar}>
                <span className={styles.bookTitle}>{sample.title}</span>
                <span className={styles.pageNumber}>1</span>
              </div>

              <p className={styles.body}>
                <span className={styles.firstLetter}>{firstLetter}</span>
                {restOfText}
              </p>

              <span className={styles.cta}>— End of excerpt —</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
