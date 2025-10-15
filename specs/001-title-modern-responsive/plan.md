# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This implementation plan covers the "Modern responsive website + mobile apps" feature: a multi-platform app that presents a top-10 programming languages showcase with browse, detail, bookmark, testimonials, contact, admin CRUD and analytics. The chosen technical approach uses Next.js 15.5.2 for the frontend (App Router, TypeScript strict), a Node.js backend using TypeScript + Prisma targeting MongoDB (Atlas), a PHP 8.4 fallback site for SSR public pages, and Kotlin Multiplatform Mobile (KMM) for shared mobile business logic and native UIs. The plan prioritizes platform-first shared libraries, API-first contracts, test-first delivery, observability, accessibility, and CI/CD automation.

## Technical Context

**Language/Version**: Frontend: Next.js 15.5.2 / React 19.2 / TypeScript 5.x (strict). Backend: Node.js 18+ with TypeScript. PHP fallback: PHP 8.4.x. Mobile: Kotlin Multiplatform (KMM) 1.9.x with Jetpack Compose and SwiftUI targets.  
**Primary Dependencies**: Next.js, React, Shadcn/UI, Tailwind CSS, Prisma (>=5.x), MongoDB driver, Express or Koa (backend), Playwright, Jest, Supertest, SQLDelight for local mobile cache, Koin for DI on mobile.  
**Storage**: MongoDB (Atlas recommended) as primary datastore. Prisma used for schema/client generation and migrations.  
**Testing**: Frontend unit/component tests with Jest + React Testing Library; API integration with Supertest + Jest; contract tests for OpenAPI; E2E with Playwright; Testcontainers for DB-backed integration where applicable.  
**Target Platform**: Web (desktop + mobile browsers), mobile (Android + iOS native apps), server (Linux container for backend), PHP hosting for fallback pages.  
**Project Type**: Web + Mobile multi-repo layout: `frontend/` (Next.js app), `backend/` (Node.js + Prisma), `web-php/` (PHP fallback), `mobile-apps/` (KMM shared + platform apps).  
**Performance Goals**: User-facing primary content renders within 2s on 4G for 95% of homepage views; API p95 <300ms under normal load; offline retrieval for cached items must be instant for mobile views.  
**Constraints**: Offline-capable mobile reads for previously fetched items; environment secrets stored in provider secret stores; accessibility (WCAG AA basics) required for public pages.  
**Scale/Scope**: Initial target: 50k monthly active users with capability to scale via containerization and managed DB; plan for growth to 250k MAU in roadmap.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Constitution-derived gates (all items MUST be reviewed and either checked or justified):

- [x] Platform-First, Library-Backed: Project Structure includes shared/library modules or a plan to extract them; reuse and versioning strategy documented.
  - Justification: `mobile-apps/shared/` KMM module, `frontend/app/components/ui/` and `backend/lib/` planned as sharable boundaries. Versioning via npm packages/internal release tags will be documented in tasks.
- [x] API-First, Contracted Data Models: Contracts/OpenAPI/JSON Schema files referenced in `contracts/` and Prisma schema identified as canonical model.
  - Justification: `specs/001-title-modern-responsive/contracts/openapi.yaml` will be produced and `backend/prisma/schema.prisma` is canonical.
- [x] Test-First Quality Gates: Test plan exists (unit/integration/E2E), coverage targets recorded, and failing tests workflow described.
  - Justification: Test strategy included; coverage targets match constitution (statement >80%, branch >75%). CI jobs will enforce failing-tests block.
- [x] Observability & Performance: Logging, error reporting, health checks, and performance budgets (Lighthouse/APM targets) are specified.
  - Justification: Sentry/Prometheus/Datadog APM instrumentation included in plan; health-check endpoints and Lighthouse budgets in quickstart and tasks.
- [x] Security, Secrets & Access Control: Secrets management, input validation, and least-privilege access considerations included.
  - Justification: Use of provider secret stores (Vercel/GHA secrets/Atlas) and input validation requirement in FR-010; security scans scheduled weekly.
- [x] Accessibility & SEO: Public surfaces and components include accessibility acceptance criteria and SSR/SEO notes if applicable.
  - Justification: FR-008 requires accessibility and SEO metadata. Next.js SSR and PHP fallback will address SEO needs.
- [x] Tech Stack & Constraints: Declared tech stack matches constitution constraints (Next.js, Node.js, Prisma, MongoDB, PHP 8.4, KMM or documented deviation).
  - Justification: Stack explicitly matches constitution and user choice.
- [x] CI/CD, Release & Versioning: Branching strategy, CI jobs, and semantic versioning/release notes requirement are noted.
  - Justification: Plan includes GitHub Actions CI templates and release note requirements.
- [x] Data Governance & Migration Safety: Prisma migrations/seed strategy or migration plan for breaking DB changes included.
  - Justification: Migrations will use `backend/prisma/migrations/` and seeds in `backend/prisma/seed.ts` per spec.
- [x] Mobile Multiplatform: Shared KMM module plan, platform-specific UI choices (Compose/SwiftUI) and offline/caching strategy documented.
  - Justification: mobile-apps structure includes `shared/` module, SQLDelight for caching, Compose/SwiftUI for UI.

If any gate is unchecked, include a short justification in the "Complexity Tracking" section and mark the plan as needing constitutional remediation before Phase 1.

## Project Structure

### Documentation (this feature)

```
specs/001-title-modern-responsive/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
frontend/               # Next.js app (app/ structure provided)
backend/                # Node.js + Prisma
web-php/                # PHP 8.4 fallback site
mobile-apps/            # KMM shared + android + ios apps
```

**Structure Decision**: Use multi-project layout to keep mobile, backend, frontend and PHP fallback isolated while sharing `mobile-apps/shared/` and publishing shared UI/util modules from `frontend/app/components/ui` as internal packages where useful.

## Complexity Tracking

No constitution gate violations remain. Any future deviation must be justified in this section.
