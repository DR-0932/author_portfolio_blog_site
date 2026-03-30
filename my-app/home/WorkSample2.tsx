"use client";
import { useEffect, useRef, useState } from "react";
import { type Sample } from "@/component/ui/WorkSampleCard";
import SampleCard from "@/component/ui/sampleCardModal";
import gsap from "gsap";
import { useDarkMode } from "@/context/DarkModeContext";

const demoSamples: (Sample & { service: string; image: string })[] = [
  {
    _id: "1",
    title: "The Quiet Art of Ghost Writing",
    service: "GHOST WRITING",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60",
    text: "We are all aware that Artificial Intelligence is shaking up the content writing world and it has got writers sweating. Let's face it, AI can curate articles, blog posts, and even snappy social media posts in seconds. And if we look at the numbers then, a 2023 study from McKinsey estimated that 30% of current jobs, including writing, could be automated by 2030. While AI reduces the time taken to craft engaging posts, it lacks soul and depth. It can mimic a particular writing style, but it cannot create quirky stories or strong headed opinions that compel readers to feel and lean in. Talking about the impact AI has on content writing jobs, LinkedIn's 2024 jobs report shows a 15% surge in hybrid roles that requires blending writing with AI skills. Writers who edit AI drafts or specialize in niche fields are still in demand, as clients crave human finesse. Paul Roetzer of the Marketing AI Institute says AI won't replace writers, but writers using AI will outshine those who don't. Also, the World Economic Forum's 2023 report predicts 23% of jobs will shift by 2027, with AI leading the change. Writers must find a common ground - use AI for grunt work, master its tools, and focus on storytelling. AI is here not to replace but to assist. So, grab a coffee, learn the tech, and keep weaving tales no bot can touch. The future is human plus AI - embrace it.",
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
  wrapper: "w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-24 md:py-64",

  headingWrapper: "mb-8 md:mb-12",
  heading: "text-5xl md:text-8xl font-bold tracking-tight inline",
  count: "text-lg md:text-2xl font-light text-stone-400 ml-2",

  body: "grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-8",

  sidebar: "flex flex-col gap-6",
  sidebarLabel: "text-xs tracking-[0.2em] uppercase text-stone-400 mb-3",
  sidebarText: "text-base md:text-lg leading-relaxed",
  sidebarImage: "hidden md:block relative w-full aspect-4/3 overflow-hidden opacity-0 mt-2 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_60%,transparent_100%)]",

  listWrapper: "",
  columnHeaders:
    "grid grid-cols-[6rem_1fr] md:grid-cols-[12rem_1fr] border-b border-stone-300 pb-3 mb-1",
  headerCell: "text-xs md:text-sm tracking-[0.2em] uppercase text-stone-400",

  row: "grid grid-cols-[6rem_1fr] md:grid-cols-[10rem_1fr] items-center border-b border-stone-200 py-6 md:py-12 cursor-pointer",
  rowService: "text-xs md:text-sm tracking-[0.2em] uppercase opacity-60 px-1 md:px-2",
  rowTitle: "text-lg md:text-3xl font-light tracking-wide inline-block",
};

export default function WorkSample2() {
  const { dark } = useDarkMode();
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
            data.samples.map((s: Sample & { image?: string }, i: number) => ({
              ...s,
              service: demoSamples[i]?.service ?? "WRITING",
              image: s.image ?? demoSamples[i]?.image ?? "",
            })),
          );
      })
      .catch(() => {});
  }, []);

  const handleRowEnter = (index: number, image: string) => {
    setHoveredImage(image);

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.95, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );

    gsap.to(titleRefs.current[index], {
      x: 10,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(rowRefs.current[index], {
      backgroundColor: dark ? "#ec4899" : "#AE572C",
      color: "#ffffff",
      duration: 0.25,
    });
  };

  const handleRowLeave = (index: number) => {
    gsap.to(imageRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(titleRefs.current[index], {
      x: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.to(rowRefs.current[index], {
      backgroundColor: "transparent",
      color: dark ? "#f0f0f0" : "#000000",
      duration: 0.25,
    });
  };

  return (
    <section id="WorkSample" className={styles.wrapper}>
      {/* Heading */}
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>My Work</h2>
        <sup className={styles.count}>({samples.length})</sup>
      </div>

      {/* Body: sidebar + list */}
      <div className={styles.body}>
        {/* Left sidebar */}
        <div className={styles.sidebar}>
          <div>
            <p className={styles.sidebarLabel}>About</p>
            <p className={styles.sidebarText} style={{ color: dark ? "#a0a0a0" : "#44403c" }}>
              Here&apos;s a sample of my writing. Includes projects I&apos;ve
              done in the past.
            </p>
          </div>

          {/* Hover image preview */}
          <div ref={imageRef} className={styles.sidebarImage}>
            {hoveredImage && (
              <img
                src={hoveredImage}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Right list */}
        <div className={styles.listWrapper}>
          {/* Column headers */}
          <div className={styles.columnHeaders}>
            <span className={styles.headerCell}>Type</span>
            <span className={styles.headerCell}>Name</span>
          </div>

          {/* Rows */}
          {samples.map((sample, index) => (
            <div
              key={sample._id}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className={styles.row}
              style={{ backgroundColor: "transparent", color: dark ? "#f0f0f0" : "#000000" }}
              onClick={() => setActive(sample)}
              onMouseEnter={() => handleRowEnter(index, sample.image)}
              onMouseLeave={() => handleRowLeave(index)}
            >
              <span className={styles.rowService}>{sample.service}</span>
              <span
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className={styles.rowTitle}
              >
                {sample.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <SampleCard sample={active} onClose={() => setActive(null)} />
    </section>
  );
}
