# MAHARAJA — Business Systems & Workflow Infrastructure

> **Enterprise Architecture:** CRM, Workflow Automation, Systems Integration & AI-Assisted Operations  
> **Target:** B2B companies outgrowing manual operations, fragile spreadsheets, and disconnected SaaS tooling.

---

## 1. Executive Summary & Architecture Rationale

MAHARAJA is engineered as an authoritative, high-performance web platform designed for B2B decision-makers. It delivers zero-latency static marketing intelligence coupled with an edge-native, zero-cold-start serverless backend.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Cloudflare Global Edge                          │
├────────────────────────────────────────┬───────────────────────────────┤
│    Pre-Rendered Marketing Engine       │    Serverless Contact API     │
│  • Astro v5 Hybrid SSG                 │  • Edge Worker (V8 isolate)   │
│  • Self-hosted Variable Typography     │  • Cloudflare Turnstile bot   │
│  • Strict Content Security Policy      │    verification               │
│  • Zero-JS Interactive Components      │  • Atomic HMAC-SHA-256 IP     │
│    (<details>, CSS grid, SVG)          │    Rate Limiter               │
│  • Pre-compiled OpenGraph metadata     │  • Cloudflare D1 SQLite DB    │
└────────────────────────────────────────┴───────────────────────────────┘
```

### Why Astro 5 + Cloudflare Workers + D1?
1. **Zero Cold Starts:** Cloudflare Workers run on V8 isolates rather than containerized Node.js runtimes, eliminating 1–3 second serverless cold starts.
2. **Deterministic Performance:** 12 marketing routes are pre-rendered into pure static HTML/CSS at build time (`dist/`), serving TTFB < 50ms from 300+ global edge locations.
3. **Zero-Cost Operational Floor:** Runs entirely within Cloudflare's free tiers:
   - **Workers:** 100,000 requests/day.
   - **D1 Database:** 5,000,000 read units/day, 100,000 write units/day, 500MB storage.
   - **Pages Hosting:** Unlimited bandwidth and CDN caching.
4. **Resilient Forms:** Operates with progressive enhancement. The contact form functions with full server-side validation and 303 PRG (Post/Redirect/Get) redirects when JavaScript is disabled or fails to load.

---

## 2. Directory Structure

```
MAHARAJA/
├── .dev.vars.example           # Template for local Cloudflare environment secrets
├── astro.config.mjs            # Astro v5 hybrid configuration (@astrojs/cloudflare)
├── wrangler.jsonc              # Cloudflare Workers, D1 binding, and cron schedule config
├── tsconfig.json               # Strict TypeScript configuration
├── package.json                # Dependencies and deployment scripts
├── migrations/                 # D1 Database SQL Migrations
│   ├── 0001_contact_submissions.sql  # Inbound leads schema with indices
│   └── 0002_rate_limits.sql          # HMAC IP bucket rate limit schema
├── public/                     # Static production assets
│   ├── favicon.svg             # Crisp geometric line favicon
│   ├── robots.txt              # Production crawl directives & sitemap reference
│   ├── fonts/                  # Self-hosted Instrument Sans variable font
│   └── social/                 # Pre-rendered 1200x630 OpenGraph card
├── src/
│   ├── components/
│   │   ├── global/             # Header, Footer, Breadcrumbs, SkipLink, MobileMenu
│   │   ├── sections/           # 12 homepage sections & modular layout components
│   │   ├── ui/                 # Accessible buttons, badges, errors, form controls
│   │   └── visual/             # Animated SVG workflow map, sticky diagram, pattern diagrams
│   ├── data/                   # Governed, typed copy & business model data layer
│   │   ├── brand.ts            # Brand identity, coordinates, contact info, social
│   │   ├── services.ts         # 5 core service offerings with deliverables & anti-patterns
│   │   ├── useCases.ts         # Operational use cases with concrete before/after flows
│   │   ├── platforms.ts        # Categorized integration platform directory
│   │   ├── implementationPatterns.ts # Technical architecture pattern specs
│   │   ├── faq.ts              # Governed FAQs categorized by operational domain
│   │   └── seo.ts              # Canonical metadata, schema generators, route SEO
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Global HTML wrapper (CSP, metadata, JSON-LD)
│   │   ├── ContentLayout.astro # Clean editorial layout for legal/info pages
│   │   └── ServiceLayout.astro # Deep-dive blueprint layout for service pages
│   ├── lib/
│   │   ├── validation.ts       # Strict schema validation, sanitization, error maps
│   │   ├── rateLimit.ts        # Atomic D1 HMAC-SHA-256 IP sliding bucket rate limiter
│   │   ├── turnstile.ts        # Cloudflare Turnstile token validation adapter
│   │   ├── requestSecurity.ts  # Sec-Fetch-Site, origin checking, body size limits
│   │   ├── securityHeaders.ts  # CSP, HSTS, Permissions-Policy generation
│   │   ├── contactRepository.ts# D1 database persistence repository
│   │   ├── notifications.ts    # Extensible notification adapter (No-op by default)
│   │   └── configGate.ts       # Pre-deployment validation gate
│   ├── pages/
│   │   ├── api/
│   │   │   └── contact.ts      # Serverless edge submission endpoint (POST)
│   │   ├── services/           # 5 individual service routes + overview index
│   │   ├── contact/
│   │   │   └── success.astro   # Confirmation state with submission reference ID
│   │   ├── index.astro         # High-density 12-section homepage
│   │   ├── capabilities.astro  # Full technical capability matrix
│   │   ├── how-we-work.astro   # 4-stage engagement methodology
│   │   ├── use-cases.astro     # Real-world problem/solution operational directory
│   │   ├── about.astro         # Engineering philosophy & operating principles
│   │   ├── contact.astro       # Accessible, progressive-enhancement contact form
│   │   ├── privacy.astro       # Privacy policy (data minimization, retention)
│   │   ├── terms.astro         # Commercial terms of engagement
│   │   ├── 404.astro           # Technical error page with direct navigation
│   │   └── sitemap.xml.ts      # Automated XML sitemap generator
│   └── styles/
│       ├── tokens.css          # Design system CSS custom properties
│       ├── reset.css           # Modern CSS reset with box-sizing border-box
│       ├── typography.css      # Fluid typographic scale and font declarations
│       ├── utilities.css       # Layout grids, containers, sr-only helpers
│       └── global.css          # Core element styling and focus rings
└── tests/                      # Automated Vitest test suites
    ├── validation.test.ts      # Inbound form validation & sanitization tests
    ├── rateLimit.test.ts       # Rate limit algorithm & IP HMAC hashing tests
    ├── requestSecurity.test.ts # CSRF, Sec-Fetch, origin & payload guard tests
    └── copyGovernance.test.ts  # Claim governance & anti-buzzword compliance tests
