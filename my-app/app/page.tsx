import Hero from "@/component/home/Hero";
import WorkExperience from "../component/home/WorkExperience";
import Testimonial from "../component/home/Testimonial";
import WorkSample from "../component/home/WorkSample";
import Testcard2 from "../component/ui/card2";
import ExpCard from "../component/ui/expCard";
import Contact from "../component/home/Contact";
import DemoTestimonial from "../component/home/DemoTestimonial";

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
      <Contact />
    </main>
  );
}