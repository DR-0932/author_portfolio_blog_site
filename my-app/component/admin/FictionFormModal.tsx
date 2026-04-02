"use client"

import { useState, useRef } from "react"
import Field from "@/component/ui/fields"
import Button from "@/component/ui/Button"
import Toggle from "@/component/ui/Toggle"
import { useDarkMode } from "@/context/DarkModeContext"

export type Chapter = { title: string; body: string }

export type FictionFormState = {
  title: string
  slug: string
  chapters: Chapter[]
  published: boolean
}

type Props = {
  editingId: string | null
  form: FictionFormState
  setForm: React.Dispatch<React.SetStateAction<FictionFormState>>
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
  onClose: () => void
  saving: boolean
  error: string
}

const toolbarItems = [
  { label: "B",  prefix: "**",      suffix: "**",  bold: true  },
  { label: "I",  prefix: "*",       suffix: "*",   italic: true },
  { label: "❝",  prefix: "> ",      suffix: ""     },
  { label: "—",  prefix: "\n---\n", suffix: ""     },
]

export default function FictionFormModal({ editingId, form, setForm, onSubmit, onClose, saving, error }: Props) {
  const { dark } = useDarkMode()
  const [activeChapter, setActiveChapter] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const bg         = dark ? "#111111" : "#ffffff"
  const border     = dark ? "#2a2a2a" : "#e7e5e4"
  const sidebarBg  = dark ? "#0d0d0d" : "#f5f2ee"
  const text       = dark ? "#f0f0f0" : "#171717"
  const muted      = dark ? "#555555" : "#78716c"
  const accent     = dark ? "#ec4899" : "#AE572C"
  const activeBg   = dark ? "#1e1e1e" : "#ffffff"
  const toolbarBg  = dark ? "#161616" : "#fafaf9"

  function handleTitleChange(val: string) {
    setForm((f) => ({
      ...f,
      title: val,
      ...(editingId ? {} : {
        slug: val.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }),
    }))
  }

  function addChapter() {
    const idx = form.chapters.length
    setForm((f) => ({ ...f, chapters: [...f.chapters, { title: `Chapter ${idx + 1}`, body: "" }] }))
    setActiveChapter(idx)
  }

  function removeChapter(i: number) {
    if (form.chapters.length <= 1) return
    setForm((f) => ({ ...f, chapters: f.chapters.filter((_, idx) => idx !== i) }))
    setActiveChapter((prev) => Math.min(prev, form.chapters.length - 2))
  }

  function updateChapterTitle(i: number, val: string) {
    setForm((f) => {
      const next = [...f.chapters]
      next[i] = { ...next[i], title: val }
      return { ...f, chapters: next }
    })
  }

  function updateChapterBody(val: string) {
    setForm((f) => {
      const next = [...f.chapters]
      next[activeChapter] = { ...next[activeChapter], body: val }
      return { ...f, chapters: next }
    })
  }

  function insertAtCursor(prefix: string, suffix = "") {
    const el = textareaRef.current
    if (!el) return
    const body = form.chapters[activeChapter]?.body ?? ""
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = body.slice(start, end)
    const inserted = prefix + (selected || (suffix ? "text" : "")) + suffix
    const next = body.slice(0, start) + inserted + body.slice(end)
    updateChapterBody(next)
    requestAnimationFrame(() => {
      el.focus()
      const cursor = start + inserted.length
      el.setSelectionRange(cursor, cursor)
    })
  }

  const current = form.chapters[activeChapter] ?? { title: "", body: "" }
  const closeCls = `text-2xl leading-none transition ${dark ? "text-neutral-500 hover:text-white" : "text-gray-400 hover:text-black"}`

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col"
        style={{ backgroundColor: bg, border: `1px solid ${border}`, height: "90vh" }}
      >

        {/* Header */}
        <div
          className="px-8 py-4 flex items-center gap-6 shrink-0"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <h3 className="text-base font-semibold shrink-0" style={{ color: text }}>
            {editingId ? "Edit Fiction" : "New Fiction"}
          </h3>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={handleTitleChange} required />
            <Field label="Slug" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} required mono />
          </div>
          <div className="shrink-0 flex items-center gap-5">
            <Toggle
              on={form.published}
              onToggle={() => setForm((f) => ({ ...f, published: !f.published }))}
              label={form.published ? "Published" : "Draft"}
            />
            <button onClick={onClose} className={closeCls}>×</button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="flex flex-1 min-h-0">

          {/* Chapter sidebar */}
          <aside
            className="w-52 shrink-0 flex flex-col"
            style={{ backgroundColor: sidebarBg, borderRight: `1px solid ${border}` }}
          >
            <p className="text-xs tracking-[0.25em] uppercase px-5 pt-5 pb-3" style={{ color: muted }}>
              Chapters
            </p>
            <div className="flex-1 overflow-y-auto px-3 space-y-1">
              {form.chapters.map((ch, i) => (
                <div
                  key={i}
                  onClick={() => setActiveChapter(i)}
                  className="group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                  style={{
                    backgroundColor: activeChapter === i ? activeBg : "transparent",
                    border: `1px solid ${activeChapter === i ? border : "transparent"}`,
                  }}
                >
                  <span
                    className="text-sm truncate flex-1"
                    style={{
                      color: activeChapter === i ? text : muted,
                      fontWeight: activeChapter === i ? 500 : 400,
                    }}
                  >
                    {ch.title || `Chapter ${i + 1}`}
                  </span>
                  {form.chapters.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removeChapter(i) }}
                      className="opacity-0 group-hover:opacity-100 ml-1 text-base leading-none transition hover:text-red-500"
                      style={{ color: muted }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="p-3 shrink-0">
              <button
                type="button"
                onClick={addChapter}
                className="w-full py-2 text-sm rounded-xl border transition hover:opacity-70"
                style={{ borderColor: border, color: accent }}
              >
                + Add Chapter
              </button>
            </div>
          </aside>

          {/* Editor panel */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Chapter title input */}
            <div className="px-6 pt-5 pb-4 shrink-0" style={{ borderBottom: `1px solid ${border}` }}>
              <input
                type="text"
                value={current.title}
                onChange={(e) => updateChapterTitle(activeChapter, e.target.value)}
                placeholder="Chapter title"
                className="w-full text-xl font-semibold bg-transparent focus:outline-none"
                style={{ color: text }}
              />
            </div>

            {/* Toolbar */}
            <div
              className="flex items-center gap-1 px-5 py-2 shrink-0"
              style={{ backgroundColor: toolbarBg, borderBottom: `1px solid ${border}` }}
            >
              {toolbarItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); insertAtCursor(item.prefix, item.suffix) }}
                  className={"px-3 py-1.5 text-sm rounded-lg transition hover:opacity-80" + (item.bold ? " font-bold" : "") + (item.italic ? " italic" : "")}
                  style={{ color: muted }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Textarea - fills remaining space */}
            <textarea
              ref={textareaRef}
              value={current.body}
              onChange={(e) => updateChapterBody(e.target.value)}
              placeholder="Start writing here..."
              className="flex-1 resize-none px-6 py-5 text-base focus:outline-none bg-transparent leading-loose"
              style={{ color: text }}
            />

            {/* Footer */}
            <div
              className="px-6 py-4 flex items-center justify-between shrink-0"
              style={{ borderTop: `1px solid ${border}` }}
            >
              <div className="text-sm text-red-500">{error}</div>
              <div className="flex gap-3">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button variant="primary" type="submit" disabled={saving}>
                  {saving ? "Saving…" : editingId ? "Save changes" : "Create fiction"}
                </Button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
