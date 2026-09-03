import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Reviews from "./components/Reviews";

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black font-sans text-white antialiased">
      {/* Subtle film-grain overlay for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] opacity-[0.028]"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />

      {/* Vertical signature on wide screens */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-7 z-40 hidden flex-col items-center gap-5 xl:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gray-600 [writing-mode:vertical-rl]">
          M3H-Web-Dev — 2026
        </span>
        <span className="h-24 w-px bg-gradient-to-b from-gray-700 to-transparent" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Reviews />
        <Contact />
      </main>
    </div>
  );
}
