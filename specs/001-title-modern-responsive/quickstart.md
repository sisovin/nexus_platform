# Quickstart: Modern responsive website + mobile apps

**Purpose**: Get a developer environment running for the Nexus Platform (frontend + backend + mobile + PHP fallback).

**Prerequisites**

- Node.js 18+
- npm/yarn/pnpm
- Docker (for local MongoDB and observability stack)
- Java JDK 11+ for KMM builds
- Android Studio / Xcode for platform builds (mobile)
- PHP 8.4 and Composer for PHP fallback testing
- Git

## Local Development Setup

### 1. Clone and Setup Repository

```bash
git clone https://github.com/sisovin/nexus_platform.git
cd nexus_platform
git checkout main
```

### 2. Environment Configuration

Create environment files for each component:

#### Backend Environment (.env)

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

```env
# Database
DATABASE_URL="mongodb://admin:pass@localhost:27017/nexus_platform"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Admin Configuration
ADMIN_EMAIL="admin@nexusplatform.com"
ADMIN_PASSWORD="change-this-in-production"

# Sentry (optional for local development)
SENTRY_DSN=""

# Environment
NODE_ENV="development"
PORT=3001
```

#### Frontend Environment (.env.local)

```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Sentry (optional for local development)
NEXT_PUBLIC_SENTRY_DSN=""

# Environment
NODE_ENV="development"
```

#### Mobile Environment

```bash
cd ../mobile-apps/shared
cp .env.example .env
```

Edit `mobile-apps/shared/.env`:

```env
# API Configuration
API_BASE_URL="http://10.0.2.2:3001"  # Android emulator
# API_BASE_URL="http://localhost:3001"  # iOS simulator

# Environment
ENVIRONMENT="development"
```

### 3. Start Infrastructure Services

#### MongoDB Database

```bash
# Using Docker (recommended)
docker run -d \
  --name nexus-mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=pass \
  -v nexus_mongo_data:/data/db \
  mongo:6

# Verify connection
docker exec -it nexus-mongodb mongosh -u admin -p pass
```

#### Optional: Observability Stack

```bash
# Start Prometheus and Grafana (optional for local development)
cd devops/observability

# Start with Docker Compose (if available)
docker-compose up -d prometheus grafana

# Or run individually
docker run -d -p 9090:9090 -v $(pwd)/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
docker run -d -p 3000:3000 grafana/grafana
```

### 4. Backend Setup and Start

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema (creates collections/tables)
npx prisma db push

# Optional: Seed database with sample data
npx prisma db seed

# Start development server
npm run dev
```

Backend will be available at: http://localhost:3001

### 5. Frontend Setup and Start

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:3000

### 6. Mobile App Development

#### Android Development

```bash
cd mobile-apps

# Open in Android Studio
# File > Open > Select the mobile-apps folder

# Or build from command line
./gradlew :androidApp:assembleDebug
./gradlew :androidApp:installDebug
```

#### iOS Development

```bash
cd mobile-apps

# Open in Xcode
open iosApp/iosApp.xcodeproj

# Or build from command line (requires Xcode command line tools)
xcodebuild -project iosApp/iosApp.xcodeproj -scheme iosApp -sdk iphonesimulator -configuration Debug build
```

### 7. PHP Fallback (Optional)

```bash
cd web-php

# Install PHP dependencies
composer install

# Start development server
php -S localhost:8000 -t public
```

PHP fallback will be available at: http://localhost:8000

## Testing

### Unit Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# Mobile tests
cd mobile-apps
./gradlew test
```

### Integration Tests

```bash
# Backend integration tests
cd backend
npm run test:integration

# End-to-end tests
cd frontend
npm run test:e2e
```

### Performance Testing

```bash
# Lighthouse performance audit
cd frontend
npm run lighthouse

# Load testing (if configured)
npm run load-test
```

## API Documentation

### Backend API Endpoints

#### Public Endpoints

- `GET /api/languages` - List programming languages
- `GET /api/languages/:id` - Get language details
- `POST /api/testimonials` - Submit testimonial

#### User Endpoints (requires authentication)

- `GET /api/user/bookmarks` - Get user bookmarks
- `POST /api/user/bookmarks` - Add bookmark
- `DELETE /api/user/bookmarks` - Remove bookmark

#### Admin Endpoints (requires admin authentication)

- `GET /api/admin/languages` - List all languages
- `POST /api/admin/languages` - Create language
- `PUT /api/admin/languages/:id` - Update language
- `DELETE /api/admin/languages/:id` - Delete language
- `GET /api/admin/analytics` - Get analytics data

### Authentication

#### JWT Token Format

```json
{
  "Authorization": "Bearer <jwt_token>"
}
```

#### Admin Authentication

Admin users are created during database seeding with credentials from environment variables.

## Development Workflow

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Database Management

```bash
cd backend

# View database
npx prisma studio

# Reset database
npx prisma migrate reset

# Generate migration
npx prisma migrate dev --name <migration_name>
```

### Mobile Development

```bash
cd mobile-apps

# Clean build
./gradlew clean

# Build all targets
./gradlew build

# Run tests
./gradlew test
```

## Deployment

### Staging Deployment

```bash
# Deploy to staging environment
npm run deploy:staging
```

### Production Deployment

```bash
# Deploy to production (requires approval)
npm run deploy:production
```

## Troubleshooting

### Common Issues

#### Backend won't start

- Check if MongoDB is running: `docker ps | grep mongo`
- Verify DATABASE_URL in `.env`
- Check for port conflicts on 3001

#### Frontend build fails

- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)
- Verify environment variables

#### Mobile build fails

- Ensure JDK 11+ is installed
- Check Android SDK for Android development
- Verify Xcode version for iOS development

#### Database connection issues

- Verify MongoDB container is running
- Check connection string in `.env`
- Test connection: `mongosh mongodb://admin:pass@localhost:27017/nexus_platform`

### Logs and Debugging

#### Backend Logs

```bash
cd backend
npm run dev  # Shows application logs
```

#### Frontend Logs

Open browser DevTools Console at http://localhost:3000

#### Database Logs

```bash
docker logs nexus-mongodb
```

#### Mobile Logs

- Android: Android Studio Logcat
- iOS: Xcode Console or `xcrun simctl spawn booted log stream`

## Security Notes

- Never commit `.env` files with real secrets
- Use different secrets for each environment
- Rotate JWT secrets regularly
- Keep dependencies updated
- Run security scans regularly

## Support

- **Documentation**: See `/docs` folder
- **Issues**: Create GitHub issues
- **Discussions**: Use GitHub Discussions for questions

## Next Steps

1. Explore the codebase structure
2. Run the test suites
3. Try creating a new language via admin interface
4. Test bookmark functionality
5. Review the mobile app implementations

---

**Environment Variables Summary**

| Component | File                      | Required Variables                                    |
| --------- | ------------------------- | ----------------------------------------------------- |
| Backend   | `backend/.env`            | DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD |
| Frontend  | `frontend/.env.local`     | NEXT_PUBLIC_API_URL                                   |
| Mobile    | `mobile-apps/shared/.env` | API_BASE_URL                                          |

**Ports Used**

- Frontend: 3000
- Backend: 3001
- MongoDB: 27017
- PHP Fallback: 8000
- Prometheus: 9090
- Grafana: 3000 (observability)
