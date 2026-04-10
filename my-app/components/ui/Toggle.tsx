const styles = {
  row: "flex items-center gap-3",
  track: (on: boolean) => `relative w-14 h-7 rounded-full transition-colors ${on ? "bg-[#AE572C]" : "bg-stone-300"}`,
  knob: (on: boolean) => `absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-7" : ""}`,
  label: "text-base text-gray-600",
}

type Props = {
  on: boolean
  onToggle: () => void
  label?: string
}

export default function Toggle({ on, onToggle, label }: Props) {
  return (
    <div className={styles.row}>
      <button type="button" onClick={onToggle} className={styles.track(on)}>
        <span className={styles.knob(on)} />
      </button>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  )
}
