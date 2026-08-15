export const NAV_LINKS = [
  { label: "About", href: "#top" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Projects", href: "#projects" },
  { label: "Personal", href: "#personal" },
  { label: "Let's Talk", href: "#contact" },
];

export const SERVICES = [
  {
    num: "01",
    title: "AI Product Development",
    desc: "Design and build AI-powered applications, copilots, and automation systems using modern language models and retrieval architectures.",
  },
  {
    num: "02",
    title: "Full-Stack Development",
    desc: "Scalable web and mobile applications — from polished frontends to backend services, databases, and production deployment.",
  },
  {
    num: "03",
    title: "Workflow Automation",
    desc: "Intelligent workflows that connect business processes, communication channels, and AI systems to eliminate repetitive work.",
  },
  {
    num: "04",
    title: "Product Strategy",
    desc: "Research problems, validate ideas, build MVPs, and translate concepts into usable products that solve real-world problems.",
  },
];

export const SKILL_MARQUEE = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Supabase",
  "Prisma",
  "React Native",
  "Expo",
  "Three.js",
  "REST APIs",
  "pgvector",
  "SQLite",
  "MongoDB",
  "OpenAI",
  "Anthropic Claude",
  "Gemini",
  "AI Agents",
  "RAG",
  "Vector Embeddings",
  "Prompt Engineering",
  "Flowise",
  "Vercel",
  "AWS EC2",
  "Azure",
  "Cloudflare",
  "Clerk",
  "Contentful",
  "Unity",
  "Blender",
];

export const SKILL_GROUPS = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "React Native", "Expo", "NativeWind"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Next.js API Routes"],
  },
  {
    label: "AI & LLM",
    skills: ["OpenAI", "Anthropic Claude", "Gemini", "Cohere", "Flowise", "RAG", "Vector Embeddings", "AI Agents", "Prompt Engineering"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Supabase", "pgvector", "Prisma", "SQLite"],
  },
  {
    label: "Infrastructure",
    skills: ["Vercel", "AWS EC2", "Azure", "Cloudflare"],
  },
  {
    label: "3D & Creative",
    skills: ["Three.js", "Unity", "Blender"],
  },
];

export const AREAS = [
  "AI Agents",
  "SaaS Platforms",
  "Workflow Automation",
  "Knowledge Retrieval",
  "Mobile Apps",
  "Developer Tools",
  "Marketing Websites",
  "Startup MVPs",
  "3D Experiences",
  "Virtual Reality",
];

