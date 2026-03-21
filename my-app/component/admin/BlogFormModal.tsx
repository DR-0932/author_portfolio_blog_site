"use client"

import Field from "@/component/ui/fields"
import Button from "@/component/ui/Button"
import Toggle from "@/component/ui/Toggle"
import Editor from "@/component/admin/Editor"

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

const styles = {
  overlay: "fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4",
  
  modal: "bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto",

  modalHeader: "px-10 py-8 border-b border-stone-100 flex items-center justify-between",

  modalTitle: "text-2xl font-semibold",

  closeBtn: "text-gray-400 hover:text-black text-2xl leading-none",

  form: "px-10 py-8 space-y-6",

  twoCol: "grid grid-cols-2 gap-5",

  errorMsg: "text-base text-red-500",

  footerRow: "flex justify-end gap-4 pt-2",
}

export default function BlogFormModal({ editingId, form, setForm, onSubmit, onClose, saving, error }: Props) {
  
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
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.modalHeader}>
         
          <h3 className={styles.modalTitle}>{editingId ? "Edit Blog" : "New Blog"}</h3>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        
        </div>

        <form onSubmit={onSubmit} className={styles.form}>

          <Field 
          label="Title" 
          value={form.title} 
          onChange={handleTitleChange} required />

          <Field 
          label="Slug" 
          value={form.slug} 
          onChange={(v: string) => setForm((f) => ({ ...f, slug: v }))} required mono />

          <div className={styles.twoCol}>
           
            <Field 
            label="Category" 
            value={form.category} 
            onChange={(v: string) => setForm((f) => ({ ...f, category: v }))} 
            placeholder="e.g. Health & Medical" />
            
            <Field 
            label="Image URL" 
            value={form.image} 
            onChange={(v: string) => setForm((f) => ({ ...f, image: v }))} 
            placeholder="https://..." />
          
          </div>

          <Field 
          label="Excerpt" 
          value={form.excerpt} 
          onChange={(v: string) => setForm((f) => ({ ...f, excerpt: v }))} 
          rows={2} 
          placeholder="Short summary shown on the blog listing page" />

          <Editor 
          value={form.content} 
          onChange={(v: string) => setForm((f) => ({ ...f, content: v }))} />

          <Toggle
            on={form.published}
            onToggle={() => setForm((f) => ({ ...f, published: !f.published }))}
            label={form.published ? "Published" : "Draft"}
          />

          {error && <p className={styles.errorMsg}>{error}</p>}

          <div className={styles.footerRow}>
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
