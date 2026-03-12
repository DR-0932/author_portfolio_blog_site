import Hero from "@/component/home/Hero";
import WorkExperience from "../component/home/WorkExperience";
import Testimonial from "../component/home/Testimonial";
import WorkSample from "../component/home/WorkSample";

export default function Page() {
  return (
    <main className=" bg-[#f8ecdc57]">
      
      <div>
        <Hero />
      </div>
     
      <div className="border-b border-t h-256">
        <Testimonial/>
      </div>
      <div>
        <WorkExperience/>
      </div>
      <div className="">
        <WorkSample/>
      </div>

      
    </main>
  );
}