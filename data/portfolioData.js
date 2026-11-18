// Centralized Source of Truth for Chinmaya Kumar Mishra
// AI Application Security Engineer | Full-Stack Engineer
// Canonical Domain: https://www.chinmayakumarmishra.sbs/

export const personalInfo = {
  name: "Chinmaya Kumar Mishra",
  alternateNames: ["Chinmay Kumar Mishra", "Chinmaya Mishra", "Chinmay Mishra", "Chinmaya K. Mishra"],
  brand: "Chinmaya Kumar Mishra",
  brandShort: "CM",
  brandSlug: "chinmaya00111",
  title: "AI Application Security Engineer | Full-Stack Engineer",
  tag: "AI APPLICATION SECURITY ENGINEER",
  specialization: "Full-Stack Engineering · Vulnerability Analysis · AI Security",
  headline: "Building Software. Investigating Vulnerabilities. Engineering Security.",
  location: "Bhubaneswar, Odisha, India",
  heroLocation: "Bhubaneswar, India · Available Worldwide",
  email: "imchinu17@gmail.com",
  phone: "7077835119",
  links: {
    github: "https://github.com/chinmaya0011",
    linkedin: "https://www.linkedin.com/in/chinmaya00111/",
    portfolio: "https://www.chinmayakumarmishra.sbs/",
    email: "mailto:imchinu17@gmail.com",
    resume: "/resumes/Chinmaya_AppSec_Resume.pdf"
  },
  resumeTitle: "AI Application Security & Full-Stack Resume",
  heroIntro:
  "I am a Full-Stack Engineer working at the intersection of Application Security and AI. My work focuses on building security-oriented developer tools, analyzing application vulnerabilities, reviewing code, and exploring how LLM-powered systems can improve vulnerability analysis.",
  aboutHeading: "Engineering with a Security-First Mindset.",
  aboutBio: [
    "I am a Full-Stack Engineer with 2+ years of experience building web applications, backend systems, and AI-powered products.",
    "My work increasingly focuses on Application Security, particularly secure code review, vulnerability analysis, API security, authentication mechanisms, and security automation.",
    "At Secure Code LLC, I work on AI-powered application security tooling that connects code repositories, scanning workflows, and LLM-driven analysis to help developers understand potential vulnerabilities.",
    "I approach security from an engineering perspective: understanding the application architecture, tracing data flows, identifying trust-boundary failures, validating vulnerabilities, and understanding their underlying causes.",
    "I am particularly interested in the intersection of application security, AI security, and developer-focused security engineering."
  ],
  contactHeading: "Let's Build More Secure Software.",
  contactDescription:
    "Open to Application Security, Product Security, AI Security, and Full-Stack Engineering opportunities, as well as meaningful technical collaborations."
};

// Focused Technical Expertise Areas (4 Core Clusters)
export const expertiseAreas = [
  {
    id: "appsec",
    areaNumber: "01",
    title: "APPLICATION SECURITY",
    description: "Analyzing software weaknesses, auditing code, and hardening web applications and APIs against common failure modes.",
    points: [
      "Web and API security (OWASP Top 10, BOLA/IDOR).",
      "Deterministic SAST & AST rule creation with Semgrep.",
      "Authentication and authorization flow verification.",
      "Vulnerability triage, proof-of-concept validation, and remediation.",
      "Security auditing with Burp Suite and OWASP ZAP."
    ],
    technologies: ["OWASP Top 10", "Burp Suite", "OWASP ZAP", "Semgrep", "AST Parsing", "Nmap"]
  },
  {
    id: "fullstack",
    areaNumber: "02",
    title: "FULL-STACK ENGINEERING",
    description: "Designing reliable, reactive full-stack web architectures with modern frameworks, RESTful APIs, and database modeling.",
    points: [
      "Next.js 15 App Router & React 19 architecture.",
      "Node.js & Express RESTful API microservices.",
      "MongoDB document modeling & indexing.",
      "Real-time event streaming with WebSockets / Socket.IO.",
      "Responsive, accessible UI with Tailwind CSS."
    ],
    technologies: ["Next.js", "React 19", "Node.js", "Express.js", "MongoDB", "JavaScript (ES6+)", "Tailwind CSS"]
  },
  {
    id: "ai-sec",
    areaNumber: "03",
    title: "AI & LLM SECURITY",
    description: "Integrating LLM intelligence into security workflows while hardening generative AI pipelines against adversarial manipulation.",
    points: [
      "LLM-powered vulnerability analysis & automated triage.",
      "Retrieval-Augmented Generation (RAG) architecture & defense.",
      "Prompt injection mitigation & output sanitization.",
      "Context isolation and guardrails for code ingestion."
    ],
    technologies: ["OpenAI API", "RAG", "LLMs", "Prompt Hardening", "Guardrails", "Python"]
  },
  {
    id: "devops",
    areaNumber: "04",
    title: "INFRASTRUCTURE & DEVOPS",
    description: "Containerizing services, managing reproducible developer environments, and securing automated CI/CD deployment pipelines.",
    points: [
      "Docker containerization & multi-stage image optimization.",
      "GitHub Apps integration & webhook event pipelines.",
      "Linux server administration & bash scripting.",
      "Static analysis and dependency auditing in CI/CD."
    ],
    technologies: ["Docker", "GitHub Apps", "Linux / Bash", "Git", "CI/CD Workflows", "REST APIs"]
  }
];

