import { useEffect, useState } from "react";
import { RATING_SUMMARY, REVIEWS, TESTIMONIALS } from "../data";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon, StarIcon } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} className={`${size} ${i <= rating ? "text-accent" : "text-gray-700"}`} />
      ))}
    </div>
  );
}

/** Auto-rotating testimonial carousel with arrows + dots. */
function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  return (
    <div
      className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] transition-colors duration-300 hover:border-accent/25"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="w-full shrink-0 px-8 pt-10 sm:px-10">
              <QuoteIcon className="h-10 w-10 text-accent" />
              <blockquote className="mt-5 min-h-28 text-base leading-relaxed text-gray-300 md:text-lg">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-display text-sm font-bold text-accent">
                  {initialsOf(t.name)}
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold text-white">
                    {t.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-gray-500">{t.role}</span>
                </span>
                <span className="ml-auto hidden rounded-full border border-accent/25 bg-accent/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent/90 sm:block">
                  {t.project}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-auto flex items-center justify-between border-t border-white/5 px-8 py-5 sm:px-10">
        <span className="font-display text-xs font-semibold tracking-[0.25em] text-gray-500">
          {String(index + 1).padStart(2, "0")} — {String(count).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-accent" : "w-1.5 bg-gray-700 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-x-0.5 hover:border-accent hover:text-accent"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:translate-x-0.5 hover:border-accent hover:text-accent"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Rating summary + star-rated platform reviews. */
function ReviewsPanel() {
  const { average, total, distribution } = RATING_SUMMARY;

  return (
    <div className="flex h-full flex-col">
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-accent/25">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <span className="font-display text-6xl font-extrabold leading-none text-white">
            {average.toFixed(1)}
          </span>
          <span>
            <Stars rating={Math.round(average)} />
            <span className="mt-2 block text-xs text-gray-500">
              Based on {total} client reviews
            </span>
          </span>
          <span className="ml-auto flex flex-col items-end gap-1.5">
            {["Upwork", "Fiverr", "Google"].map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400"
              >
                {p}
              </span>
            ))}
          </span>
        </div>

        <div className="mt-7 space-y-2.5">
          {distribution.map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="w-3 text-right text-xs font-semibold text-gray-400">
                {row.stars}
              </span>
              <StarIcon className="h-3 w-3 text-accent" />
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-800">
                <span
                  className="block h-full rounded-full bg-accent transition-[width] duration-1000 ease-out"
                  style={{ width: `${row.percent}%` }}
                />
              </span>
              <span className="w-9 text-right text-[11px] text-gray-500">{row.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
        {REVIEWS.map((review) => (
          <article
            key={review.name}
            className="group rounded-lg border border-white/10 bg-neutral-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_14px_40px_rgba(255,193,7,0.08)]"
          >
            <div className="flex items-center justify-between">
              <Stars rating={review.rating} size="h-3.5 w-3.5" />
              <span className="text-[11px] text-gray-600">{review.when}</span>
            </div>
            <p className="mt-3.5 text-sm leading-relaxed text-gray-400">
              &ldquo;{review.text}&rdquo;
            </p>
            <footer className="mt-4 flex items-center justify-between border-t border-white/5 pt-3.5">
              <span className="text-sm font-semibold text-white">{review.name}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent/80">
                {review.platform}
              </span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-24 h-96 w-96 rounded-full bg-accent/[0.04] blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading
          watermark="REVIEWS"
          title="Reviews & Testimonials"
          subtitle="What clients and collaborators say after working with me."
        />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <TestimonialCarousel />
          </Reveal>
          <Reveal delay={150}>
            <ReviewsPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
