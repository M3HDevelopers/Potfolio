import { useEffect, useState } from "react";
import { useContent } from "../store/content";
import { CloseIcon } from "./Icons";

export default function Navbar() {
  const { content } = useContent();
  const { logoFirst, logoSecond, navLinks } = content.settings;

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Solid blurred bar after scrolling past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for the active link.
  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = ids[0] ?? "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navLinks]);

  const linkCls = (id: string) =>
    `nav-link relative text-sm transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${
      active === id
        ? "text-accent after:w-full"
        : "text-white after:w-0 hover:text-accent hover:after:w-full"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-white/5 bg-black/85 py-3 backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
        <a href="#home" className="font-display text-xl font-bold tracking-tight">
          <span className="text-white">{logoFirst}</span>
          <span className="text-accent">{logoSecond}</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={linkCls(link.id)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-accent hover:text-accent md:hidden"
        >
          {menuOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h10" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-b border-white/5 bg-black/95 backdrop-blur-md transition-all duration-400 md:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="space-y-1 px-6 py-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                  active === link.id ? "bg-accent/10 text-accent" : "text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
