# Quickstart: Modern responsive website + mobile apps

**Purpose**: Get a developer environment running for the feature (frontend + backend + mobile + php fallback).

**Prerequisites**

- Node.js 18+
- pnpm/yarn/npm
- Docker (for local MongoDB or Testcontainers)
- Java JDK for KMM builds
- Android Studio / Xcode for platform builds (mobile)
- PHP 8.4 and composer for PHP fallback testing

## Local setup (quick)

1. Clone repo and checkout feature branch:

```bash
git checkout 001-title-modern-responsive
```

2. Start local MongoDB (recommended: use Docker):

```bash
docker run -d -p 27017:27017 --name nexus-mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=pass mongo:6
```

3. Backend

```bash
cd backend
cp .env.example .env
# set DATABASE_URL to mongodb://admin:pass@localhost:27017/nexus
pnpm install
pnpm prisma generate
pnpm prisma db push # or run migrations if using SQL provider
pnpm dev
```

4. Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

5. Mobile (KMM)

- Open `mobile-apps/` in Android Studio and run the androidApp module or follow platform-specific build steps.

6. PHP fallback

```bash
cd web-php
composer install
# build Tailwind etc.
php -S localhost:8000 -t public
```

## Running tests

- Unit tests: `pnpm test` in frontend and backend folders
- E2E: run Playwright tests via CI or locally with `pnpm playwright test`

## Notes

- Fill `.env` with appropriate secrets from provider secret store in CI
- Use the provided Prisma schema in `backend/prisma/schema.prisma` as the canonical model

_End of quickstart._
