"use client"

export default function Testcard2(){
  
  const style = {
    wrapper: " md:w-2xl md:h-100 border-[#BF7950] rounded-2xl m-24 border shadow-md hover:shadow-xl transition-shadow bg-black",
    
    quote:"mt-6  ml-12  max-w-10 flex items-center rounded-full",

    text:" md:h-60 p-8 text-2xl text-white",

    credentials:"grid h-20 grid-cols-[15fr_85fr] border-t border-[#BF7950] mx-6 ",

    image:"mt-4 md:max-w-10 ml-4  rounded-full",

    name:"text-xl font-bold pt-3 text-[#fff]",

    designation:"text-lg text-[#fff]"

  }  
  
  return(<>
   <div className={style.wrapper}>
      <div className={style.quote}>
            <img src="/quoteIcon.svg" alt="icon" />      
      </div>
      <div className={style.text}>
          <h2>we really liked your approach towards. Although we had the content written from our end, we needed someone to rewrite it from an outsider perspective. We loved the angle and the concept you brought.</h2>
      </div>
      <div className={style.credentials}>
          <div className={style.image}>
            <img src="/user-profile-avatar-svgrepo-com.svg" alt="profileicon" />
          </div>
          
          <div >
            <div className={style.name}> Tenax Treasury</div>
            <div className={style.designation}>asdas</div>
          </div>
      </div>
   </div>
    
  
  </>)
  
}