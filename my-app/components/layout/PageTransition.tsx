"use client";
import { useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

const STRIPS = 7;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAnimating = useRef(false);
  const hasMounted = useRef(false);
  const prevPathname = useRef<string>("");

  // Reveal: strips slide up when new page mounts
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      prevPathname.current = pathname;
      gsap.set(".transition-strip", { yPercent: -100 });
      return;
    }

    const prev = prevPathname.current;
    prevPathname.current = pathname;

    // Skip strips when navigating within /fiction
    if (prev.startsWith("/fiction") && pathname.startsWith("/fiction")) {
      isAnimating.current = false;
      return;
    }

    gsap.fromTo(
      ".transition-strip",
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
        stagger: 0.07,
        onComplete: () => {
          isAnimating.current = false;
        },
      }
    );
  }, [pathname]);

  const triggerTransition = useCallback(
    (href: string) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      gsap.fromTo(
        ".transition-strip",
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.75,
          ease: "power4.inOut",
          stagger: 0.07,
          onComplete: () => router.push(href),
        }
      );
    },
    [router]
  );

  // Intercept all internal link clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto") ||
        href === pathname ||
        anchor.dataset.noTransition !== undefined
      )
        return;
      e.preventDefault();
      triggerTransition(href);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [triggerTransition, pathname]);

  return (
    <>
      {children}
      <div className="fixed inset-0 z-9998 flex pointer-events-none">
        {Array.from({ length: STRIPS }).map((_, i) => (
          <div key={i} className="transition-strip flex-1 bg-black h-full" />
        ))}
      </div>
    </>
  );
}
