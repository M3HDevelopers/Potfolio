import { BASIC_INFO, INFO_GRID, PROFILE_IMAGE, SKILLS } from "../data";
import { useInView } from "../hooks/useInView";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function SkillBars() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);

  return (
    <div ref={ref} className="mt-12">
      <h3 className="font-display text-xl font-semibold text-white">Skills</h3>
      <div className="mt-6 space-y-6">
        {SKILLS.map((skill, i) => (
          <div key={skill.name}>
            <div className="mb-2 flex items-center justify-between text-sm font-medium text-white">
              <span>{skill.name}</span>
              <span className="text-accent">{skill.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-accent shadow-[0_0_12px_rgba(255,193,7,0.45)] transition-[width] duration-[1300ms] ease-out"
                style={{
                  width: inView ? `${skill.level}%` : "0%",
                  transitionDelay: `${i * 140}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-accent/[0.04] blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10">
        <SectionHeading watermark="ABOUT" title="About Me" />

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-14">
          {/* Left — profile, basic info, skills */}
          <Reveal>
            <div className="relative h-52 w-52 sm:h-56 sm:w-56">
              <div
                aria-hidden="true"
                className="absolute -inset-3 animate-spin-slow rounded-full border border-dashed border-white/10"
              />
              <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-full bg-accent" />
              <img
                src={PROFILE_IMAGE}
                alt="Portrait of Muzammil Ahmed"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
                className="relative h-full w-full rounded-full border-4 border-black bg-neutral-900 object-cover"
              />
            </div>

            <ul className="mt-12">
              {BASIC_INFO.map((row) => (
                <li
                  key={row.label}
                  className="group flex items-center justify-between gap-6 border-b border-white/5 py-3.5 transition-colors hover:border-accent/30"
                >
                  <span className="text-sm font-bold text-white">{row.label}</span>
                  <span className="text-right text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>

            <SkillBars />
          </Reveal>

          {/* Right — bio & info */}
          <Reveal delay={150}>
            <h3 className="font-display text-2xl font-bold leading-snug text-white sm:text-[1.7rem]">
              Professional FullStack Developer with{" "}
              <span className="text-accent">Three Year</span> of Experience
            </h3>

            <p className="mt-6 leading-relaxed text-gray-400">
              I am Muzammil Ahmed, a Senior MERN Stack Web Developer from Hyderabad, Pakistan. I
              craft fast, scalable and pixel-perfect web applications with React.js on the front
              end and Node.js, Express &amp; MongoDB on the back end — from REST APIs and secure
              authentication flows to real-time features and cloud deployments.
            </p>
            <p className="mt-4 leading-relaxed text-gray-400">
              Over the years I have shipped production platforms for e-commerce, food delivery and
              SaaS analytics, always obsessing over clean architecture, performance budgets and
              delightful user experiences.
            </p>

            <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2">
              {INFO_GRID.map((item) => (
                <div key={item.label} className="border-l-2 border-accent/60 pl-4">
                  <dt className="text-sm font-bold uppercase tracking-wider text-white">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-sm text-gray-400">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              <p className="font-display leading-none">
                <span className="text-5xl font-extrabold text-accent">30+</span>
                <span className="ml-3 text-2xl font-bold text-white">
                  Projects
                  <br />
                  completed
                </span>
              </p>
              <a
                href="#projects"
                className="rounded-full bg-accent px-6 py-2 text-xs font-bold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-[0_12px_40px_rgba(255,193,7,0.35)]"
              >
                Visit
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
