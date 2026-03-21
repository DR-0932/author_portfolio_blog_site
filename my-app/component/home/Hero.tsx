"use client"
import Statbox from "../ui/statbox"

export default function Hero(){

const styles = {
  section : "h-dvh flex items-center",

  container: "min-w-6xl w-full h-full flex flex-col items-center justify-center mx-2",

  title: "text-7xl md:text-[11rem] font-bold tracking-widest",

  subtitle: "text-lg md:text-2xl font-semibold py-4 tracking-widest px-3",

  cta: "mt-10 flex gap-5",

  ctaPrimary: "px-10 py-4 bg-[#AE572C] text-white text-base font-medium rounded-xl hover:opacity-90 transition",

  ctaSecondary: "px-10 py-4 border border-stone-400 text-base font-medium rounded-xl hover:border-[#AE572C] hover:text-[#AE572C] transition",

  statbox: "mt-24 flex"


}


  return (
    <>
  <section className={styles.section}>
    <div className={styles.container}>
    
      <h1 className={styles.title}>Palak Agarwal</h1>
      <p className={styles.subtitle}>Book Editor | Ghost Writer | Content Writer  </p>

      <div className={styles.cta}>
        <a href="#contact" className={styles.ctaPrimary}>Work with me</a>
        <a href="#work" className={styles.ctaSecondary}>See my work</a>
      </div>

      <div className={styles.statbox}>
        <Statbox
            leftBox={{ title: "200,000+", subtitle: "WORDS WRITTEN" }}
            rightBox={[
              { title: "3+", subtitle: "YOE" },
              { title: "50+", subtitle: "PROJECTS" },
              { title: "3+", subtitle: "BOOKS WRITTEN" }
            ]}
          />
      </div>
    
    </div>

  </section>
  </>
)
}