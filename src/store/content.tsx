import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  BASIC_INFO,
  CONTACT_ITEMS,
  INFO_GRID,
  PROFILE_IMAGE,
  PROJECTS,
  REVIEWS,
  SKILLS,
  TESTIMONIALS,
  type ContactItem,
  type Project,
  type Review,
  type Testimonial,
} from "../data";

export type { ContactItem, Project, Review, Testimonial } from "../data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type LabelValue = { label: string; value: string };
export type SkillRow = { name: string; level: number };
export type NavItem = { id: string; label: string };

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
};

export type SiteSettings = {
  logoFirst: string;
  logoSecond: string;
  sideSignature: string;
  copyrightName: string;
  email: string;
  adminPassword: string;
  navLinks: NavItem[];
  /** Uploaded resume (data-URL) or an external link. Powers the Resume card download. */
  resume: { fileName: string; data: string };
};

export type HeroContent = {
  greeting: string;
  nameIntro: string;
  name: string;
  roleLine1: string;
  roleLine2: string;
  buttonText: string;
  buttonLink: string;
  orbitText: string;
};

export type AboutContent = {
  profileImage: string;
  headline: string;
  bioParagraphs: string[];
  basicInfo: LabelValue[];
  skills: SkillRow[];
  infoGrid: LabelValue[];
  statNumber: string;
  statLabel: string;
  buttonText: string;
};

export type SiteContent = {
  settings: SiteSettings;
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  reviews: Review[];
  testimonials: Testimonial[];
  contactItems: ContactItem[];
  messages: ContactMessage[];
};

export const uid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/* ------------------------------------------------------------------ */
/*  Defaults — the original site content                               */
/* ------------------------------------------------------------------ */

export const DEFAULT_CONTENT: SiteContent = {
  settings: {
    logoFirst: "Muzammil",
    logoSecond: "Ahmed",
    sideSignature: "Muzammil Ahmed • 2026",
    copyrightName: "Muzammil Ahmed",
    email: "muzammil.ahmed.dev@gmail.com",
    adminPassword: "admin123",
    navLinks: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    resume: { fileName: "Muzammil-Ahmed-Resume.pdf", data: "" },
  },
  hero: {
    greeting: "Hello!",
    nameIntro: "I'm",
    name: "Muzammil Ahmed",
    roleLine1: "Web Developer",
    roleLine2: "A Senior MERN Stack Web Developer",
    buttonText: "My Works",
    buttonLink: "#projects",
    orbitText: "MERN Stack Developer • React • Node • Mongo • AI • ML •",
  },
  about: {
    profileImage: PROFILE_IMAGE,
    headline: "Professional FullStack Developer with [x]Three Year[/x] of Experience",
    bioParagraphs: [
      "I am Muzammil Ahmed, a Senior MERN Stack Web Developer from Hyderabad, Pakistan. I craft fast, scalable and pixel-perfect web applications with React.js on the front end and Node.js, Express & MongoDB on the back end, handling everything from REST APIs and secure authentication flows to real-time features and cloud deployments.",
      "Over the years I have shipped production platforms for e-commerce, food delivery and SaaS analytics, always obsessing over clean architecture, performance budgets and delightful user experiences.",
    ],
    basicInfo: BASIC_INFO,
    skills: SKILLS,
    infoGrid: INFO_GRID,
    statNumber: "30+",
    statLabel: "Projects completed",
    buttonText: "Visit",
  },
  projects: PROJECTS,
  reviews: REVIEWS,
  testimonials: TESTIMONIALS,
  contactItems: CONTACT_ITEMS,
  messages: [],
};

/* ------------------------------------------------------------------ */
/*  Persistence                                                        */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "ma_portfolio_content_v1";

/** Guarantees every collection item has a stable id (old data gets one assigned). */
function withIds<T extends { id?: string }>(arr: T[], prefix: string): T[] {
  return arr.map((x, i) => (x.id ? x : { ...x, id: `${prefix}_${i}` }));
}

function mergeContent(saved: Partial<SiteContent> | null): SiteContent {
  if (!saved || typeof saved !== "object") return DEFAULT_CONTENT;
  return {
    settings: {
      ...DEFAULT_CONTENT.settings,
      ...(saved.settings ?? {}),
      resume: saved.settings?.resume ?? DEFAULT_CONTENT.settings.resume,
    },
    hero: { ...DEFAULT_CONTENT.hero, ...(saved.hero ?? {}) },
    about: { ...DEFAULT_CONTENT.about, ...(saved.about ?? {}) },
    projects: withIds(
      Array.isArray(saved.projects) ? saved.projects : DEFAULT_CONTENT.projects,
      "pj",
    ),
    reviews: withIds(Array.isArray(saved.reviews) ? saved.reviews : DEFAULT_CONTENT.reviews, "rv"),
    testimonials: withIds(
      Array.isArray(saved.testimonials) ? saved.testimonials : DEFAULT_CONTENT.testimonials,
      "tm",
    ),
    contactItems: Array.isArray(saved.contactItems)
      ? saved.contactItems
      : DEFAULT_CONTENT.contactItems,
    messages: Array.isArray(saved.messages) ? saved.messages : [],
  };
}

function loadContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? mergeContent(JSON.parse(raw) as Partial<SiteContent>) : DEFAULT_CONTENT;
  } catch {
    return DEFAULT_CONTENT;
  }
}

/* ------------------------------------------------------------------ */
/*  Context / store                                                    */
/* ------------------------------------------------------------------ */

type ContentStore = {
  content: SiteContent;
  updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  addMessage: (m: { name: string; email: string; subject: string; message: string }) => void;
  resetAll: () => void;
  importContent: (json: string) => boolean;
};

const ContentContext = createContext<ContentStore | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      /* storage full — content stays in memory for the session */
    }
  }, [content]);

  const updateSection = useCallback(
    <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
      setContent((c) => ({ ...c, [key]: value }));
    },
    [],
  );

  const addMessage = useCallback(
    (m: { name: string; email: string; subject: string; message: string }) => {
      setContent((c) => ({
        ...c,
        messages: [
          { ...m, id: uid(), date: new Date().toISOString(), read: false },
          ...c.messages,
        ],
      }));
    },
    [],
  );

  const resetAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    setContent(DEFAULT_CONTENT);
  }, []);

  const importContent = useCallback((json: string) => {
    try {
      const parsed = JSON.parse(json) as Partial<SiteContent>;
      if (!parsed || typeof parsed !== "object" || !parsed.settings) return false;
      setContent(mergeContent(parsed));
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <ContentContext.Provider
      value={{ content, updateSection, addMessage, resetAll, importContent }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentStore {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside <ContentProvider>");
  return ctx;
}
