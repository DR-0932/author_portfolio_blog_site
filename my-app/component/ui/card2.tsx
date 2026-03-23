// author: Khoa Phan <https://www.pldkhoa.dev>

"use client"

import { useRef } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import StackingCards, {
  StackingCardItem,
} from "@/component/ui/StackingCard"

const cards = [
  {
    bgColor: "bg-[#f97316]",
    title: "The Guiding Light",
    description:
      "Lighthouses have stood as beacons of hope for centuries, guiding sailors safely through treacherous waters. Their glowing light and towering presence serve as a reminder of humanity’s connection to the sea.",
    image:
      "https://plus.unsplash.com/premium_vector-1739262161806-d954eb02427c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-[#0015ff]",
    title: "Life Beneath the Waves",
    description:
      "From shimmering schools of fish to solitary hunters, the ocean is home to an incredible variety of marine life. Each species plays a vital role in maintaining the balance of underwater ecosystems.",
    image:
      "https://plus.unsplash.com/premium_vector-1739200616200-69a138d91627?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-[#ff5941]",
    title: "Alone on the Open Sea",
    description:
      "Drifting across the endless horizon, traveling alone on the sea is a test of courage and resilience. With nothing but the waves and the sky, solitude becomes both a challenge and a source of deep reflection.",
    image:
      "https://plus.unsplash.com/premium_vector-1738597190290-a3b571590b9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-[#1f464d]",
    title: "The Art of Sailing",
    description:
      "Harnessing the power of the wind, sailing is both a skill and an adventure. Whether racing across the waves or leisurely cruising, it’s a timeless way to explore the vast blue expanse.",
    image:
      "https://plus.unsplash.com/premium_vector-1738935247245-97940c74cced?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D",
  },
  {
    bgColor: "bg-[#0015ff]",
    title: "The Era of Whaling",
    description:
      "Once a thriving industry, whale hunting shaped economies and cultures across the world. Today, efforts to protect these majestic creatures highlight the shift toward conservation and respect for marine life.",
    image:
      "https://plus.unsplash.com/premium_vector-1738935247692-1c2f2c924fd8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjJ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D",
  },
]

const styles = {
  wrapper: "h-[620px] bg-white overflow-auto text-white",
  heading: "relative font-calendas h-[620px] w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center text-[#ff5941] whitespace-pre",
  cardInner: "h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative",
  cardContent: "flex-1 flex flex-col justify-center",
  cardTitle: "font-bold text-2xl mb-5",
  cardImageWrapper: "w-full sm:w-1/2 rounded-xl aspect-video relative overflow-hidden",
  cardImage: "object-cover",
}

export default function StackingCardsDemo() {
  const container = useRef<HTMLDivElement>(null)

  return (
    <div
      className={styles.wrapper}
      ref={container}
    >
      <StackingCards
        totalCards={cards.length}
        scrollOptions={{ container: container }}
      >
        <div className={styles.heading}>

        </div>
        {cards.map(({ bgColor, description, image, title }, index) => {
          return (
            <StackingCardItem key={index} index={index} className="h-[620px]">
              <div
                className={cn(
                  bgColor,
                  styles.cardInner
                )}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <p>{description}</p>
                </div>

                <div className={styles.cardImageWrapper}>
                  <Image
                    src={image}
                    alt={title}
                    className={styles.cardImage}
                    fill
                  />
                </div>
              </div>
            </StackingCardItem>
          )
        })}
      </StackingCards>
    </div>
  );
}



// export default function Testcard2(){
  
//   const style = {
//     wrapper: " md:w-2xl md:h-100 border-[#BF7950] rounded-2xl m-24 border shadow-md hover:shadow-xl transition-shadow bg-black",
    
//     quote:"mt-6  ml-12  max-w-10 flex items-center rounded-full",

//     text:" md:h-60 p-8 text-2xl text-white",

//     credentials:"grid h-20 grid-cols-[15fr_85fr] border-t border-[#BF7950] mx-6 ",

//     image:"mt-4 md:max-w-10 ml-4  rounded-full",

//     name:"text-xl font-bold pt-3 text-[#fff]",

//     designation:"text-lg text-[#fff]"

//   }  
  
//   return(<>
//    <div className={style.wrapper}>
//       <div className={style.quote}>
//             <img src="/quoteIcon.svg" alt="icon" />      
//       </div>
//       <div className={style.text}>
//           <h2>we really liked your approach towards. Although we had the content written from our end, we needed someone to rewrite it from an outsider perspective. We loved the angle and the concept you brought.</h2>
//       </div>
//       <div className={style.credentials}>
//           <div className={style.image}>
//             <img src="/user-profile-avatar-svgrepo-com.svg" alt="profileicon" />
//           </div>
          
//           <div >
//             <div className={style.name}> Tenax Treasury</div>
//             <div className={style.designation}>asdas</div>
//           </div>
//       </div>
//    </div>
    
  
//   </>)
  
// }



