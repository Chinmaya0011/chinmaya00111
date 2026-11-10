// Centralized Source of Truth for Chinmaya Kumar Mishra
// Full-Stack Developer · Application Security Specialist

export const personalInfo = {
  name: "Chinmaya Kumar Mishra",
  brand: "chinmaya00111",
  tag: "FULL-STACK ENGINEER // APPLICATION SECURITY SPECIALIST",
  headline: "Engineering resilient web platforms. Breaking vulnerabilities before attackers do.",
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
    "Full-Stack Developer with 4+ years of production experience across React, Next.js, Node.js, and MongoDB. At Secure Code LLC, I build developer tools that safeguard repositories and scanning pipelines—architecting software where defensive security is woven into every commit.",
  heroStats: [
    { label: "Experience", value: "4+ Years", detail: "engineering MERN & Next.js systems" },
    { label: "Delivered", value: "20+", detail: "production deliveries & client deployments" },
    { label: "Shipped", value: "3", detail: "core security & AI platforms shipped" }
  ],
  telemetry: {
    status: "ONLINE",
    latency: "<12ms",
    policy: "ZERO-TRUST",
    availability: "OPEN FOR ROLES"
  },
  aboutHeading: "Software fails where assumptions live. I engineer systems to eliminate both.",
  aboutText:
    "Most developers write code until the happy path succeeds. I develop software with a persistent adversarial mindset: How does this endpoint behave under unexpected race conditions? Where does trust break?\n\nOver the past 4+ years, I’ve delivered responsive React and Next.js interfaces backed by resilient Node.js and MongoDB microservices. At Secure Code LLC, I engineer enterprise tooling that integrates directly with GitHub Apps and automated Semgrep static analysis engines. Outside of production sprints, I dissect OWASP vulnerabilities, audit API contracts, and simulate attack vectors in hands-on security labs.",
  aboutPillars: [
    {
      title: "Build",
      description: "High-throughput REST APIs, resilient OAuth 2.0 flows, scoped GitHub App integrations, and SSR Next.js applications engineered for millisecond response times."
    },
    {
      title: "Secure",
      description: "Strict tenant boundary enforcement, input sanitization at the gateway, automated SAST pipelines, AST data-flow tracing, and LLM prompt isolation."
    }
  ]
};

// Technical Skills (Grouped with category tags for interactive filtering)
export const technicalSkills = [
  {
    category: "Frontend",
    tag: "UI & Client",
    description: "Component architecture, state isolation, and SSR performance",
    skills: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "State Management", "Responsive UI"]
  },
  {
    category: "Backend",
    tag: "Server & APIs",
    description: "Distributed REST architectures, token lifecycle, and webhooks",
    skills: ["Node.js", "Express.js", "RESTful APIs", "OAuth 2.0", "GitHub Apps", "WebSockets", "Rate Limiting"]
  },
  {
    category: "Database",
    tag: "Storage & Data",
    description: "Document modeling, ACID transactional locks, and indexing",
    skills: ["MongoDB", "Mongoose", "Atomic Operations", "Compound Indexes", "Aggregation Pipelines", "Data Isolation"]
  },
  {
    category: "Security",
    tag: "AppSec & Defense",
    description: "Proactive threat modeling, access governance, and vulnerability analysis",
    skills: ["OWASP Top 10", "API Security (BOLA/IDOR)", "Secure Code Review", "AuthN / AuthZ", "Input Validation", "Tenant Scoping"]
  },
  {
    category: "Tools",
    tag: "DevOps & Audit",
    description: "Static code analysis, dynamic proxy intercept, and system audit",
    skills: ["Semgrep SAST", "Burp Suite", "OWASP ZAP", "Nmap", "Postman", "Git CLI", "Linux Hardening"]
  },
  {
    category: "AI",
    tag: "Models & RAG",
    description: "Retrieval augmentation, token chunking, and injection defense",
    skills: ["OpenAI API", "Gemini API", "RAG Pipelines", "Vector Search", "Prompt Injection Defense", "Embeddings"]
  }
];

