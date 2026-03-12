import Link from "next/link";

const styles = {
  wrapper:
    "w-full bg-[#f8ecdc57] backdrop-blur-md sticky top-0 z-50 ",

  container:
    "mx-24 px-6 h-30 flex items-center text-black justify-between grid grid-cols-[3fr_2fr_0.6fr] ",

  logo:
    "text-4xl font-semibold tracking-tight ",

  nav:
    "text-3xl text-black hidden md:flex items-center gap-24 ",

  navItem:
    "hover:text-black transition",

  button:
    "text-xl tracking-widest rounded-2xl bg-black text-white px-6 py-3 max-w-[150px]  hover:opacity-90 transition",
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
            Blog
          </Link>

          <Link href="/categories" className={styles.navItem}>
            Projects
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