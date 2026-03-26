"use client";

import TestimonialCard from "../component/ui/testimonialcard";

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
    "relative z-10 text-white px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-16 md:py-76 ",

  container: "mx-auto",

  headingWrapper: "text-center mb-12 md:mb-24 max-w-[76rem] mx-auto",

  label:
    "inline-block text-sm tracking-widest text-[#AE572C] uppercase mb-5 border border-[#AE572C]/30 px-5 py-1.5 rounded-full",

  heading:
    "text-4xl sm:text-5xl md:text-[6rem] font-bold tracking-wide leading-tight text-black",

  accent: "text-[#AE572C]",

  sub: "mt-5 text-base md:text-lg text-stone-400 tracking-widest uppercase",

  grid: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-10 md:py-22",

  banner:
    "mt-10 md:mt-14 rounded-2xl bg-[#C08552] flex flex-col md:flex-row items-start md:items-center gap-4 md:justify-between px-6 md:px-12 py-6 md:py-9",

  bannerText: "text-white text-xl md:text-3xl font-semibold",

  bannerBtn:
    "bg-stone-900 text-white text-base font-medium px-8 py-4 rounded-xl hover:opacity-90 transition",
};

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          {/* <span className={styles.label}>/// Testimonials</span> */}
          <h2 className={styles.heading}>
            Hear from previous <span className={styles.accent}>employers</span>{" "}
            and clients
          </h2>
          <p className={styles.sub}>Words from the people I've worked with</p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        <div className={styles.banner}>
          <p className={styles.bannerText}>Are you The Next One?</p>
          <button className={styles.bannerBtn}>Hire Now</button>
        </div>
      </div>
    </section>
  );
}
