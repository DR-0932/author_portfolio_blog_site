"use client"
import Statbox from "../ui/statbox"

export default function Hero(){

const styles = {
  section : " h-dvh flex  items-center ",

  container: " min-w-6xl w-full h-100 flex flex-col items-center mx-2",

  title: " text-6xl md:text-9xl font-bold tracking-widest ",

  subtitle:"text-md md:text-xl font-semibold py-3 tracking-widest px-3",

  statbox:"my-96 flex "


}


  return (
    <>
  <section className={styles.section}>
    <div className={styles.container}>
    
      <h1 className={styles.title}>Dhruv Rajput</h1>
      <p className={styles.subtitle}>Book Editor | Ghost Writer | Content Writer  </p>
      
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