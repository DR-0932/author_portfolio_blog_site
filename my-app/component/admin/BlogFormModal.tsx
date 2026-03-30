"use client"

import Field from "@/component/ui/fields"
import Button from "@/component/ui/Button"
import Toggle from "@/component/ui/Toggle"
import Editor from "@/component/admin/Editor"
import ImageUploadField from "@/component/admin/ImageUploadField"
import { useDarkMode } from "@/context/DarkModeContext"

export type FormState = {
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  published: boolean
}

type Props = {
  editingId: string | null
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
  onClose: () => void
  saving: boolean
  error: string
}

export default function BlogFormModal({ editingId, form, setForm, onSubmit, onClose, saving, error }: Props) {
  const { dark } = useDarkMode()

  const closeCls = `text-2xl leading-none transition ${dark ? "text-neutral-500 hover:text-white" : "text-gray-400 hover:text-black"}`
  const dividerStyle = { borderBottom: `1px solid ${dark ? "#2a2a2a" : "#e7e5e4"}` }

  function handleTitleChange(val: string) {
    setForm((f) => ({
      ...f,
      title: val,
      ...(editingId ? {} : {
        slug: val.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      }),
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="admin-modal rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="px-10 py-8 flex items-center justify-between" style={dividerStyle}>
          <h3 className="text-2xl font-semibold">{editingId ? "Edit Blog" : "New Blog"}</h3>
          <button onClick={onClose} className={closeCls}>×</button>
        </div>

        <form onSubmit={onSubmit} className="px-10 py-8 space-y-6">
          <Field label="Title" value={form.title} onChange={handleTitleChange} required />
          <Field label="Slug" value={form.slug} onChange={(v) => setForm((f) => ({ ...f, slug: v }))} required mono />

          <div className="grid grid-cols-2 gap-5">
            <Field label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} placeholder="e.g. Health & Medical" />
          </div>
          <ImageUploadField value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />

          <Field label="Excerpt" value={form.excerpt} onChange={(v) => setForm((f) => ({ ...f, excerpt: v }))} rows={2} placeholder="Short summary shown on the blog listing page" />

          <Editor value={form.content} onChange={(v) => setForm((f) => ({ ...f, content: v }))} />

          <Toggle
            on={form.published}
            onToggle={() => setForm((f) => ({ ...f, published: !f.published }))}
            label={form.published ? "Published" : "Draft"}
          />

          {error && <p className="text-base text-red-500">{error}</p>}

          <div className="flex justify-end gap-4 pt-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Create blog"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
