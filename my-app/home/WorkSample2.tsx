"use client";
import { useEffect, useRef, useState } from "react";
import { type Sample } from "@/component/ui/WorkSampleCard";
import SampleCard from "@/component/ui/sampleCardModal";
import gsap from "gsap";

const demoSamples: (Sample & { service: string; image: string })[] = [
  {
    _id: "1",
    title: "The Quiet Art of Ghost Writing",
    service: "GHOST WRITING",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60",
    text: "We are all aware that Artificial Intelligence is shaking up the content writing world and it has got writers sweating. Let’s face it, AI can curate articles, blog posts, and even snappy social media posts in seconds. And if we look at the numbers then, a 2023 study from McKinsey estimated that 30% of current jobs, including writing, could be automated by 2030. While AI reduces the time taken to craft engaging posts, it lacks soul and depth. It can mimic a particular writing style, but it cannot create quirky stories or strong headed opinions that compel readers to feel and lean in.Talking about the impact AI has on content writing jobs, LinkedIn’s 2024 jobs report shows a 15% surge in hybrid roles that requires blending writing with AI skills. Writers who edit AI drafts or specialize in niche fields are still in demand, as clients crave human finesse. Paul Roetzer of the Marketing AI Institute says, “AI won’t replace writers, but writers using AI will outshine those who don’t.” Also, the World Economic Forum’s 2023 report predicts 23% of jobs will shift by 2027, with AI leading the change. Writers must find a common ground- use AI for grunt work, master its tools, and focus on storytelling. AI is here not to replace but to assist. So, grab a coffee, learn the tech, and keep weaving tales no bot can touch. The future is human plus AI—embrace it..",
  },
  {
    _id: "2",
    title: "Why Long-Form Content Still Wins",
    service: "CONTENT WRITING",
    image:
      "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&auto=format&fit=crop&q=60",
    text: "In an era dominated by short-form video and bite-sized social media posts, long-form content continues to quietly outperform. Depth builds trust.",
  },
  {
    _id: "3",
    title: "Editing as an Act of Respect",
    service: "BOOK EDITING",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=60",
    text: "A great editor does not rewrite — they reveal. The manuscript that arrives on an editor's desk is rarely broken; it is simply not yet fully itself.",
  },
  {
    _id: "4",
    title: "Content Writing for Technical Audiences",
    service: "TECHNICAL WRITING",
    image:
      "https://images.unsplash.com/photo-1542903660-eedba2cda473?w=800&auto=format&fit=crop&q=60",
    text: "Writing for a technical audience is not about dumbing things down — it is about finding the most precise and efficient path between idea and understanding.",
  },
];

const styles = {
  wrapper: "relative w-full bg- px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-56",
  header:
    "grid grid-cols-[3rem_1fr_12rem_4rem] border-b border-stone-700 pb-8 mb-2",
  headerCell: "text-md tracking-[0.2em] text uppercase",
  row: "grid grid-cols-[3rem_1fr_12rem_4rem] items-center border-b border-stone-800 py-14 cursor-pointer transition-colors duration-300",
  number: "text-lg text- tracking-widest",
  title:
    "text-2xl md:text-4xl text- font-light tracking-wide inline-block origin-left",
  service: "text-xs tracking-[0.2em] text- uppercase",
  arrow: "text-stone-500 text-xl justify-self-end transition-all duration-300",
  image:
    "fixed left-1/2 top-1/2 -translate-y-1/2 w-90 h-64 rounded-lg overflow-hidden pointer-events-none z-40 opacity-0",
};

export default function WorkSample2() {
  const [samples, setSamples] = useState(demoSamples);
  const [active, setActive] = useState<Sample | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const imageRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sample`, { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.samples?.length)
          setSamples(
            data.samples.map((s: Sample, i: number) => ({
              ...s,
              service: demoSamples[i]?.service ?? "WRITING",
              image: demoSamples[i]?.image ?? "",
            })),
          );
      })
      .catch(() => {});
  }, []);

  const handleRowEnter = (index: number, image: string) => {
    setHoveredImage(image);

    // Image in
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );

    // Title squeeze + move forward
    gsap.to(titleRefs.current[index], {
      scaleX: 0.93,
      x: 14,
      color: "#AE572C",
      duration: 0.35,
      ease: "power2.out",
    });

    // Row tint
    gsap.to(rowRefs.current[index], {
      backgroundColor: "rgba(174,87,44,0.06)",
      duration: 0.3,
    });
  };

  const handleRowLeave = (index: number) => {
    // Image out
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
    });

    // Title reset
    gsap.to(titleRefs.current[index], {
      scaleX: 1,
      x: 0,
      color: "",
      duration: 0.35,
      ease: "power2.inOut",
    });

    // Row tint reset
    gsap.to(rowRefs.current[index], {
      backgroundColor: "rgba(0,0,0,0)",
      duration: 0.3,
    });
  };

  const handleSectionLeave = () => {
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <section
      id="WorkSample"
      className={styles.wrapper}
      onMouseLeave={handleSectionLeave}
    >
      {/* Fixed preview image */}
      <div ref={imageRef} className={styles.image}>
        {hoveredImage && (
          <img
            src={hoveredImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Column headers */}
      <div className={styles.header}>
        <span className={styles.headerCell}>No.</span>
        <span className={styles.headerCell}>Project</span>
        <span className={styles.headerCell}>Services</span>
        <span className={`${styles.headerCell} text-right`}>View</span>
      </div>

      {/* Rows */}
      {samples.map((sample, index) => (
        <div
          key={sample._id}
          ref={(el) => {
            rowRefs.current[index] = el;
          }}
          className={styles.row}
          onClick={() => setActive(sample)}
          onMouseEnter={() => handleRowEnter(index, sample.image)}
          onMouseLeave={() => handleRowLeave(index)}
        >
          <span className={styles.number}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            ref={(el) => {
              titleRefs.current[index] = el;
            }}
            className={styles.title}
          >
            {sample.title}
          </span>
          <span className={styles.service}>{sample.service}</span>
          <span className={styles.arrow}>→</span>
        </div>
      ))}

      <SampleCard sample={active} onClose={() => setActive(null)} />
    </section>
  );
}