// Security Specializations
export const securityInterests = [
  {
    id: "web-sec",
    title: "Web Application Security",
    description: "Eliminating injection surfaces, hardening browser security headers, sanitizing inputs, and enforcing defence-in-depth across the web tier."
  },
  {
    id: "api-sec",
    title: "API Security & Access Control",
    description: "Hardening REST endpoints, enforcing cryptographically signed JWT sessions, and systematically eliminating Broken Object Level Authorization (BOLA/IDOR)."
  },
  {
    id: "secure-code",
    title: "Secure Code Review & SAST",
    description: "Auditing application codebases for taint-flow vulnerabilities, authoring custom Semgrep rules, and shifting security left in CI/CD pipelines."
  },
  {
    id: "ai-appsec",
    title: "AI & LLM Application Security",
    description: "Guarding retrieval-augmented generation (RAG) vector stores against tenant bleed, sanitizing untrusted inputs, and neutralizing prompt injections."
  }
];

// Featured Projects with Case Study Structure
export const projects = [
  {
    id: "github-scanner",
    title: "GitHub Security Scanner",
    subtitle: "Multi-Tenant Automated SAST & Vulnerability Triage Platform",
    problem: "Engineering teams deploying microservices across repositories frequently ship critical vulnerabilities without centralized, automated visibility.",
    built: "A full-stack platform authenticated via a scoped GitHub App that orchestrates automated Semgrep SAST scans on push events and renders categorized findings on a live triage dashboard.",
    stack: ["Next.js 15", "Node.js", "Express", "MongoDB", "OAuth 2.0", "Semgrep SAST", "GitHub Webhooks"],
    impact: "Automated vulnerability detection across connected repositories with tenant-isolated scan triage and custom OWASP rules.",
    architecture: [
      "Scoped GitHub App permissions eliminating broad admin token risk",
      "Asynchronous scan worker pipeline preventing HTTP timeouts during large codebase audits",
      "Multi-tenant data isolation ensuring scans are strictly accessible to verified org members"
    ],
    githubUrl: "https://github.com/chinmaya0011/github-scanner-platform",
    liveUrl: "https://scanner.chinmayamishra.dev"
  },
  {
    id: "ai-github-assistant",
    title: "AI GitHub Repository Assistant",
    subtitle: "Context-Aware Codebase Intelligence & RAG Exploration Engine",
    problem: "Onboarding into complex multi-file codebases leads to high ramp-up latency, fragmented comprehension, and overlooked architectural nuances.",
    built: "An intelligent developer assistant that parses repository code into contextual vector embeddings and enables conversational codebase exploration via RAG.",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "OpenAI API", "RAG Embeddings", "Vector Search"],
    impact: "Accelerated repository comprehension and code navigation using contextual retrieval with prompt-injection defense.",
    architecture: [
      "Token-optimized AST-aware code chunking preserving semantic boundaries",
      "Tenant-isolated vector search boundaries preventing cross-repository memory leakage",
      "Prompt sanitization layer intercepting indirect prompt injection attempts"
    ],
    githubUrl: "https://github.com/chinmaya0011/ai-github-chatbot",
    liveUrl: "https://aichat.chinmayamishra.dev"
  },
  {
    id: "booksaathi",
    title: "BookSaathi SaaS",
    subtitle: "Real-Time Practice Management & Appointment Automation Suite",
    problem: "Solo professionals lose billable hours manually managing appointments across disconnected messaging channels with frequent scheduling conflicts.",
    built: "A multi-tenant booking SaaS featuring automated availability matching, real-time WebSocket notifications, and an integrated Gemini scheduling assistant.",
    stack: ["Next.js", "Express.js", "MongoDB", "Socket.io", "Gemini API", "Tailwind CSS"],
    impact: "Replaced manual booking with atomic transaction scheduling, real-time sync, and automated client triage.",
    architecture: [
      "Atomic conditional database transactions eliminating double-booking race conditions",
      "Strict RBAC separating client booking portals from practitioner dashboard data"
    ],
    githubUrl: "https://github.com/chinmaya0011/booksaathi-saas",
    liveUrl: "https://booksaathi.com"
  }
];

