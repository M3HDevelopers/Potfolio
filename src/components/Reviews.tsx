import { useRef, useState } from "react";
import { REVIEWS, type Review } from "../data";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          className={`h-4 w-4 ${n <= rating ? "text-accent" : "text-gray-700"}`}
        />
      ))}
    </span>
  );
}

/** Client photo with a graceful initials fallback. */
function ReviewPhoto({ review }: { review: Review }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative h-56 shrink-0 overflow-hidden bg-neutral-900 sm:h-64 md:h-auto">
      {!failed ? (
        <img
          src={review.photo}
          alt={review.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,#262626,#0a0a0a_75%)]">
          <span className="font-display text-6xl font-extrabold text-accent/25">
            {review.initials}
          </span>
        </div>
      )}
      <span className="absolute bottom-3 left-3 rounded-full bg-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
        {review.platform}
      </span>
    </div>
  );
}

/**
 * Reviews — one review visible at a time in a horizontal carousel.
 * Navigate with the arrow buttons, the dots, or by swiping on touch.
 */
export default function Reviews() {
  const [index, setIndex] = useState(0);
  const touchX = useRef(0);
  const count = REVIEWS.length;

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  return (
    <section id="reviews" className="relative overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-accent/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-10">
        <SectionHeading
          watermark="REVIEWS"
          title="Reviews"
          subtitle="Real words from real clients — swipe through the latest ones."
        />

        {/* Compact rating strip */}
        <Reveal className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {[
            "★ 4.9 average rating",
            "87 client reviews",
            "Upwork Top Rated",
            "Fiverr Level 2",
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 transition-colors duration-300 hover:border-accent/40 hover:text-accent"
            >
              {chip}
            </span>
          ))}
        </Reveal>

        <Reveal>
          <div
            className="relative"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 48) (dx < 0 ? next : prev)();
            }}
          >
            {/* Carousel track */}
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {REVIEWS.map((review) => (
                  <article
                    key={review.name}
                    className="grid w-full shrink-0 md:grid-cols-[240px_1fr]"
                  >
                    <ReviewPhoto review={review} />

                    <div className="flex flex-col p-7 sm:p-9">
                      <div className="flex flex-wrap items-center gap-3">
                        <Stars rating={review.rating} />
                        <span className="font-display text-sm font-bold text-accent">
                          {review.rating}.0
                        </span>
                        <span className="ml-auto text-xs uppercase tracking-[0.18em] text-gray-500">
                          {review.when}
                        </span>
                      </div>

                      <blockquote className="mt-5 text-base leading-relaxed text-gray-300 sm:text-lg">
                        &ldquo;{review.text}&rdquo;
                      </blockquote>

                      <div className="mt-7 flex items-end justify-between gap-4 border-t border-white/5 pt-6">
                        <div>
                          <p className="font-display text-base font-bold text-white">
                            {review.name}
                          </p>
                          <p className="mt-0.5 text-sm text-gray-500">{review.role}</p>
                        </div>
                        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent sm:inline-flex">
                          <CheckIcon className="h-3 w-3" />
                          Verified
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Prev / next buttons */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous review"
              className="absolute -left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/85 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent md:-left-6"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="absolute -right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/85 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-accent hover:text-accent md:-right-6"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Counter + dots */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <span className="font-display text-xs font-semibold tracking-[0.3em] text-gray-500">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-accent"
                      : "w-2 bg-white/15 hover:bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
