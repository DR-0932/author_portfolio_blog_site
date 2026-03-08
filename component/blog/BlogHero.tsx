
import Link from "next/link";

const styles = {
  wrapper:
    "relative  h-396 px-6 ",
  
  spacer:
    " p-34",

  container:
    "max-w-screen-2xl text-zinc-200 mx-auto",

  title:
    "text-4xl md:text-8xl font-semibold leading-tight tracking-tight",

  subtitle:
    " text-3xl font-semibold mt-12 max-w-3xl",

  button:
    "mt-8 inline-block rounded-xl bg-black text-white px-6 py-3 text-sm hover:opacity-90 transition",

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