export type NavLink = { id: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export type Project = {
  id: string;
  title: string;
  image: string;
  description: string;
  stack: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    image:
      "https://image.qwenlm.ai/generated-images/eb5084da-bdd4-4254-8ca9-c5c870c39d7f/_result.png",
    description:
      "A full-stack MERN e-commerce platform featuring product search & filters, cart with Stripe checkout, order tracking and a complete admin dashboard for inventory, coupons and sales analytics.",
    stack: ["React.js", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Stripe"],
  },
  {
    id: "foodhub",
    title: "FoodHub Delivery",
    image:
      "https://image.qwenlm.ai/generated-images/8738f689-6efe-45ad-ab83-bebed423bf27/_result.png",
    description:
      "A real-time food ordering web app with live order tracking over Socket.io, restaurant dashboards, automatic rider assignment and secure online payments for a smooth delivery experience.",
    stack: ["React.js", "Socket.io", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "insight",
    title: "Insight Analytics",
    image:
      "https://image.qwenlm.ai/generated-images/106bd406-aeb2-47f3-860a-153a9ff7650a/_result.png",
    description:
      "A SaaS analytics dashboard with interactive charts, JWT role-based authentication, team workspaces and automated CSV / PDF reporting built on MongoDB Atlas aggregation pipelines.",
    stack: ["React.js", "Chart.js", "Node.js", "Express", "MongoDB Atlas"],
  },
];

export type Skill = { name: string; level: number };

export const SKILLS: Skill[] = [
  { name: "React.js", level: 95 },
  { name: "Node.js", level: 90 },
  { name: "Express.js", level: 88 },
  { name: "MongoDB", level: 85 },
];

export const BASIC_INFO: { label: string; value: string }[] = [
  { label: "Name", value: "Muzammil Ahmed" },
  { label: "Job Role", value: "Senior MERN Developer" },
  { label: "Experience", value: "7 Years" },
  { label: "Address", value: "Hyderabad, Pakistan" },
];

export const INFO_GRID: { label: string; value: string }[] = [
  { label: "Profile", value: "Muzammil Ahmed" },
  { label: "Education", value: "BS Computer Science" },
  { label: "Language", value: "English, Urdu" },
  { label: "Other Skills", value: "React Native, Next.js" },
];

export type ContactItem = {
  title: string;
  value: string;
  icon: "signpost" | "phone" | "plane" | "globe";
  href?: string;
};

export const CONTACT_ITEMS: ContactItem[] = [
  { title: "Address", value: "Hyderabad, Pakistan", icon: "signpost" },
  { title: "Contact Number", value: "+92 314 3580908", icon: "phone", href: "tel:+923143580908" },
  {
    title: "Email Address",
    value: "muzammil.m3h@gmail.com",
    icon: "plane",
    href: "mailto:muzammil.m3h@gmail.com",
  },
  {
    title: "Resume",
    value: "Download Resume",
    icon: "globe",
    href: "mailto:muzammil.m3h@gmail.com?subject=Resume%20Request%20%E2%80%94%20M3H-Web-Dev",
  },
];

export const PROFILE_IMAGE =
  "https://image.qwenlm.ai/generated-images/1029df68-ac69-416b-bd1e-7f6dcfef5240/_result.png";
