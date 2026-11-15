// Centralized Technical Blog Data for Chinmaya Kumar Mishra
// AI Application Security Engineer & Full-Stack Engineer

export const blogPosts = [
  {
    slug: "broken-object-level-authorization-bola-mitigation-nodejs-nextjs",
    title: "Finding a Cross-Tenant Authorization Vulnerability in a Multi-Backend GitHub Security Scanner",
    subtitle: "A real-world investigation into missing authentication and tenant-level authorization across distributed Node.js APIs.",
    metaTitle: "Cross-Tenant BOLA in a Multi-Backend GitHub Security Scanner",
    metaDescription: "A real-world application security investigation into missing authentication and tenant-level authorization in a distributed Node.js scanner architecture.",
    publishedAt: "November 15, 2026",
    isoDate: "2026-11-15T00:00:00.000Z",
    readTime: "12 min read",
    category: "Application Security / BOLA / API Security",
    featured: true,
    tags: [
      "BOLA / IDOR",
      "API Security",
      "Multi-Tenancy",
      "Node.js",
      "Express.js",
      "Distributed Systems",
      "Vulnerability Research"
    ],
    summary:
    "A real-world application security investigation into missing authentication and tenant-level authorization in a distributed Node.js scanner architecture.",
    tableOfContents: [
      { id: "background-architecture", title: "1. Background — Project Architecture" },
      { id: "vulnerability-discovery", title: "2. The Vulnerability I Discovered" },
      { id: "attack-scenario", title: "3. Attack Scenario & Exploit Chain" },
      { id: "technical-impact", title: "4. Realistic Impact Analysis" },
      { id: "root-cause-analysis", title: "5. Root Cause Analysis" },
      { id: "defense-in-depth-fix", title: "6. The Fix — Defense in Depth" },
      { id: "security-validation", title: "7. Security Validation & Testing Matrix" },
      { id: "key-lessons", title: "8. Key Engineering & AppSec Lessons" }
    ],
    sections: [
      {
        id: "background-architecture",
        heading: "1. Background — Project Architecture",
        body: `
While architecting and developing my **GitHub Security Scanner**—an automated vulnerability analysis platform designed to inspect repositories for hardcoded secrets, misconfigurations, and vulnerable dependencies—I separated core application responsibilities across two independent Node.js backends.

The separation of concerns was initially designed to isolate long-running, CPU-intensive static analysis pipelines from interactive user web traffic:

1. **Backend A: Main Express API (Authentication & Tenant Gateway):**
   - Handled user authentication, JWT lifecycle, and session management.
   - Managed GitHub App OAuth 2.0 installations, webhooks, and repository synchronization.
   - Handled organization tenancy, RBAC memberships, billing, and team settings.
   - Exposed authenticated client-facing REST APIs for the Next.js frontend dashboard.

2. **Backend B: Scanner API (Analysis & Engine Execution):**
   - Received scan triggers and coordinated repository security scans.
   - Executed AST parsing, secret detection, and dependency graph evaluations.
   - Persisted vulnerability scan records and historical scan summaries.
   - Returned scan reports, vulnerability severities, and remediation diffs.

Both services were designed to fulfill distinct roles within the same platform ecosystem. However, during an internal security review and threat modeling session, I discovered that the security perimeter between the frontend, the Main API, and the Scanner API was fundamentally flawed: the Scanner API operated under an implicit, unvalidated assumption of trust.
`,
        diagram: {
          title: "DISTRIBUTED SCANNER ARCHITECTURE & FLAWED TRUST BOUNDARY",
          content: `
+-----------------------------------------------------------------------------------+
| CLIENT-SIDE BROWSER (Single Page Next.js Dashboard)                               |
+------------------------------------+----------------------------------------------+
                                     |
                [1] Authenticated UI |  [2] DIRECT UNPROTECTED API CALL (FLAW)
                 Traffic via Cookies |   GET /api/scans/tenant/:tenantId
                                     |
                                     v
+------------------------------------+       +--------------------------------------+
| BACKEND A: Main Express Gateway    |       | BACKEND B: Scanner API Service       |
| - OAuth 2.0 / GitHub App Auth      |       | - Scan Job Orchestration             |
| - Tenant Organization Management   |       | - Vulnerability Results Storage      |
| - Enforces strict JWT verification |       | - ⚠️ NO AUTHENTICATION MIDDLEWARE    |
+------------------------------------+       | - ⚠️ NO TENANT OWNERSHIP CHECK       |
                                             +------------------+-------------------+
                                                                |
                                             [3] Direct Query:  |
                                             Scan.find({        v
                                               tenantId: req.params.tenantId
                                             })
                                             +--------------------------------------+
                                             | MONGODB / DATA PERSISTENCE LAYER     |
                                             | (Multi-tenant scan records exposed)  |
                                             +--------------------------------------+
`
        },
        callout: {
          type: "note",
          title: "Architecture Observation",
          text: "Splitting an application into dedicated microservices or auxiliary worker APIs often creates a deceptive sense of perimeter isolation. If an auxiliary service exposes HTTP listeners reachable by client clients without its own verification layer, the architecture contains an open backdoor."
        }
      },
      {
        id: "vulnerability-discovery",
        heading: "2. The Vulnerability I Discovered",
        body: `
While auditing network traffic and endpoint routing during local integration testing, I examined how the Next.js frontend fetched repository scan summaries.

The Scanner API exposed two critical operational endpoints:
- \`GET /api/scans/:scanId\` — Fetches detailed vulnerability findings for a specific scan job.
- \`GET /api/scans/tenant/:tenantId\` — Lists all historical scans and security scores for a given tenant organization.

These endpoints were originally built with the assumption that they would either be invoked internally by Backend A through an inter-service worker bus or called by the frontend only after Backend A had validated the user's session.

In reality, however, the routing layer contained three critical security breakdowns:
1. **Missing Authentication Boundary:** The Scanner API was mounted directly on an accessible HTTP port without any JWT, session cookie, or API key validation middleware attached to the router. An incoming request required zero credentials.
2. **Missing Tenant Authorization Logic:** The handlers did not inspect whether the requesting client held any authorization or role within the organization identified by \`:tenantId\`.
3. **Direct Object Reference in Query Filters:** The controller directly extracted route parameters (\`req.params.tenantId\` or \`req.params.scanId\`) and supplied them directly to the database query without combining an authenticated user identity.

Any client—whether an authenticated regular user of Organization A, or an entirely unauthenticated attacker—could query the security scan records belonging to Organization B simply by supplying Organization B's identifier in the request URL.

This represented a textbook **Broken Object Level Authorization (BOLA / IDOR)** vulnerability, categorized as **OWASP API Security Top 10 — API1:2023**, compounded by an absent service-level authentication boundary.
`
        },
      {
        id: "attack-scenario",
        heading: "3. Attack Scenario & Exploit Chain",
        body: `
To confirm the severity of the flaw in an isolated test environment, I simulated an adversarial attack chain from the perspective of an untrusted actor.

The attack scenario proceeded through the following stages:

          1. ** Endpoint Discovery via Network Inspection:**
            An authenticated user registered under Organization Alpha logs into the GitHub Security Scanner dashboard.While navigating their scan results, they open the browser's Developer Tools (Network tab) and observe an asynchronous request dispatched directly to the scanner service:
\`GET https://scanner.local/api/scans/tenant/org_alpha_98124\`

2. **Parameter Inspection & Route Analysis:**
   The user observes that the URL structure explicitly binds to a tenant identifier path parameter (\`:tenantId\`). They also note that the HTTP request headers contain no cryptographic signature or service-to-service HMAC header tied to the scanner service.

3. **Crafting the Cross-Tenant Request:**
   The user switches to \`curl\` or an HTTP client like Postman. Without attaching any Authorization header or session cookie, they craft a request substituting Organization Alpha's ID with a target tenant identifier:
`,
  codeBlock: {
  language: "bash",
    title: "Adversarial Cross-Tenant Reproduction (cURL)",
      badge: "EXPLOIT PROOF-OF-CONCEPT",
        code: `# Direct unauthenticated cross-tenant request targeting Organization Beta
curl -X GET "https://scanner.local/api/scans/tenant/org_beta_44021" \\
  -H "Accept: application/json" \\
  -H "User-Agent: Mozilla/5.0"`
},
callout: {
  type: "warning",
  title: "Obscurity is Not Authorization",
    text: "Even if an organization's tenant identifier is an unpredictable UUIDv4 or ULID rather than a sequential integer, reliance on ID randomness is merely security through obscurity. An attacker can harvest tenant IDs through public GitHub organization metadata, webhook payloads, leaked repository logs, or team invitations. Authorization must be cryptographically verified on every request."
}
      },
{
      id: "technical-impact",
        heading: "4. Realistic Impact Analysis",
          body: `
Understanding the concrete operational blast radius of an authorization vulnerability is critical for prioritizing remediation. Here is the distinction between what was demonstrated in local testing versus the potential production catastrophe:

**Demonstrated Impact in Testing:**
- **Unauthorized Exfiltration of Vulnerability Findings:** An unauthenticated caller successfully retrieved the full JSON payload of scan histories across distinct organization tenants.
- **Exposure of Sensitive Findings:** Scan results included detected AWS keys, OpenAI API tokens, private repository names, vulnerable npm dependencies (CVE identifiers), and exact code line numbers flagged during AST analysis.
- **Leakage of Repository Architecture:** Metadata attached to scan results revealed internal service structures, branch naming schemes, and commit author emails.

**Potential Impact in Production:**
- **Severe Confidentiality Breach:** A malicious actor could systematically extract proprietary vulnerability scans from enterprise customers, pinpointing unpatched flaws in their private software before the owners could remediate them.
- **Weaponization of Discovered Secrets:** If an automated scan identified an active hardcoded credential in a customer's private repository, an unauthorized reader could immediately leverage that secret to compromise external cloud infrastructure.
- **Compliance & Regulatory Violations:** Exposing client scan reports violates SOC 2 Type II, ISO 27001, and GDPR data confidentiality guarantees.

**Responsible Verification Statement:**
This vulnerability was identified, documented, and fully resolved during internal threat modeling, security regression tests, and pre-production staging. The vulnerable code path was never deployed to production infrastructure, and no user or customer data was ever exposed or compromised.
`
},
{
  id: "root-cause-analysis",
    heading: "5. Root Cause Analysis",
      body: `
An in-depth post-mortem identified five interlocking engineering oversights that allowed this vulnerability to manifest:

1. **Architectural Separation Without Explicit Trust Boundaries:**
   Because Backend A handled user authentication (OAuth 2.0 / JWT) with high rigor, the engineering assumption was that the Scanner API sat safely "behind" the application perimeter. In reality, unless services reside inside an isolated VPC or employ mutual TLS (mTLS), exposing any HTTP port creates a public attack surface.

2. **Absence of Shared Authentication Middleware:**
   The Scanner API Express application did not import or mount the token verification middleware (\`requireAuth\`). Routes were defined directly without verifying whether an incoming request carried a cryptographically valid token.

3. **Omission of Tenant Membership Verification:**
   Even if authentication had been present, verifying token validity is only half the battle. The controller completely lacked an authorization check to assert:
   \`req.user.tenantId === req.params.tenantId\`

4. **Direct Object Reference in Persistence Queries:**
   The database query filter accepted \`req.params.tenantId\` straight from the incoming URL. The database layer blindly executed the query without filtering against an immutable tenant identifier extracted from the cryptographically verified session.

5. **False Sense of Security from Distributed Backends:**
   Decomposing features into multiple Node.js services created a cognitive blind spot: the false belief that upstream authentication automatically propagates to downstream services without explicit verification mechanisms.
`,
        callout: {
          type: "tip",
          title: "Core Engineering Principle",
          text: "Authentication in one backend does not automatically authenticate requests to another backend. Every microservice and REST endpoint exposed to network traffic must independently authenticate and authorize incoming requests."
        }
      },
      {
        id: "defense-in-depth-fix",
        heading: "6. The Fix — Defense in Depth",
        body: `
To permanently eliminate this vulnerability and prevent architectural regressions, I implemented a comprehensive defense -in -depth security model across the routing, middleware, and database layers.

Below is the comparison between the vulnerable code and the hardened production implementation:
    `,
        codeBlocks: [
          {
            language: "javascript",
            title: "backend-scanner/routes/scans.js (VULNERABLE IMPLEMENTATION)",
            badge: "VULNERABLE — BOLA / NO AUTHN",
            code: `// ⚠️ VULNERABLE CONTROLLER: No Auth, No Tenant Scoping, Direct Route Params
    const express = require('express');
    const router = express.Router();
    const Scan = require('../models/Scan');

    // GET /api/scans/tenant/:tenantId
    // FLAW 1: No authentication middleware attached
    // FLAW 2: No check verifying that caller belongs to :tenantId
    // FLAW 3: Database query relies entirely on user-controlled URL parameter
    router.get('/scans/tenant/:tenantId', async (req, res) => {
      try {
        const { tenantId } = req.params;

        // Attacker sends any tenant ID here and dumps all vulnerability records!
        const scans = await Scan.find({ tenantId })
          .sort({ createdAt: -1 })
          .lean();

        return res.status(200).json({ success: true, scans });
      } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
    });

    module.exports = router; `
          },
          {
            language: "javascript",
            title: "backend-scanner/middleware/auth.js (DEFENSE CONTROLS)",
            badge: "SECURE — SHARED AUTH & TENANCY",
            code: `// 🛡️ REUSABLE SECURITY MIDDLEWARE: Cryptographic Auth + Tenant Assertion
    const jwt = require('jsonwebtoken');

    /**
     * 1. Verify Cryptographic Token from Authorization Header or Cookie
     */
    const requireAuth = (req, res, next) => {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          error: 'Authentication required',
          code: 'ERR_UNAUTHORIZED'
        });
      }

      const token = authHeader.split(' ')[1];
      try {
        // Decodes and validates signature using centralized asymmetric public key
        const decoded = jwt.verify(token, process.env.JWT_PUBLIC_KEY, {
          algorithms: ['RS256']
        });
        req.user = decoded; // { userId, tenantId, role, email }
        next();
      } catch (err) {
        return res.status(401).json({
          error: 'Invalid or expired authentication token',
          code: 'ERR_TOKEN_INVALID'
        });
      }
    };

    /**
     * 2. Enforce Tenant Membership & Prevent Horizontal Escalation
     */
    const requireTenantAccess = (req, res, next) => {
      const requestedTenantId = req.params.tenantId;
      const userTenantId = req.user?.tenantId;
      const userRole = req.user?.role;

      // Global platform super-admins can bypass for operational auditing
      if (userRole === 'PLATFORM_SUPERADMIN') {
        return next();
      }

      // Strictly block callers attempting to access a foreign organization's scans
      if (!userTenantId || userTenantId !== requestedTenantId) {
        // Log security violation telemetry for SIEM / IDS
        console.warn(\`[SECURITY ALERT] Unauthorized tenant access attempt by user \${req.user?.userId} for tenant \${requestedTenantId}\`);
    
    // Return 403 Forbidden or uniform 404 to obscure existence
    return res.status(403).json({
      error: 'Access denied: You do not have authorization for this organization',
      code: 'ERR_TENANT_ACCESS_DENIED'
    });
  }

  next();
};

module.exports = { requireAuth, requireTenantAccess };`
          },
      {
        language: "javascript",
          title: "backend-scanner/routes/scans.secure.js (HARDENED CONTROLLER)",
            badge: "SECURE — STRICT QUERY SCOPING",
              code: `// 🛡️ HARDENED ROUTE: Multi-layer Middleware + Scoped Database Lookups
const express = require('express');
const router = express.Router();
const { requireAuth, requireTenantAccess } = require('../middleware/auth');
const Scan = require('../models/Scan');

// GET /api/scans/tenant/:tenantId
// Controlled by: requireAuth -> requireTenantAccess -> Tenant-scoped DB Query
router.get(
  '/scans/tenant/:tenantId',
  requireAuth,
  requireTenantAccess,
  async (req, res) => {
    try {
      // 1. Immutable Tenant Predicate derived from Verified Auth Context
      const trustedTenantId = req.user.tenantId;

      // 2. Query is anchored to the authenticated session, NOT raw user input
      const scans = await Scan.find({
        tenantId: trustedTenantId, // Defense in depth: impossible to query another tenant
        isArchived: false
      })
      .select('repositoryName branch scanStatus totalVulnerabilities criticalCount highCount createdAt')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

      return res.status(200).json({ success: true, count: scans.length, scans });
    } catch (err) {
      req.logger?.error('Error retrieving tenant scans', { error: err.message });
      return res.status(500).json({ error: 'Failed to retrieve scan reports' });
    }
  }
);

// GET /api/scans/:scanId
// Individual scan lookup with dual-predicate compound query
router.get(
  '/scans/:scanId',
  requireAuth,
  async (req, res) => {
    try {
      const { scanId } = req.params;
      const trustedTenantId = req.user.tenantId;

      // Mandatory compound filter: Scan ID AND Authenticated Tenant ID
      const scan = await Scan.findOne({
        _id: scanId,
        tenantId: trustedTenantId // Prevents reading another organization's scan by ID
      }).lean();

      if (!scan) {
        // Return 404 whether the scan does not exist OR belongs to another tenant
        return res.status(404).json({
          error: 'Scan report not found',
          code: 'ERR_SCAN_NOT_FOUND'
        });
      }

      return res.status(200).json({ success: true, scan });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve scan details' });
    }
  }
);

    module.exports = router; `
          }
        ],
        callout: {
          type: "tip",
          title: "Service-to-Service Defense: HMAC & Internal VPC",
          text: "In addition to user JWT verification, direct external access to the Scanner API was eliminated by binding the service exclusively to an internal Docker bridge network (private VPC). When Backend A coordinates with Backend B, requests must carry a time-limited HMAC-SHA256 signature generated with a rotating cluster secret: x-service-signature: sha256=HMAC(timestamp + body, SECRET)."
        }
      },
      {
        id: "security-validation",
        heading: "7. Security Validation & Testing Matrix",
        body: `
To verify the efficacy of the defense controls, I constructed an automated integration test suite in Jest and Supertest. The suite executes a comprehensive test matrix exercising both negative (adversarial) and positive (legitimate) request patterns.
`,
    testCases: [
      {
        scenario: "Unauthenticated request dispatched without Authorization header",
        expectation: "Rejected immediately by requireAuth before reaching application business logic",
        status: "401 UNAUTHORIZED"
      },
      {
        scenario: "Authenticated User A requests Organization B's scans (:tenantId mismatch)",
        expectation: "Blocked by requireTenantAccess; security alert logged with IP and User ID",
        status: "403 FORBIDDEN"
      },
      {
        scenario: "Authenticated User A directly queries Scan ID belonging to Tenant B via /api/scans/:scanId",
        expectation: "Compound query ({ _id, tenantId }) fails to match; returns uniform 404 to prevent ID enumeration",
        status: "404 NOT FOUND"
      },
      {
        scenario: "Direct external connection to Scanner API without cluster HMAC signature",
        expectation: "Rejected at API Gateway / service boundary before invoking route handlers",
        status: "401 SERVICE AUTH FAILED"
      },
      {
        scenario: "Authenticated User A queries Organization A's scans (:tenantId matches token)",
        expectation: "Allowed through middleware; returns scoped list of scans for User A's organization",
        status: "200 OK"
      },
      {
        scenario: "Authenticated User A queries their own valid Scan ID via /api/scans/:scanId",
        expectation: "Compound query matches both _id and tenantId; returns detailed vulnerability report",
        status: "200 OK"
      }
    ],
      callout: {
      type: "note",
      title: "Automated Static Analysis Gate (Semgrep)",
        text: "To ensure that future developers never introduce un-scoped database queries, I authored a custom Semgrep AST rule running in CI/CD. Any Mongoose query calling find(), findOne(), or findById() on the Scan model without explicitly specifying tenantId immediately fails the build."
    }
  },
  {
        id: "key-lessons",
          heading: "8. Key Engineering & AppSec Lessons",
            body: `
This security investigation reinforced several foundational principles for designing resilient distributed systems and APIs:

1. **Never Confuse Network Separation with Authorization:**
   Separating code into different services, containers, or repositories does not establish a security boundary. Unless network ingress is strictly restricted to private VPC subnets and verified by cryptographic tokens, every endpoint must be treated as public.

2. **Authenticate and Authorize at Every Service Hop:**
   In modern microservice architectures, adopting a **Zero Trust** model is non-negotiable. Downstream services must never trust an upstream caller implicitly without validating identity and verifying access entitlements.

3. **Session Context Must Dictate Data Access:**
   Tenant context must always be derived from cryptographically verified authentication credentials (such as claims in a validated JWT or server-side session store), never from client-controlled URL path parameters or query strings.

4. **Enforce Tenant Scoping at the Persistence Layer:**
   Relying on manual procedural checks inside controller handlers is error-prone. By enforcing compound database queries—where every read, update, and delete operation mandates \`{ _id, tenantId }\`—BOLA vulnerabilities are neutralized even if a developer makes an oversight in a route handler.

5. **Defense in Depth Wins Every Time:**
   No single security control is sufficient. The most resilient systems combine network isolation (private VPCs), inter-service authentication (mTLS or HMAC tokens), application middleware (\`requireAuth\`, \`requireTenantAccess\`), query-level constraints, uniform error handling (preventing ID enumeration), and automated AST linting in CI/CD pipelines.
`
  }
    ]
}
];

export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
