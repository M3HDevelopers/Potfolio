import { useCallback, useEffect, useRef, useState } from "react";
import { PROJECTS, type Project } from "../data";
import { ChevronDownIcon, CloseIcon, ExpandIcon, ExternalLinkIcon } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SmartImage from "./SmartImage";

type LightboxState = { project: Project; index: number };

/**
 * Full-screen gallery slider: arrows, thumbnails, counter,
 * keyboard (← → Esc) and touch-swipe navigation.
 */
function GalleryLightbox({
  state,
  onClose,
  onNavigate,
}: {
  state: LightboxState;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const { project, index } = state;
  const total = project.gallery.length;
  const touchX = useRef<number | null>(null);

  const prev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  );
  const next = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} screenshots gallery`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full w-full max-w-5xl animate-pop-in flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar: counter + close */}
        <div className="mb-3 flex items-center justify-between">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-1.5 text-gray-600">/</span>
            {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:rotate-90 hover:border-accent hover:text-accent"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Main slide */}
        <div
          className="relative"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchX.current;
            if (delta > 50) prev();
            if (delta < -50) next();
            touchX.current = null;
          }}
        >
          <SmartImage
            key={index}
            src={project.gallery[index]}
            alt={`${project.title} — screenshot ${index + 1} of ${total}`}
            label={project.title}
            className="aspect-[3/2] w-full animate-fade-up rounded-lg border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          />

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur transition-all duration-300 hover:border-accent hover:bg-accent hover:text-black"
              >
                <ChevronDownIcon className="h-5 w-5 rotate-90" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur transition-all duration-300 hover:border-accent hover:bg-accent hover:text-black"
              >
                <ChevronDownIcon className="h-5 w-5 -rotate-90" />
              </button>
            </>
          ) : null}
        </div>

        {/* Thumbnails */}
        <div className="mt-4 flex items-center justify-center gap-3 overflow-x-auto pb-1">
          {project.gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => onNavigate(i)}
              aria-label={`Go to screenshot ${i + 1}`}
              aria-current={i === index}
              className={`shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 ${
                i === index
                  ? "border-accent opacity-100 shadow-[0_0_18px_rgba(255,193,7,0.3)]"
                  : "border-transparent opacity-45 hover:opacity-80"
              }`}
            >
              <SmartImage
                src={src}
                alt=""
                label=""
                className="h-14 w-20 sm:h-16 sm:w-24"
              />
            </button>
          ))}
        </div>

        {/* Footer: title + live demo */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-sm font-semibold text-white">
            {project.title}
            <span className="ml-3 hidden font-sans text-xs font-normal text-gray-500 sm:inline">
              Use ← → keys or swipe
            </span>
          </p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_10px_30px_rgba(255,193,7,0.35)]"
          >
            Live Demo
            <ExternalLinkIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openGallery = useCallback(
    (project: Project, index = 0) => setLightbox({ project, index }),
    [],
  );
  const closeGallery = useCallback(() => setLightbox(null), []);
  const navigate = useCallback(
    (index: number) => setLightbox((s) => (s ? { ...s, index } : s)),
    [],
  );

  return (
    <section id="projects" className="relative overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/2 h-96 w-96 rounded-full bg-accent/[0.04] blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeading
          watermark="PROJECTS"
          title="Projects"
          subtitle="Below are the sample Web Projects."
        />

        {/* Sub-header with the thin golden rule */}
        <Reveal>
          <h3 className="font-display text-2xl font-bold">
            <span className="text-white">Web </span>
            <span className="text-accent">Projects</span>
          </h3>
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-full bg-gradient-to-r from-accent via-accent/50 to-transparent"
          />
        </Reveal>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 130} className="h-full">
              <article className="group flex h-full flex-col rounded-lg border border-white/5 bg-white/[0.015] p-4 transition-colors duration-300 hover:border-accent/20 sm:p-5">
                <button
                  type="button"
                  onClick={() => openGallery(project)}
                  aria-label={`Open ${project.title} screenshots gallery`}
                  className="relative block w-full cursor-pointer overflow-hidden rounded-md border border-white/10 bg-neutral-900 text-left transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_18px_50px_rgba(255,193,7,0.12)] focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <SmartImage
                    src={project.gallery[0]}
                    alt={`${project.title} website screenshot`}
                    label={project.title}
                    className="aspect-[3/2] w-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-black/70 text-accent transition-transform duration-300 group-hover:scale-110">
                      <ExpandIcon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                      View Screens
                    </span>
                  </span>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent backdrop-blur">
                    {project.gallery.length} Screens
                  </span>
                </button>

                <h3 className="mt-5 font-display text-lg font-bold text-white">
                  {project.title}{" "}
                  <span className="ml-1 text-sm font-medium text-accent">(Click on Image)</span>
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-gray-400">
                  {project.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-accent/25 bg-accent/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-accent/90"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_10px_30px_rgba(255,193,7,0.35)]"
                  >
                    Live Demo
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => openGallery(project)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-300 transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    Screenshots
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {lightbox ? (
        <GalleryLightbox state={lightbox} onClose={closeGallery} onNavigate={navigate} />
      ) : null}
    </section>
  );
}