export const PROJECTS = [
  {
    id: "01",
    title: "FieldSignal",
    role: "AI Operating Layer for Organizations",
    desc: "Helps organizations move beyond AI pilots by deploying AI as a coordinated operating layer — structured systems, governed workflows, and role-based team training for repeatable, measurable AI adoption. The site is built on WordPress with custom plugin integrations for content management and dynamic service delivery.",
    tags: ["AI Strategy", "RAG", "MCP", "AI Agents", "AI Governance", "Workflow Automation", "WordPress"],
    href: "https://fieldsignal.ai",
    image: "/projects/fieldsignal.png",
  },
  {
    id: "02",
    title: "OpsGuru",
    role: "Powering the Future of AI through Cloud Innovation",
    desc: "North America's first governed, fixed-fee AI delivery model. OpsGuru's Agentic Delivery platform helps enterprises harness cloud infrastructure and AI agents to ship production-grade solutions at scale. I integrated Contentful as the headless CMS, connecting structured content to the Next.js frontend for scalable, editor-friendly content management.",
    tags: ["Cloud Infrastructure", "AI Agents", "Agentic Delivery", "AWS", "DevOps", "Contentful"],
    href: "https://www.opsguru.com",
    image: "/projects/opsguru.png",
  },
  {
    id: "03",
    title: "Borderless Creatives",
    role: "Technical Lead — Creative Agency Powering Digital Brands",
    desc: "A forward-thinking creative agency building high-quality digital experiences for brands. As Technical Lead, I drive the technical architecture, frontend engineering, and delivery of client-facing web products.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Web Development"],
    href: "https://borderlesscreatives.ca",
    image: "/projects/borderless-logo.png",
    logo: true,
  },
  {
    id: "04",
    title: "Digiworks AI",
    role: "Technical Lead — AI Coworkers for Enterprise",
    desc: "An enterprise AI platform that deploys intelligent AI coworkers into business operations. Ships as a full product suite — a marketing site, a user-facing app, and an admin portal — enabling teams to automate complex workflows at scale.",
    tags: ["AI Agents", "Enterprise SaaS", "Next.js", "Full-Stack", "Automation", "Portal", "Website", "App"],
    href: "https://digiworks.ai",
    links: [
      { label: "Website", href: "https://digiworks.ai" },
      { label: "App", href: "https://app.digiworks.ai" },
      { label: "Portal", href: "https://portal.digiworks.ai" },
    ],
    image: "/projects/digiworks.png",
  },
  {
    id: "05",
    title: "The Arden",
    role: "Digital Audit & QA — Boutique Hotel",
    desc: "Part of the LFTFIELD hospitality portfolio alongside The Loden. Audited The Arden's booking journey, SEO & local search, and AI-search readiness — surfacing UX issues, verifying fixes, and mapping growth recommendations into a 90-day roadmap.",
    tags: ["Digital Audit", "QA", "SEO", "Booking UX", "AEO"],
    href: "https://www.thearden.com",
    image: "/projects/logos/arden.png",
    logo: true,
  },
  {
    id: "06",
    title: "The American Bro Rally",
    role: "Frontend Build — Meet Joey® Campaign",
    desc: "Built the hero + tour-dates page for the Meet Joey® x Street Bike Tommy American Bro Rally — a responsive BigCommerce widget with custom hero artwork, the BR◯RALLY brand ring, and a stop-by-stop tour grid. Figma-to-code, pixel-verified across mobile, tablet, and desktop.",
    tags: ["BigCommerce", "HTML/CSS", "Responsive", "Campaign", "Figma → Code"],
    href: "https://meetjoey.com/findjoey/",
    image: "/projects/american-bro-rally.png",
  },
];

export const PERSONAL = [
  {
    tag: "Books & Ideas",
    title: "Reading",
    desc: "Fiction and non-fiction across human behavior, personal growth, technology, and storytelling — reading is how I think in slow motion.",
    icon: "book",
  },
  {
    tag: "Reflection",
    title: "Writing & Journaling",
    desc: "Documenting ideas, reflections, lessons, and observations through journaling and long-form writing. Thinking on paper.",
    icon: "pen",
  },
  {
    tag: "Storytelling",
    title: "Content Creation",
    desc: "I run \"Our Odyssey\" (@odysseywithhuzaifa on Instagram) — a page on a journey of kindness, wisdom, and growth. Creating short-form content around books, ideas, personal development, and life experiences.",
    icon: "spark",
  },
  {
    tag: "Curiosity",
    title: "Continuous Learning",
    desc: "Exploring new technologies, AI capabilities, product strategies, and creative tools — always through hands-on experimentation.",
    icon: "loop",
  },
];

export const MISSION =
  "To build technology that solves meaningful problems, share ideas that help people think differently, and continuously learn through creating, building, and documenting the journey.";

export const STRENGTHS = [
  "Product Thinking",
  "Problem Solving",
  "Rapid Prototyping",
  "AI Integration",
  "Technical Communication",
  "Storytelling",
  "Self-Learning",
  "Startup Execution",
];

export const CONTACT = {
  email: "mohammedhuzaifa857@gmail.com",
  phone: "+91 80721 76391",
  phoneHref: "tel:+918072176391",
  socials: [
    { label: "GitHub", href: "https://github.com/Mohammed-Huzaifa" },
    { label: "X", href: "https://x.com/iamhuzaifa_18" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/huzaifa-surveykar-106ba12a1" },
    { label: "Instagram", href: "https://www.instagram.com/odysseywithhuzaifa" },
  ],
};
