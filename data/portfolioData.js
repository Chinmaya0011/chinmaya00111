// Centralized Source of Truth for Chinmaya Kumar Mishra
// Full-Stack Developer | Application Security Engineer
// Canonical Domain: https://www.chinmayakumarmishra.sbs/

export const personalInfo = {
  name: "Chinmaya Kumar Mishra",
  alternateNames: ["Chinmay Kumar Mishra", "Chinmaya Mishra", "Chinmay Mishra", "Chinmaya K. Mishra"],
  brand: "Chinmaya Kumar Mishra",
  brandShort: "CM",
  brandSlug: "chinmaya00111",
  tag: "FULL-STACK DEVELOPER | APPLICATION SECURITY ENGINEER",
  headline: "Building Modern Software. Engineering Security Into Every Layer.",
  title: "Full-Stack Developer | Application Security Engineer",
  location: "Odisha, India",
  email: "imchinu17@gmail.com",
  phone: "+91 7077835119",
  links: {
    github: "https://github.com/chinmaya0011",
    linkedin: "https://www.linkedin.com/in/chinmaya00111/",
    portfolio: "https://www.chinmayakumarmishra.sbs/",
    email: "mailto:imchinu17@gmail.com",
    resume: "/resumes/Chinmaya_AppSec_Resume.pdf"
  },
  resumeTitle: "Full-Stack Developer (MERN & AppSec)",
  heroIntro:
    "I build modern web applications, secure APIs, developer tools, and AI-powered systems. My work combines full-stack engineering with an adversarial approach to application security.",
  availability: "Available for Full-Time & AppSec Engineering Roles",
  stats: [
    { label: "Experience", value: "4+ Years", detail: "building modern web applications" },
    { label: "Projects Delivered", value: "20+", detail: "production deliveries & deployments" },
    { label: "Shipped Products", value: "3", detail: "core security & AI platforms shipped" }
  ],
  aboutHeading: "Full-stack engineering with an adversarial security mindset.",
  aboutBio: [
    "I am a Full-Stack Developer and Application Security Engineer based in Odisha, India, with over 4 years of hands-on experience designing and building scalable web applications. Known across developer communities as Chinmaya Kumar Mishra (and frequently as Chinmay or Chinmaya Mishra), my core engineering domain centers on JavaScript, React, Next.js, Node.js, Express, and MongoDB, paired with a disciplined adversarial focus on web and API security.",
    "At Secure Code LLC, I develop developer platforms that connect customer code repositories to automated SAST and security scanning pipelines. My engineering philosophy is simple: software fails where assumptions live. Rather than treating security as a post-deployment checklist, I integrate authentication, authorization checks, input validation, and tenant boundaries directly into software architecture from day one.",
    "Outside production builds, I continuously expand my security research across the OWASP Top 10, API security (BOLA/IDOR), LLM application security, and hands-on vulnerability audits."
  ],
  aboutPillars: [
    {
      title: "Full-Stack Architecture",
      description: "Modern React and Next.js interfaces, high-throughput Node.js microservices, and resilient REST APIs engineered for speed, clean UX, and reliability."
    },
    {
      title: "Application Security",
      description: "Proactive threat modeling, strict authorization gates, zero-injection data persistence, and custom Semgrep SAST rule authoring."
    },
    {
      title: "AI Systems & Defense",
      description: "RAG vector retrieval architectures, model API integrations, and robust prompt injection sanitization layers."
    }
  ]
};

// Technical Skills (Organized strictly into meaningful categories as requested)
export const technicalSkills = [
  {
    category: "Frontend",
    tag: "Client Tier",
    description: "Modern component architectures, state management, and responsive design",
    skills: ["JavaScript", "React", "Next.js", "HTML", "CSS"]
  },
  {
    category: "Backend",
    tag: "Server Tier",
    description: "Scalable server microservices, token validation, and API contracts",
    skills: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    category: "Database",
    tag: "Data Tier",
    description: "Document persistence, schema modeling, and relational query design",
    skills: ["MongoDB", "SQL"]
  },
  {
    category: "Security",
    tag: "AppSec Core",
    description: "Defensive engineering, vulnerability assessment, and code review",
    skills: [
      "OWASP Top 10",
      "API Security",
      "Authentication & Authorization",
      "BOLA / IDOR",
      "Secure Code Review",
      "Burp Suite",
      "SAST",
      "Semgrep",
      "OAuth 2.0 Security"
    ]
  },
  {
    category: "AI Security",
    tag: "Emerging Defense",
    description: "Securing LLM pipelines, vector stores, and autonomous agent workflows",
    skills: [
      "LLM Application Security",
      "Prompt Injection",
      "RAG Security",
      "AI Agent Security"
    ]
  }
];

