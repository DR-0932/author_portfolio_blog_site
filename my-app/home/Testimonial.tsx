"use client";

import TestimonialCard from "../component/ui/testimonialcard";
import { useDarkMode } from "@/context/DarkModeContext";

const testimonials = [
  {
    quote:
      " You are a smart girl.Love they way you are approaching this project. You are awesome. Keep working hard. Best of luck for whatever you are doing next ",
    name: "Gaurav Bhainsu",
    designation: "CEO & founder Advance Agility",
    link: "/profile",
  },
  {
    quote:
      "We really liked your approach towards. Although we had the content written from our end, we needed someone to rewrite it from an outsider perspective. We loved the angle and the concept you brought.",
    name: "Tenaz Cardoz",
    designation: "Founder XYZAB",
    link: "https://dribbble.com/shots/25108110-UnifiedUI-Testimonial-Sections",
  },
  {
    quote:
      "Palak is an exceptional creator, writer. She is an excellent storyteller. It was a nice experience to work with her. Because of her creative style, my school could win an accolade in a CBSE level competition. I wish her all the best.",
    name: "Nidhi Agarwal",
    designation: "English Literature Mentor",
  },
];

const styles = {
  section:
    "relative z-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-16 md:py-32",

  container: "mx-auto",

  headingWrapper: "text-center mb-12 md:mb-24 max-w-[76rem] mx-auto",

  label:
    "inline-block text-sm tracking-widest uppercase mb-5 border px-5 py-1.5 rounded-full",

  sub: "mt-5 text-base md:text-lg tracking-widest uppercase",

  grid: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-10 md:py-22",

  bannerBtn:
    "text-base font-medium px-8 py-4 rounded-xl hover:opacity-90 transition",
};

export default function Testimonials() {
  const { dark } = useDarkMode();

  const accent = dark ? "#ec4899" : "#AE572C";
  const text = dark ? "#f0f0f0" : "#000000";
  const muted = dark ? "#888888" : "#6b7280";
  const bannerBg = dark ? "#1a1a1a" : "#C08552";

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <h2
            className="text-4xl sm:text-5xl md:text-[6rem] font-bold tracking-wide leading-tight"
            style={{ color: text }}
          >
            Hear from previous{" "}
            <span style={{ color: accent }}>employers</span>{" "}
            and clients
          </h2>
          <p className={styles.sub} style={{ color: muted }}>
            Words from the people I&apos;ve worked with
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        <div
          className="mt-10 md:mt-14 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-4 md:justify-between px-6 md:px-12 py-6 md:py-9"
          style={{ backgroundColor: bannerBg }}
        >
          <p className="text-white text-xl md:text-3xl font-semibold">
            Are you The Next One?
          </p>
          <button
            className={styles.bannerBtn}
            style={{
              backgroundColor: dark ? "#ec4899" : "#1c1c1c",
              color: "#ffffff",
            }}
          >
            Hire Now
          </button>
        </div>
      </div>
    </section>
  );
}
