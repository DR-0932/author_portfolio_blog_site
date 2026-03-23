const styles = {
  label: "block text-sm font-medium text-gray-500 mb-2 tracking-widest uppercase",
  field: "w-full border border-stone-200 rounded-xl px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#AE572C]/40",
}

type Props = {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  required?: boolean
  rows?: number
}

export default function Field({ label, value, onChange, placeholder, required, rows }: Props) {
  const cls = styles.field
  return (
    <div>
      <label className={styles.label}>{label}</label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={cls}
        />
      )}
    </div>
  )
}
