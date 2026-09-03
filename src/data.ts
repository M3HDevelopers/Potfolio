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
  /** All screenshots — first one is used as the card thumbnail. */
  gallery: string[];
  /** Live demo URL — replace with your deployed links later. */
  liveUrl: string;
  description: string;
  stack: string[];
  /**
   * Mark a project as featured to show it in the "Top Projects" area.
   * Layout handles 1, 2, 3+ featured projects gracefully (admin-panel ready).
   */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "ecommerce",
    title: "E-Commerce Store",
    featured: true,
    gallery: [
      "https://image.qwenlm.ai/generated-images/eb5084da-bdd4-4254-8ca9-c5c870c39d7f/_result.png",
      "https://image.qwenlm.ai/generated-images/a4607d70-4df8-4956-8748-aa351088191a/_result.png",
      "https://image.qwenlm.ai/generated-images/223e5ab9-de51-42e2-b0fd-99426b42c11e/_result.png",
    ],
    liveUrl: "https://example.com/projects/ecommerce-store",
    description:
      "A full-stack MERN e-commerce platform featuring product search & filters, cart with Stripe checkout, order tracking and a complete admin dashboard for inventory, coupons and sales analytics.",
    stack: ["React.js", "Redux Toolkit", "Node.js", "Express", "MongoDB", "Stripe"],
  },
  {
    id: "foodhub",
    title: "FoodHub Delivery",
    featured: true,
    gallery: [
      "https://image.qwenlm.ai/generated-images/8738f689-6efe-45ad-ab83-bebed423bf27/_result.png",
      "https://image.qwenlm.ai/generated-images/099b0935-ddeb-4c70-82c6-98ba9603ab56/_result.png",
      "https://image.qwenlm.ai/generated-images/1885693d-da52-4c2b-b97e-b1a40b493265/_result.png",
    ],
    liveUrl: "https://example.com/projects/foodhub-delivery",
    description:
      "A real-time food ordering web app with live order tracking over Socket.io, restaurant dashboards, automatic rider assignment and secure online payments for a smooth delivery experience.",
    stack: ["React.js", "Socket.io", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "insight",
    title: "Insight Analytics",
    gallery: [
      "https://image.qwenlm.ai/generated-images/106bd406-aeb2-47f3-860a-153a9ff7650a/_result.png",
      "https://image.qwenlm.ai/generated-images/5708b76c-97ae-41ba-b01e-df7f1e9574c2/_result.png",
      "https://image.qwenlm.ai/generated-images/4592dc8f-ff1a-43d6-a028-279de44da298/_result.png",
    ],
    liveUrl: "https://example.com/projects/insight-analytics",
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

/* ------------------------------------------------------------------ */
/*  Testimonials — long-form client quotes (carousel)                  */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Muzammil rebuilt our store from scratch — page loads dropped from 6 seconds to under 1, and conversions jumped 40% in the first month. Easily the best developer we have ever hired.",
    name: "Sarah Mitchell",
    role: "Founder, UrbanSole — United Kingdom",
    project: "E-Commerce Rebuild",
  },
  {
    quote:
      "He delivered our delivery platform two weeks ahead of schedule and kept us updated every single day. The live order tracking he built with Socket.io works flawlessly, even at peak hours.",
    name: "Omar Farooq",
    role: "CEO, FoodHub — Pakistan",
    project: "Real-time Delivery Platform",
  },
  {
    quote:
      "Communication was crystal clear, the code quality was top-notch, and he even set up our CI/CD pipeline without being asked. A true senior engineer who cares about the product.",
    name: "Daniel Weber",
    role: "Product Manager, InsightHQ — Germany",
    project: "SaaS Analytics Dashboard",
  },
  {
    quote:
      "We have worked with many freelancers, but Muzammil is the only one who thinks like a product owner. He flagged UX issues we had not even noticed and fixed them before launch.",
    name: "Ayesha Khan",
    role: "COO, Karvaan Tech — Karachi",
    project: "Booking Platform MVP",
  },
];

/* ------------------------------------------------------------------ */
/*  Reviews — star-rated platform reviews + rating summary             */
/* ------------------------------------------------------------------ */

export type Review = {
  name: string;
  platform: string;
  rating: number;
  text: string;
  when: string;
};

export const RATING_SUMMARY = {
  average: 4.9,
  total: 87,
  distribution: [
    { stars: 5, percent: 82 },
    { stars: 4, percent: 13 },
    { stars: 3, percent: 4 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
};

export const REVIEWS: Review[] = [
  {
    name: "James Rodriguez",
    platform: "Upwork",
    rating: 5,
    text: "Delivered pixel-perfect React dashboards ahead of schedule. Clean, well-documented code and smooth handover.",
    when: "2 weeks ago",
  },
  {
    name: "Fatima Sheikh",
    platform: "Fiverr",
    rating: 5,
    text: "This is our third project together — zero bugs in production every single time. Highly recommended!",
    when: "1 month ago",
  },
  {
    name: "Lucas Moreau",
    platform: "Google",
    rating: 4,
    text: "Great MERN skills and fast communication. Slight timezone overlap, but he made it work perfectly.",
    when: "2 months ago",
  },
  {
    name: "Priya Nair",
    platform: "Upwork",
    rating: 5,
    text: "Took our vague idea and turned it into a polished, investor-ready MVP in just six weeks.",
    when: "3 months ago",
  },
];

export const PROFILE_IMAGE =
  "https://image.qwenlm.ai/generated-images/1029df68-ac69-416b-bd1e-7f6dcfef5240/_result.png";
