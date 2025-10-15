# Nexus Platform

## Enhanced Top 10 Programming Languages for 2026

A comprehensive multi-platform application showcasing the top programming languages projected for 2026, featuring modern web applications, RESTful APIs, and native mobile apps.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PHP Version](https://img.shields.io/badge/PHP-8.4.5+-purple.svg)](https://www.php.net/)
[![Kotlin Version](https://img.shields.io/badge/Kotlin-1.9.22+-blue.svg)](https://kotlinlang.org/)

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## 🎯 Project Overview

**Project Name:** Enhanced Top 10 Programming Languages for 2026  
**Description:** A comprehensive multi-platform application showcasing the top programming languages projected for 2026, featuring modern web applications, RESTful APIs, and native mobile apps.  
**Technology Stack:** Next.js 15.5.2, React 19.2, TypeScript, Node.js, Prisma ORM, MongoDB, PHP 8.4.5, Kotlin Multiplatform Mobile  
**Project Status:** Active Development  
**Version:** 1.0.0

## ✨ Features

### Core Features
- **Interactive Language Showcase**: Display top 10 languages with ranking indicators, detailed pages, and comparison tools
- **Trend Visualization**: Charts and graphs showing language trends and popularity
- **User Experience**: Responsive design, dark/light mode, search & filter, bookmarking
- **Performance Optimizations**: Static generation, image optimization, code splitting, caching
- **Multi-Platform Support**: Web (Next.js), Mobile (KMM), PHP fallback

### Web Application Features
- Modern React framework with App Router
- Type-safe development with TypeScript strict mode
- Accessible component library with Shadcn/UI
- Utility-first CSS with Tailwind CSS

### Backend Features
- RESTful API with Node.js and TypeScript
- Database management with Prisma ORM and MongoDB
- Authentication and authorization
- Data validation and error handling

### Mobile Features
- Cross-platform development with Kotlin Multiplatform Mobile
- Native Android UI with Jetpack Compose
- Native iOS UI with SwiftUI
- Offline data caching with SQLDelight
- Dependency injection with Koin

### PHP Fallback Features
- Server-side rendering with PHP 8.4.5
- Tailwind CSS v4 integration
- API integration and caching
- SEO optimization

## 🛠 Technology Stack

### Frontend
- **Next.js** 15.5.2 - Modern React framework with App Router
- **React** 19.2 - UI library with latest features
- **TypeScript** 5.0+ - Type-safe development
- **Shadcn/UI** - Accessible component library
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** 18+ - Runtime environment
- **Prisma ORM** 5.7.0 - Database toolkit and ORM
- **MongoDB** 6.0+ - NoSQL database
- **Express.js** - Web framework
- **JWT** - Authentication

### PHP Web Application
- **PHP** 8.4.5 - Server-side scripting
- **Tailwind CSS** v4 - CSS framework
- **Composer** - Dependency management

### Mobile Applications
- **Kotlin Multiplatform Mobile** 1.9.22 - Cross-platform development
- **Jetpack Compose** 1.5.4 - Android declarative UI
- **SwiftUI** 3.0+ - iOS declarative UI
- **SQLDelight** 1.5.5 - Local database
- **Koin** - Dependency injection

### Testing & Quality
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **Supertest** - API testing
- **ESLint/Prettier** - Code linting and formatting

### DevOps & Monitoring
- **Docker** - Containerization
- **Vercel/Railway** - Deployment platforms
- **MongoDB Atlas** - Cloud database
- **Sentry** - Error tracking
- **Prometheus/Datadog** - Monitoring

## 🏗 Project Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend API   │    │   Mobile Apps   │
│   (Next.js)     │◄──►│    (Node.js)     │◄──►│     (KMM)       │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                     └──────────────────┘
                           PHP Fallback
```

### System Components

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Next.js 15.5.2 / React 19.2 / TypeScript | Modern web application |
| Backend | Node.js 18+ with TypeScript | RESTful API server |
| PHP App | PHP 8.4.5 with Tailwind CSS | Server-side rendering fallback |
| Mobile | Kotlin Multiplatform Mobile 1.9.22 | Cross-platform mobile apps |
| Database | MongoDB 6.0+ with Prisma ORM | Data persistence |
| Testing | Jest, Playwright, Supertest | Quality assurance |

## 📁 Project Structure

```
nexus_platform/
├── frontend/                    # Next.js web application
│   ├── app/                     # App Router pages and components
│   ├── components/              # Reusable UI components
│   ├── types/                   # TypeScript type definitions
│   ├── lib/                     # Utility functions and API clients
│   └── public/                  # Static assets
├── backend/                     # Node.js API server
│   ├── src/                     # Source code
│   │   ├── controllers/         # Route handlers
│   │   ├── middleware/          # Express middleware
│   │   ├── routes/              # API routes
│   │   ├── utils/               # Helper functions
│   │   └── app.ts               # Main application
│   ├── prisma/                  # Database schema and migrations
│   └── package.json             # Dependencies
├── web-php/                     # PHP fallback application
│   ├── src/                     # PHP components and models
│   ├── public/                  # Public assets
│   ├── templates/               # PHP templates
│   └── composer.json            # PHP dependencies
├── mobile-apps/                 # Kotlin Multiplatform Mobile
│   ├── shared/                  # Shared business logic
│   ├── androidApp/              # Android application
│   └── iosApp/                  # iOS application
├── tests/                       # Testing suites
├── specs/                       # Feature specifications
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **MongoDB** 6.0 or higher
- **PHP** 8.4.5 (for PHP fallback)
- **Java** 11 or higher (for mobile development)
- **Android Studio** (for Android development)
- **Xcode** 14.0+ (for iOS development)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/sisovin/nexus_platform.git
   cd nexus_platform
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your MongoDB connection in .env
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env.local
   # Configure API URLs in .env.local
   npm run dev
   ```

4. **(Optional) Set up PHP fallback**
   ```bash
   cd ../web-php
   composer install
   php build.php
   php -S localhost:8080
   ```

5. **(Optional) Set up mobile apps**
   ```bash
   cd ../mobile-apps
   ./gradlew :androidApp:assembleDebug  # For Android
   # For iOS: cd iosApp && pod install && open iosApp.xcworkspace
   ```

## 🛠 Development Setup

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Starts development server on http://localhost:3000
```

### Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run db:seed  # Optional: seed database
npm run dev      # Starts API server on http://localhost:3001
```

### PHP Application Setup
```bash
cd web-php
composer install
php build.php    # Build CSS assets
php -S localhost:8080  # Start PHP server
```

### Mobile Apps Setup
```bash
cd mobile-apps
# Android
./gradlew :androidApp:assembleDebug
# iOS
cd iosApp
pod install
open iosApp.xcworkspace
```

### Environment Configuration

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

#### Backend (.env)
```env
DATABASE_URL="mongodb://localhost:27017/languages2026"
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## 📦 Deployment

### Production Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway/       │    │   App Store     │
│   (Frontend)    │◄──►│   Heroku         │◄──►│   Play Store    │
│                 │    │   (Backend)      │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Deployment Steps

#### Frontend Deployment (Vercel)
```bash
npm run build
vercel --prod
# Configure environment variables in Vercel dashboard
```

#### Backend Deployment (Railway/Render)
```bash
# Connect repository to deployment platform
# Configure environment variables
# Automatic deployments on git push
```

#### Database Deployment (MongoDB Atlas)
- Create cluster in MongoDB Atlas
- Configure network access and database users
- Update connection string in backend environment

#### Mobile App Deployment
- **Android**: Build release APK and submit to Google Play Console
- **iOS**: Archive project and submit through App Store Connect

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:3001`
- **Production**: `https://api.languages2026.com`

### Authentication
All endpoints require JWT authentication in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Key Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

#### Languages
- `GET /api/languages` - Get all languages (with filtering and pagination)
- `GET /api/languages/:id` - Get specific language details
- `GET /api/languages/trends` - Get language trends data

#### User Interactions
- `GET /api/user/bookmarks` - Get user's bookmarked languages
- `POST /api/user/bookmarks` - Bookmark a language
- `POST /api/user/ratings` - Rate a language

### Response Format
```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "pagination": {
    "page": number,
    "pages": number
  }
}
```

## 🧪 Testing

### Test Pyramid
```
    /\    E2E Tests (10%)
   /  \   
  /____\  Integration Tests (20%)
 /      \ 
/________\ Unit Tests (70%)
```

### Running Tests

#### Frontend Tests
```bash
cd frontend
npm test          # Unit tests
npm run test:e2e  # E2E tests with Playwright
```

#### Backend Tests
```bash
cd backend
npm test          # Unit and integration tests
npm run test:api  # API tests with Supertest
```

#### Mobile Tests
```bash
cd mobile-apps
./gradlew test     # Unit tests
# UI tests run in respective IDEs
```

### Test Coverage Goals
- **Statement Coverage**: > 80%
- **Branch Coverage**: > 75%
- **Function Coverage**: > 85%

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow coding standards** and write tests
4. **Commit changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open Pull Request**

### Code Standards

#### TypeScript/JavaScript
- Use strict TypeScript configuration
- Follow ESLint and Prettier rules
- Write comprehensive JSDoc comments
- Use functional programming patterns where appropriate

#### PHP
- Follow PSR-12 coding standards
- Use type declarations for all parameters and returns
- Implement proper error handling
- Write PHPDoc for all classes and methods

#### Kotlin
- Follow Kotlin coding conventions
- Use coroutines for asynchronous operations
- Implement proper error handling with sealed classes
- Write comprehensive KDoc documentation

### Pull Request Process

1. **Ensure tests pass** and add new tests for features
2. **Update documentation** for any changed functionality
3. **Request review** from at least one maintainer
4. **Address review feedback** and make necessary changes
5. **Squash commits** for a clean history before merging

### Issue Reporting

When reporting issues, please include:
- **Description**: Clear and concise description of the issue
- **Steps to Reproduce**: Detailed reproduction steps
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Environment**: OS, browser, version information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Built with ❤️ using modern web and mobile technologies
- Special thanks to the open-source community
- Icons provided by [Lucide](https://lucide.dev/)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)

---

**Maintained by:** [sisovin](https://github.com/sisovin)  
**Project Repository:** [https://github.com/sisovin/nexus_platform](https://github.com/sisovin/nexus_platform)

For more detailed information, see the [Project Documentation](Project-Document.md).
