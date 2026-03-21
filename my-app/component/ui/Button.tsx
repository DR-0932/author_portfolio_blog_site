const base = "text-base px-6 py-3 rounded-xl transition font-medium"

const variants = {
  primary:  `${base} bg-[#AE572C] text-white hover:opacity-90 disabled:opacity-50`,
  ghost:    `${base} border border-stone-200 hover:border-[#AE572C] hover:text-[#AE572C]`,
  danger:   `${base} border border-stone-200 hover:border-red-400 hover:text-red-500`,
}

type Props = {
  variant?: keyof typeof variants
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
  children: React.ReactNode
}

export default function Button({ variant = "ghost", onClick, type = "button", disabled, children }: Props) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={variants[variant]}>
      {children}
    </button>
  )
}
