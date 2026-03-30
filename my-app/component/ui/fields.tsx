"use client"

import { useDarkMode } from "@/context/DarkModeContext"

type Props = {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  required?: boolean
  rows?: number
  mono?: boolean
}

export default function Field({ label, value, onChange, placeholder, required, rows, mono }: Props) {
  const { dark } = useDarkMode()

  const labelCls = `block text-sm font-medium mb-2 tracking-widest uppercase ${dark ? "text-neutral-500" : "text-gray-500"}`
  const fieldCls = [
    "admin-field w-full border rounded-xl px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#AE572C]/40",
    mono ? "font-mono" : "",
  ].join(" ")

  return (
    <div>
      <label className={labelCls}>{label}</label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={fieldCls + " resize-none"}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={fieldCls}
        />
      )}
    </div>
  )
}