// Alias for backwards compatibility if needed
export const technicalSkills = expertiseAreas;

// Selected Engineering Work (Only the 3 verified projects)
export const projects = [
  {
    id: "github-scanner",
    number: "PROJECT 01",
    title: "GitHub Security Scanner",
    category: "Application Security Platform",
    description:
      "An application security platform integrating GitHub repositories with automated security scanning workflows. Designed to connect repository access, scanning processes, and vulnerability findings through a developer-facing dashboard.",
    engineeringChallenge:
      "Parsing repository abstract syntax trees (AST) deterministically without server latency while dispatching real-time scan telemetry asynchronously.",
    securityCapability:
      "Automated OWASP Top 10 pattern matching, ephemeral GitHub App token negotiation (1-hour TTL), and cryptographic webhook HMAC verification.",
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "Semgrep", "GitHub Apps", "OAuth"],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Semgrep", "GitHub Apps", "OAuth"],
    githubUrl: "https://github.com/chinmaya0011/github-scanner-platform",
    liveUrl: "https://scanner.chinmayamishra.dev"
  },
  {
    id: "ai-github-assistant",
    number: "PROJECT 02",
    title: "AI GitHub Repository Assistant",
    category: "AI Developer Tooling & RAG",
    description:
      "An AI-powered repository assistant that enables developers to interact with code repositories through LLM-based workflows and GitHub integrations.",
    engineeringChallenge:
      "Chunking source code syntax trees into semantic embedding vectors to provide grounded context without token window overflow.",
    securityCapability:
      "Prompt hardening against indirect injection embedded in untrusted codebase files, with strict context isolation and sanitization.",
    technologies: ["Next.js", "Express.js", "MongoDB", "OpenAI API", "RAG", "GitHub Apps"],
    stack: ["Next.js", "Express.js", "MongoDB", "OpenAI API", "RAG", "GitHub Apps"],
    githubUrl: "https://github.com/chinmaya0011/ai-github-chatbot",
    liveUrl: "https://aichat.chinmayamishra.dev"
  },
  {
    id: "booksaathi",
    number: "PROJECT 03",
    title: "BookSaathi SaaS",
    category: "Multi-Tenant Cloud Platform",
    description:
      "A multi-tenant practice management SaaS featuring appointment management, real-time updates, and integrated payment workflows.",
    engineeringChallenge:
      "Handling concurrent booking slot contention with real-time Socket.IO broadcasts and idempotent payment webhook handling.",
    securityCapability:
      "Strict multi-tenant authorization boundaries preventing BOLA/IDOR object exposure across isolated practices and roles.",
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Socket.IO"],
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Socket.IO"],
    githubUrl: "https://github.com/chinmaya0011/booksaathi-saas",
    liveUrl: "https://booksaathi.com"
  }
];

