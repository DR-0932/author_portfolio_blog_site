"use client"

import { useDarkMode } from "@/context/DarkModeContext"

const base = "text-base px-6 py-3 rounded-xl transition font-medium"

type Props = {
  variant?: "primary" | "ghost" | "danger"
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  children: React.ReactNode
}

export default function Button({ variant = "ghost", onClick, type = "button", disabled, children }: Props) {
  const { dark } = useDarkMode()

  const variants = {
    primary: `${base} bg-[#AE572C] text-white hover:opacity-90 disabled:opacity-50`,
    ghost:   dark
      ? `${base} border border-[#2a2a2a] text-neutral-300 hover:border-[#AE572C] hover:text-[#AE572C]`
      : `${base} border border-stone-200 hover:border-[#AE572C] hover:text-[#AE572C]`,
    danger:  dark
      ? `${base} border border-[#2a2a2a] text-neutral-300 hover:border-red-400 hover:text-red-400`
      : `${base} border border-stone-200 hover:border-red-400 hover:text-red-500`,
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={variants[variant]}>
      {children}
    </button>
  )
}
