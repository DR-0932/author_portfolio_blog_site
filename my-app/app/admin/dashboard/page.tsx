"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDarkMode } from "@/context/DarkModeContext"
import BlogList, { type Blog } from "@/component/admin/BlogList"
import BlogFormModal, { type FormState } from "@/component/admin/BlogFormModal"
import SampleList, { type Sample } from "@/component/admin/SampleList"
import SampleFormModal, { type SampleFormState } from "@/component/admin/SampleFormModal"
import FictionList, { type Fiction } from "@/component/admin/FictionList"
import FictionFormModal, { type FictionFormState } from "@/component/admin/FictionFormModal"

const API = process.env.NEXT_PUBLIC_API_URL!

const emptyBlog: FormState = {
  title: "", slug: "", excerpt: "", content: "", image: "", category: "", published: false,
}

const emptySample: SampleFormState = {
  title: "", image: "", text: "",
}

const emptyFiction: FictionFormState = {
  title: "", slug: "", chapters: [{ title: "Chapter 1", body: "" }], published: false,
}

function tab(active: boolean, dark: boolean) {
  const base = "text-base font-medium pb-2 border-b-2 transition cursor-pointer"
  return base + (active
    ? " border-[#AE572C] text-[#AE572C]"
    : ` border-transparent ${dark ? "text-neutral-500 hover:text-neutral-200" : "text-gray-400 hover:text-black"}`)
}

