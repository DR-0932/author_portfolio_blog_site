import Hero from "@/home/Hero";
import Description from "@/home/Description";
import WorkExperience from "../home/WorkExperience";
import Testimonial from "../home/Testimonial";
import WorkSample from "../home/WorkSample";
import ExpCard from "../component/ui/expCard";
import Contact from "../home/Contact";
import DemoTestimonial from "../home/DemoTestimonial";
import StackingCardsDemo from "../component/ui/card2";
import WorkSample2 from "../home/WorkSample2";

export default function Page() {
  return (
    <main className="">
      <Hero />
      <Description />
      <WorkSample2 />
      {/* <WorkSample /> */}
      <Testimonial />
      <WorkExperience />
      <Contact />
    </main>
  );
}
