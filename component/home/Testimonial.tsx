"use client"

import TestimonialCard from "../ui/testimonialcard"


const testimonials = [
  {
    quote: " You are a smart girl.Love they way you are approaching this project. You are awesome. Keep working hard. Best of luck for whatever you are doing next ",
    name: "Gaurav Bhainsu",
    designation: "CEO & founder Advance Agility",
    link: "/profile"
  },
  {
    quote: "We really liked your approach towards. Although we had the content written from our end, we needed someone to rewrite it from an outsider perspective. We loved the angle and the concept you brought.",
    name: "Tenaz Cardoz",
    designation: "Founder XYZAB",
    link:"https://dribbble.com/shots/25108110-UnifiedUI-Testimonial-Sections"
  },
  {
    quote: "Palak is an exceptional creator, writer. She is an excellent storyteller. It was a nice experience to work with her. Because of her creative style, my school could win an accolade in a CBSE level competition. I wish her all the best.",
    name: "Nidhi Agarwal",
    designation: "English Literature Mentor"
  }
]

const styles = {

  section: "text-white py-32 mx-24 ",
  
  container: "mx-auto",
  
  header: "text-xl text-[#AE572C] mb-20 tracking-widest",
  
  grid: "grid md:grid-cols-3 gap-10"
}

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>/// TESTIMONIALS</div>

        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

      </div>
    </section>
  )
}