// Dedicated Application Security Practical Capabilities (Phase 6)
export const appSecCapabilities = [
  {
    id: "web-sec",
    title: "Web Application Security",
    icon: "Globe",
    summary: "Eliminating injection vectors (SQLi, NoSQLi), hardening browser headers (CSP, HSTS, X-Frame-Options), mitigating XSS, CSRF, and SSRF risks.",
    practice: "Enforce strict schema-level input validation with Zod/Joi, context-aware output encoding, and parameterized database queries."
  },
  {
    id: "api-sec",
    title: "API Security & Access Control",
    icon: "Key",
    summary: "Hardening REST endpoints against Broken Object-Level Authorization (BOLA/IDOR), mass assignment, and endpoint enumeration.",
    practice: "Resolve all tenant and resource ownership server-side from cryptographically verified claims, rejecting client-supplied ID trust."
  },
  {
    id: "auth-authz",
    title: "Authentication & Authorization",
    icon: "Lock",
    summary: "Designing least-privilege token lifecycles, OAuth 2.0 flows, secure cookie session handling, and role-based access governance.",
    practice: "Implement short-lived access tokens, automated refresh token rotation with family revocation, and explicit deny-by-default route policies."
  },
  {
    id: "sast-review",
    title: "Secure Code Review & SAST",
    icon: "FileCode2",
    summary: "Auditing application source code for taint propagation from untrusted sources to sensitive sinks using custom Semgrep rules.",
    practice: "Integrate automated static analysis into pre-commit hooks and pull-request CI/CD pipelines to block insecure patterns early."
  },
  {
    id: "multi-tenant",
    title: "Multi-Tenant Data Isolation",
    icon: "ShieldCheck",
    summary: "Preventing cross-organization tenant bleed in shared database environments and SaaS microservices.",
    practice: "Enforce compound index filters containing tenantId on every read/write operation and atomic transactions for state mutations."
  },
  {
    id: "ai-llm-sec",
    title: "AI & LLM Application Security",
    icon: "Cpu",
    summary: "Neutralizing direct and indirect prompt injection attacks, vector memory poisoning, and unauthorized data retrieval in RAG systems.",
    practice: "Apply metadata pre-filtering inside vector queries prior to context insertion and isolate LLM tools with least-privilege execution."
  }
];

// Featured Projects (Phase 5: Case Study Structure)
export const projects = [
  {
    id: "github-scanner",
    title: "GitHub Security Scanner",
    subtitle: "Multi-Tenant Automated SAST & Vulnerability Triage Platform",
    description: "A full-stack platform authenticated via a scoped GitHub App that orchestrates automated Semgrep SAST scans on push events and renders categorized findings on an interactive dashboard.",
    problem: "Engineering teams deploying microservices across repositories frequently lack centralized, automated visibility into code vulnerabilities before production release.",
    implementation: "Engineered with Next.js 15 App Router, Node.js, Express, MongoDB, and Semgrep. Implemented webhook ingestion queues and asynchronous background scan workers to prevent HTTP timeouts during large codebase audits.",
    stack: ["Next.js 15", "Node.js", "Express", "MongoDB", "OAuth 2.0", "Semgrep SAST", "GitHub Webhooks"],
    securityConsiderations: "Scoped GitHub App permissions preventing broad administrative token leakage, tenant-isolated scan data access control, and cryptographically verified webhook payloads (HMAC SHA-256).",
    githubUrl: "https://github.com/chinmaya0011/github-scanner-platform",
    liveUrl: "https://scanner.chinmayamishra.dev"
  },
  {
    id: "ai-github-assistant",
    title: "AI GitHub Repository Assistant",
    subtitle: "Context-Aware Codebase Intelligence & RAG Exploration Engine",
    description: "An intelligent developer assistant that parses repository code into contextual vector embeddings and enables conversational codebase exploration via RAG.",
    problem: "Onboarding into unfamiliar or multi-file repositories is slow, with developers missing critical architectural boundaries and data-flow patterns.",
    implementation: "Built with Next.js, Express, MongoDB, and the OpenAI API. Uses AST-aware code chunking to preserve semantic boundaries across classes and functions before vector indexing.",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "OpenAI API", "RAG Embeddings", "Vector Search"],
    securityConsiderations: "Tenant-isolated vector query boundaries preventing cross-repository memory leakage, output delimiter sanitization, and prompt-injection interception guardrails.",
    githubUrl: "https://github.com/chinmaya0011/ai-github-chatbot",
    liveUrl: "https://aichat.chinmayamishra.dev"
  },
  {
    id: "booksaathi",
    title: "BookSaathi SaaS",
    subtitle: "Real-Time Practice Management & Appointment Automation Suite",
    description: "A multi-tenant booking SaaS featuring automated availability matching, real-time WebSocket notifications, and an integrated Gemini scheduling assistant.",
    problem: "Solo professionals lose billable hours manually managing appointments across disconnected messaging channels with frequent scheduling conflicts.",
    implementation: "Full-stack SaaS built on Next.js, Express.js, MongoDB, and Socket.io. Implements atomic conditional transactions to guarantee zero double-booking under concurrent client checkouts.",
    stack: ["Next.js", "Express.js", "MongoDB", "Socket.io", "Gemini API", "Tailwind CSS"],
    securityConsiderations: "Strict role-based access control (RBAC) separating client portals from practitioner dashboard records, input sanitization, and database-level atomic locking.",
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
export const securityInterests = appSecCapabilities;

// Employment History (Accurate and truthful)
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
      "Architected full-stack features for security tools connecting customer GitHub repositories to automated Semgrep static analysis pipelines.",
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
  location: "Berhampur, Odisha, India"
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
