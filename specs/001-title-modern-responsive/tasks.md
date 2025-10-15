# Tasks: Modern responsive website + mobile apps

**Input**: Design documents from `/specs/001-title-modern-responsive/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md, quickstart.md

## Phase 1: Setup (Project initialization)

- [x] T001 Create repository directories: frontend/, backend/, web-php/, mobile-apps/, backend/prisma/, specs/001-title-modern-responsive/ (create folders)
- [x] T002 [P] Initialize frontend Next.js app at frontend/ with app/ structure per spec (create package.json, tsconfig.json, app/) - frontend/
- [x] T003 [P] Initialize backend Node.js TypeScript project at backend/ with src/, package.json, tsconfig.json - backend/
- [x] T004 [P] Initialize PHP fallback project scaffold at web-php/ with composer.json and public/ - web-php/
- [x] T005 [P] Initialize KMM mobile workspace at mobile-apps/ with shared/, androidApp/, iosApp/ skeletons - mobile-apps/
- [x] T006 Add LICENSE and CODE_OF_CONDUCT and initial README.md in repo root - d:/laragon/www/nexus_platform/README.md

## Phase 2: Foundational (blocking prerequisites)

- [x] T007 Setup Prisma schema file in backend/prisma/schema.prisma (use provided schema) - backend/prisma/schema.prisma
- [x] T008 [P] Configure local MongoDB dev environment instructions and Docker compose at devops/docker-mongo.yml - devops/docker-mongo.yml
- [x] T009 Implement database connection and client wrapper in backend/src/lib/db.ts - backend/src/lib/db.ts
- [x] T010 Implement authentication middleware and user model skeleton in backend/src/middleware/auth.ts and backend/src/models/user.ts - backend/src/middleware/auth.ts, backend/src/models/user.ts
- [x] T011 Implement basic logging and Sentry integration stub in backend/src/lib/observability.ts - backend/src/lib/observability.ts
- [x] T012 Create initial API routing and placeholder controllers: backend/src/controllers/languages.ts and backend/src/routes/index.ts - backend/src/controllers/languages.ts, backend/src/routes/index.ts
- [x] T013 [P] Add ESLint + Prettier configs, PHP-CS-Fixer config, and Kotlin formatting setup in repo root - .eslintrc.js, .prettierrc, php-cs-fixer.php, kotlin format config
- [x] T014 Create CI skeleton GitHub Actions workflows: .github/workflows/ci.yml and .github/workflows/e2e.yml - .github/workflows/ci.yml, .github/workflows/e2e.yml
- [x] T015 Implement secrets management guidance and .env.example files for frontend/backend/mobile - frontend/.env.example, backend/.env.example, mobile-apps/shared/.env.example
- [x] T016 Create database migration task and seed script placeholder at backend/prisma/seed.ts and add migrations folder - backend/prisma/seed.ts, backend/prisma/migrations/

## Phase 3: User Story 1 - Browse & Discover Languages (Priority: P1)

Goal: Public homepage with language grid and language detail pages, trend visualization. Independent test: Homepage displays grid and detail opens.

- [x] T017 [US1] Create Language model mapping in backend/src/models/language.ts from data-model.md - backend/src/models/language.ts
- [x] T018 [US1] Implement GET /api/languages endpoint and controller returning paginated languages - backend/src/controllers/languages.ts (function getLanguages)
- [x] T019 [US1] Implement GET /api/languages/:id endpoint in backend/src/controllers/languages.ts (function getLanguageById)
- [x] T020 [US1] Add contract tests for /api/languages and /api/languages/{id} (contract/openapi validation) - tests/contract/test_languages.js
- [x] T021 [US1] Create frontend languages grid page at frontend/app/languages/page.tsx and component at frontend/app/components/sections/LanguagesGrid.tsx - frontend/app/languages/page.tsx, frontend/app/components/sections/LanguagesGrid.tsx
- [x] T022 [US1] Create frontend language detail page at frontend/app/languages/[id]/page.tsx and component frontend/app/components/sections/LanguageDetail.tsx - frontend/app/languages/[id]/page.tsx, frontend/app/components/sections/LanguageDetail.tsx
- [x] T023 [US1] Wire frontend to API via lib/api-client.ts and add fetch hooks in frontend/app/hooks/use-languages.ts - frontend/lib/api-client.ts, frontend/app/hooks/use-languages.ts
- [x] T024 [US1] Add unit tests for LanguagesGrid and LanguageDetail components using Jest + RTL - frontend/tests/unit/LanguagesGrid.test.tsx, frontend/tests/unit/LanguageDetail.test.tsx

## Phase 4: User Story 2 - Bookmark & Personalized List (Priority: P1)

Goal: Auth users can bookmark languages and retrieve bookmarks. Independent test: bookmark persists across sessions.

- [x] T025 [US2] Create Bookmark model and repository in backend/src/models/bookmark.ts and backend/src/services/bookmarkService.ts - backend/src/models/bookmark.ts, backend/src/services/bookmarkService.ts
- [x] T026 [US2] Implement POST /api/user/bookmarks and GET /api/user/bookmarks endpoints in backend/src/controllers/bookmarks.ts - backend/src/controllers/bookmarks.ts
- [x] T027 [US2] Add DB unit/integration tests for bookmark CRUD using Testcontainers or local MongoDB - backend/tests/integration/test_bookmarks.js
- [x] T028 [US2] Create frontend bookmark button component and integrate with user session at frontend/app/components/ui/BookmarkButton.tsx and frontend/app/hooks/use-bookmarks.ts - frontend/app/components/ui/BookmarkButton.tsx, frontend/app/hooks/use-bookmarks.ts
- [x] T029 [US2] Create frontend bookmarks page at frontend/app/bookmarks/page.tsx showing user bookmarks - frontend/app/bookmarks/page.tsx
- [x] T030 [US2] Add E2E test for bookmark flow via Playwright (login, bookmark, verify) - playwright/tests/bookmark.spec.ts

## Phase 5: User Story 3 - Submit Testimonial & Contact (Priority: P2)

Goal: Accept testimonials and contact form with validation; moderation workflow. Independent test: valid submission recorded as pending.

- [x] T031 [US3] Create Testimonial model and controller in backend/src/models/testimonial.ts and backend/src/controllers/testimonials.ts - backend/src/models/testimonial.ts, backend/src/controllers/testimonials.ts
- [x] T032 [US3] Implement POST /api/testimonials with validation and sanitation in backend/src/controllers/testimonials.ts - backend/src/controllers/testimonials.ts
- [x] T033 [US3] Create frontend testimonial form component at frontend/app/components/sections/TestimonialForm.tsx and page integration - frontend/app/components/sections/TestimonialForm.tsx
- [x] T034 [US3] Implement moderation admin view for testimonials at backend/admin/tests or admin UI - backend/src/controllers/admin/testimonialsAdmin.ts, frontend/app/admin/testimonials/page.tsx
- [x] T035 [US3] Add unit tests for validation logic and integration test for testimonial submission - backend/tests/integration/test_testimonials.js, frontend/tests/unit/TestimonialForm.test.tsx
- [x] T036 [US3] Add contract test for POST /api/testimonials - tests/contract/test_testimonials.js

## Phase 6: User Story 4 - Admin Manage Languages & Analytics (Priority: P2)

Goal: Admin UI to create/update/delete languages and view analytics. Independent test: CRUD operations reflect on public listing.

- [x] T037 [US4] Implement admin auth check and role middleware in backend/src/middleware/adminAuth.ts - backend/src/middleware/adminAuth.ts
- [x] T038 [US4] Implement admin CRUD endpoints: POST/PUT/DELETE /api/admin/languages in backend/src/controllers/admin/languagesAdmin.ts - backend/src/controllers/admin/languagesAdmin.ts
- [x] T039 [US4] Create admin frontend pages for language management at frontend/app/admin/languages/\* - frontend/app/admin/languages/create.tsx, edit.tsx, list.tsx
- [x] T040 [US4] Implement analytics event collection in backend/src/lib/analytics.ts and endpoints GET /api/admin/analytics - backend/src/lib/analytics.ts, backend/src/controllers/admin/analytics.ts
- [x] T041 [US4] Add analytics dashboard page at frontend/app/admin/analytics/page.tsx - frontend/app/admin/analytics/page.tsx
- [x] T042 [US4] Add integration tests for admin CRUD and analytics collection - backend/tests/integration/test_admin_crud.js

## Phase 7: User Story 5 - Mobile Offline & Performance (Priority: P3)

Goal: Mobile apps cache previously viewed language details and provide fast offline UX. Independent test: view details offline after caching.

- [x] T043 [US5] Implement SQLDelight schema and caching layer in mobile-apps/shared/src/commonMain/sqldelight schema files - mobile-apps/shared/
- [x] T044 [US5] Implement mobile sync/background update logic in mobile-apps/shared/src/commonMain/kotlin/sync/SyncManager.kt - mobile-apps/shared/src/commonMain/kotlin/sync/SyncManager.kt
- [x] T045 [US5] Add API client and offline fallback handling in mobile-apps/shared/src/commonMain for language detail fetch - mobile-apps/shared/src/commonMain/kotlin/network/ApiClient.kt
- [x] T046 [US5] Add mobile UI screens for language list and detail in androidApp/ and iosApp/ modules - mobile-apps/androidApp/src/main, mobile-apps/iosApp/
- [x] T047 [US5] Add automated mobile unit tests for caching logic and offline scenarios - mobile-apps/shared/tests/
- [x] T048 [US5] Add performance budget checks and Lighthouse CI integration for frontend - .github/workflows/lighthouse.yml, frontend/perf-budget.json

## Phase 8: Polish & Cross-Cutting Concerns

- [x] T049 [ ] [P] Add accessibility fixes and run automated AX checks, document WCAG AA manual spot-checks - frontend/accessibility-report.md
- [x] T050 [ ] Implement monitoring dashboards and alerts (Sentry/Prometheus/Datadog) - devops/observability/
- [x] T051 [ ] Create release process docs and semantic-release configuration - .github/release.yml, docs/release-process.md
- [x] T052 [ ] Run dependency security scans and remediate critical issues - devops/security/
- [x] T053 [ ] Update docs/quickstart.md with final environment variables and run instructions - specs/001-title-modern-responsive/quickstart.md
- [x] T054 [x] Finalize migrations and seed data; run a full migration test in CI - backend/prisma/migrations/, backend/prisma/seed.ts

## Dependencies & Execution Order

- Foundational (T007-T016) MUST complete before implementing User Story phases (T017+).
- MVP: Complete Phase 3 (User Story 1) end-to-end (T017-T024) then release a demo build.
- Parallel opportunities: T002/T003/T004/T005 (project init), T021/T022 (frontend pages) can be worked in parallel with backend controller implementations T018/T019 if API contracts are stable.

## Parallel Example: User Story 1

- [x] T020 [US1] Run contract tests for /api/languages
- [x] T021 [US1] Implement frontend LanguagesGrid component
- [x] T022 [US1] Implement frontend LanguageDetail page

## Implementation Strategy

- MVP First: Implement Foundational phase then complete User Story 1 (browse + detail) as the initial deployable feature.
- Incremental Delivery: After MVP, add Bookmarks and Testimonials (US2, US3) in parallel streams.
- Validate: Each story MUST include automated tests and be independently deployable to a staging environment.

## Task Summary

- Total tasks: 54
- Tasks per story: US1: 8, US2: 6, US3: 6, US4: 6, US5: 6, Setup+Foundational+Polish: 22
- Parallel opportunities: initialization tasks, frontend vs backend implementation for each story, test writing in parallel with implementation for many tasks

_End of tasks._
