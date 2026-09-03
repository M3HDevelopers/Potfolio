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
  {
    id: "travelnest",
    title: "TravelNest Bookings",
    featured: true,
    gallery: [
      "https://picsum.photos/seed/travelnest-screen-1/1200/800",
      "https://picsum.photos/seed/travelnest-screen-2/1200/800",
      "https://picsum.photos/seed/travelnest-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/travelnest-bookings",
    description:
      "A travel booking platform with destination search, smart filters, secure payments and a full agency dashboard for managing tours, bookings and payouts.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Razorpay"],
  },
  {
    id: "medicocare",
    title: "MedicoCare Appointments",
    gallery: [
      "https://picsum.photos/seed/medicocare-screen-1/1200/800",
      "https://picsum.photos/seed/medicocare-screen-2/1200/800",
      "https://picsum.photos/seed/medicocare-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/medicocare-appointments",
    description:
      "A clinic management system with doctor profiles, real-time slot booking, patient records and automated SMS reminders built on a REST API.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Twilio"],
  },
  {
    id: "eduspark",
    title: "EduSpark LMS",
    gallery: [
      "https://picsum.photos/seed/eduspark-screen-1/1200/800",
      "https://picsum.photos/seed/eduspark-screen-2/1200/800",
      "https://picsum.photos/seed/eduspark-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/eduspark-lms",
    description:
      "An e-learning platform with video courses, quizzes, progress tracking and auto-generated certificates — videos streamed securely from AWS S3.",
    stack: ["React.js", "Redux Toolkit", "Node.js", "MongoDB", "AWS S3"],
  },
  {
    id: "cryptopulse",
    title: "CryptoPulse Tracker",
    gallery: [
      "https://picsum.photos/seed/cryptopulse-screen-1/1200/800",
      "https://picsum.photos/seed/cryptopulse-screen-2/1200/800",
      "https://picsum.photos/seed/cryptopulse-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/cryptopulse-tracker",
    description:
      "A crypto portfolio tracker with live WebSocket prices, interactive candlestick charts, watchlists and custom price alerts.",
    stack: ["React.js", "Chart.js", "Node.js", "WebSockets", "MongoDB"],
  },
  {
    id: "fittrack",
    title: "FitTrack Gym Manager",
    gallery: [
      "https://picsum.photos/seed/fittrack-screen-1/1200/800",
      "https://picsum.photos/seed/fittrack-screen-2/1200/800",
      "https://picsum.photos/seed/fittrack-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/fittrack-gym",
    description:
      "A gym membership app with trainer booking, workout & diet plans, progress photos and membership renewal reminders.",
    stack: ["React.js", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "estatehub",
    title: "EstateHub Realty",
    gallery: [
      "https://picsum.photos/seed/estatehub-screen-1/1200/800",
      "https://picsum.photos/seed/estatehub-screen-2/1200/800",
      "https://picsum.photos/seed/estatehub-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/estatehub-realty",
    description:
      "A real-estate portal with map-based property search, virtual tours, an agent CRM and a built-in EMI / loan calculator.",
    stack: ["React.js", "Mapbox", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "taskflow",
    title: "TaskFlow Manager",
    gallery: [
      "https://picsum.photos/seed/taskflow-screen-1/1200/800",
      "https://picsum.photos/seed/taskflow-screen-2/1200/800",
      "https://picsum.photos/seed/taskflow-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/taskflow-manager",
    description:
      "A Kanban project-management tool with drag-and-drop boards, sprint planning and real-time team collaboration over Socket.io.",
    stack: ["React.js", "Socket.io", "Node.js", "MongoDB"],
  },
  {
    id: "chatsphere",
    title: "ChatSphere Messenger",
    gallery: [
      "https://picsum.photos/seed/chatsphere-screen-1/1200/800",
      "https://picsum.photos/seed/chatsphere-screen-2/1200/800",
      "https://picsum.photos/seed/chatsphere-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/chatsphere-messenger",
    description:
      "A real-time chat app with group rooms, typing indicators, read receipts and media sharing — messages delivered instantly via WebSockets.",
    stack: ["React.js", "Socket.io", "Node.js", "MongoDB"],
  },
  {
    id: "recipebox",
    title: "RecipeBox Community",
    gallery: [
      "https://picsum.photos/seed/recipebox-screen-1/1200/800",
      "https://picsum.photos/seed/recipebox-screen-2/1200/800",
      "https://picsum.photos/seed/recipebox-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/recipebox-community",
    description:
      "A recipe-sharing community with step-by-step cook mode, weekly meal planning and auto-generated grocery lists.",
    stack: ["React.js", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "autogarage",
    title: "AutoGarage Rentals",
    gallery: [
      "https://picsum.photos/seed/autogarage-screen-1/1200/800",
      "https://picsum.photos/seed/autogarage-screen-2/1200/800",
      "https://picsum.photos/seed/autogarage-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/autogarage-rentals",
    description:
      "A car-rental platform with date-based availability, dynamic pricing, GPS vehicle tracking and automated PDF invoices.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "Stripe"],
  },
  {
    id: "hirelink",
    title: "HireLink Jobs",
    gallery: [
      "https://picsum.photos/seed/hirelink-screen-1/1200/800",
      "https://picsum.photos/seed/hirelink-screen-2/1200/800",
      "https://picsum.photos/seed/hirelink-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/hirelink-jobs",
    description:
      "A job board with full-text search, application tracking, resume parsing and an employer analytics dashboard.",
    stack: ["React.js", "Node.js", "MongoDB", "Elasticsearch"],
  },
  {
    id: "eventease",
    title: "EventEase Tickets",
    gallery: [
      "https://picsum.photos/seed/eventease-screen-1/1200/800",
      "https://picsum.photos/seed/eventease-screen-2/1200/800",
      "https://picsum.photos/seed/eventease-screen-3/1200/800",
    ],
    liveUrl: "https://example.com/projects/eventease-tickets",
    description:
      "An event-ticketing platform with seat maps, QR-code check-in, instant ticket delivery and automated organizer payouts.",
    stack: ["React.js", "Node.js", "Express", "MongoDB", "QR API"],
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
    value: "muzammil.ahmed.dev@gmail.com",
    icon: "plane",
    href: "mailto:muzammil.ahmed.dev@gmail.com",
  },
  {
    title: "Resume",
    value: "Download Resume",
    icon: "globe",
    href: "mailto:muzammil.ahmed.dev@gmail.com?subject=Resume%20Request%20%E2%80%94%20Muzammil%20Ahmed",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials — client video testimonials (own section)             */
/*  Replace the `video` URLs with real client recordings later.        */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
  initials: string;
  rating: number;
  video: string;
  duration: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Muzammil rebuilt our store from scratch — page loads dropped from 6 seconds to under 1, and conversions jumped 40% in the first month.",
    name: "Sarah Mitchell",
    role: "Founder, UrbanSole — United Kingdom",
    project: "E-Commerce Rebuild",
    initials: "SM",
    rating: 5,
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    duration: "0:15",
  },
  {
    quote:
      "He delivered our platform two weeks ahead of schedule and kept us updated every single day. The live order tracking works flawlessly, even at peak hours.",
    name: "Omar Farooq",
    role: "CEO, FoodHub — Pakistan",
    project: "Real-time Delivery Platform",
    initials: "OF",
    rating: 5,
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    duration: "0:15",
  },
  {
    quote:
      "Communication was crystal clear and the code quality top-notch. He even set up our CI/CD pipeline without being asked. A true senior engineer.",
    name: "Daniel Weber",
    role: "Product Manager, InsightHQ — Germany",
    project: "SaaS Analytics Dashboard",
    initials: "DW",
    rating: 5,
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    duration: "0:15",
  },
  {
    quote:
      "We have worked with many freelancers, but Muzammil is the only one who thinks like a product owner. He flagged UX issues we hadn't even noticed.",
    name: "Ayesha Khan",
    role: "COO, Karvaan Tech — Karachi",
    project: "Booking Platform MVP",
    initials: "AK",
    rating: 4,
    video:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    duration: "0:15",
  },
];

/* ------------------------------------------------------------------ */
/*  Reviews — star-rated platform reviews with client photos           */
/*  Shown one at a time in a horizontally scrollable carousel.         */
/* ------------------------------------------------------------------ */

export type Review = {
  name: string;
  role: string;
  platform: string;
  rating: number;
  text: string;
  when: string;
  photo: string;
  initials: string;
};

export const REVIEWS: Review[] = [
  {
    name: "James Rodriguez",
    role: "Founder, UrbanSole",
    platform: "Upwork",
    rating: 5,
    text: "Delivered pixel-perfect React dashboards ahead of schedule. Clean, well-documented code and a smooth handover — our in-house team picked it up with zero friction.",
    when: "2 weeks ago",
    photo: "https://randomuser.me/portraits/men/32.jpg",
    initials: "JR",
  },
  {
    name: "Fatima Sheikh",
    role: "CEO, FoodHub",
    platform: "Fiverr",
    rating: 5,
    text: "This is our third project together — zero bugs in production every single time. He treats your product like his own. Highly recommended!",
    when: "1 month ago",
    photo: "https://randomuser.me/portraits/women/44.jpg",
    initials: "FS",
  },
  {
    name: "Lucas Moreau",
    role: "Product Manager, InsightHQ",
    platform: "Google",
    rating: 4,
    text: "Great MERN skills and fast communication. Slight timezone overlap, but he made it work perfectly with async updates every morning.",
    when: "2 months ago",
    photo: "https://randomuser.me/portraits/men/22.jpg",
    initials: "LM",
  },
  {
    name: "Priya Nair",
    role: "COO, Karvaan Tech",
    platform: "Upwork",
    rating: 5,
    text: "Took our vague idea and turned it into a polished, investor-ready MVP in just six weeks. The demo day went flawlessly thanks to his prep.",
    when: "3 months ago",
    photo: "https://randomuser.me/portraits/women/21.jpg",
    initials: "PN",
  },
  {
    name: "Hamza Tariq",
    role: "Owner, Noor Boutique",
    platform: "Google",
    rating: 5,
    text: "My boutique's website went from an idea to live in three weeks. He explained every step in simple words and the result looks better than my reference sites.",
    when: "4 months ago",
    photo: "https://randomuser.me/portraits/men/75.jpg",
    initials: "HT",
  },
];

export const PROFILE_IMAGE =
  "https://image.qwenlm.ai/generated-images/1029df68-ac69-416b-bd1e-7f6dcfef5240/_result.png";
