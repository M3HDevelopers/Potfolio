import { useCallback, useEffect, useState } from "react";
import { PROJECTS, type Project } from "../data";
import { CloseIcon, ExpandIcon } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SmartImage from "./SmartImage";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const close = useCallback(() => setSelected(null), []);

  // Lightbox: close on Escape, lock body scroll while open.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selected, close]);

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
            <Reveal key={project.id} delay={i * 130}>
              <article className="group flex h-full flex-col">
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  aria-label={`Open larger preview of ${project.title}`}
                  className="relative block w-full cursor-pointer overflow-hidden rounded-md border border-white/10 bg-neutral-900 text-left transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-accent/50 group-hover:shadow-[0_18px_50px_rgba(255,193,7,0.12)] focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <SmartImage
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    label={project.title}
                    className="aspect-[3/2] w-full"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-black/70 text-accent transition-transform duration-300 group-hover:scale-110">
                      <ExpandIcon className="h-5 w-5" />
                    </span>
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} preview`}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <div
            className="relative w-full max-w-4xl animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-all hover:rotate-90 hover:border-accent hover:text-accent"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <SmartImage
              src={selected.image}
              alt={`${selected.title} website screenshot, enlarged`}
              label={selected.title}
              className="aspect-[3/2] w-full rounded-lg border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
            />
            <p className="mt-4 text-center font-display text-sm font-semibold text-white">
              {selected.title}
              <span className="ml-2 font-sans text-xs font-normal text-gray-400">
                Press Esc or click outside to close
              </span>
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
