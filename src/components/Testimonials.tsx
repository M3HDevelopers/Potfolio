import { useState } from "react";
import { TESTIMONIALS, type Testimonial } from "../data";
import { CheckIcon, PlayIcon, StarIcon } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Reveal delay={index * 120} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_22px_60px_rgba(255,193,7,0.1)]">
        {/* Video area */}
        <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_30%_20%,#262626,#0a0a0a_75%)]">
          {!playing ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video testimonial from ${testimonial.name}`}
              className="absolute inset-0 w-full cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="absolute left-4 top-3 font-display text-6xl font-extrabold leading-none text-white/[0.06] transition-colors duration-300 group-hover:text-accent/[0.09]"
              >
                {testimonial.initials}
              </span>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent pl-1 text-black shadow-[0_0_45px_rgba(255,193,7,0.45)] transition-transform duration-300 group-hover:scale-110">
                  <PlayIcon className="h-7 w-7" />
                </span>
              </span>
              <span className="absolute bottom-3 left-3 rounded-md bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
                Video Testimonial
              </span>
              <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/80 backdrop-blur-sm">
                ▶ {testimonial.duration}
              </span>
            </button>
          ) : (
            <video
              src={testimonial.video}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Details */}
        <div className="flex grow flex-col p-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon
                  key={n}
                  className={`h-4 w-4 ${
                    n <= testimonial.rating ? "text-accent" : "text-gray-700"
                  }`}
                />
              ))}
            </span>
            <span className="font-display text-xs font-bold text-accent">
              {testimonial.rating}.0
            </span>
          </div>

          <blockquote className="mb-6 mt-4 text-sm italic leading-relaxed text-gray-400">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/5 pt-5">
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-bold text-white">
                {testimonial.name}
              </p>
              <p className="mt-0.5 truncate text-xs text-gray-500">{testimonial.role}</p>
              <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-wider text-accent/80">
                {testimonial.project}
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
              <CheckIcon className="h-3 w-3" />
              Verified
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="absolute -right-32 top-32 h-80 w-80 rounded-full bg-accent/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          watermark="TESTIMONIALS"
          title="Testimonials"
          subtitle="Watch real clients talk about their experience working with me."
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
