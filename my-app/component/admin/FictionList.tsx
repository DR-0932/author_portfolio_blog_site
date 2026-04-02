"use client"

import Button from "@/component/ui/Button"
import { useDarkMode } from "@/context/DarkModeContext"

export type Chapter = { _id?: string; title: string; body: string }

export type Fiction = {
  _id: string
  title: string
  slug: string
  chapters: Chapter[]
  published: boolean
  createdAt: string
}

type Props = {
  fictions: Fiction[]
  loading: boolean
  onNew: () => void
  onEdit: (f: Fiction) => void
  onDelete: (id: string) => void
}

function badge(published: boolean) {
  const base = "shrink-0 text-sm px-3 py-1 rounded-full"
  return published
    ? `${base} bg-green-100 text-green-700`
    : `${base} bg-stone-100 text-stone-500`
}

export default function FictionList({ fictions, loading, onNew, onEdit, onDelete }: Props) {
  const { dark } = useDarkMode()

  const rowCls = `admin-card rounded-2xl px-9 py-8 flex items-center justify-between gap-6`
  const metaCls = `text-sm mt-1 ${dark ? "text-neutral-500" : "text-gray-400"}`
  const emptyCls = `text-center py-36 text-lg ${dark ? "text-neutral-600" : "text-gray-400"}`

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-semibold">Fiction</h2>
        <Button variant="primary" onClick={onNew}>+ New Fiction</Button>
      </div>

      {loading ? (
        <p className={emptyCls}>Loading…</p>
      ) : fictions.length === 0 ? (
        <p className={emptyCls}>No fiction yet. Create your first piece.</p>
      ) : (
        <div className="space-y-5">
          {fictions.map((f) => (
            <div key={f._id} className={rowCls}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-lg font-medium truncate">{f.title}</h3>
                  <span className={badge(f.published)}>
                    {f.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className={metaCls}>
                  /{f.slug} · {f.chapters.length} {f.chapters.length === 1 ? "chapter" : "chapters"} ·{" "}
                  {new Date(f.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Button variant="ghost" onClick={() => onEdit(f)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(f._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
