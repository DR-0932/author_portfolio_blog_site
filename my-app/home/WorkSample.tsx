"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SampleCard from "@/component/ui/sampleCardModal";
import WorkSampleCard, { type Sample } from "@/component/ui/WorkSampleCard";

gsap.registerPlugin(ScrollTrigger);

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
];

const styles = {
  outer: "relative bg-[#f8ecdc57]",

  heading: "text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6",

  subheading:
    "text-stone-400 text-base md:text-3xl max-w-4xl mb-4 md:mb-8 pt-4 md:pt-8",

  label: "text-base md:text-2xl text-[#AE572C] tracking-widest mb-4",

  cardStack: "relative",

  cardSlot: "sticky top-0 h-screen flex items-center justify-center",
};

export default function WorkSamples() {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [samples, setSamples] = useState<Sample[]>(demoSamples);
  const [active, setActive] = useState<Sample | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sample`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.samples?.length) setSamples(data.samples);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;

      gsap.to(card, {
        scale: 0.88,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: card.closest(".card-slot") as Element,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [samples]);

  return (
    <section id="WorkSample" ref={outerRef} className={styles.outer}>
      {/* Heading */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 pt-16 md:pt-24 bg-red-100">
        <h2 className={styles.heading}>Projects</h2>
        <p className={styles.subheading}>
          From ghost-written memoirs and long-form editorial essays to technical
          content and book edits — a selection of work across the formats I
          specialise in.
        </p>
        <p className={styles.label}>WORK SAMPLES</p>
      </div>

      {/* Stacking cards */}
      <div className={styles.cardStack}>
        {samples.map((s, index) => (
          <div key={s._id} className={`card-slot ${styles.cardSlot}`}>
            <div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64"
            >
              <WorkSampleCard
                sample={s}
                index={index}
                onClick={() => setActive(s)}
              />
            </div>
          </div>
        ))}
      </div>

      <SampleCard sample={active} onClose={() => setActive(null)} />
    </section>
  );
}
