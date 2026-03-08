"use client"
import Statbox from "../ui/statbox"

export default function Hero(){

const styles = {
  section : " h-dvh flex justify-center items-center border-b mx-6",
  container: " min-w-6xl h-200 flex flex-col items-center",
  title: "py-10 text-6xl md:text-9xl font-bold ",
  subtitle:"text-2xl md:text-3xl font-semibold",
  statbox:"my-56"


}


  return (
    <>
  <section className={styles.section}>
    <div className={styles.container}>
    
      <h1 className={styles.title}>Dhruv Rajput</h1>
      <p className={styles.subtitle}>Book Editor , Ghost Writer ,Content Writer/Editor </p>
      
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