import Accordian from "../ui/accordian"

const styles = {
  wrapper:    "w-full px-36 py-48",
  container:  "max-w-7xl mx-auto",
  headingRow: "mb-24",
  label:      "text-2xl text-[#AE572C] tracking-widest mb-4",
  heading:    "text-7xl font-bold tracking-tight",
}

async function getSamples() {
  try {
    const res = await fetch("http://localhost:5000/sample", { cache: "no-store" })
    if (!res.ok) return []
    const data = await res.json()
    return data.samples ?? []
  } catch { return [] }
}

export default async function WorkSamples() {
  const samples = await getSamples()

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.headingRow}>
          <p className={styles.label}>/// WORK SAMPLES</p>
          <h2 className={styles.heading}>Here is a sample of my writing pieces</h2>
        </div>

        <div className="space-y-4">
          {samples.length === 0 ? (
            <p className="text-gray-400 text-center py-16">No samples published yet.</p>
          ) : (
            samples.map((s: { _id: string; title: string; text: string }) => (
              <Accordian key={s._id} title={s.title} text={s.text} />
            ))
          )}
        </div>

      </div>
    </section>
  )
}
