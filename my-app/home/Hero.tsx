"use client"
import Statbox from "../component/ui/statbox"

export default function Hero(){

const styles = {
  section : "h-dvh flex items-center",

  container: "w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64",

  title: "text-4xl sm:text-6xl md:text-[8rem] font-bold tracking-widest text-center",

  subtitle: "text-base md:text-2xl font-semibold py-6 md:py-12 tracking-widest px-3 text-center",

  cta: "mt-6 md:mt-10 flex flex-wrap justify-center gap-4",

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