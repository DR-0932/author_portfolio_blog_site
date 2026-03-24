import Hero from "@/component/home/Hero";
import WorkExperience from "../component/home/WorkExperience";
import Testimonial from "../component/home/Testimonial";
import WorkSample from "../component/home/WorkSample";
import ExpCard from "../component/ui/expCard";
import Contact from "../component/home/Contact";
import DemoTestimonial from "../component/home/DemoTestimonial";
import StackingCardsDemo from "../component/ui/card2";

const styles = {
  main: "bg-[#f8ecdc57]",
  testimonialWrapper: "",
}

export default function Page() {
  return (
    <main className={styles.main}>

      <div>
        <Hero />
      </div>

      <div>
        <WorkExperience/>
      </div>
      <div className={styles.testimonialWrapper}>
        <Testimonial/>
      </div>
      <div >
        {/* <StackingCardsDemo/> */}
      </div>
      <div>
        <WorkSample/>
      </div>
      <Contact />
    </main>
  );
}