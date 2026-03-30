"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDarkMode } from "@/context/DarkModeContext";

const API = process.env.NEXT_PUBLIC_API_URL!;

export default function AdminLogin() {
  const router = useRouter();
  const { dark } = useDarkMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message ?? "Login failed"); return; }
      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch {
      setError("Could not reach server");
    } finally {
      setLoading(false);
    }
  }

  const labelCls  = "block text-xs font-medium tracking-widest uppercase mb-1 " + (dark ? "text-neutral-500" : "text-gray-600");
  const inputCls  = "admin-field w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#AE572C]/40";

  return (
    <div className="admin-page flex items-center justify-center">
      <div className="admin-card rounded-2xl shadow-sm p-10 w-full max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Admin</h1>
        <p className={"text-sm mb-8 " + (dark ? "text-neutral-500" : "text-gray-500")}>
          Sign in to manage content
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputCls} />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#AE572C] text-white rounded-xl py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
