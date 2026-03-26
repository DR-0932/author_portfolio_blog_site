
import Link from "next/link";

const styles = {
  wrapper:
    "relative pb-16 md:pb-56 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64",

  spacer:
    "p-16 md:p-34",

  container:
    "",

  title:
    "text-3xl sm:text-5xl md:text-8xl font-semibold leading-tight tracking-tight",

  subtitle:
    "text-base md:text-3xl font-semibold mt-6 md:mt-12 max-w-3xl",

  button:
    "mt-8 inline-block rounded-xl bg-[#AE572C] text-white px-6 py-3 text-sm hover:opacity-90 transition",

  imageWrapper:
    "relative w-full h-[380px] rounded-2xl overflow-hidden",

  image: "object-cover",
};


export default function BlogHero() {
  return (
    <section className={styles.wrapper}>
        <div className={styles.spacer} >
          
        </div>
      <div className={styles.container}>
        {/* Left Content */}
        <div>
          

          <h1 className={styles.title}>
            Ideas, stories and perspectives that shape the future
          </h1>

          <p className={styles.subtitle}>
            Explore thoughtful articles on technology, design, health,
            and innovation written to inform and inspire.
          </p>

          <Link href="/blogs" className={styles.button}>
            Explore Articles
          </Link>
        </div>

        {/* Right Image */}
      </div>
    </section>
  );
}