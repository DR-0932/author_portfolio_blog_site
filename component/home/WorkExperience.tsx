"use client";

const styles = {
  section: "w-full my-23 px-6 grid grid-cols-1 md:grid-cols-[60%_40%]   border",

  container: "w-full mx-auto ",

  workExp: "pl-56 pt-30 border m-30 text-3xl md:text-6xl font-bold hidden md:block ",

  timelineWrapper: "relative border-l border-neutral-700 pl-8 space-y-12",

  item: "relative",

  role: "text-3xl md:text-6xl text-black text-bold font-medium mt-3",

  company: "text-lg md:text-2xl text-black mt-3",

  date: "text-base md:text-2xl text-black mt-3",

  description: "text-xl md:text-2xl text-black mt-3 max-w-2xl leading-relaxed",
};

export default function WorkExperience() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        {/* <h2 className={styles.heading}>Work Experience</h2> */}

        <div className={styles.timelineWrapper}>
          
          {/* Job 1 */}
          <div className={styles.item}>

            <h3 className={styles.role}>Full-Stack Developer</h3>

            <div className={styles.company}>Company XYZ</div>

            <div className={styles.date}>Oct 2025 — Present</div>

            <p className={styles.description}>
              Building scalable web applications using modern frontend
              frameworks and backend services. Focused on performance,
              user experience, and maintainable system architecture.
            </p>
          </div>

          {/* Job 2 */}
          <div className={styles.item}>

            <h3 className={styles.role}>Content & Web Consultant</h3>

            <div className={styles.company}>Freelance</div>

            <div className={styles.date}>Dec 2023 — Jun 2025</div>

            <p className={styles.description}>
              Worked with startups to develop technical content,
              improve website structure, and design better user
              journeys across digital platforms.
            </p>
          </div>

          {/* Job 3 */}
          <div className={styles.item}>

            <h3 className={styles.role}>Intern Developer</h3>

            <div className={styles.company}>Startup ABC</div>

            <div className={styles.date}>May 2023 — Nov 2023</div>

            <p className={styles.description}>
              Assisted in developing frontend features and integrating
              APIs for internal dashboards while learning modern web
              development practices.
            </p>
          </div>

        </div>
      </div>
      <div className={styles.workExp}>WORK <br />EXPERIENCE</div>
    </section>
  );
}