"use client"

import Button from "@/components/ui/Button"
import Toggle from "@/components/ui/Toggle"
import Field from "@/components/ui/fields"
import CategoryFilter from "@/components/ui/CategoryFilter"
import { useState } from "react"
import { useDarkMode } from "@/context/DarkModeContext"

export default function UIKit() {
  const { dark } = useDarkMode()
  const [toggle, setToggle] = useState(false)
  const [field, setField] = useState("")
  const [category, setCategory] = useState("All")

  const bg   = dark ? "#111" : "#f5f2ee"
  const text = dark ? "#f0f0f0" : "#1a1a1a"
  const muted = dark ? "#555" : "#78716c"

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="mb-16">
        <p className="text-xs tracking-[0.3em] uppercase mb-6 pb-3 border-b" style={{ color: muted, borderColor: dark ? "#222" : "#e7e5e4" }}>{title}</p>
        <div className="flex flex-wrap gap-4 items-start">{children}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-16 py-20" style={{ backgroundColor: bg, color: text }}>
      <h1 className="text-3xl font-semibold mb-2">UI Kit</h1>
      <p className="text-sm mb-16" style={{ color: muted }}>All primitive components in one place</p>

      <Section title="Button">
        <Button variant="primary">Primary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </Section>

      <Section title="Toggle">
        <Toggle on={toggle} onToggle={() => setToggle(v => !v)} label={toggle ? "On" : "Off"} />
        <Toggle on={true}  onToggle={() => {}} label="Published" />
        <Toggle on={false} onToggle={() => {}} label="Draft" />
      </Section>

      <Section title="Fields">
        <div className="w-72">
          <Field label="Title" value={field} onChange={setField} placeholder="Enter title" />
        </div>
        <div className="w-72">
          <Field label="Slug" value={field} onChange={setField} mono placeholder="url-slug-here" />
        </div>
        <div className="w-72">
          <Field label="Required field" value={field} onChange={setField} required placeholder="Can't be empty" />
        </div>
      </Section>

      <Section title="Category Filter">
        <CategoryFilter
          categories={["All", "Fiction", "Essays", "Poetry", "Reviews"]}
          active={category}
          onChange={(cat) => setCategory(cat ?? "All")}
        />
      </Section>
    </div>
  )
}