// Security Research Notes with Interactive Vulnerable vs. Hardened Code Diffs
export const securityResearch = [
  {
    id: "race-conditions",
    title: "Race Conditions & Concurrency (TOCTOU)",
    takeaway: "How simultaneous requests bypass balance checks to double-spend, and how atomic database operations solve it.",
    category: "Concurrency & DB",
    summary: "Checking resource availability and mutating balance across separate asynchronous operations creates Time-of-Check to Time-of-Use (TOCTOU) windows. Under concurrent traffic, multiple transactions pass checks simultaneously.",
    vulnerableSnippet: `// ⚠️ VULNERABLE: Non-atomic read-then-write creates TOCTOU window
const account = await Account.findById(userId);
if (account.balance >= cost) {
  // Attacker fires 5 concurrent requests before update runs
  account.balance -= cost;
  await account.save();
  return res.json({ success: true });
}`,
    secureSnippet: `// 🛡️ HARDENED: Single atomic condition enforces zero-race constraint
const updated = await Account.findOneAndUpdate(
  { _id: userId, balance: { $gte: cost } }, // Atomic conditional check
  { $inc: { balance: -cost } },             // Atomic decrement
  { new: true }
);
if (!updated) return res.status(400).json({ error: "Insufficient funds" });`,
    fix: "Enforce atomicity at the database level using conditional atomic updates (e.g., MongoDB findOneAndUpdate with condition filter) or transactional row locks rather than in-memory state flags."
  },
  {
    id: "api-auth",
    title: "Broken Object-Level Authorization (BOLA/IDOR)",
    takeaway: "Why authentication is never authorization, and how tenant context leakage happens.",
    category: "API Security",
    summary: "Authentication verifies who the client is, but authorization confirms what resources they are permitted to access. Broken Object Level Authorization (BOLA/IDOR) occurs when an endpoint accepts user-provided record IDs without validating ownership against server-verified session claims.",
    vulnerableSnippet: `// ⚠️ VULNERABLE: Client-controlled ID parameter trusted blindly
router.get("/api/invoices/:id", verifyToken, async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);
  // Any authenticated user can read any other user's invoice!
  res.json(invoice);
});`,
    secureSnippet: `// 🛡️ HARDENED: Server-enforced tenant boundary from verified JWT
router.get("/api/invoices/:id", verifyToken, async (req, res) => {
  const invoice = await Invoice.findOne({
    _id: req.params.id,
    userId: req.user.id // Enforce ownership bound to auth token
  });
  if (!invoice) return res.status(404).json({ error: "Invoice not found" });
  res.json(invoice);
});`,
    fix: "Always resolve tenant context server-side from cryptographically verified JWT/session claims. Never trust client-supplied ID parameters to infer ownership."
  },
  {
    id: "owasp-top-10",
    title: "OWASP Top 10 Root Causes & Mitigations",
    takeaway: "Eliminating injection, broken access, and cryptographic failures by design.",
    category: "AppSec Fundamentals",
    summary: "The majority of web security compromises stem from fundamental architectural gaps: broken access control, cryptographic failures, injection, and insecure design. Defense-in-depth requires validation at every boundary.",
    vulnerableSnippet: `// ⚠️ VULNERABLE: Unsanitized input concatenated into query string
const userQuery = { $where: "this.username == '" + req.body.username + "'" };
const user = await User.findOne(userQuery); // NoSQL injection sink`,
    secureSnippet: `// 🛡️ HARDENED: Strict schema validation & parameterized queries
const schema = z.object({ username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/) });
const { username } = schema.parse(req.body);
const user = await User.findOne({ username: String(username) }).lean();`,
    fix: "Adopt parameterized queries for zero-injection persistence, enforce strict default-deny access control on every route, and implement defense-in-depth header validation."
  },
  {
    id: "ai-appsec",
    title: "AI & LLM Application Security (Prompt Injection)",
    takeaway: "Neutralizing prompt injection and preventing unauthorized RAG memory leakage.",
    category: "AI Security",
    summary: "Untrusted user inputs mixed into system prompts can override instruction guardrails (direct and indirect prompt injection). In RAG systems, embedding vector stores often lack row-level user permissions, leading to context leakage.",
    vulnerableSnippet: `// ⚠️ VULNERABLE: Raw vector search without tenant isolation
const results = await vectorStore.similaritySearch(userQuery, 5);
// May retrieve document chunks belonging to other organizations!
const answer = await llm.generate(systemPrompt + results + userQuery);`,
    secureSnippet: `// 🛡️ HARDENED: Tenant-scoped pre-filtering & strict output delimiters
const results = await vectorStore.similaritySearch(userQuery, 5, {
  filter: { tenantId: req.user.tenantId } // Strict vector-level tenancy
});
const safeContext = sanitize(results);
const prompt = \`[CONTEXT]\${safeContext}[/CONTEXT]\\nUser: \${sanitize(userQuery)}\`;`,
    fix: "Enforce strict tenant filtering inside vector queries prior to context insertion, treat all LLM outputs as untrusted before executing actions, and isolate tool calls with least privilege."
  }
];