// Clean, Minimal Professional Experience Timeline
export const experiences = [
  {
    id: "secure-code",
    company: "Secure Code LLC",
    role: "Full-Stack Developer",
    location: "Remote | Texas, USA",
    period: "July 2025 – Present",
    isCurrent: true,
    description:
      "Building AI-powered application security tools, integrating LLM-driven vulnerability analysis with security scanning workflows, and developing backend APIs and GitHub integrations.",
    tags: ["Next.js", "React", "Node.js", "MongoDB", "LLMs", "OAuth", "GitHub Apps"]
  },
  {
    id: "metadee-ai",
    company: "Metadee AI",
    role: "Full-Stack Web Developer",
    location: "Remote | Delhi, India",
    period: "January 2025 – June 2025",
    isCurrent: false,
    description:
      "Developed AI-powered product features using OpenAI and RAG, alongside REST API development and full-stack application engineering.",
    tags: ["OpenAI API", "RAG", "REST APIs", "Node.js", "Express.js", "React"]
  },
  {
    id: "freelance",
    company: "Freelance Development",
    role: "Self-Employed",
    location: "Remote",
    period: "2021 – Present",
    isCurrent: true,
    description:
      "Delivered 20+ client solutions with end-to-end ownership across requirements, development, deployment, and support.",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "REST APIs"]
  }
];

// Services & Technical Consulting Data
export const servicesData = [
  {
    number: "01",
    id: "web-app-dev",
    title: "Web Application Development",
    description: "Build modern, scalable, responsive web applications for businesses and startups.",
    services: [
      "Business websites and landing pages.",
      "Full-stack web applications.",
      "SaaS platforms and dashboards.",
      "Admin panels and management systems.",
      "API and backend development.",
      "Database integration.",
      "Deployment and maintenance."
    ],
    technologies: ["Next.js", "React", "Node.js", "Express.js", "MongoDB"]
  },
  {
    number: "02",
    id: "android-dev",
    title: "Android Application Development",
    description: "Develop modern Android applications with reliable backend integration and practical user experiences.",
    services: [
      "Android application development.",
      "API and backend integration.",
      "Authentication and user management.",
      "Database integration.",
      "Application maintenance and improvements."
    ],
    technologies: ["Android", "REST APIs", "Node.js", "MongoDB", "Auth"]
  },
  {
    number: "03",
    id: "app-security",
    title: "Application Security & Vulnerability Assessment",
    description: "Help businesses identify and understand security weaknesses in their web applications and APIs.",
    services: [
      "Authorized web application security testing.",
      "API security assessments.",
      "Authentication and authorization testing.",
      "IDOR/BOLA assessment.",
      "OWASP Top 10 vulnerability testing.",
      "Basic secure code review.",
      "Security configuration reviews.",
      "Vulnerability documentation and remediation guidance."
    ],
    technologies: ["OWASP Top 10", "Burp Suite", "OWASP ZAP", "Semgrep", "API Security"],
    disclaimer: "All security testing must be performed strictly with explicit authorization and an agreed scope."
  },
  {
    number: "04",
    id: "freelance-engineering",
    title: "Part-Time & Freelance Engineering",
    description: "Provide flexible technical support for startups, small businesses, and development teams.",
    services: [
      "Part-time development.",
      "Freelance projects.",
      "Remote development support.",
      "Existing application improvements.",
      "Bug fixing and debugging.",
      "API integrations.",
      "Security-focused code reviews.",
      "Ongoing technical maintenance."
    ],
    technologies: ["Full-Stack", "Code Review", "Bug Fixing", "Maintenance", "Consulting"]
  }
];

export const clientExperience = {
  headline: "20+ Client Projects Delivered",
  description:
    "I have worked on more than 20 client projects, handling different stages of development, from understanding requirements to implementation, deployment, and support."
};

export const servicesCta = {
  heading: "Have a Project or Security Challenge?",
  description: "Let's discuss your requirements and find the right technical solution.",
  email: "imchinu17@gmail.com",
  phone: "+91 7077835119",
  whatsappNumber: "917077835119",
  location: "Bhubaneswar, Odisha, India",
  whatsappUrl:
    "https://wa.me/917077835119?text=Hello%20Chinmaya%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
};

// Education & Verified Credentials
export const education = {
  degree: "Bachelor of Technology (B.Tech)",
  institution: "Parala Maharaja Engineering College",
  location: "Berhampur, Odisha, India",
  period: "July 2018 – July 2021"
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
    name: "Cutshort Certified JavaScript — Advanced",
    status: "Verified",
    link: "https://cutshort.io"
  },
  {
    title: "HackerRank",
    name: "Frontend Developer (React)",
    status: "Verified",
    link: "https://www.hackerrank.com"
  }
];
