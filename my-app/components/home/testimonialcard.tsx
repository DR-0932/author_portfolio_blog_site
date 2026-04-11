"use client";

type TestimonialCardProps = {
  quote: string;
  name: string;
  designation?: string;
};

export default function TestimonialCard({ quote, name, designation }: TestimonialCardProps) {
  return (
    <div
      className="rounded-2xl p-4 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-12"
      style={{ backgroundColor: "var(--bg-card)" }}
    >
      <img
        src="/quoteIcon.svg"
        alt="quote"
        className="w-8 h-8 mb-8"
      />

      <div
        className="text-lg leading-relaxed mb-10"
        style={{ color: "var(--text)" }}
      >
        {quote}
      </div>

      <div>
        <div className="text-lg font-semibold" style={{ color: "var(--accent)" }}>
          — {name}
        </div>
        {designation && (
          <div className="text-md" style={{ color: "var(--muted)" }}>
            {designation}
          </div>
        )}
      </div>
    </div>
  );
}
