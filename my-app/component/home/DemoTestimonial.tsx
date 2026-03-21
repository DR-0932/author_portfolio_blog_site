const testimonials = [
  {
    stars: 5,
    quote: "You are a smart girl. Love the way you are approaching this project. You are awesome. Keep working hard.",
    name: "Gaurav Bhainsu",
    role: "CEO & Founder, Advance Agility",
    featured: true,
  },
  {
    stars: 4,
    quote: "We loved the angle and the concept you brought. An outsider perspective that completely changed the piece.",
    name: "Tenaz Cardoz",
    role: "Founder, XYZAB",
    featured: false,
  },
  {
    stars: 5,
    quote: "Palak is an exceptional storyteller. Because of her creative style, my school won an accolade at a CBSE level competition.",
    name: "Nidhi Agarwal",
    role: "English Literature Mentor",
    featured: false,
  },
]

const styles = {
  wrapper:      "w-full px-24 py-32",
  card:         "rounded-3xl overflow-hidden grid grid-cols-[1fr_1fr] shadow-sm border border-stone-100",

  // left — image panel
  imagePanel:   "relative bg-stone-900 min-h-[520px]",
  image:        "absolute inset-0 w-full h-full object-cover opacity-80",
  imageOverlay: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent",
  imageTitle:   "absolute top-8 left-8 text-white text-4xl font-bold leading-tight max-w-[260px]",
  imageStat:    "absolute bottom-8 right-8 text-white text-5xl font-bold",

  // right — testimonials list
  rightPanel:   "bg-white flex flex-col",
  testimonial:  "flex-1 px-8 py-7 border-b border-stone-100 last:border-0",
  featured:     "flex-1 px-8 py-7 bg-[#6b7f6b] border-b border-stone-100",
  stars:        "flex gap-1 mb-3 text-amber-400 text-sm",
  quote:        "text-sm leading-relaxed mb-5 text-stone-700",
  quoteFeatured:"text-sm leading-relaxed mb-5 text-white/90",
  nameRow:      "flex items-center gap-3",
  avatar:       "w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-semibold text-stone-600",
  name:         "text-sm font-semibold text-stone-800",
  nameFeatured: "text-sm font-semibold text-white",
  role:         "text-xs text-stone-400",
  roleFeatured: "text-xs text-white/60",

  // banner
  banner:       "mt-4 rounded-2xl bg-[#6b7f6b] flex items-center justify-between px-10 py-7",
  bannerText:   "text-white text-2xl font-semibold",
  bannerBtn:    "bg-white text-stone-800 text-sm font-medium px-6 py-3 rounded-xl hover:opacity-90 transition",
}

export default function DemoTestimonial() {
  return (
    <div className={styles.wrapper}>

      <div className={styles.card}>

        {/* Left — image */}
        <div className={styles.imagePanel}>
          <img
            src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&auto=format&fit=crop"
            alt=""
            className={styles.image}
          />
          <div className={styles.imageOverlay} />
          <p className={styles.imageTitle}>Hear From Our Satisfied Clients Have To Say ♥</p>
          <p className={styles.imageStat}>10.9K+</p>
        </div>

        {/* Right — testimonial list */}
        <div className={styles.rightPanel}>
          {testimonials.map((t, i) => (
            <div key={i} className={t.featured ? styles.featured : styles.testimonial}>

              <div className={styles.stars}>
                {Array.from({ length: t.stars }).map((_, s) => <span key={s}>★</span>)}
                {Array.from({ length: 5 - t.stars }).map((_, s) => <span key={s} className="opacity-30">★</span>)}
              </div>

              <p className={t.featured ? styles.quoteFeatured : styles.quote}>"{t.quote}"</p>

              <div className={styles.nameRow}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div>
                  <p className={t.featured ? styles.nameFeatured : styles.name}>{t.name}</p>
                  <p className={t.featured ? styles.roleFeatured : styles.role}>{t.role}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Banner */}
      <div className={styles.banner}>
        <p className={styles.bannerText}>Are you The Next One?</p>
        <button className={styles.bannerBtn}>Join Now</button>
      </div>

    </div>
  )
}