```

---

## 3. Local Development Quickstart

### Prerequisites
- **Node.js**: `v20.0.0` or higher (tested on `v24.11.1`)
- **npm**: `v10.0.0` or higher
- **Wrangler**: Installed via local devDependencies (`npx wrangler`)

### Step 1: Environment Variables Setup
Copy the example environment configuration:
```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` with your local settings:
```env
# Cloudflare Turnstile Secret Key
# The key below is Cloudflare's official testing dummy key that ALWAYS passes:
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Turnstile Public Site Key (exposed to the browser)
PUBLIC_TURNSTILE_SITE_KEY=1x0000000000000000000000000000000AA

# Secret salt used for HMAC-SHA-256 IP hashing (never store raw visitor IPs):
IP_HASH_SALT=local_development_hmac_secret_salt_32_chars_min

# Inbound lead retention period (days)
DATA_RETENTION_DAYS=90
```

### Step 2: Initialize the Local D1 Database
Create the local SQLite database state and execute migrations:
```bash
# Apply schema migrations to the local D1 simulator
npx wrangler d1 execute DB --local --file=migrations/0001_contact_submissions.sql
npx wrangler d1 execute DB --local --file=migrations/0002_rate_limits.sql
```

### Step 3: Run the Development Server
```bash
npm run dev
```
The site is now live at `http://localhost:4321`.

### Step 4: Run Quality & Security Audits
```bash
# Run all unit, security, and governance test suites
npm test

# Run TypeScript compiler and Astro diagnostics (0 errors, 0 warnings)
npm run typecheck

# Execute full production build
npm run build
```

---

## 4. Cloudflare D1 Database & Migrations

### Schema Architecture
- `contact_submissions`: Contains inbound consulting inquiries, contact details, project scope, and lifecycle status (`new`, `contacted`, `qualified`, `archived`).
- `rate_limits`: Contains HMAC-SHA-256 hashed identifiers with an atomic integer counter and sliding 1-hour expiration timestamp.

### Applying Migrations to Production
1. Create your production D1 database:
   ```bash
   npx wrangler d1 create maharaja-db
   ```
2. Update `wrangler.jsonc` with the generated `database_id`:
   ```jsonc
   "d1_databases": [
     {
       "binding": "DB",
       "database_name": "maharaja-db",
       "database_id": "<your-database-id>"
     }
   ]
   ```
3. Execute migrations remotely:
   ```bash
   npx wrangler d1 execute DB --remote --file=migrations/0001_contact_submissions.sql
   npx wrangler d1 execute DB --remote --file=migrations/0002_rate_limits.sql
   ```

---

## 5. Lead Operations & Administrative SQL Runbook

You do not need a third-party CRM to manage initial inbound leads. Query and maintain the D1 database directly using `wrangler d1 execute`:

### 1. View New Inbound Inquiries
```bash
npx wrangler d1 execute DB --remote --command="SELECT id, created_at, full_name, company, work_email, service_interest, current_tools FROM contact_submissions WHERE status = 'new' ORDER BY created_at DESC LIMIT 20;"
```

### 2. View Complete Submission Detail
```bash
npx wrangler d1 execute DB --remote --command="SELECT * FROM contact_submissions WHERE id = '<SUBMISSION_ID>';"
```