export default function AdminDashboard() {
  const router = useRouter()
  const { dark } = useDarkMode()
  const [section, setSection] = useState<"blogs" | "samples" | "fiction">("blogs")

  // blogs
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [blogForm, setBlogForm] = useState<FormState>(emptyBlog)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)
  const [blogError, setBlogError] = useState("")
  const [blogSaving, setBlogSaving] = useState(false)

  // samples
  const [samples, setSamples] = useState<Sample[]>([])
  const [samplesLoading, setSamplesLoading] = useState(true)
  const [showSampleForm, setShowSampleForm] = useState(false)
  const [sampleForm, setSampleForm] = useState<SampleFormState>(emptySample)
  const [editingSampleId, setEditingSampleId] = useState<string | null>(null)
  const [sampleError, setSampleError] = useState("")
  const [sampleSaving, setSampleSaving] = useState(false)

  // fiction
  const [fictions, setFictions] = useState<Fiction[]>([])
  const [fictionLoading, setFictionLoading] = useState(true)
  const [showFictionForm, setShowFictionForm] = useState(false)
  const [fictionForm, setFictionForm] = useState<FictionFormState>(emptyFiction)
  const [editingFictionId, setEditingFictionId] = useState<string | null>(null)
  const [fictionError, setFictionError] = useState("")
  const [fictionSaving, setFictionSaving] = useState(false)

  function authHeaders() {
    const token = localStorage.getItem("admin_token") ?? ""
    return { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  }

  async function fetchBlogs() {
    setBlogsLoading(true)
    try {
      const res = await fetch(`${API}/admin/blog`, { headers: authHeaders() })
      if (res.status === 401 || res.status === 403) { router.push("/admin/login"); return }
      const data = await res.json()
      setBlogs(data.blogs ?? [])
    } finally { setBlogsLoading(false) }
  }

  async function fetchSamples() {
    setSamplesLoading(true)
    try {
      const res = await fetch(`${API}/admin/sample`, { headers: authHeaders() })
      const data = await res.json()
      setSamples(data.samples ?? [])
    } finally { setSamplesLoading(false) }
  }

  async function fetchFictions() {
    setFictionLoading(true)
    try {
      const res = await fetch(`${API}/admin/fiction`, { headers: authHeaders() })
      const data = await res.json()
      setFictions(data.fiction ?? [])
    } finally { setFictionLoading(false) }
  }

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) { router.push("/admin/login"); return }
    fetchBlogs()
    fetchSamples()
    fetchFictions()
  }, [])

  // blog handlers
  function openCreateBlog() { setBlogForm(emptyBlog); setEditingBlogId(null); setBlogError(""); setShowBlogForm(true) }
  function openEditBlog(blog: Blog) {
    setBlogForm({ title: blog.title, slug: blog.slug, excerpt: blog.excerpt, content: blog.content, image: blog.image, category: blog.category, published: blog.published })
    setEditingBlogId(blog._id); setBlogError(""); setShowBlogForm(true)
  }
  async function handleBlogSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault(); setBlogError(""); setBlogSaving(true)
    try {
      const url = editingBlogId ? `${API}/admin/blog/${editingBlogId}` : `${API}/admin/blog`
      const res = await fetch(url, { method: editingBlogId ? "PUT" : "POST", headers: authHeaders(), body: JSON.stringify(blogForm) })
      const data = await res.json()
      if (!res.ok) { setBlogError(data.message ?? "Something went wrong"); return }
      setShowBlogForm(false); fetchBlogs()
    } finally { setBlogSaving(false) }
  }
  async function handleBlogDelete(id: string) {
    if (!confirm("Delete this blog?")) return
    await fetch(`${API}/admin/blog/${id}`, { method: "DELETE", headers: authHeaders() })
    fetchBlogs()
  }

  // sample handlers
  function openCreateSample() { setSampleForm(emptySample); setEditingSampleId(null); setSampleError(""); setShowSampleForm(true) }
  function openEditSample(s: Sample) {
    setSampleForm({ title: s.title, image: s.image ?? "", text: s.text })
    setEditingSampleId(s._id); setSampleError(""); setShowSampleForm(true)
  }
  async function handleSampleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault(); setSampleError(""); setSampleSaving(true)
    try {
      const url = editingSampleId ? `${API}/admin/sample/${editingSampleId}` : `${API}/admin/sample`
      const res = await fetch(url, { method: editingSampleId ? "PUT" : "POST", headers: authHeaders(), body: JSON.stringify(sampleForm) })
      const data = await res.json()
      if (!res.ok) { setSampleError(data.message ?? "Something went wrong"); return }
      setShowSampleForm(false); fetchSamples()
    } finally { setSampleSaving(false) }
  }
  async function handleSampleDelete(id: string) {
    if (!confirm("Delete this sample?")) return
    await fetch(`${API}/admin/sample/${id}`, { method: "DELETE", headers: authHeaders() })
    fetchSamples()
  }

  // fiction handlers
  function openCreateFiction() { setFictionForm(emptyFiction); setEditingFictionId(null); setFictionError(""); setShowFictionForm(true) }
  function openEditFiction(f: Fiction) {
    setFictionForm({ title: f.title, slug: f.slug, chapters: f.chapters.length ? f.chapters : [{ title: "Chapter 1", body: "" }], published: f.published })
    setEditingFictionId(f._id); setFictionError(""); setShowFictionForm(true)
  }
  async function handleFictionSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault(); setFictionError(""); setFictionSaving(true)
    try {
      const url = editingFictionId ? `${API}/admin/fiction/${editingFictionId}` : `${API}/admin/fiction`
      const res = await fetch(url, { method: editingFictionId ? "PUT" : "POST", headers: authHeaders(), body: JSON.stringify(fictionForm) })
      const data = await res.json()
      if (!res.ok) { setFictionError(data.message ?? "Something went wrong"); return }
      setShowFictionForm(false); fetchFictions()
    } finally { setFictionSaving(false) }
  }
  async function handleFictionDelete(id: string) {
    if (!confirm("Delete this fiction?")) return
    await fetch(`${API}/admin/fiction/${id}`, { method: "DELETE", headers: authHeaders() })
    fetchFictions()
  }

  function handleLogout() {
    localStorage.removeItem("admin_token")
    router.push("/admin/login")
  }

  return (
    <div className="admin-page">

      <div className="admin-header px-10 py-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-widest">/// ADMIN</h1>
        <button onClick={handleLogout} className={`text-base transition ${dark ? "text-neutral-400 hover:text-white" : "text-gray-500 hover:text-black"}`}>Logout</button>
      </div>

      <div className="flex gap-8 px-10 pt-8">
        <span className={tab(section === "blogs", dark)} onClick={() => setSection("blogs")}>Blogs</span>
        <span className={tab(section === "samples", dark)} onClick={() => setSection("samples")}>Writing Samples</span>
        <span className={tab(section === "fiction", dark)} onClick={() => setSection("fiction")}>Fiction</span>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {section === "blogs" ? (
          <BlogList blogs={blogs} loading={blogsLoading} onNew={openCreateBlog} onEdit={openEditBlog} onDelete={handleBlogDelete} />
        ) : section === "samples" ? (
          <SampleList samples={samples} loading={samplesLoading} onNew={openCreateSample} onEdit={openEditSample} onDelete={handleSampleDelete} />
        ) : (
          <FictionList fictions={fictions} loading={fictionLoading} onNew={openCreateFiction} onEdit={openEditFiction} onDelete={handleFictionDelete} />
        )}
      </div>

      {showBlogForm && (
        <BlogFormModal editingId={editingBlogId} form={blogForm} setForm={setBlogForm} onSubmit={handleBlogSubmit} onClose={() => setShowBlogForm(false)} saving={blogSaving} error={blogError} />
      )}

      {showSampleForm && (
        <SampleFormModal editingId={editingSampleId} form={sampleForm} setForm={setSampleForm} onSubmit={handleSampleSubmit} onClose={() => setShowSampleForm(false)} saving={sampleSaving} error={sampleError} />
      )}

      {showFictionForm && (
        <FictionFormModal editingId={editingFictionId} form={fictionForm} setForm={setFictionForm} onSubmit={handleFictionSubmit} onClose={() => setShowFictionForm(false)} saving={fictionSaving} error={fictionError} />
      )}

    </div>
  )
}
