"use client"

import { useEffect, useRef, useState } from "react"
import StackingCards, { StackingCardItem } from "@/component/ui/StackingCard"
import SampleCard from "@/component/ui/sampleCard"
import WorkSampleCard, { type Sample } from "@/component/ui/WorkSampleCard"

const demoSamples: Sample[] = [
  {
    _id: "1",
    title: "The Quiet Art of Ghost Writing",
    text: "Ghost writing is one of the most misunderstood crafts in the literary world. Behind every bestselling memoir, polished business book, or viral thought-leadership article, there is often a skilled writer working invisibly — shaping someone else's voice with precision and empathy. The ghost writer must disappear entirely into the author's perspective, leaving no trace of their own style, yet infusing the work with life, clarity, and narrative momentum.",
  },
  {
    _id: "2",
    title: "Why Long-Form Content Still Wins",
    text: "In an era dominated by short-form video and bite-sized social media posts, long-form content continues to quietly outperform. Depth builds trust. When a reader spends twelve minutes with a well-researched article, they leave with a fundamentally different relationship to the brand or writer behind it. Long-form content signals expertise, patience, and respect for the reader's intelligence — qualities that no thirty-second reel can replicate.",
  },
  {
    _id: "3",
    title: "Editing as an Act of Respect",
    text: "A great editor does not rewrite — they reveal. The manuscript that arrives on an editor's desk is rarely broken; it is simply not yet fully itself. The editor's job is to hold up a mirror to the writer's intent and ask, quietly: is this what you meant to say? Good editing strips away the layers of habit, hesitation, and filler that accumulate in a first draft and leaves behind only what is essential, resonant, and true.",
  },
  {
    _id: "4",
    title: "Content Writing for Technical Audiences",
    text: "Writing for a technical audience is not about dumbing things down — it is about finding the most precise and efficient path between idea and understanding. Technical readers are impatient with vagueness. They reward specificity, structured logic, and writing that respects their existing knowledge while still adding something new. The challenge is to be clear without being condescending, and thorough without being exhausting.",
  },
]

const styles = {
  wrapper: "w-full h-400 bg-[#f8ecdc57]",
  headingContainer: "px-36 pt-48",
  heading: "text-8xl font-bold tracking-tight mb-6",
  subheading: "text-stone-400 text-3xl max-w-4xl mb-24 pt-8",
  label: "text-2xl text-[#AE572C] tracking-widest mb-4",
  cardContainer: "h-225 overflow-auto text-white scrollbar-hide",
}

export default function WorkSamples() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [samples, setSamples] = useState<Sample[]>(demoSamples)
  const [active, setActive] = useState<Sample | null>(null)

  useEffect(() => {
    fetch("http://localhost:5000/sample", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { if (data.samples?.length) setSamples(data.samples) })
      .catch(() => {})
  }, [])

  // Scroll hijack: lock page scroll while stacked cards haven't finished scrolling
  useEffect(() => {
    const section = sectionRef.current
    const el = container.current
    if (!section || !el) return

    const onWheel = (e: WheelEvent) => {
      // Don't hijack scroll when modal is open
      if (document.body.style.overflow === "hidden") return

      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1

      // Release page scroll at boundaries
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) return

      // Otherwise hijack and feed into container
      e.preventDefault()
      el.scrollBy({ top: e.deltaY, behavior: "instant" })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener("wheel", onWheel, { passive: false })
        } else {
          window.removeEventListener("wheel", onWheel)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      window.removeEventListener("wheel", onWheel)
    }
  }, [])

  return (
    <section className={styles.wrapper} ref={sectionRef}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>Here is a sample of my writing pieces</h2>
        <p className={styles.subheading}>From ghost-written memoirs and long-form editorial essays to technical content and book edits — a selection of work across the formats I specialise in.</p>
        <p className={styles.label}> WORK SAMPLES</p>
      </div>

      <div className={styles.cardContainer} ref={container}>
        <StackingCards totalCards={samples.length} scrollOptions={{ container }}>
          {samples.map((s, index) => (
            <StackingCardItem key={s._id} index={index} className="h-225">
              <WorkSampleCard sample={s} index={index} onClick={() => setActive(s)} />
            </StackingCardItem>
          ))}
        </StackingCards>
      </div>

      <SampleCard sample={active} onClose={() => setActive(null)} />
    </section>
  )
}
