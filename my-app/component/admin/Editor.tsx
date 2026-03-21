"use client"

import { useRef } from "react"

const styles = {
  label: "block text-sm font-medium text-gray-500 mb-2 tracking-widest uppercase",
  wrapper: "border border-stone-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#AE572C]/40",
  toolbarRow: "flex items-center gap-2 px-4 py-3 border-b border-stone-100 bg-stone-50",
  toolbarBtn: "px-3 py-1.5 text-sm rounded-lg hover:bg-stone-200 transition text-gray-700",
  toolbarDivider: "w-px h-5 bg-stone-200 mx-1",
  textarea: "w-full px-5 py-4 text-base resize-y focus:outline-none font-mono",
}

const toolbarItems = [
  { label: "H1", prefix: "# ",      suffix: "",     bold: true  },
  { label: "H2", prefix: "## ",     suffix: "",     bold: true  },
  { label: "H3", prefix: "### ",    suffix: "",     bold: true  },
  { label: "|",  prefix: "",        suffix: "",     divider: true },
  { label: "B",  prefix: "**",      suffix: "**",   bold: true  },
  { label: "I",  prefix: "*",       suffix: "*",    italic: true },
  { label: "❝",  prefix: "> ",      suffix: ""                  },
  { label: "—",  prefix: "\n---\n", suffix: ""                  },
]

type Props = {
  value: string
  onChange: (val: string) => void
}

export default function Editor({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)

  function insertAtCursor(prefix: string, suffix = "") {
    const el = ref.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    const inserted = prefix + (selected || (suffix ? "text" : "")) + suffix
    const next = value.slice(0, start) + inserted + value.slice(end)
    onChange(next)
    requestAnimationFrame(() => {
      el.focus()
      const cursor = start + inserted.length
      el.setSelectionRange(cursor, cursor)
    })
  }

  return (
    <div>
      <label className={styles.label}>Content</label>
      <div className={styles.wrapper}>
        <div className={styles.toolbarRow}>
          {toolbarItems.map((item) =>
            item.divider ? (
              <div key="divider" className={styles.toolbarDivider} />
            ) : (
              <button
                key={item.label}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); insertAtCursor(item.prefix, item.suffix) }}
                className={styles.toolbarBtn + (item.bold ? " font-bold" : "") + (item.italic ? " italic" : "")}
              >
                {item.label}
              </button>
            )
          )}
        </div>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          rows={14}
          placeholder={"# Heading 1\n## Heading 2\n\nStart writing here..."}
          className={styles.textarea}
        />
      </div>
    </div>
  )
}
