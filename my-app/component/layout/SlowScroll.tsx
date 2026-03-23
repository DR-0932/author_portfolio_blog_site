"use client"

import { useEffect } from "react"

export default function SlowScroll() {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      window.scrollBy({ top: e.deltaY * 0.6, behavior: "instant" })
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [])

  return null
}
