"use client"

type Stat = {
  title: string
  subtitle: string
}

type StatboxProps = {
  leftBox: Stat
  rightBox: Stat[]
}

export default function Statbox({ leftBox, rightBox }: StatboxProps) {
  const styles = {
    wrapper: "w-full flex justify-center",

    container: "w-full max-w-[58.5rem] flex flex-col sm:grid sm:grid-cols-[0.9fr_2.1fr] gap-3",

    leftbox: "bg-black rounded-2xl flex flex-col justify-center items-center py-6 sm:py-0 sm:h-34",

    rightbox: "bg-black rounded-2xl grid grid-cols-3 items-center divide-x divide-white/20 py-4 sm:py-0 sm:h-34",

    contentR: "flex flex-col justify-center items-center px-3 sm:px-6",

    heading: "pb-1 sm:pb-2 text-base sm:text-xl font-semibold text-white",
    subtitle: "text-xs sm:text-sm text-gray-300 tracking-widest text-center"
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.leftbox}>
          
          <h1 className={styles.heading}>{leftBox.title}</h1>
          <p className={styles.subtitle}>{leftBox.subtitle}</p>
        </div>

        <div className={styles.rightbox}>
          
          {rightBox.map((stat, index) => (  
           <div key={index} className={styles.contentR}>
              
              <h1 className={styles.heading}>{stat.title}</h1>
              <p className={styles.subtitle}>{stat.subtitle}</p>
           
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}