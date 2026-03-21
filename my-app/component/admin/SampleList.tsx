"use client"

import Button from "@/component/ui/Button"

export type Sample = {
  _id: string
  title: string
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

const styles = {
  toolbar: "flex items-center justify-between mb-12",
  heading: "text-4xl font-semibold",
  empty:   "text-center py-36 text-gray-400 text-lg",
  list:    "space-y-5",
  row:     "bg-white rounded-2xl border border-stone-200 px-9 py-8 flex items-center justify-between gap-6",
  title:   "text-lg font-medium truncate",
  meta:    "text-sm text-gray-400 mt-1",
  actions: "flex items-center gap-3 shrink-0",
}

export default function SampleList({ samples, loading, onNew, onEdit, onDelete }: Props) {
  return (
    <div>
      <div className={styles.toolbar}>
        <h2 className={styles.heading}>Writing Samples</h2>
        <Button variant="primary" onClick={onNew}>+ New Sample</Button>
      </div>

      {loading ? (
        <p className={styles.empty}>Loading…</p>
      ) : samples.length === 0 ? (
        <p className={styles.empty}>No samples yet.</p>
      ) : (
        <div className={styles.list}>
          {samples.map((s) => (
            <div key={s._id} className={styles.row}>
              <div className="flex-1 min-w-0">
                <p className={styles.title}>{s.title}</p>
                <p className={styles.meta}>
                  {new Date(s.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className={styles.actions}>
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
