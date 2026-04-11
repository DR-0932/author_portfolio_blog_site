"use client";

import Link from "next/link";

type Props = {
  href: string;
  label: string;
  color?: string;
  onClick?: () => void;
  mobile?: boolean;
};

const styles = {
  desktop:
    " font-bold text-sm lg:text-lg xl:text-lg hover:opacity-70 transition px-2 py-1 rounded-lg hover:bg-stone-100/10 ",
  mobile:
    "text-4xl font-bold tracking-tight transition-opacity hover:opacity-60",
};

export default function NavLink({
  href,
  label,
  color,
  onClick,
  mobile = false,
}: Props) {
  return (
    <Link
      href={href}
      className={mobile ? styles.mobile : styles.desktop}
      style={color ? { color } : undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
