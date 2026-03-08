import Link from "next/link";

const styles = {
  wrapper:
    "w-full border-b bg-[#252525] backdrop-blur-md",

  container:
    "mx-auto px-6 h-30 flex items-center text-zinc-200 justify-between ",

  logo:
    "text-5xl font-semibold tracking-tight",

  nav:
    "text-3xl text-zinc-100 hidden md:flex items-center gap-10 ",

  navItem:
    "hover:text-black transition",

  button:
    "text-2xl tracking-widest rounded-2xl bg-black text-white px-9 py-6  hover:opacity-90 transition",
};

export default function Navbar() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          Yvaine
        </Link>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="/blogs" className={styles.navItem}>
            Blogs
          </Link>

          <Link href="/categories" className={styles.navItem}>
            Fiction
          </Link>

          <Link href="/about" className={styles.navItem}>
            About
          </Link>
        </nav>

        {/* CTA */}
        <Link href="/contact" className={styles.button}>
          Get In Touch
        </Link>
      </div>
    </header>
  );
}