### 3. Update Lead Status
```bash
# Update to 'contacted' or 'qualified'
npx wrangler d1 execute DB --remote --command="UPDATE contact_submissions SET status = 'contacted', notes = 'Follow-up sent on 2026-09-20' WHERE id = '<SUBMISSION_ID>';"
```

### 4. Export Leads to CSV or JSON
```bash
# Export all records as formatted JSON:
npx wrangler d1 execute DB --remote --command="SELECT * FROM contact_submissions ORDER BY created_at DESC;" --json > leads_export.json
```

### 5. Data Retention & Right-to-Erasure (GDPR / CCPA)
```bash
# Delete a specific lead upon erasure request:
npx wrangler d1 execute DB --remote --command="DELETE FROM contact_submissions WHERE work_email = 'client@example.com';"

# Manually execute retention policy purge (older than 90 days):
npx wrangler d1 execute DB --remote --command="DELETE FROM contact_submissions WHERE created_at < datetime('now', '-90 days');"
```

---

## 6. Security Architecture & Anti-Abuse

| Security Layer | Implementation Detail |
| :--- | :--- |
| **Privacy-Preserving IP Hashing** | Raw IP addresses are **never written** to disk or database. Client IPs are combined with `IP_HASH_SALT` and hashed using `HMAC-SHA-256`. |
| **Atomic D1 Rate Limiting** | Strict sliding 1-hour window. Max 5 inquiries per IP hash per hour using an atomic SQLite `INSERT ... ON CONFLICT DO UPDATE SET count = count + 1`. |
| **Bot Mitigation** | Cloudflare Turnstile token verified server-side against `https://challenges.cloudflare.com/turnstile/v0/siteverify`. |
| **Request Guardrails** | Rejects unexpected origins, enforces `Sec-Fetch-Site: same-origin` in modern browsers, and caps request payload sizes to 32KB. |
| **Strict Content Security Policy** | Self-hosted typography, scripts restricted to Cloudflare Turnstile and local hashes, `frame-ancestors 'none'`, `object-src 'none'`. |
| **Cross-Site Scripting (XSS)** | All user input is HTML-entity encoded before storage. Zero client-side `innerHTML` execution. |

---

## 7. Cloudflare Free-Tier Capacity Analysis

MAHARAJA is engineered to operate on Cloudflare’s free tier with massive headroom:

| Resource | Cloudflare Free Limit | Typical Monthly Usage (500 visits/day, 5 leads/day) | Utilization Margin |
| :--- | :--- | :--- | :--- |
| **Workers Requests** | 100,000 req / day | ~5 to 10 API calls / day (all marketing pages are cached at edge) | **< 0.01%** |
| **D1 Database Reads** | 5,000,000 rows / day | ~20 to 50 reads / day | **< 0.001%** |
| **D1 Database Writes** | 100,000 rows / day | ~10 to 15 writes / day | **< 0.02%** |
| **D1 Storage** | 500 MB total | ~150 leads/month ≈ ~0.3 MB / year | **< 0.1%** |
| **Pages CDN Bandwidth** | Unlimited | Fully cached static assets | **0% Cost** |

---

## 8. Production Configuration Gate Checklist

Before deploying to live production, complete this audit:

- [ ] **Create Production D1 Database**: Run `npx wrangler d1 create maharaja-db` and update `wrangler.jsonc`.
- [ ] **Apply Production Migrations**: Run `0001_contact_submissions.sql` and `0002_rate_limits.sql`.
- [ ] **Obtain Production Turnstile Keys**: Register your live domain on Cloudflare Turnstile, set `TURNSTILE_SECRET_KEY` via `npx wrangler secret put TURNSTILE_SECRET_KEY`, and update `PUBLIC_TURNSTILE_SITE_KEY` in `wrangler.jsonc`.
- [ ] **Set Random HMAC Salt**: Run `npx wrangler secret put IP_HASH_SALT` with a cryptographically secure 64-character hex string.
- [ ] **Verify Brand Coordinates**: Update `src/data/brand.ts` with your registered legal entity name, jurisdiction, and official email.
- [ ] **Legal Review**: Review `src/pages/privacy.astro` and `src/pages/terms.astro` with qualified legal counsel.
- [ ] **Automated Test Run**: Run `npm test` and `npm run typecheck` to guarantee zero regressions.

---

## Appendix: Original Color Palette Reference

For visual design parity, the design system maps directly to these calibrated palettes:

### Primary Palette (Implemented in `src/styles/tokens.css`)
| Role | Color | Token / Hex |
| :--- | :--- | :--- |
| **Primary / Ink** | Deep Navy / Near Black | `--ink-950: #0B1220` |
| **Canvas / Background** | Warm White | `--canvas: #F7F7F4` |
| **Surface** | Crisp White | `--surface: #FFFFFF` |
| **Primary Accent** | Electric Blue | `--signal-blue: #2563EB` |
| **Secondary Accent** | Cyan Blue | `--signal-cyan: #38BDF8` |
| **Border** | Subtle Cool Gray | `--line-subtle: #E2E8F0` |
| **Muted Text** | Slate | `--ink-muted: #64748B` |

---

## License
Proprietary commercial software. All rights reserved © MAHARAJA.

