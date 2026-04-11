"use client";

import { useState } from "react";

const SERVICE_OPTIONS = [
  "Content Writing",
  "Ghost Writing",
  "Book Editing",
  "Technical Writing",
  "Website Copy",
  "Academic Writing",
  "Memoir / Personal Essay",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleService(s: string) {
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services: selected }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setSelected([]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <div className="page-x pt-20 md:pt-32 pb-24 md:pb-36">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — header */}
          <div className="lg:sticky lg:top-32">
            <p
              className="text-xs tracking-[0.35em] uppercase font-semibold mb-5"
              style={{ color: "var(--accent)" }}
            >
              Let&apos;s work together
            </p>
            <h1
              className="font-bold leading-tight tracking-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}
            >
              Got a project <br />
              <span style={{ color: "var(--accent)" }}>in mind?</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
              Whether you need a ghostwriter, a content partner, or a careful editor —
              I&apos;d love to hear about what you&apos;re building. Fill out the form
              and I&apos;ll get back to you as soon as possible.
            </p>
            <a
              href="mailto:junepalak@gmail.com"
              className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-60"
              style={{ color: "var(--accent)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
              </svg>
              junepalak@gmail.com
            </a>
          </div>

          {/* Right — form card */}
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "color-mix(in srgb, var(--accent) 15%, transparent)" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8" style={{ color: "var(--accent)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--text)" }}>
                  Thank you for reaching out!
                </h2>
                <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: "var(--muted)" }}>
                  I&apos;ve received your message and will get back to you as soon as possible. Looking forward to working together!
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-sm underline underline-offset-4 transition-opacity hover:opacity-60"
                  style={{ color: "var(--accent)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                {/* Service toggles */}
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: "var(--muted)" }}>
                    What can I help you with?
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICE_OPTIONS.map((s) => {
                      const active = selected.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className="px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-200"
                          style={{
                            backgroundColor: active ? "var(--accent)" : "transparent",
                            color: active ? "#ffffff" : "var(--muted)",
                            border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "var(--muted)" }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-transparent py-3 text-base focus:outline-none transition-colors"
                      style={{ color: "var(--text)", borderBottom: "1px solid var(--border)" }}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--border)")}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "var(--muted)" }}>
                      Your Email <span style={{ color: "var(--accent)" }}>*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full bg-transparent py-3 text-base focus:outline-none transition-colors"
                      style={{ color: "var(--text)", borderBottom: "1px solid var(--border)" }}
                      onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--accent)")}
                      onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--border)")}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: "var(--muted)" }}>
                    Your Message
                  </label>
                  <textarea
                    required
                    placeholder="Tell me about your project — what you need, your timeline, any details that matter…"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full bg-transparent py-3 text-base focus:outline-none transition-colors resize-none"
                    style={{ color: "var(--text)", borderBottom: "1px solid var(--border)" }}
                    onFocus={(e) => (e.currentTarget.style.borderBottomColor = "var(--accent)")}
                    onBlur={(e) => (e.currentTarget.style.borderBottomColor = "var(--border)")}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 rounded-xl text-sm font-semibold tracking-wide hover:opacity-90 transition disabled:opacity-50"
                    style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
