"use client"

import Button from "@/component/ui/Button"
import { useDarkMode } from "@/context/DarkModeContext"

export type Sample = {
  _id: string
  title: string
  image: string
  text: string
  createdAt: string
}

type Props = {
  samples: Sample[]
  loading: boolean
  onNew: () => void
  onEdit: (sample: Sample) => void
  onDelete: (id: string) => void
}

export default function SampleList({ samples, loading, onNew, onEdit, onDelete }: Props) {
  const { dark } = useDarkMode()

  const rowCls = `admin-card rounded-2xl px-9 py-8 flex items-center justify-between gap-6`
  const metaCls = `text-sm mt-1 ${dark ? "text-neutral-500" : "text-gray-400"}`
  const emptyCls = `text-center py-36 text-lg ${dark ? "text-neutral-600" : "text-gray-400"}`

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-semibold">Writing Samples</h2>
        <Button variant="primary" onClick={onNew}>+ New Sample</Button>
      </div>

      {loading ? (
        <p className={emptyCls}>Loading…</p>
      ) : samples.length === 0 ? (
        <p className={emptyCls}>No samples yet.</p>
      ) : (
        <div className="space-y-5">
          {samples.map((s) => (
            <div key={s._id} className={rowCls}>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium truncate">{s.title}</p>
                <p className={metaCls}>
                  {new Date(s.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button variant="ghost" onClick={() => onEdit(s)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(s._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
