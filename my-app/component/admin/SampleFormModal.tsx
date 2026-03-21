"use client"

import Field from "@/component/ui/fields"
import Editor from "@/component/admin/Editor"
import Button from "@/component/ui/Button"

export type SampleFormState = {
  title: string
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

const styles = {
  overlay:     "fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4",
  modal:       "bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto",
  modalHeader: "px-10 py-8 border-b border-stone-100 flex items-center justify-between",
  modalTitle:  "text-2xl font-semibold",
  closeBtn:    "text-gray-400 hover:text-black text-2xl leading-none",
  form:        "px-10 py-8 space-y-6",
  errorMsg:    "text-base text-red-500",
  footerRow:   "flex justify-end gap-4 pt-2",
}

export default function SampleFormModal({ editingId, form, setForm, onSubmit, onClose, saving, error }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{editingId ? "Edit Sample" : "New Sample"}</h3>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>

        <form onSubmit={onSubmit} className={styles.form}>

          <Field
            label="Title"
            value={form.title}
            onChange={(v: string) => setForm((f) => ({ ...f, title: v }))}
            required />

          <Editor
            value={form.text}
            onChange={(v: string) => setForm((f) => ({ ...f, text: v }))} />

          {error && <p className={styles.errorMsg}>{error}</p>}

          <div className={styles.footerRow}>
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
