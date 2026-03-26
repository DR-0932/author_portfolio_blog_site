"use client"

import { useState } from "react"

const styles = {
  wrapper:     "w-full py-16 md:py-40 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64",

  container:   "grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start",

  // left col

  icon:        "text-4xl mb-8 text-[#AE572C]",

  tagline:     "text-2xl md:text-5xl font-semibold leading-snug mb-8",

  emailLink:   "text-[#AE572C] underline underline-offset-4 text-base block mb-3",

  subtext:     "text-base text-gray-500",

  // right col
 
  formTitle:   "text-3xl font-semibold mb-10",

  formGrid:    "grid grid-cols-1 sm:grid-cols-2 gap-6",

  fullWidth:   "col-span-1 sm:col-span-2",

  label:       "block text-sm font-medium text-gray-400 mb-2 tracking-widest uppercase",

  input:       "w-full border-b border-stone-300 bg-transparent px-0 py-3 text-base focus:outline-none focus:border-[#AE572C] transition",

  textarea:    "w-full border-b border-stone-300 bg-transparent px-0 py-3 text-base focus:outline-none focus:border-[#AE572C] transition resize-none",

  submitRow:   "col-span-1 sm:col-span-2 flex justify-start mt-6",

  submitBtn:   "px-10 py-4 bg-[#AE572C] text-white text-base font-medium rounded-xl hover:opacity-90 transition",

  successMsg:  "col-span-1 sm:col-span-2 text-base text-green-600",
}

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" })
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
    setForm({ firstName: "", lastName: "", email: "", message: "" })
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        {/* Left — info */}
        <div>
          <div className={styles.icon}>✉</div>
          <p className={styles.tagline}>
            For commissions and project inquiries, please email:
          </p>
          <a href="mailto:palak@example.com" className={styles.emailLink}>
            palak@example.com
          </a>
          <span className={styles.subtext}>or send a message via this form</span>
        </div>

        {/* Right — form */}
        <div>
          <h2 className={styles.formTitle}>Contact</h2>
          <form onSubmit={handleSubmit} className={styles.formGrid}>

            <div>
              <label className={styles.label}>First Name</label>
              <input 
                value={form.firstName} 
                onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} 
                placeholder="Jane" 
                className={styles.input} />
            </div>
 
            <div>
              <label className={styles.label}>Last Name</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                placeholder="Doe"
                className={styles.input} />
            </div>

            <div className={styles.fullWidth}>
              <label className={styles.label}>Email <span className="text-[#AE572C]">*</span></label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
                required
                className={styles.input} />
            </div>

            <div className={styles.fullWidth}>
              <label className={styles.label}>Write a message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about your project…"
                rows={4}
                className={styles.textarea} />
            </div>

            {sent && <p className={styles.successMsg}>Message sent! I'll get back to you soon.</p>}

            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitBtn}>Submit</button>
            </div>

          </form>
        </div>

      </div>
    </section>
  )
}
