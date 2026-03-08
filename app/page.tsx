import Hero from "@/component/home/Hero";
import WorkExperience from "../component/home/WorkExperience";
import Testimonial from "../component/home/Testimonial";
import WorkSample from "../component/home/WorkSample";

export default function Page() {
  return (
    <main className=" ">
      
      <div>
        <Hero />
      </div>
      <div >
        <WorkExperience/>
      </div>
      <div>
        <Testimonial/>
      </div>
      <div>
        <WorkSample/>
      </div>

      
    </main>
  );
}