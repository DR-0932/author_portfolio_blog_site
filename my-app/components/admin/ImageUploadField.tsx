"use client"

import { useRef, useState } from "react"
import { useDarkMode } from "@/context/DarkModeContext"

const API = process.env.NEXT_PUBLIC_API_URL!

type Props = {
  value: string
  onChange: (url: string) => void
}

export default function ImageUploadField({ value, onChange }: Props) {
  const { dark } = useDarkMode()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const labelCls = "block text-sm font-medium mb-2 tracking-widest uppercase " + (dark ? "text-neutral-500" : "text-gray-500")
  const urlInputCls = "admin-field flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#AE572C]/40"
  const uploadBtnCls = `shrink-0 px-4 py-3 rounded-xl text-sm font-medium border transition ${
    dark
      ? "border-[#2a2a2a] text-neutral-300 hover:border-[#AE572C] hover:text-[#AE572C]"
      : "border-stone-200 text-gray-600 hover:border-[#AE572C] hover:text-[#AE572C]"
  }`

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError("")
    setUploading(true)
    try {
      const token = localStorage.getItem("admin_token") ?? ""
      const body = new FormData()
      body.append("image", file)

      const res = await fetch(`${API}/admin/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message ?? "Upload failed"); return }
      onChange(data.url)
    } catch {
      setError("Upload failed")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div>
      <label className={labelCls}>Image</label>

      <div className="flex gap-3 items-center">
        <input
          className={urlInputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload below"
        />
        <button type="button" className={uploadBtnCls} onClick={() => inputRef.current?.click()} disabled={uploading}>
          {uploading ? "Uploading…" : "Upload"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {value && (
        <div className="mt-3 relative w-40 h-24 rounded-xl overflow-hidden border" style={{ borderColor: dark ? "#2a2a2a" : "#e7e5e4" }}>
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-black/80"
          >×</button>
        </div>
      )}
    </div>
  )
}
