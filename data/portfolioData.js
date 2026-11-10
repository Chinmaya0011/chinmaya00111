// Centralized Source of Truth for Chinmaya Kumar Mishra
// Full-Stack Developer · Application Security

export const personalInfo = {
  name: "Chinmaya Kumar Mishra",
  brand: "chinmaya00111",
  tag: "FULL-STACK DEVELOPER · APPLICATION SECURITY",
  headline: "Building secure web apps and security tools.",
  title: "Full-Stack Developer · Application Security",
  location: "Bhubaneswar, Odisha, India",
  email: "imchinu17@gmail.com",
  phone: "+91 7077835119",
  links: {
    github: "https://github.com/chinmaya0011",
    linkedin: "https://www.linkedin.com/in/chinmaya00111/",
    portfolio: "https://chinmayakumarmishra.sbs",
    email: "mailto:imchinu17@gmail.com",
    resume: "/resumes/Chinmaya_AppSec_Resume.pdf"
  },
  resumeTitle: "Full-Stack Developer (MERN & AppSec)",
  heroIntro:
    "Full-stack developer with 4+ years of experience in React, Next.js, Node.js, and MongoDB. I build products where security is part of the design, not an afterthought.",
  heroStats: [
    { label: "Experience", value: "4+ Years", detail: "building web apps" },
    { label: "Delivered", value: "20+", detail: "Client projects delivered" },
    { label: "Shipped", value: "3", detail: "Shipped products" }
  ],
  aboutHeading: "Developer who builds with security in mind.",
  aboutText:
    "I'm a full-stack developer who builds with the MERN stack and cares about how apps break. At Secure Code, I build tools that connect GitHub repositories to scanning pipelines. Outside work, I study OWASP Top 10, API security, and secure code review through hands-on labs.",
  aboutPillars: [
    {
      title: "Build",
      description: "REST APIs, React/Next.js interfaces, OAuth and GitHub App integrations."
    },
    {
      title: "Secure",
      description: "Authorization checks, input validation, code scanning, AI/RAG security."
    }
  ]
};

// Technical Skills (Grouped by category, no learning vs knowing split)
export const technicalSkills = [
  {
    category: "Frontend",
    tag: "UI & Client",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    category: "Backend",
    tag: "Server & APIs",
    skills: ["Node.js", "Express", "REST APIs", "OAuth 2.0"]
  },
  {
    category: "Database",
    tag: "Storage & Data",
    skills: ["MongoDB", "Mongoose"]
  },
  {
    category: "Security",
    tag: "AppSec & Defense",
    skills: ["OWASP Top 10", "API security", "Secure code review", "AuthN / AuthZ"]
  },
  {
    category: "Tools",
    tag: "DevOps & Audit",
    skills: ["Semgrep", "Burp Suite", "OWASP ZAP", "Nmap", "Postman", "Git", "Linux"]
  },
  {
    category: "AI",
    tag: "Models & RAG",
    skills: ["OpenAI / Gemini APIs", "RAG pipelines", "Prompt injection basics"]
  }
];

// Security Specializations
export const securityInterests = [
  {
    id: "web-sec",
    title: "Web Application Security",
    description: "Analyzing common web vulnerabilities, sanitizing user inputs, and engineering secure application architectures."
  },
  {
    id: "api-sec",
    title: "API Security",
    description: "Hardening REST endpoints, enforcing strict token authN/authZ, and eliminating object-level authorization (BOLA) flaws."
  },
  {
    id: "secure-code",
    title: "Secure Code Review",
    description: "Auditing application source code, identifying vulnerable patterns, and automating Semgrep rule-based scanning."
  },
  {
    id: "ai-appsec",
    title: "AI Application Security",
    description: "Preventing prompt injection attacks, securing model integrations, and isolating RAG vector retrieval boundaries."
  }
];

// Featured Projects with Problem, Built, Stack, Impact
export const projects = [
  {
    id: "github-scanner",
    title: "GitHub Security Scanner",
    problem: "Teams can't easily see vulnerabilities across their repos.",
    built: "A platform that connects via a GitHub App, scans code with Semgrep, and reports findings in a dashboard.",
    stack: ["Next.js", "Express", "MongoDB", "OAuth 2.0", "Semgrep"],
    impact: "Automated vulnerability detection across connected repositories with centralized scan triage.",
    githubUrl: "https://github.com/chinmaya0011/github-scanner-platform",
    liveUrl: "https://scanner.chinmayamishra.dev"
  },
  {
    id: "ai-github-assistant",
    title: "AI GitHub Repository Assistant",
    problem: "Understanding an unfamiliar codebase is slow.",
    built: "A chat assistant that answers questions about a repo using RAG.",
    stack: ["Next.js", "Express", "MongoDB", "OpenAI API", "RAG"],
    impact: "Accelerated repository comprehension and code navigation using contextual retrieval.",
    githubUrl: "https://github.com/chinmaya0011/ai-github-chatbot",
    liveUrl: "https://aichat.chinmayamishra.dev"
  },
  {
    id: "booksaathi",
    title: "BookSaathi",
    problem: "Indian solo professionals (doctors, CAs, lawyers) manage appointments manually.",
    built: "A booking and practice management SaaS with auth, real-time updates, and an AI chatbot.",
    stack: ["Next.js", "Express", "MongoDB", "Socket.io", "Gemini API"],
    impact: "Replaces manual appointment scheduling with automated client workflows and AI chat assistance.",
    githubUrl: "https://github.com/chinmaya0011/booksaathi-saas",
    liveUrl: "https://booksaathi.com"
  }
];

