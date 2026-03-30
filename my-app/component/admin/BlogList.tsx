"use client"

import Button from "@/component/ui/Button"
import { useDarkMode } from "@/context/DarkModeContext"

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

function badge(published: boolean) {
  const base = "shrink-0 text-sm px-3 py-1 rounded-full"
  return published
    ? `${base} bg-green-100 text-green-700`
    : `${base} bg-stone-100 text-stone-500`
}

export default function BlogList({ blogs, loading, onNew, onEdit, onDelete }: Props) {
  const { dark } = useDarkMode()

  const rowCls = `admin-card rounded-2xl px-9 py-8 flex items-center justify-between gap-6`
  const metaCls = `text-sm mt-1 ${dark ? "text-neutral-500" : "text-gray-400"}`
  const emptyCls = `text-center py-36 text-lg ${dark ? "text-neutral-600" : "text-gray-400"}`

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-semibold">Blogs</h2>
        <Button variant="primary" onClick={onNew}>+ New Blog</Button>
      </div>

      {loading ? (
        <p className={emptyCls}>Loading…</p>
      ) : blogs.length === 0 ? (
        <p className={emptyCls}>No blogs yet. Create your first one.</p>
      ) : (
        <div className="space-y-5">
          {blogs.map((blog) => (
            <div key={blog._id} className={rowCls}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="text-lg font-medium truncate">{blog.title}</h3>
                  <span className={badge(blog.published)}>
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </div>
                <p className={metaCls}>
                  /{blog.slug} · {blog.views} views ·{" "}
                  {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
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
