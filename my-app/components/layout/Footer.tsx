"use client";

import Link from "next/link";

const socials = [
  {
    label: "Substack",
    href: "https://20sdiaries.substack.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/palak-agarwal1002/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Medium",
    href: "https://medium.com/@palakagarwal.ag1002",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blog" },
  { href: "/fiction", label: "Fiction" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--bg-subtle)", borderTop: "1px solid var(--border)" }}>
      <div className="page-x py-16 md:py-20">

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">

          {/* Brand + tagline */}
          <div className="max-w-xs">
            <p className="text-2xl font-bold tracking-tight mb-3" style={{ color: "var(--text)" }}>
              Palak Agarwal
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Freelance writer, ghostwriter &amp; book editor. Turning rough ideas into polished, publish-ready work.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-5" style={{ color: "var(--accent)" }}>
              Navigate
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-opacity hover:opacity-50"
                    style={{ color: "var(--muted)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-5" style={{ color: "var(--accent)" }}>
              Find me on
            </p>
            <ul className="flex flex-col gap-4">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm transition-opacity hover:opacity-50"
                    style={{ color: "var(--muted)" }}
                  >
                    {s.icon}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-5" style={{ color: "var(--accent)" }}>
              Get in touch
            </p>
            <a
              href="mailto:junepalak@gmail.com"
              className="text-sm transition-opacity hover:opacity-50 block mb-6"
              style={{ color: "var(--muted)" }}
            >
              junepalak@gmail.com
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl text-sm font-semibold tracking-wide hover:opacity-90 transition"
              style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
            >
              Send a message
            </Link>
          </div>

        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} Palak Agarwal. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Writer · Ghostwriter · Editor
          </p>
        </div>

      </div>
    </footer>
  );
}
