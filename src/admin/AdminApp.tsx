import { useState } from "react";
import { useContent } from "../store/content";
import { ToastProvider } from "./controls";
import DashboardTab from "./tabs/DashboardTab";
import ProjectsTab from "./tabs/ProjectsTab";
import { ReviewsTab, TestimonialsTab } from "./tabs/ItemsTabs";
import { AboutTab, ContactInfoTab, HeroTab, SettingsTab } from "./tabs/SectionTabs";

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "hero", label: "Hero / Home" },
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "reviews", label: "Reviews" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact Info" },
  { id: "settings", label: "Settings" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Login({ onLogin }: { onLogin: () => void }) {
  const { content } = useContent();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === content.settings.adminPassword) {
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm animate-pop-in rounded-xl border border-white/10 bg-white/[0.02] p-8"
      >
        <p className="font-display text-lg font-bold">
          <span className="text-white">Muzammil</span>
          <span className="text-accent">Ahmed</span>
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-white">Admin Panel</h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your password to manage the website content.
        </p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          className={`mt-6 w-full rounded-md border bg-neutral-950 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors ${
            error ? "border-red-400/70" : "border-white/10 focus:border-accent"
          }`}
        />
        {error ? (
          <p className="mt-2 text-xs text-red-400">Wrong password — try again.</p>
        ) : null}

        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-accent py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-yellow-300"
        >
          Unlock
        </button>

        <p className="mt-5 text-center text-[11px] text-gray-600">
          Default password: <span className="text-gray-400">admin123</span> — change it in Settings.
        </p>
        <a
          href="#/"
          className="mt-3 block text-center text-[11px] text-gray-500 underline underline-offset-4 transition-colors hover:text-accent"
        >
          ← Back to website
        </a>
      </form>
    </div>
  );
}

function AdminShell() {
  const { content } = useContent();
  const [tab, setTab] = useState<TabId>("dashboard");
  const unread = content.messages.filter((m) => !m.read).length;

  const logout = () => {
    sessionStorage.removeItem("ma_admin_auth");
    window.location.hash = "#/";
  };

  const titles: Record<TabId, string> = {
    dashboard: "Dashboard",
    hero: "Hero / Home Section",
    about: "About Me Section",
    projects: "Projects Manager",
    reviews: "Reviews Manager",
    testimonials: "Testimonials Manager",
    contact: "Contact Info",
    settings: "Site Settings",
  };

  return (
    <div className="flex min-h-screen bg-[#070707] text-white">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-white/10 bg-black/60 p-5 md:flex">
        <a href="#/" className="font-display text-base font-bold">
          <span className="text-white">Muzammil</span>
          <span className="text-accent">Ahmed</span>
        </a>
        <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600">
          Admin Panel
        </p>

        <nav className="mt-8 space-y-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center justify-between rounded-md px-3.5 py-2.5 text-left text-sm transition-all duration-200 ${
                tab === t.id
                  ? "bg-accent font-bold text-black"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {t.label}
              {t.id === "dashboard" && unread > 0 ? (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    tab === t.id ? "bg-black text-accent" : "bg-accent text-black"
                  }`}
                >
                  {unread}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-3 border-t border-white/10 pt-5">
          <a
            href="#/"
            className="block text-center text-xs font-semibold text-gray-400 transition-colors hover:text-accent"
          >
            ← View Website
          </a>
          <button
            onClick={logout}
            className="w-full rounded-full border border-white/15 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-300 transition-colors hover:border-red-400 hover:text-red-400"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
            <div>
              <h1 className="font-display text-lg font-bold text-white">{titles[tab]}</h1>
              <p className="text-[11px] text-gray-600">Changes save to this browser — export a backup from Settings.</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#/"
                className="hidden rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-300 transition-colors hover:border-accent hover:text-accent sm:block md:hidden lg:block"
              >
                View Site
              </a>
              <button
                onClick={logout}
                className="rounded-full border border-white/15 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-300 transition-colors hover:border-red-400 hover:text-red-400 md:hidden"
              >
                Logout
              </button>
            </div>
          </div>
          {/* Mobile tabs */}
          <nav className="flex gap-1 overflow-x-auto px-4 pb-3 md:hidden">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  tab === t.id ? "bg-accent text-black" : "bg-white/5 text-gray-400"
                }`}
              >
                {t.label}
                {t.id === "dashboard" && unread > 0 ? ` (${unread})` : ""}
              </button>
            ))}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-4xl px-5 py-8 md:px-8">
          {tab === "dashboard" ? <DashboardTab /> : null}
          {tab === "hero" ? <HeroTab /> : null}
          {tab === "about" ? <AboutTab /> : null}
          {tab === "projects" ? <ProjectsTab /> : null}
          {tab === "reviews" ? <ReviewsTab /> : null}
          {tab === "testimonials" ? <TestimonialsTab /> : null}
          {tab === "contact" ? <ContactInfoTab /> : null}
          {tab === "settings" ? <SettingsTab /> : null}
        </main>
      </div>
    </div>
  );
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(
    () => sessionStorage.getItem("ma_admin_auth") === "1",
  );

  return (
    <ToastProvider>
      {authed ? (
        <AdminShell />
      ) : (
        <Login
          onLogin={() => {
            sessionStorage.setItem("ma_admin_auth", "1");
            setAuthed(true);
          }}
        />
      )}
    </ToastProvider>
  );
}