// Security Research (Each note gets a one-line takeaway)
export const securityResearch = [
  {
    id: "race-conditions",
    title: "Race Conditions",
    takeaway: "How two simultaneous requests can double-spend, and how atomic DB operations fix it.",
    category: "Concurrency & DB",
    summary: "Checking resource availability and mutating balance across separate operations creates Time-of-Check to Time-of-Use (TOCTOU) windows. Under concurrent traffic, multiple transactions pass checks simultaneously.",
    fix: "Enforce atomicity at the database level using conditional atomic updates (e.g., MongoDB findOneAndUpdate with balance condition) or transactional row locks rather than memory-state flags."
  },
  {
    id: "api-auth",
    title: "API Auth & Authz",
    takeaway: "Why authentication is not authorization, and how broken access control happens.",
    category: "API Security",
    summary: "Authentication verifies who the client is, but authorization confirms what resources they are permitted to access. Broken Object Level Authorization (BOLA/IDOR) occurs when an endpoint accepts user-provided record IDs without validating ownership against session tokens.",
    fix: "Always resolve tenant context server-side from verified JWT/session claims. Never trust client-supplied ID parameters to infer ownership."
  },
  {
    id: "owasp-top-10",
    title: "OWASP Top 10",
    takeaway: "Root causes and fixes, explained simply.",
    category: "AppSec Fundamentals",
    summary: "The majority of web security compromises stem from fundamental architectural gaps: broken access control, cryptographic failures, injection, and insecure design.",
    fix: "Adopt parameterized queries for zero-injection persistence, enforce strict default-deny access control on every route, and implement defense-in-depth header validation."
  },
  {
    id: "ai-appsec",
    title: "AI App Security",
    takeaway: "Prompt injection and keeping RAG data inside access boundaries.",
    category: "AI Security",
    summary: "Untrusted user inputs mixed into system prompts can override instruction guardrails (direct and indirect prompt injection). In RAG systems, embedding stores often lack row-level user permissions.",
    fix: "Enforce strict tenant filtering inside vector queries prior to context insertion, treat all LLM outputs as untrusted before executing actions, and isolate tool calls with least privilege."
  }
];

// Alias for backwards compatibility
export const securityNotes = securityResearch;

// Employment History
export const experiences = [
  {
    id: "secure-code",
    role: "Full-Stack Developer",
    company: "Secure Code LLC",
    location: "Texas, USA (Remote)",
    period: "Jul 2025 – Present",
    bullets: [
      "Built full-stack features for security tools linking GitHub repos to scanning pipelines.",
      "Implemented OAuth 2.0 and GitHub App integrations for secure repo access.",
      "Developed scan review dashboards for viewing and triaging findings."
    ]
  },
  {
    id: "metadee-ai",
    role: "Full-Stack Developer",
    company: "Metadee AI",
    location: "Remote",
    period: "Jan 2025 – Jun 2025",
    bullets: [
      "Integrated OpenAI models with RAG pipelines for contextual chat features.",
      "Built and maintained REST APIs with Node.js, Express, and MongoDB."
    ]
  },
  {
    id: "freelance",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2021 – 2024",
    bullets: [
      "Delivered 20+ custom web apps, from requirements to production deployment."
    ]
  }
];

// Education & Certifications (Kept as is)
export const education = {
  degree: "B.Tech",
  shortDegree: "B.Tech",
  institution: "Parala Maharaja Engineering College",
  period: "2018 – 2021",
  location: "Berhampur, Odisha"
};

export const certifications = [
  {
    title: "freeCodeCamp",
    name: "JavaScript Algorithms and Data Structures",
    status: "Verified",
    link: "https://www.freecodecamp.org/certification/fcc-chinmaya/javascript-algorithms-and-data-structures"
  },
  {
    title: "Cutshort",
    name: "Advanced JavaScript",
    status: "Verified",
    link: "https://cutshort.io"
  },
  {
    title: "HackerRank",
    name: "React (Frontend Developer)",
    status: "Verified",
    link: "https://www.hackerrank.com"
  }
];

export const educationAndCerts = {
  education,
  certifications
};
