import { cn } from "@/lib/utils"

type Sample = { _id: string; title: string; text: string; image?: string }

const bgColors = [
  "bg-[#f97316]",
  "bg-[#0015ff]",
  "bg-[#ff5941]",
  "bg-[#1f464d]",
  "bg-[#AE572C]",
]

const styles = {
  wrapper:      "h-[80%] sm:h-[50%] flex-col sm:flex-row aspect-video px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative cursor-pointer",
  textWrapper:  "flex-1 flex flex-col justify-center pr-0 sm:pr-6",
  title:        "font-bold text-2xl mb-5",
  body:         "text-white/80 leading-relaxed line-clamp-4 text-xl",
  cta:          "mt-6 text-lg text-white tracking-wide",
  imageWrapper: "w-full sm:w-1/3 rounded-xl aspect-video relative overflow-hidden bg-white/10 flex items-center justify-center",
  imageFallback:"text-white/30 text-sm tracking-widest uppercase",
}

export default function WorkSampleCard({
  sample,
  index,
  onClick,
}: {
  sample: Sample
  index: number
  onClick: () => void
}) {
  return (
    <div
      className={cn(bgColors[index % bgColors.length], styles.wrapper)}
      onClick={onClick}
    >
      <div className={styles.textWrapper}>
        <h3 className={styles.title}>{sample.title}</h3>
        <p className={styles.body}>{sample.text}</p>
        <span className={styles.cta}>Read full piece →</span>
      </div>

      <div className={styles.imageWrapper}>
        {sample.image ? (
          <img src={sample.image} alt={sample.title} className="object-cover w-full h-full" />
        ) : (
          <span className={styles.imageFallback}>Image</span>
        )}
      </div>
    </div>
  )
}

export type { Sample }
