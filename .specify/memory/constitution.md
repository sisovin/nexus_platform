<!--
Sync Impact Report
- Version change: unknown → 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] → Platform-First, Library-Backed Architecture
  - [PRINCIPLE_2_NAME] → API-First, Contracted Data Models
  - [PRINCIPLE_3_NAME] → Test-First Quality Gates
  - [PRINCIPLE_4_NAME] → Observability, Monitoring & Performance
  - [PRINCIPLE_5_NAME] → Security, Accessibility & Deployment Discipline
- Added sections: Technology Stack & Constraints, Development Workflow & Quality Gates
- Removed sections: none
- Templates requiring updates:
  - .specify/templates/plan-template.md ⚠ pending
  - .specify/templates/spec-template.md ⚠ pending
  - .specify/templates/tasks-template.md ⚠ pending
  - .specify/templates/commands/*.md ⚠ pending
  - README.md ⚠ pending
  - docs/quickstart.md ⚠ pending
- Follow-up TODOs:
  - RATIFICATION_DATE: TODO(RATIFICATION_DATE): original adoption date unknown
-->

# Nexus Platform Constitution

## Core Principles

### Platform-First, Library-Backed Architecture

Every feature and UI/logic surface MUST be designed as modular, reusable libraries or shared modules that can be composed across platforms (Next.js frontend, PHP web app, Kotlin Multiplatform mobile, Node.js backend). Libraries and shared modules MUST be independently testable, versioned, and documented. Shared business logic (KMM/shared modules, Prisma models, utility libraries) MUST be the source of truth for behavior and data transformations to avoid duplication and drift.

Rationale: Modular, library-backed design enables cross-platform reuse, consistent behavior, and safer refactors across web, backend and mobile implementations.

### API-First, Contracted Data Models

All external and internal integrations (REST endpoints, frontend-backend, mobile-backend, PHP fallback) MUST be designed API-first with explicit, versioned contracts. Data models reflected in Prisma schema and documented OpenAPI/JSON Schema definitions MUST be the canonical contract. Backwards-compatible changes MUST follow semantic versioning rules for API consumers; breaking changes require a MAJOR version bump and a migration plan.

Rationale: Explicit contracts and typed schemas (Prisma, TypeScript, Kotlin serializable types) reduce integration friction and prevent runtime mismatches between frontend, backend and mobile.

### Test-First Quality Gates

Testing is non-negotiable: unit tests (70% of test surface), integration tests, and E2E tests MUST be present according to the project's testing strategy. Tests SHOULD be written or specified before implementation (where practical). CI pipelines MUST enforce test runs and coverage thresholds: statement coverage >80%, branch >75%, function >85% when feasible. Use Jest + React Testing Library for frontend, Supertest + Jest for backend integration, Playwright for E2E, and platform-appropriate tools for mobile and PHP.

Rationale: Strong testing guarantees correctness across multiple platforms and protects shared contracts during changes.

### Observability, Monitoring & Performance

All runtime components MUST emit structured logs and include error/telemetry capture (Sentry/LogRocket). Performance budgets and monitoring MUST be defined: Lighthouse for frontend, APM for backend, MongoDB/Atlas metrics for DB, and mobile performance tracing. Caching, image optimization, code-splitting and static generation SHOULD be applied where appropriate to meet performance goals. Implement health checks and metrics endpoints for automated monitoring.

Rationale: Observability and performance focus are required to deliver reliable, performant experiences across web, API and mobile surfaces.

### Security, Accessibility & Deployment Discipline

Security MUST be enforced via environment-based secrets management, parameterized queries/ORM protections, input validation, and least-privilege access for services. Accessibility (WCAG basics) and SEO-friendly server rendering MUST be applied on public surfaces. Deployments MUST follow documented pipelines (Vercel for frontend, Railway/Render/host provider for backend, MongoDB Atlas for DB, app store workflows for mobile). Release processes MUST follow semantic versioning and include migration steps, database seed/migrations, and rollback guidance.

Rationale: Security, accessibility and consistent deployment discipline reduce risk and improve inclusivity and maintainability.

## Technology Stack & Constraints

The project MUST use and prioritize the following technologies (chosen for cross-platform consistency, type-safety and maintainability):

- Frontend: Next.js (App Router) + React 19 + TypeScript (strict), Shadcn/UI components, Tailwind CSS
- Backend: Node.js 18+ with Express/Koa, TypeScript, Prisma ORM, MongoDB (Atlas recommended)
- PHP Web App: PHP 8.4 with PSR-12, server-side rendering for fallback/public pages
- Mobile: Kotlin Multiplatform Mobile (KMM) for shared business logic; Jetpack Compose (Android) and SwiftUI (iOS) for native UI
- Database: MongoDB (primary), Prisma for schema and client generation; migrations and seed scripts managed in prisma/\*\*
- Testing: Jest, React Testing Library, Playwright, Supertest; Testcontainers for integration where applicable
- CI/CD & Deployment: GitHub Actions (or provider equivalent), Vercel for frontend, Railway/Render or container-based deployments for backend, MongoDB Atlas for managed DB, App Store / Play Store processes for mobile
- Observability: Sentry/LogRocket + Prometheus/Datadog or equivalent APM; Lighthouse CI for frontend performance

Constraints:

- Environment secrets must not be stored in repo; use provider secret stores or .env in local development only.
- UI components should be accessible and localized-ready where applicable.

## Development Workflow & Quality Gates

Development workflow and release practices:

- Branching: feature/_, fix/_, release/\*; main protected with required reviews and passing CI
- Pull Requests: Require at least one maintainer review, passing tests, linter and type checks
- Linters & Formatting: ESLint + Prettier for JS/TS, PHP-CS-Fixer or phpcs for PHP, Kotlin formatting for mobile
- Code Reviews: Changes must include rationale, test coverage, and documentation updates where behavior changes
- Releases: Use semantic versioning. Release notes MUST include migration steps and DB change summaries when applicable
- Automation: PRs should run unit, integration and E2E (where applicable). Backwards-incompatible API changes MUST include a compatibility plan and deprecation schedule

Quality Gates:

- CI must run tests and block merges on failing thresholds
- Security scans and dependency updates should run weekly
- Performance and bundle-size checks run on main branch before production releases

## Governance

Amendments to this constitution require a documented proposal, automated checks to identify impacted templates and artifacts, and approval from at least one project maintainer. Major governance or principle redefinitions that break compatibility across teams require a MAJOR version bump and a migration plan. Minor principle additions or clarifications require a MINOR or PATCH bump per semantic versioning rules.

All PRs must reference the relevant constitution section for compliance and indicate how changes satisfy or deviate from the principles.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2025-10-15
