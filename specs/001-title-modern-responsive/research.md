# Research: Modern responsive website + mobile apps

**Created**: 2025-10-15

## Decisions

1. Tech stack (accepted)

   - Decision: Use Next.js 15.5.2 + React 19 + TypeScript (strict) for the web frontend; Node.js 18+ with TypeScript + Prisma as the backend; MongoDB (Atlas recommended) as primary datastore; PHP 8.4 fallback for SSR fallback pages; Kotlin Multiplatform Mobile (KMM) for shared mobile business logic with Jetpack Compose (Android) and SwiftUI (iOS) for native UI.
   - Rationale: Matches project context, maximizes type-safety and cross-platform reuse (KMM), and aligns with existing team skills and ecosystem tools (Prisma for schema/migrations, Next.js for SSR/SEO and app router features).
   - Alternatives considered: Full Rails/Rack-based stack (rejected: lower TypeScript/Kotlin alignment), Firebase-hosted backend (rejected: less control for Prisma migrations and custom analytics), React Native (rejected: KMM preferred for shared business logic and native UI).

2. Data model approach

   - Decision: Use Prisma schema as the canonical data model and generate clients for the backend. Contracts (OpenAPI/JSON Schema) will be authoritative for public API surfaces.
   - Rationale: Prisma provides an expressive schema language and migrations; OpenAPI ensures API consumers (frontend, mobile, PHP) have a contract to integrate against.

3. Offline strategy for mobile

   - Decision: Use SQLDelight (KMM) for local caching and offline reads; synchronize via background sync and TTL-based cache invalidation.
   - Rationale: SQLDelight supports KMM and produces native clients; TTL + background sync ensures cached content remains reasonably fresh while minimizing network usage.

4. Testing strategy

   - Decision: Test-first approach: write contract and unit tests before implementation for critical flows; use Jest + RTL for components, Supertest for API integration, Playwright for E2E; Testcontainers for integration tests against ephemeral DB in CI.
   - Rationale: Ensures API contracts and behavior are validated early and aligns with constitution Test-First Quality Gates.

5. Observability & performance
   - Decision: Instrument backend with structured logging and Sentry; expose health and metrics endpoints; use Lighthouse CI for frontend budgets.
   - Rationale: Necessary for production reliability and to meet performance success criteria.

## Alternatives and tradeoffs

- Using PostgreSQL instead of MongoDB was considered; tradeoff: relational features and joins vs document flexibility. Chosen MongoDB because project documents and trend data fit flexible schemas and matches initial context.
- Using React Native/Expo for mobile was considered; rejected because KMM enables shared business logic while keeping native UI for best UX.

## Actionable research tasks

- Document OpenAPI contract for all public endpoints (contracts/openapi.yaml) — completed in Phase 1.
- Draft Prisma schema models (data-model.md -> prisma/schema.prisma) — Phase 1.
- Define caching TTLs and sync strategy for mobile offline (add to mobile tasks).

_End of research._
