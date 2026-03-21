"use client"

type ExpCardProps = {
  company: string
  role: string
  description: string
  date: string
  number:string
}

export default function ExpCard({
  company,
  role,
  description,
  date,
  number
}: ExpCardProps){

 const style = {
  wrapper: "md:m-24 flex justify-center",

  container:
    "w-full md:max-w-[1200px] md:h-[600px] rounded-[40px] overflow-hidden grid grid-cols-[70fr_30fr] bg-[#FAF6F1] shadow-xl",

titlebox: "relative flex flex-col py-20 px-16",

  company:
    "text-[#7B4A2E] text-xl",

  role:
    "text-[#AE572C] text-3xl font-semibold mt-3",

  date:
    "text-[#9B6A4D] text-lg mt-8",

  innerbox:
    "bg-[#EFE7DD] rounded-[40px] m-1 p-12 flex flex-col justify-between border border-[#E4D6C8]",

  description:
    "text-[#AE572C] text-2xl leading-snug font-medium max-w-xl",

  graphic:
    "w-full h-48 bg-[#D8C6B6] rounded-xl flex items-center justify-center text-[#AE572C]",
  
    number: "absolute bottom-10 text-[#8FA3A8] text-2xl font-semibold opacity-50"

}

  return(
    <div className={style.wrapper}>
      <div className={style.container}>

        <div className={style.titlebox}>
          <div className={style.company}>{company}</div>
          <div className={style.role}>{role}</div>
          <div className={style.date}>{date}</div>
          <div className={style.number}>{number}</div>
        </div>
        
        <div className={style.innerbox}>
          <p className={style.description}>{description}</p>
          <div className={style.graphic}> </div>
        </div>
        

      </div>
    </div>
  )
}