import { ArrowRightIcon, ChevronDownIcon } from "./Icons";

/** Rotating circular badge — "MERN STACK DEVELOPER" on a slow orbit. */
function OrbitBadge() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="h-44 w-44 animate-spin-slow text-accent/70 lg:h-52 lg:w-52"
      aria-hidden="true"
    >
      <defs>
        <path id="orbit-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <text className="fill-current font-sans text-[13.5px] font-semibold uppercase" letterSpacing="4.5">
        <textPath href="#orbit-circle">
          MERN Stack Developer • React • Node • Mongo •
        </textPath>
      </text>
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Ambient layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-48 top-1/4 h-[30rem] w-[30rem] rounded-full bg-accent/[0.05] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-accent/[0.04] blur-[110px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-16">
        {/* Left — introduction */}
        <div>
          <p
            className="animate-fade-up text-sm font-bold uppercase tracking-[0.4em] text-accent"
            style={{ animationDelay: "0ms" }}
          >
            Hello!
          </p>

          <h1
            className="mt-6 animate-fade-up font-display text-5xl font-bold leading-[1.06] text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            I&apos;m <span className="text-accent">Muzammil Ahmed</span>
          </h1>

          <p
            className="mt-7 animate-fade-up font-display text-3xl font-bold text-white sm:text-4xl"
            style={{ animationDelay: "240ms" }}
          >
            Web Developer
          </p>

          <p
            className="mt-3 animate-fade-up text-lg font-normal text-white/90 md:text-xl"
            style={{ animationDelay: "340ms" }}
          >
            A Senior MERN Stack Web Developer
          </p>

          <div className="mt-11 animate-fade-up" style={{ animationDelay: "460ms" }}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full border border-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]"
            >
              My Works
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right — signature ornament */}
        <div className="relative hidden h-[26rem] items-center justify-center lg:flex">
          <div className="absolute inset-0 m-auto h-[24rem] w-[24rem] rounded-full border border-white/5" />
          <div className="absolute inset-0 m-auto h-[17rem] w-[17rem] rounded-full border border-dashed border-accent/15" />

          <div className="absolute inset-0 flex items-center justify-center">
            <OrbitBadge />
          </div>

          <span className="absolute font-display text-[6.5rem] font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,193,7,0.4)]">
            {"</>"}
          </span>

          <span className="absolute left-8 top-14 animate-float rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-display text-lg font-bold text-accent">
            {"{ }"}
          </span>
          <span
            className="absolute bottom-16 right-10 animate-float-slow rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-display text-lg font-bold text-white/70"
            style={{ animationDelay: "1.2s" }}
          >
            {"( )"}
          </span>
          <span className="absolute right-24 top-24 h-2.5 w-2.5 animate-float rounded-full bg-accent shadow-[0_0_18px_rgba(255,193,7,0.8)]" />
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-gray-500 transition-colors hover:text-accent"
      >
        Scroll
        <ChevronDownIcon className="h-4 w-4 animate-bounce-soft text-accent" />
      </a>
    </section>
  );
}
