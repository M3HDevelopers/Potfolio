import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../components/Icons";
import { useContent } from "../store/content";
import { OtpModal, PasswordInput, ToastProvider, useToast } from "./controls";
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
  const { content, updateSection } = useContent();
  const toast = useToast();

  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  // Forgot-password flow: 0 = login, 1 = email, 2 = OTP modal, 3 = new password
  const [fpStep, setFpStep] = useState<0 | 1 | 2 | 3>(0);
  const [fpEmail, setFpEmail] = useState("");
  const [fpError, setFpError] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === content.settings.adminPassword) {
      onLogin();
    } else {
      setError(true);
      setPassword("");
    }
  };

  const sendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (fpEmail.trim().toLowerCase() !== content.settings.email.trim().toLowerCase()) {
      setFpError("This email is not registered as the admin email.");
      return;
    }
    setFpError("");
    setFpStep(2);
  };

  const updatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.length < 6) {
      setFpError("New password must be at least 6 characters.");
      return;
    }
    if (newPass !== confirmPass) {
      setFpError("Passwords do not match.");
      return;
    }
    updateSection("settings", { ...content.settings, adminPassword: newPass });
    toast("Password updated. Log in with your new password");
    setFpStep(0);
    setNewPass("");
    setConfirmPass("");
    setFpEmail("");
  };

  const backToLogin = () => {
    setFpStep(0);
    setFpError("");
    setFpEmail("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-sm animate-pop-in rounded-xl border border-white/10 bg-white/[0.02] p-8">
        <p className="font-display text-lg font-bold">
          <span className="text-white">Muzammil</span>
          <span className="text-accent">Ahmed</span>
        </p>
        <h1 className="mt-1 font-display text-2xl font-bold text-white">
          {fpStep === 0 ? "Admin Panel" : fpStep === 3 ? "Set New Password" : "Forgot Password"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {fpStep === 0
            ? "Enter your password to manage the website content."
            : fpStep === 1
              ? "Enter your admin email. We'll send a 6-digit verification code to it."
              : fpStep === 2
                ? "Check your email for the verification code."
                : "OTP verified. Choose a strong new password below."}
        </p>

        {fpStep === 0 ? (
          <form onSubmit={submit} className="mt-6">
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Password"
                className={`w-full rounded-md border bg-neutral-950 px-4 py-3 pr-11 text-sm text-white placeholder-gray-600 outline-none transition-colors ${
                  error ? "border-red-400/70" : "border-white/10 focus:border-accent"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-accent"
              >
                {showPass ? (
                  <EyeOffIcon className="h-[18px] w-[18px]" />
                ) : (
                  <EyeIcon className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
            {error ? <p className="mt-2 text-xs text-red-400">Wrong password. Please try again.</p> : null}

            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-accent py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-yellow-300"
            >
              Unlock
            </button>

            <button
              type="button"
              onClick={() => setFpStep(1)}
              className="mt-4 block w-full text-center text-[11px] font-semibold text-gray-400 underline underline-offset-4 transition-colors hover:text-accent"
            >
              Forgot password?
            </button>

            <p className="mt-4 text-center text-[11px] text-gray-600">
              Default password: <span className="text-gray-400">admin123</span>. Change it in
              Settings.
            </p>
          </form>
        ) : null}

        {fpStep === 1 ? (
          <form onSubmit={sendOtp} className="mt-6">
            <input
              type="email"
              autoFocus
              value={fpEmail}
              onChange={(e) => {
                setFpEmail(e.target.value);
                setFpError("");
              }}
              placeholder="Admin email address"
              className={`w-full rounded-md border bg-neutral-950 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-colors ${
                fpError ? "border-red-400/70" : "border-white/10 focus:border-accent"
              }`}
            />
            {fpError ? <p className="mt-2 text-xs text-red-400">{fpError}</p> : null}
            <p className="mt-2 text-[11px] text-gray-600">
              Registered email: <span className="text-gray-400">{content.settings.email}</span>
            </p>

            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-accent py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-yellow-300"
            >
              Send OTP
            </button>
            <button
              type="button"
              onClick={backToLogin}
              className="mt-3 block w-full text-center text-[11px] text-gray-500 underline underline-offset-4 transition-colors hover:text-accent"
            >
              ← Back to login
            </button>
          </form>
        ) : null}

        {fpStep === 3 ? (
          <form onSubmit={updatePassword} className="mt-6 space-y-4">
            <PasswordInput
              label="New password"
              value={newPass}
              onChange={(v) => {
                setNewPass(v);
                setFpError("");
              }}
              hint="At least 6 characters"
            />
            <PasswordInput
              label="Confirm new password"
              value={confirmPass}
              onChange={(v) => {
                setConfirmPass(v);
                setFpError("");
              }}
            />
            {fpError ? <p className="text-xs text-red-400">{fpError}</p> : null}

            <button
              type="submit"
              className="w-full rounded-full bg-accent py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-yellow-300"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={backToLogin}
              className="block w-full text-center text-[11px] text-gray-500 underline underline-offset-4 transition-colors hover:text-accent"
            >
              ← Back to login
            </button>
          </form>
        ) : null}

        <a
          href="#/"
          className="mt-5 block border-t border-white/5 pt-4 text-center text-[11px] text-gray-500 underline underline-offset-4 transition-colors hover:text-accent"
        >
          ← Back to website
        </a>
      </div>

      <OtpModal
        open={fpStep === 2}
        title="Verify it's you"
        description={`We sent a 6-digit code to ${fpEmail || content.settings.email}. Enter it to reset your password.`}
        onClose={() => setFpStep(1)}
        onVerified={() => setFpStep(3)}
      />
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
              <p className="text-[11px] text-gray-600">Changes save to this browser. Export a backup from Settings.</p>
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
