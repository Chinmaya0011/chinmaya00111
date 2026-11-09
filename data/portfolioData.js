// Streamlined Source of Truth for Chinmaya Kumar Mishra
// Full-Stack Developer | Application Security Enthusiast

export const personalInfo = {
  name: "Chinmaya Kumar Mishra",
  brand: "chinmaya00111",
  headline: "Building Software. Learning to Secure It.",
  title: "Full-Stack Developer | Application Security Enthusiast",
  location: "Bhubaneswar, Odisha, India",
  email: "imchinu17@gmail.com",
  phone: "+91 7077835119",
  links: {
    github: "https://github.com/chinmaya0011",
    linkedin: "https://www.linkedin.com/in/chinmaya00111/",
    portfolio: "https://chinmayakumarmishra.sbs",
    email: "mailto:imchinu17@gmail.com"
  },
  heroIntro: "I'm a Full-Stack Developer working with modern JavaScript technologies, currently expanding my knowledge of Web Security, API Security, and Application Security.",
  heroStats: [
    { label: "Experience", value: "2+ Years", detail: "Development Experience" },
    { label: "Stack", value: "MERN Stack", detail: "React, Node, Express, MongoDB" },
    { label: "Focus", value: "AppSec", detail: "Exploring Application Security" }
  ],
  aboutHeading: "Developer by Experience. Security by Interest.",
  aboutText: "I'm a Full-Stack Developer experienced in building web applications using React, Next.js, Node.js, Express, and MongoDB. I'm expanding into Application Security through hands-on learning, vulnerability analysis, and authorized security testing."
};

// Compact Categorized Technical Expertise
export const technicalSkills = [
  {
    category: "Development",
    subtitle: "Practical experience",
    status: "Core Stack",
    skills: ["JavaScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "REST APIs"]
  },
  {
    category: "Application Security",
    subtitle: "Active learning path",
    status: "Currently Learning",
    skills: ["OWASP Top 10", "Web Security", "API Security", "Authentication", "Authorization", "Secure Code Review"]
  },
  {
    category: "Tools",
    subtitle: "Security & dev toolset",
    status: "Hands-on Tools",
    skills: ["Burp Suite", "OWASP ZAP", "Semgrep", "Nmap", "Git", "GitHub", "Postman", "Linux"]
  }
];

// 4 Compact Security Interest Cards
export const securityInterests = [
  {
    id: "web-sec",
    title: "Web Application Security",
    description: "Learning common web vulnerabilities, understanding attack surfaces, and exploring secure coding practices."
  },
  {
    id: "api-sec",
    title: "API Security",
    description: "Exploring API authentication, authorization, access control, request validation, and business logic vulnerabilities."
  },
  {
    id: "secure-code",
    title: "Secure Code Review",
    description: "Understanding insecure coding patterns, reviewing application code, and learning how vulnerabilities can be prevented."
  },
  {
    id: "ai-appsec",
    title: "AI Application Security",
    description: "Exploring security challenges in LLM integrations, RAG applications, prompt injection, and AI-powered application architectures."
  }
];

// 3 Featured Projects with 1-2 line descriptions
export const projects = [
  {
    id: "github-scanner",
    title: "GitHub Security Scanner",
    description: "GitHub-integrated security scanning platform with repository analysis and vulnerability reporting.",
    tech: ["Next.js", "Express", "MongoDB", "GitHub Apps", "OAuth 2.0", "Semgrep"],
    githubUrl: "https://github.com/chinmaya0011/github-scanner-platform",
    liveUrl: "https://scanner.chinmayamishra.dev"
  },
  {
    id: "ai-github-assistant",
    title: "AI GitHub Repository Assistant",
    description: "AI-powered application for repository conversations and contextual code analysis.",
    tech: ["Next.js", "Express", "MongoDB", "OpenAI API", "RAG", "GitHub App"],
    githubUrl: "https://github.com/chinmaya0011/ai-github-chatbot",
    liveUrl: "https://aichat.chinmayamishra.dev"
  },
  {
    id: "booksaathi",
    title: "BookSaathi",
    description: "MERN-based appointment booking application with authentication, backend APIs, and AI chatbot integration.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Gemini API", "REST APIs"],
    githubUrl: "https://github.com/chinmaya0011/booksaathi-saas",
    liveUrl: "https://booksaathi.com"
  }
];

// Security Notes & Research (renamed & streamlined)
export const securityNotes = [
  {
    id: "api-auth-note",
    title: "API Authentication & Authorization",
    summary: "Exploring how API authentication works, how access controls are implemented, and how authorization weaknesses affect modern applications.",
    category: "API Security",
    content: "When building REST APIs with Express and Node.js, authentication confirms caller identity, while authorization determines permission boundaries. Common vulnerabilities like Broken Object Level Authorization (BOLA/IDOR) occur when an API endpoint trusts client-supplied IDs without verifying ownership against session claims."
  },
  {
    id: "race-conditions-note",
    title: "Race Conditions in Web Applications",
    summary: "Understanding how concurrent requests create unexpected application behavior and how database-level atomic operations prevent state corruption.",
    category: "Web Security",
    content: "Checking resource availability and updating state across separate queries creates Time-of-Check to Time-of-Use (TOCTOU) race windows. Under concurrent traffic, multiple requests can pass checks simultaneously. Enforcing atomicity at the database layer with conditional updates prevents state inconsistencies."
  },
  {
    id: "owasp-top-10-note",
    title: "Exploring OWASP Top 10",
    summary: "Studying common web application vulnerabilities, root causes, authorized testing approaches, and remediation strategies.",
    category: "AppSec Fundamentals",
    content: "The OWASP Top 10 highlights persistent security challenges across web development. Broken Access Control and Injection vulnerabilities demonstrate why strict server-side authorization and input parameterization must be foundational design requirements rather than afterthoughts."
  },
  {
    id: "ai-security-note",
    title: "AI Application Security Considerations",
    summary: "Learning about prompt injection, insecure AI integrations, RAG access boundaries, and security considerations in LLM applications.",
    category: "AI Security",
    content: "Integrating LLMs introduces unique attack surfaces including direct and indirect prompt injection. In RAG architectures, document retrieval must enforce permission checks so models only ground responses in data the requesting user is authorized to view."
  }
];

// Alias for backwards compatibility
export const securityResearch = securityNotes;

// Genuine Employment History with Max 2-3 concise bullets
export const experiences = [
  {
    id: "secure-code",
    role: "Full-Stack Developer",
    company: "Secure Code LLC",
    location: "Texas, USA (Remote)",
    period: "July 2025 – Present",
    bullets: [
      "Build full-stack features for security tools connecting GitHub repositories to scanning pipelines.",
      "Implement OAuth and GitHub App integrations for secure repository access and scan review dashboards."
    ]
  },
  {
    id: "metadee-ai",
    role: "Full-Stack Web Developer",
    company: "Metadee AI",
    location: "Remote",
    period: "January 2025 – June 2025",
    bullets: [
      "Integrated OpenAI models with RAG pipelines for contextual conversational features.",
      "Built and maintained RESTful APIs using Node.js, Express, and MongoDB."
    ]
  },
  {
    id: "freelance",
    role: "Freelance Web Developer",
    company: "Self-Employed",
    location: "Remote",
    period: "2021 – 2024",
    bullets: [
      "Delivered 20+ custom web solutions from requirements gathering to production deployment.",
      "Built full-stack web applications using React, Next.js, and Express.js backend APIs."
    ]
  }
];

// Compact Education & Certifications
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
