"use client";

import Link from "next/link";
import NavLink from "@/components/navbar/NavLink";

const navLinks = [
  { href: "/blogs", label: "Blog" },
  { href: "/fiction", label: "Fiction" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const styles = {
  btn: "md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5",
  bar: "block w-6 h-0.5 transition-all duration-300 origin-center",
  barMid: "block w-6 h-0.5 transition-all duration-300",
  overlay: "fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-300",
  nav: "flex flex-col px-8 pt-10 gap-8",
  footer: "mt-auto px-8 pb-12",
  divider: "h-px w-full mb-8",
  label: "text-xs tracking-widest uppercase mb-2",
  ctaLink: "inline-block text-lg font-semibold",
};

type Props = {
  menuOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export default function HamburgerMenu({ menuOpen, onToggle, onClose }: Props) {
  return (
    <>
      {/* Hamburger button */}
      <button onClick={onToggle} className={styles.btn} aria-label="Toggle menu">
        <span
          className={styles.bar}
          style={{
            backgroundColor: "var(--nav-text)",
            transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none",
          }}
        />
        <span
          className={styles.barMid}
          style={{ backgroundColor: "var(--nav-text)", opacity: menuOpen ? 0 : 1 }}
        />
        <span
          className={styles.bar}
          style={{
            backgroundColor: "var(--nav-text)",
            transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none",
          }}
        />
      </button>

      {/* Mobile overlay */}
      <div
        className={styles.overlay}
        style={{
          backgroundColor: "var(--bg)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        <div className="h-20" />

        <nav className={styles.nav}>
          {navLinks.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} mobile onClick={onClose} />
          ))}
        </nav>

        <div className={styles.footer}>
          <div className={styles.divider} style={{ backgroundColor: "var(--border)" }} />
          <p className={styles.label} style={{ color: "var(--accent)" }}>
            Get in touch
          </p>
          <Link
            href="/contact"
            className={styles.ctaLink}
            style={{ color: "var(--text)" }}
            onClick={onClose}
          >
            Start a project →
          </Link>
        </div>
      </div>
    </>
  );
}