// Alias for backwards compatibility
export const securityNotes = securityResearch;

// Employment History with Quantified Technical Impact & Roadmap Attributes
export const experiences = [
  {
    id: "secure-code",
    role: "Full-Stack Developer",
    company: "Secure Code LLC",
    location: "Texas, USA (Remote)",
    period: "Jul 2025 – Present",
    phase: "PHASE 03",
    badge: "CURRENT MISSION",
    isCurrent: true,
    mission: "AppSec Tooling & Enterprise GitHub Ingestion",
    tags: ["Next.js 15", "Node.js", "Semgrep SAST", "OAuth 2.0", "GitHub Apps", "MongoDB"],
    bullets: [
      "Architected full-stack features for security tools connecting GitHub repositories to automated Semgrep static analysis pipelines.",
      "Implemented OAuth 2.0 authentication flows and fine-grained GitHub App integrations, enforcing least-privilege repository access.",
      "Engineered high-density scan triage dashboards enabling teams to review, categorize, and remediate thousands of SAST findings with real-time feedback.",
      "Authored custom Semgrep rule definitions targeting common OWASP vulnerabilities across JavaScript and TypeScript microservices."
    ]
  },
  {
    id: "metadee-ai",
    role: "Full-Stack Developer",
    company: "Metadee AI",
    location: "Remote",
    period: "Jan 2025 – Jun 2025",
    phase: "PHASE 02",
    badge: "DELIVERED",
    isCurrent: false,
    mission: "LLM Integrations & RAG Retrieval Pipelines",
    tags: ["OpenAI API", "RAG Architecture", "Express.js", "MongoDB", "Streaming UI"],
    bullets: [
      "Developed full-stack web applications integrating OpenAI LLM APIs with vector-retrieval RAG architectures for contextual chatbot interactions.",
      "Designed and maintained high-throughput RESTful API endpoints using Node.js, Express, and MongoDB with sub-150ms average latency.",
      "Implemented client-side streaming response renderers with Next.js and Tailwind CSS, delivering real-time typing feedback for AI outputs."
    ]
  },
  {
    id: "freelance",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2021 – 2024",
    phase: "PHASE 01",
    badge: "FOUNDATION",
    isCurrent: false,
    mission: "20+ Client Deployments & Full-Lifecycle Development",
    tags: ["React", "Next.js", "Node.js", "REST APIs", "CI/CD", "Linux"],
    bullets: [
      "Delivered 20+ bespoke web applications for international clients, driving projects from requirements to CI/CD production deployment.",
      "Engineered responsive UI components with React and Next.js, boosting Lighthouse performance scores and mobile responsiveness.",
      "Configured hardened production server environments, MongoDB compound indexes, and automated SSL/domain provisioning."
    ]
  }
];

// Education & Verified Credentials
export const education = {
  degree: "B.Tech in Computer Science & Engineering",
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
    name: "Advanced JavaScript Certification",
    status: "Verified",
    link: "https://cutshort.io"
  },
  {
    title: "HackerRank",
    name: "React (Frontend Developer) Verified",
    status: "Verified",
    link: "https://www.hackerrank.com"
  }
];

export const educationAndCerts = {
  education,
  certifications
};
