"use client"
import { Span } from "next/dist/trace";
import { useState } from "react"

type accordiantype ={
  title:String,
  text:String
}



export default function Accordian({title,text}:accordiantype){
  const [accordianOpen, setaccordianOpen] =useState(false);

  const styles ={
    wrapper:" mx-156 p-4 bg-black rounded-lg",
    
    container:"text-white flex  justify-between w-full py-3 ",
    
    cntr2:`text-white grid overflow-hidden transition-all duration-600  ${
      accordianOpen 
      ? 'max-h-[900] opacity-100'
      :'max-h-0 opacity-0 '
    } `,

    subtext:"text-xl overflow-hidden columns-2 gap-12 p-16 tracking-wider"
  }


  return(<>
  <div className={styles.wrapper}>
   <div>

    <button className={styles.container} onClick={()=>{setaccordianOpen(!accordianOpen)}}>
      <span className="text-3xl">{title}</span>
      {accordianOpen ? <span className="text-4xl mx-1.5 ">-</span> : <span className="text-4xl ">+</span>}
    </button>
    <div className={styles.cntr2}>
      <div className={styles.subtext}>
        {text}
      </div>
    </div>
   </div>
  </div>
  
  
  </>)
}