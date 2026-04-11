"use client";

const styles = {
  btn: "md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5",
  bar: "block w-6 h-0.5 transition-all duration-300 origin-center",
  barMid: "block w-6 h-0.5 transition-all duration-300",
};

type Props = {
  menuOpen: boolean;
  onToggle: () => void;
};

export default function HamburgerMenu({ menuOpen, onToggle }: Props) {
  return (
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
  );
}
