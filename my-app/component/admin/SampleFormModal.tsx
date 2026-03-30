"use client"

import Field from "@/component/ui/fields"
import Editor from "@/component/admin/Editor"
import Button from "@/component/ui/Button"
import ImageUploadField from "@/component/admin/ImageUploadField"
import { useDarkMode } from "@/context/DarkModeContext"

export type SampleFormState = {
  title: string
  image: string
  text: string
}

type Props = {
  editingId: string | null
  form: SampleFormState
  setForm: React.Dispatch<React.SetStateAction<SampleFormState>>
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void
  onClose: () => void
  saving: boolean
  error: string
}

export default function SampleFormModal({ editingId, form, setForm, onSubmit, onClose, saving, error }: Props) {
  const { dark } = useDarkMode()

  const closeCls    = `text-2xl leading-none transition ${dark ? "text-neutral-500 hover:text-white" : "text-gray-400 hover:text-black"}`
  const dividerStyle = { borderBottom: `1px solid ${dark ? "#2a2a2a" : "#e7e5e4"}` }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="admin-modal rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="px-10 py-8 flex items-center justify-between" style={dividerStyle}>
          <h3 className="text-2xl font-semibold">{editingId ? "Edit Sample" : "New Sample"}</h3>
          <button onClick={onClose} className={closeCls}>×</button>
        </div>

        <form onSubmit={onSubmit} className="px-10 py-8 space-y-6">
          <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required />
          <ImageUploadField value={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
          <Editor value={form.text} onChange={(v) => setForm((f) => ({ ...f, text: v }))} />

          {error && <p className="text-base text-red-500">{error}</p>}

          <div className="flex justify-end gap-4 pt-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Create sample"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
