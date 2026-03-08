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

    container: "w-234 h-34 grid grid-cols-[0.9fr_2.1fr] gap-3",

    leftbox: "bg-black rounded-2xl flex flex-col justify-center items-center",

    rightbox: "bg-black rounded-2xl grid grid-cols-3 items-center divide-x divide-white/20",

    contentR: "flex flex-col justify-center items-center px-6",

    heading: "pb-2 text-xl font-semibold text-white",
    subtitle: "text-sm text-gray-300 tracking-widest"
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