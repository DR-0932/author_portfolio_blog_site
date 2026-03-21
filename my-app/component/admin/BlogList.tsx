"use client"

import Button from "@/component/ui/Button"

export type Blog = {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  published: boolean
  views: number
  createdAt: string
}

type Props = {
  blogs: Blog[]
  loading: boolean
  onNew: () => void
  onEdit: (blog: Blog) => void
  onDelete: (id: string) => void
}

const styles = {
  toolbar: "flex items-center justify-between mb-12",
  heading: "text-4xl font-semibold",
  empty: "text-center py-36 text-gray-400 text-lg",
  list: "space-y-5",
  row: "bg-white rounded-2xl border border-stone-200 px-9 py-8 flex items-center justify-between gap-6",
  rowLeft: "flex-1 min-w-0",
  rowTitleRow: "flex items-center gap-4 mb-2",
  rowTitle: "text-lg font-medium truncate",
  rowMeta: "text-sm text-gray-400",
  actions: "flex items-center gap-3 shrink-0",
}

function badge(published: boolean) {
  const base = "shrink-0 text-sm px-3 py-1 rounded-full"
  return published ? `${base} bg-green-100 text-green-700` : `${base} bg-stone-100 text-stone-500`
}

export default function BlogList({ blogs, loading, onNew, onEdit, onDelete }: Props) {
  return (
    <div>
      <div className={styles.toolbar}>
        <h2 className={styles.heading}>Blogs</h2>
        <Button variant="primary" onClick={onNew}>+ New Blog</Button>
      </div>

      {loading ? (
        <p className={styles.empty}>Loading…</p>
      ) : blogs.length === 0 ? (
        <p className={styles.empty}>No blogs yet. Create your first one.</p>
      ) : (
        <div className={styles.list}>
          {blogs.map((blog) => (
            <div key={blog._id} className={styles.row}>
              <div className={styles.rowLeft}>
                <div className={styles.rowTitleRow}>
                  <h3 className={styles.rowTitle}>{blog.title}</h3>
                  <span className={badge(blog.published)}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className={styles.rowMeta}>
                  /{blog.slug} · {blog.views} views ·{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
              <div className={styles.actions}>
                <Button variant="ghost" onClick={() => onEdit(blog)}>Edit</Button>
                <Button variant="danger" onClick={() => onDelete(blog._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
