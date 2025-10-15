# Enhanced Top 10 Programming Languages for 2026

# Enhanced Top 10 Programming Languages for 2026 - Complete Project Documentation

## Project Overview

**Project Name:** Enhanced Top 10 Programming Languages for 2026  
**Description:** A comprehensive multi-platform application showcasing the top programming languages projected for 2026, featuring modern web applications, RESTful APIs, and native mobile apps.  
**Technology Stack:** Next.js 15.5.2, React 19.2, TypeScript, Node.js, Prisma ORM, MongoDB, PHP 8.4.5, Kotlin Multiplatform Mobile  
**Project Status:** Active Development  
**Version:** 1.0.0

---

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Frontend Application](#frontend-application)
3. [Backend API](#backend-api)
4. [PHP Web Application](#php-web-application)
5. [Mobile Applications](#mobile-applications)
6. [Development Setup](#development-setup)
7. [Deployment Guide](#deployment-guide)
8. [API Documentation](#api-documentation)
9. [Testing Strategy](#testing-strategy)
10. [Contributing Guidelines](#contributing-guidelines)

---

## Project Architecture

### System Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend API   │    │   Mobile Apps   │
│   (Next.js)     │◄──►│    (Node.js)     │◄──►│     (KMM)       │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                     ┌──────────────────┐
                     │   Database       │
                     │   (MongoDB)      │
                     └──────────────────┘
```

### Technology Stack Matrix

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Frontend | Next.js | 15.5.2 | Modern React framework with App Router |
| Frontend | React | 19.2 | UI library with latest features |
| Frontend | TypeScript | 5.0+ | Type-safe development |
| Frontend | Shadcn/UI | Latest | Accessible component library |
| Backend | Node.js | 18+ | Runtime environment |
| Backend | Prisma ORM | 5.7.0 | Database toolkit and ORM |
| Backend | MongoDB | 6.0+ | NoSQL database |
| PHP App | PHP | 8.4.5 | Server-side rendering |
| PHP App | Tailwind CSS | v4 | Utility-first CSS framework |
| Mobile | Kotlin Multiplatform | 1.9.22 | Cross-platform mobile development |
| Mobile | Jetpack Compose | 1.5.4 | Android declarative UI |
| Mobile | SwiftUI | 3.0+ | iOS declarative UI |

---

## Frontend Application

### Project Structure

```
app/
├── components/
│   ├── ui/                    # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── dialog.tsx
│   ├── sections/              # Page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Stats.tsx
│   │   ├── CTA.tsx
│   │   └── LanguagesGrid.tsx
│   └── layout/
│       ├── Navigation.tsx
│       └── Footer.tsx
├── types/
│   ├── index.ts
│   ├── language.ts
│   └── api.ts
├── lib/
│   ├── utils.ts
│   └── api-client.ts
├── hooks/
│   ├── use-languages.ts
│   └── use-analytics.ts
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── languages/
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   └── api/
│       └── languages/
│           └── route.ts
└── public/
    ├── images/
    └── icons/
```

### Core Features

#### 1. Language Showcase
- **Interactive Grid**: Display top 10 languages with ranking indicators
- **Detailed Pages**: Individual language pages with comprehensive information
- **Comparison Tools**: Side-by-side language comparison features
- **Trend Visualization**: Charts and graphs showing language trends

#### 2. User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching capability
- **Search & Filter**: Advanced language filtering system
- **Bookmarking**: Save favorite languages for quick access

#### 3. Performance Optimizations
- **Static Generation**: Pre-rendered language pages
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic bundle splitting for optimal loading
- **Caching Strategy**: SWR for data fetching with caching

### Component Specifications

#### Hero Section (`components/sections/Hero.tsx`)
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  ctaButtons: Array<{
    text: string;
    variant: 'default' | 'outline';
    href: string;
  }>;
}
```

#### Languages Grid (`components/sections/LanguagesGrid.tsx`)
```typescript
interface Language {
  id: string;
  name: string;
  rank: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  useCases: string[];
  popularity: number;
  releaseYear: number;
  paradigm: string[];
}

interface LanguagesGridProps {
  languages: Language[];
  onLanguageSelect: (language: Language) => void;
}
```

### Type Definitions

#### `types/language.ts`
```typescript
export interface Language {
  id: string;
  name: string;
  rank: number;
  trend: 'up' | 'down' | 'stable';
  description: string;
  fullDescription: string;
  useCases: string[];
  popularity: number;
  releaseYear: number;
  paradigm: string[];
  website?: string;
  documentation: string;
  community: {
    size: string;
    growth: number;
  };
  jobMarket: {
    demand: number;
    averageSalary: number;
    remoteOpportunities: number;
  };
  learning: {
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    resources: LearningResource[];
  };
}

export interface LearningResource {
  name: string;
  type: 'book' | 'course' | 'tutorial' | 'documentation';
  url: string;
  free: boolean;
}
```

---

## Backend API

### Database Schema

#### Prisma Schema (`prisma/schema.prisma`)
```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String
  password  String
  role      UserRole @default(USER)
  avatar    String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  bookmarks Bookmark[]
  ratings   Rating[]
  
  @@map("users")
}

model Language {
  id              String   @id @default(auto()) @map("_id") @db.ObjectId
  name            String   @unique
  rank            Int
  trend           Trend
  description     String
  fullDescription String
  useCases        String[]
  popularity      Float
  releaseYear     Int
  paradigm        String[]
  website         String?
  documentation   String
  communitySize   String
  communityGrowth Float
  demand          Float
  averageSalary   Float
  remoteOpportunities Float
  difficulty      Difficulty
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  resources   Resource[]
  bookmarks   Bookmark[]
  ratings     Rating[]
  comparisons Comparison[]
  
  @@map("languages")
}

model Resource {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  type        ResourceType
  url         String
  free        Boolean
  languageId  String   @db.ObjectId
  createdAt   DateTime @default(now())

  language Language @relation(fields: [languageId], references: [id], onDelete: Cascade)
  
  @@map("resources")
}

model Bookmark {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  userId     String   @db.ObjectId
  languageId String   @db.ObjectId
  createdAt  DateTime @default(now())

  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  language Language @relation(fields: [languageId], references: [id], onDelete: Cascade)
  
  @@unique([userId, languageId])
  @@map("bookmarks")
}

enum UserRole {
  USER
  ADMIN
}

enum Trend {
  UP
  DOWN
  STABLE
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

enum ResourceType {
  BOOK
  COURSE
  TUTORIAL
  DOCUMENTATION
  VIDEO
}
```

### API Endpoints

#### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout

#### Language Endpoints
- `GET /api/languages` - Get all languages (with filtering and pagination)
- `GET /api/languages/:id` - Get specific language details
- `GET /api/languages/trends` - Get language trends data
- `POST /api/languages/compare` - Compare multiple languages

#### User Interaction Endpoints
- `GET /api/user/bookmarks` - Get user's bookmarked languages
- `POST /api/user/bookmarks` - Bookmark a language
- `DELETE /api/user/bookmarks/:languageId` - Remove bookmark
- `POST /api/user/ratings` - Rate a language
- `GET /api/user/recommendations` - Get personalized recommendations

#### Administrative Endpoints
- `POST /api/admin/languages` - Create new language entry
- `PUT /api/admin/languages/:id` - Update language data
- `DELETE /api/admin/languages/:id` - Delete language
- `GET /api/admin/analytics` - Get platform analytics

### Data Models

#### Response Types
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface LanguageResponse extends ApiResponse<Language> {}
interface LanguagesResponse extends ApiResponse<Language[]> {}
```

---

## PHP Web Application

### Architecture Overview

The PHP application serves as an alternative web presence with server-side rendering capabilities, targeting users who prefer traditional web stacks or have specific hosting requirements.

### Component Structure

```
web-php/
├── src/
│   ├── Components/
│   │   ├── Layout/
│   │   │   ├── Header.php
│   │   │   └── Footer.php
│   │   ├── Sections/
│   │   │   ├── Hero.php
│   │   │   ├── LanguagesShowcase.php
│   │   │   ├── Statistics.php
│   │   │   ├── Comparison.php
│   │   │   └── CTA.php
│   │   └── UI/
│   │       ├── Card.php
│   │       ├── Button.php
│   │       └── Modal.php
│   ├── Models/
│   │   ├── Language.php
│   │   └── User.php
│   ├── Services/
│   │   ├── ApiClient.php
│   │   └── CacheService.php
│   └── Utils/
│       ├── Validator.php
│       └── Formatter.php
├── public/
│   ├── css/
│   │   └── styles.css    # Compiled Tailwind CSS
│   ├── js/
│   │   ├── main.js
│   │   └── charts.js
│   └── images/
├── templates/
│   ├── base.php
│   ├── home.php
│   └── language-detail.php
└── config/
    ├── database.php
    └── app.php
```

### Key Features

#### 1. Server-Side Rendering
- **Template Engine**: Pure PHP templates with component composition
- **Caching Layer**: Redis/Memcached integration for performance
- **SEO Optimization**: Server-rendered meta tags and structured data

#### 2. API Integration
- **REST Client**: HTTP client for backend API communication
- **Data Synchronization**: Real-time data updates from main backend
- **Fallback Handling**: Graceful degradation when API is unavailable

#### 3. Performance Features
- **OPCache Integration**: PHP OPcode caching for faster execution
- **Asset Optimization**: Minified CSS and JavaScript
- **CDN Ready**: Static asset delivery through CDN

### Component Implementation

#### Language Model (`src/Models/Language.php`)
```php
<?php
declare(strict_types=1);

namespace App\Models;

class Language {
    private string $id;
    private string $name;
    private int $rank;
    private string $trend;
    private string $description;
    private array $useCases;
    private float $popularity;
    private int $releaseYear;
    private array $paradigm;
    
    public function __construct(array $data) {
        $this->id = $data['id'];
        $this->name = $data['name'];
        $this->rank = $data['rank'];
        $this->trend = $data['trend'];
        $this->description = $data['description'];
        $this->useCases = $data['useCases'] ?? [];
        $this->popularity = $data['popularity'];
        $this->releaseYear = $data['releaseYear'];
        $this->paradigm = $data['paradigm'] ?? [];
    }
    
    // Getters and business logic methods
    public function getTrendIcon(): string {
        return match($this->trend) {
            'up' => '↗',
            'down' => '↘',
            'stable' => '→',
            default => '→'
        };
    }
    
    public function getDifficultyColor(): string {
        return match($this->difficulty) {
            'beginner' => 'green',
            'intermediate' => 'yellow', 
            'advanced' => 'red',
            default => 'gray'
        };
    }
}
```

---

## Mobile Applications

### Architecture Overview

The mobile applications provide native experiences for iOS and Android users while sharing business logic through Kotlin Multiplatform Mobile (KMM).

### Shared Module Structure

```
shared/
├── src/
│   ├── commonMain/
│   │   ├── kotlin/
│   │   │   ├── data/
│   │   │   │   ├── models/
│   │   │   │   ├── repositories/
│   │   │   │   └── local/
│   │   │   ├── domain/
│   │   │   │   ├── usecases/
│   │   │   │   └── interfaces/
│   │   │   ├── presentation/
│   │   │   │   ├── viewmodels/
│   │   │   │   └── states/
│   │   │   └── utils/
│   │   └── resources/
│   ├── androidMain/
│   │   └── kotlin/
│   │       └── platform/
│   └── iosMain/
│       └── kotlin/
│           └── platform/
├── build.gradle.kts
└── gradle.properties
```

### Core Features

#### 1. Language Exploration
- **Interactive Lists**: Swipeable language cards with rankings
- **Offline Access**: Cached language data for offline browsing
- **Personalized Feed**: AI-powered language recommendations
- **Progress Tracking**: Learning progress for each language

#### 2. Learning Tools
- **Code Examples**: Interactive code snippets with syntax highlighting
- **Quick Reference**: Language cheat sheets and documentation
- **Community Features**: User discussions and Q&A
- **Bookmark System**: Save languages and resources

#### 3. Native Performance
- **Smooth Animations**: Platform-specific animation frameworks
- **Hardware Optimization**: Leveraging native device capabilities
- **Battery Efficient**: Optimized background operations

### Data Models (Kotlin)

#### `Language.kt`
```kotlin
@Serializable
data class Language(
    val id: String,
    val name: String,
    val rank: Int,
    val trend: Trend,
    val description: String,
    val fullDescription: String,
    val useCases: List<String>,
    val popularity: Double,
    val releaseYear: Int,
    val paradigm: List<String>,
    val website: String? = null,
    val documentation: String,
    val community: CommunityStats,
    val jobMarket: JobMarketStats,
    val learning: LearningInfo
) {
    fun getTrendIcon(): String = when(trend) {
        Trend.UP -> "↗"
        Trend.DOWN -> "↘" 
        Trend.STABLE -> "→"
    }
}

@Serializable
data class CommunityStats(
    val size: String,
    val growth: Double
)

@Serializable
data class JobMarketStats(
    val demand: Double,
    val averageSalary: Double,
    val remoteOpportunities: Double
)

@Serializable
data class LearningInfo(
    val difficulty: Difficulty,
    val resources: List<LearningResource>
)
```

### View Models

#### `LanguagesViewModel.kt`
```kotlin
class LanguagesViewModel(
    private val repository: LanguagesRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow<LanguagesUiState>(LanguagesUiState.Loading)
    val uiState: StateFlow<LanguagesUiState> = _uiState.asStateFlow()
    
    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()
    
    fun loadLanguages() {
        viewModelScope.launch {
            _uiState.value = LanguagesUiState.Loading
            try {
                val languages = repository.getLanguages()
                _uiState.value = LanguagesUiState.Success(languages)
            } catch (e: Exception) {
                _uiState.value = LanguagesUiState.Error(e.message ?: "Unknown error")
            }
        }
    }
    
    fun searchLanguages(query: String) {
        _searchQuery.value = query
        // Implement search logic
    }
}

sealed class LanguagesUiState {
    object Loading : LanguagesUiState()
    data class Success(val languages: List<Language>) : LanguagesUiState()
    data class Error(val message: String) : LanguagesUiState()
}
```

---

## Development Setup

### Prerequisites

- **Node.js** 18.0 or higher
- **MongoDB** 6.0 or higher
- **PHP** 8.4.5
- **Java** 11 or higher
- **Android Studio** (for mobile development)
- **Xcode** 14.0+ (for iOS development)

### Installation Steps

#### 1. Frontend Setup
```bash
# Clone repository
git clone https://github.com/your-org/programming-languages-2026.git
cd programming-languages-2026/frontend

# Install dependencies
npm install

# Environment setup
cp .env.example .env.local
# Configure environment variables

# Run development server
npm run dev
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Database setup
npx prisma generate
npx prisma db push
npm run db:seed

# Start development server
npm run dev
```

#### 3. PHP Application Setup
```bash
cd web-php

# Install Composer dependencies
composer install

# Build CSS assets
php build.php

# Start PHP server
php -S localhost:8080
```

#### 4. Mobile Apps Setup
```bash
cd mobile-apps

# Android setup
./gradlew :androidApp:assembleDebug

# iOS setup
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

---

## Deployment Guide

### Production Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway/       │    │   App Store     │
│   (Frontend)    │◄──►│   Heroku         │◄──►│   Play Store    │
│                 │    │   (Backend)      │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                     ┌──────────────────┐
                     │   MongoDB Atlas  │
                     │   (Database)     │
                     └──────────────────┘
```

### Deployment Steps

#### 1. Frontend Deployment (Vercel)
```bash
# Build and deploy
npm run build
vercel --prod

# Environment variables in Vercel dashboard
```

#### 2. Backend Deployment (Railway/Render)
```bash
# Connect repository to deployment platform
# Configure environment variables
# Automatic deployments on git push
```

#### 3. Database Deployment (MongoDB Atlas)
- Create cluster in MongoDB Atlas
- Configure network access and database users
- Update connection string in backend environment

#### 4. Mobile App Deployment
- **Android**: Build release APK and submit to Google Play Console
- **iOS**: Archive project and submit through App Store Connect

### Monitoring and Analytics

- **Frontend**: Vercel Analytics + Google Analytics 4
- **Backend**: LogRocket/Sentry for error tracking
- **Performance**: Lighthouse CI for performance monitoring
- **Database**: MongoDB Atlas performance monitoring

---

## API Documentation

### Base URL
```
Production: https://api.languages2026.com
Development: http://localhost:3001
```

### Authentication

All endpoints (except public ones) require JWT authentication in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Endpoint Examples

#### Get All Languages
```http
GET /api/languages?page=1&limit=10&sort=rank&trend=up
```

**Response:**
```json
{
  "success": true,
  "message": "Languages retrieved successfully",
  "data": [
    {
      "id": "rust",
      "name": "Rust",
      "rank": 1,
      "trend": "up",
      "description": "Systems programming language focusing on safety and performance",
      "popularity": 95.2,
      "releaseYear": 2010,
      "paradigm": ["systems", "concurrent", "functional"],
      "community": {
        "size": "2M+",
        "growth": 45.2
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### Compare Languages
```http
POST /api/languages/compare
Content-Type: application/json

{
  "languageIds": ["rust", "typescript", "python"]
}
```

### Error Handling

**Standard Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "code": "ERROR_CODE"
}
```

**Common Error Codes:**
- `VALIDATION_ERROR` - Input validation failed
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMITED` - Too many requests

---

## Testing Strategy

### Test Pyramid Implementation

```
    /\    E2E Tests (10%)
   /  \   
  /____\  Integration Tests (20%)
 /      \ 
/________\ Unit Tests (70%)
```

### Testing Tools

#### Frontend Testing
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright
- **Visual Testing**: Chromatic (Storybook)

#### Backend Testing
- **Unit Tests**: Jest
- **Integration Tests**: Supertest + Jest
- **Database Tests**: Testcontainers

#### Mobile Testing
- **Unit Tests**: JUnit (Android) + XCTest (iOS)
- **UI Tests**: Espresso (Android) + XCTest UI (iOS)
- **Integration Tests**: KMM shared testing

### Test Coverage Goals

- **Statement Coverage**: > 80%
- **Branch Coverage**: > 75%
- **Function Coverage**: > 85%
- **Line Coverage**: > 80%

### Continuous Integration

```yaml
# Example GitHub Actions workflow
name: CI/CD Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build application
        run: npm run build
```

---

## Contributing Guidelines

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

---

## Maintenance and Support

### Version Support Policy

- **Active Support**: Latest major version and previous major version
- **Security Support**: Latest two major versions
- **End of Life**: Versions older than two major versions

### Update Schedule

- **Security Updates**: As needed (immediate response)
- **Feature Updates**: Monthly releases
- **Major Updates**: Quarterly releases
- **Dependency Updates**: Weekly automated updates

### Support Channels

- **GitHub Issues**: Bug reports and feature requests
- **Discord Community**: User discussions and support
- **Email Support**: Enterprise and premium support
- **Documentation**: Comprehensive guides and tutorials

This documentation provides a complete overview of the "Enhanced Top 10 Programming Languages for 2026" project, covering all technical aspects, development processes, and maintenance procedures. The multi-platform approach ensures broad accessibility while maintaining code quality and development efficiency across all technology stacks.

---

## Frontend example

Here is the example code for the tech stack with Next.js 15.5.2 application with TypeScript strict mode and Shadcn/UI components with the complete version:

### Project Structure
```
app/
  components/
    ui/
      button.tsx
      card.tsx
    sections/
      Hero.tsx
      Features.tsx
      Testimonials.tsx
      Stats.tsx
      CTA.tsx
      Footer.tsx
    layout/
      Navigation.tsx
  types/
    index.ts
  globals.css
  layout.tsx
  page.tsx
```

#### 1. First, install required dependencies:
```bash
npx shadcn@latest init
npx shadcn@latest add button card
npm install lucide-react
```

#### 2. Types (`app/types/index.ts`)
```typescript
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Stat {
  value: string;
  label: string;
}
```

#### 3. Layout (`app/layout.tsx`)
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js - Transform Your Digital Experience',
  description: 'The all-in-one platform that helps teams collaborate, create, and scale with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

#### 4. UI Components (`app/components/ui/button.tsx` and `card.tsx`)
*These will be automatically created by shadcn*

#### 5. Navigation Component (`app/components/layout/Navigation.tsx`)
```typescript
'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navigation = () => {
  return (
    <nav className="relative bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Nexus</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
```

#### 6. Hero Section (`app/components/sections/Hero.tsx`)
```typescript
import { Star, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 mr-2" />
              Featured in TechCrunch
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Digital
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Experience</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              The all-in-one platform that helps teams collaborate, create, and scale with ease. 
              Join thousands of companies already using our cutting-edge solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold">
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://placehold.co/40x40/6366f1/ffffff?text=U${i}`}
                    alt={`User ${i}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">50,000+</span> users trust us
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://placehold.co/600x500/f8fafc/64748b?text=Dashboard+Preview"
                alt="Dashboard Preview"
                className="rounded-2xl shadow-2xl"
                width={600}
                height={500}
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

#### 7. Stats Section (`app/components/sections/Stats.tsx`)
```typescript
import { Stat } from '@/types';

const stats: Stat[] = [
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
  { value: "100+", label: "Integrations" }
];

export const Stats = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

#### 8. Features Section (`app/components/sections/Features.tsx`)
```typescript
import { Zap, Shield, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Feature } from '@/types';

const features: Feature[] = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Optimized for speed and performance to deliver the best user experience."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with 99.9% uptime guarantee."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community Driven",
    description: "Join thousands of satisfied users building amazing things."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to succeed in one comprehensive platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 rounded-2xl hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
```

#### 9. Testimonials Section (`app/components/sections/Testimonials.tsx`)
```typescript
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Testimonial } from '@/types';

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    content: "This platform has completely transformed how we work. The efficiency gains are incredible!",
    avatar: "https://placehold.co/60x60/6366f1/ffffff?text=SJ"
  },
  {
    name: "Michael Chen",
    role: "Developer",
    content: "The best tool I've used in years. Clean interface, powerful features, and amazing support.",
    avatar: "https://placehold.co/60x60/8b5cf6/ffffff?text=MC"
  },
  {
    name: "Emma Rodriguez",
    role: "Designer",
    content: "Finally found a solution that understands our creative workflow. Highly recommended!",
    avatar: "https://placehold.co/60x60/06b6d4/ffffff?text=ER"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 rounded-2xl">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
```

#### 10. CTA Section (`app/components/sections/CTA.tsx`)
```typescript
import { Button } from '@/components/ui/button';

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teams already using our platform to achieve their goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Free Trial
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
```

#### 11. Footer Section (`app/components/sections/Footer.tsx`)
```typescript
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold">Nexus</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The all-in-one platform that helps teams collaborate, create, and scale with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="flex items-center text-gray-400">
              <Mail className="w-4 h-4 mr-2" />
              <span>hello@nexus.com</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Phone className="w-4 h-4 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              <span>San Francisco, CA</span>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">
            © 2024 Nexus. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
```

#### 12. Main Page (`app/page.tsx`)
```typescript
import { Navigation } from '@/components/layout/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
```

#### 13. Global CSS (`app/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Key Improvements:

1. **TypeScript Strict Mode**: Added proper type definitions and interfaces
2. **Component Structure**: Split into logical, reusable components
3. **Shadcn/UI Integration**: Used Button and Card components from Shadcn
4. **Next.js 15.5.2**: Leverages App Router and modern Next.js features
5. **Accessibility**: Added proper alt texts and image dimensions
6. **Performance**: Better component organization for code splitting
7. **Maintainability**: Separated data from presentation logic

---

## Backend Code Example

Here is the example code for the tech stack with the complete backend RESTful API using Node.js, Prisma ORM, and MongoDB for dynamic frontend operations for the complete implementation:

### Project Structure
```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── types/
│   └── app.ts
├── package.json
└── tsconfig.json
```

#### 1. Package.json
```json
{
  "name": "nexus-backend",
  "version": "1.0.0",
  "description": "Backend API for Nexus platform",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "compression": "^1.7.4",
    "mongoose": "^8.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/compression": "^1.7.5",
    "typescript": "^5.3.3",
    "tsx": "^4.6.2",
    "nodemon": "^3.0.2",
    "prisma": "^5.7.0"
  }
}
```

#### 2. Prisma Schema (`prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String
  password  String
  role      UserRole @default(USER)
  avatar    String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  testimonials Testimonial[]
  orders       Order[]
  
  @@map("users")
}

model Testimonial {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  role      String
  content   String
  avatar    String
  rating    Int      // 1-5 stars
  isActive  Boolean  @default(true)
  userId    String?  @db.ObjectId
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User? @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("testimonials")
}

model Feature {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  icon        String   // Lucide icon name
  isActive    Boolean  @default(true)
  order       Int      // For sorting
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("features")
}

model Stat {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  value String
  label String
  order Int    @default(0)

  @@map("stats")
}

model Contact {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String
  subject   String
  message   String
  status    ContactStatus @default(PENDING)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("contacts")
}

model Order {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @db.ObjectId
  plan      PlanType
  amount    Float
  status    OrderStatus @default(PENDING)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("orders")
}

enum UserRole {
  USER
  ADMIN
}

enum ContactStatus {
  PENDING
  RESPONDED
  RESOLVED
}

enum OrderStatus {
  PENDING
  COMPLETED
  FAILED
}

enum PlanType {
  STARTER
  PROFESSIONAL
  ENTERPRISE
}
```

#### 3. Environment Configuration (`.env`)
```env
DATABASE_URL="mongodb://localhost:27017/nexus"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
PORT="3001"
CORS_ORIGIN="http://localhost:3000"
```

#### 4. Type Definitions (`src/types/index.ts`)
```typescript
import { UserRole, ContactStatus, OrderStatus, PlanType } from '@prisma/client';
import { z } from 'zod';

// Validation Schemas
export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
  avatar: z.string().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  content: z.string().min(10),
  avatar: z.string().url(),
  rating: z.number().min(1).max(5),
});

export const featureSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string().min(2),
  order: z.number().int().positive(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export const orderSchema = z.object({
  plan: z.nativeEnum(PlanType),
  amount: z.number().positive(),
});

// Type exports
export type UserInput = z.infer<typeof userSchema>;
export type TestimonialInput = z.infer<typeof testimonialSchema>;
export type FeatureInput = z.infer<typeof featureSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type OrderInput = z.infer<typeof orderSchema>;

// Extended types
export interface AuthRequest extends Express.Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
```

#### 5. Middleware (`src/middleware/index.ts`)
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, ApiResponse } from '../types';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: error.message,
    });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
};

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

export const adminMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.',
    });
  }
  next();
};
```

#### 6. Utility Functions (`src/utils/index.ts`)
```typescript
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string, email: string, role: UserRole): string => {
  return jwt.sign(
    { id: userId, email, role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeUser = (user: any) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};
```

#### 7. Controllers

##### Auth Controller (`src/controllers/authController.ts`)
```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { UserInput, AuthRequest, ApiResponse } from '../types';
import { hashPassword, comparePassword, generateToken, sanitizeUser } from '../utils';
import { userSchema } from '../types';

const prisma = new PrismaClient();

export const register = async (req: Request<{}, {}, UserInput>, res: Response<ApiResponse>) => {
  try {
    const validatedData = userSchema.parse(req.body);
    
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const hashedPassword = await hashPassword(validatedData.password);

    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: sanitizeUser(user),
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const login = async (req: Request<{}, {}, { email: string; password: string }>, res: Response<ApiResponse>) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated',
      });
    }

    const token = generateToken(user.id, user.email, user.role);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: sanitizeUser(user),
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Login failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getProfile = async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
```

##### Testimonials Controller (`src/controllers/testimonialController.ts`)
```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TestimonialInput, AuthRequest, ApiResponse } from '../types';
import { testimonialSchema } from '../types';

const prisma = new PrismaClient();

export const getTestimonials = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        role: true,
        content: true,
        avatar: true,
        rating: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      message: 'Testimonials retrieved successfully',
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve testimonials',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createTestimonial = async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const validatedData = testimonialSchema.parse(req.body);

    const testimonial = await prisma.testimonial.create({
      data: {
        ...validatedData,
        userId: req.user?.id,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create testimonial',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateTestimonial = async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;
    const validatedData = testimonialSchema.parse(req.body);

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: validatedData,
    });

    res.json({
      success: true,
      message: 'Testimonial updated successfully',
      data: testimonial,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update testimonial',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteTestimonial = async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const { id } = req.params;

    await prisma.testimonial.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete testimonial',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
```

##### Features Controller (`src/controllers/featureController.ts`)
```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { FeatureInput, ApiResponse } from '../types';
import { featureSchema } from '../types';

const prisma = new PrismaClient();

export const getFeatures = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const features = await prisma.feature.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    res.json({
      success: true,
      message: 'Features retrieved successfully',
      data: features,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve features',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const createFeature = async (req: Request<{}, {}, FeatureInput>, res: Response<ApiResponse>) => {
  try {
    const validatedData = featureSchema.parse(req.body);

    const feature = await prisma.feature.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      message: 'Feature created successfully',
      data: feature,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create feature',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
```

##### Contact Controller (`src/controllers/contactController.ts`)
```typescript
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ContactInput, AuthRequest, ApiResponse } from '../types';
import { contactSchema } from '../types';

const prisma = new PrismaClient();

export const createContact = async (req: Request<{}, {}, ContactInput>, res: Response<ApiResponse>) => {
  try {
    const validatedData = contactSchema.parse(req.body);

    const contact = await prisma.contact.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully',
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getContacts = async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      success: true,
      message: 'Contacts retrieved successfully',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contacts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
```

#### 8. Routes (`src/routes/index.ts`)
```typescript
import { Router } from 'express';
import { 
  register, 
  login, 
  getProfile 
} from '../controllers/authController';
import { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} from '../controllers/testimonialController';
import { 
  getFeatures, 
  createFeature 
} from '../controllers/featureController';
import { 
  createContact, 
  getContacts 
} from '../controllers/contactController';
import { authMiddleware, adminMiddleware } from '../middleware';

const router = Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', authMiddleware, getProfile);

// Testimonial routes
router.get('/testimonials', getTestimonials);
router.post('/testimonials', authMiddleware, createTestimonial);
router.put('/testimonials/:id', authMiddleware, updateTestimonial);
router.delete('/testimonials/:id', authMiddleware, deleteTestimonial);

// Feature routes
router.get('/features', getFeatures);
router.post('/features', authMiddleware, adminMiddleware, createFeature);

// Contact routes
router.post('/contact', createContact);
router.get('/contact', authMiddleware, adminMiddleware, getContacts);

// Stats route
router.get('/stats', async (req, res) => {
  try {
    const prisma = new PrismaClient();
    const stats = await prisma.stat.findMany({
      orderBy: { order: 'asc' },
    });
    
    res.json({
      success: true,
      message: 'Stats retrieved successfully',
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve stats',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
```

#### 9. Main Application (`src/app.ts`)
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { errorHandler } from './middleware';

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

export default app;
```

#### 10. Database Seed (`prisma/seed.ts`)
```typescript
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  await prisma.user.upsert({
    where: { email: 'admin@nexus.com' },
    update: {},
    create: {
      email: 'admin@nexus.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create stats
  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { value: '50K+', label: 'Active Users', order: 1 },
      { value: '99.9%', label: 'Uptime', order: 2 },
      { value: '24/7', label: 'Support', order: 3 },
      { value: '100+', label: 'Integrations', order: 4 },
    ],
  });

  // Create features
  await prisma.feature.deleteMany();
  await prisma.feature.createMany({
    data: [
      {
        title: 'Lightning Fast',
        description: 'Optimized for speed and performance to deliver the best user experience.',
        icon: 'Zap',
        order: 1,
        isActive: true,
      },
      {
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security with 99.9% uptime guarantee.',
        icon: 'Shield',
        order: 2,
        isActive: true,
      },
      {
        title: 'Community Driven',
        description: 'Join thousands of satisfied users building amazing things.',
        icon: 'Users',
        order: 3,
        isActive: true,
      },
    ],
  });

  // Create testimonials
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Sarah Johnson',
        role: 'Product Manager',
        content: "This platform has completely transformed how we work. The efficiency gains are incredible!",
        avatar: 'https://placehold.co/60x60/6366f1/ffffff?text=SJ',
        rating: 5,
        isActive: true,
      },
      {
        name: 'Michael Chen',
        role: 'Developer',
        content: "The best tool I've used in years. Clean interface, powerful features, and amazing support.",
        avatar: 'https://placehold.co/60x60/8b5cf6/ffffff?text=MC',
        rating: 5,
        isActive: true,
      },
      {
        name: 'Emma Rodriguez',
        role: 'Designer',
        content: "Finally found a solution that understands our creative workflow. Highly recommended!",
        avatar: 'https://placehold.co/60x60/06b6d4/ffffff?text=ER',
        rating: 5,
        isActive: true,
      },
    ],
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

#### 11. TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*", "prisma/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### Setup Instructions:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

### API Endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial
- `GET /api/features` - Get all features
- `POST /api/contact` - Submit contact form
- `GET /api/stats` - Get platform statistics

---

## PHP Web Code Example

Here is the code example for the tech stack with the PHP 8.4.5 application with Tailwind CSS v4 with the complete implementation:

### Project Structure
```
php-web/
├── index.php
├── components/
│   ├── Header.php
│   ├── Hero.php
│   ├── Stats.php
│   ├── Features.php
│   ├── Testimonials.php
│   ├── CTA.php
│   └── Footer.php
├── styles/
│   └── input.css
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── composer.json
└── tailwind.config.js
```

#### 1. Composer Configuration (`composer.json`)
```json
{
    "name": "nexus/landing-page",
    "description": "Nexus Landing Page with PHP 8.4.5 and Tailwind CSS v4",
    "type": "project",
    "require": {
        "php": "^8.4.5"
    },
    "autoload": {
        "psr-4": {
            "Nexus\\": "components/"
        }
    },
    "config": {
        "optimize-autoloader": true,
        "preferred-install": "dist",
        "sort-packages": true
    },
    "minimum-stability": "stable",
    "prefer-stable": true
}
```

#### 2. Tailwind CSS Configuration (`tailwind.config.js`)
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.php"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          600: '#9333ea',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          300: '#d1d5db',
          400: '#9ca3af',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        yellow: {
          400: '#facc15',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      blur: {
        '3xl': '64px',
      }
    },
  },
  plugins: [],
}
```

#### 3. Main CSS File (`styles/input.css`)
```css
@import "tailwindcss";

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', system-ui, sans-serif;
  }
}

@layer utilities {
  .bg-gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
```

#### 4. Main PHP File (`index.php`)
```php
<?php
declare(strict_types=1);

require_once __DIR__ . '/vendor/autoload.php';

use Nexus\Header;
use Nexus\Hero;
use Nexus\Stats;
use Nexus\Features;
use Nexus\Testimonials;
use Nexus\CTA;
use Nexus\Footer;

// Data arrays (in a real app, this would come from a database)
$features = [
    [
        'icon' => 'zap',
        'title' => "Lightning Fast",
        'description' => "Optimized for speed and performance to deliver the best user experience."
    ],
    [
        'icon' => 'shield',
        'title' => "Secure & Reliable",
        'description' => "Enterprise-grade security with 99.9% uptime guarantee."
    ],
    [
        'icon' => 'users',
        'title' => "Community Driven",
        'description' => "Join thousands of satisfied users building amazing things."
    ]
];

$testimonials = [
    [
        'name' => "Sarah Johnson",
        'role' => "Product Manager",
        'content' => "This platform has completely transformed how we work. The efficiency gains are incredible!",
        'avatar' => "https://placehold.co/60x60/6366f1/ffffff?text=SJ"
    ],
    [
        'name' => "Michael Chen",
        'role' => "Developer",
        'content' => "The best tool I've used in years. Clean interface, powerful features, and amazing support.",
        'avatar' => "https://placehold.co/60x60/8b5cf6/ffffff?text=MC"
    ],
    [
        'name' => "Emma Rodriguez",
        'role' => "Designer",
        'content' => "Finally found a solution that understands our creative workflow. Highly recommended!",
        'avatar' => "https://placehold.co/60x60/06b6d4/ffffff?text=ER"
    ]
];

$stats = [
    ['value' => "50K+", 'label' => "Active Users"],
    ['value' => "99.9%", 'label' => "Uptime"],
    ['value' => "24/7", 'label' => "Support"],
    ['value' => "100+", 'label' => "Integrations"]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexus - Transform Your Digital Experience</title>
    <meta name="description" content="The all-in-one platform that helps teams collaborate, create, and scale with ease.">
    
    <!-- Tailwind CSS v4 -->
    <link rel="stylesheet" href="/public/css/styles.css">
    
    <!-- Inter Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body class="min-h-screen bg-white">
    <?php
    // Render components
    echo Header::render();
    echo Hero::render();
    echo Stats::render($stats);
    echo Features::render($features);
    echo Testimonials::render($testimonials);
    echo CTA::render();
    echo Footer::render();
    ?>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();
        
        // Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    const isHidden = mobileMenu.classList.contains('hidden');
                    if (isHidden) {
                        mobileMenu.classList.remove('hidden');
                        mobileMenuButton.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
                    } else {
                        mobileMenu.classList.add('hidden');
                        mobileMenuButton.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
                    }
                    lucide.createIcons();
                });
            }
        });
    </script>
</body>
</html>
```

#### 5. Header Component (`components/Header.php`)
```php
<?php
declare(strict_types=1);

namespace Nexus;

class Header
{
    public static function render(): string
    {
        return <<<HTML
        <nav class="relative bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-2">
                        <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold text-sm">N</span>
                        </div>
                        <span class="text-xl font-bold text-gray-900">Nexus</span>
                    </div>
                    
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="#features" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Features</a>
                        <a href="#testimonials" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Testimonials</a>
                        <a href="#pricing" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Pricing</a>
                        <a href="#contact" class="text-gray-700 hover:text-blue-600 transition-colors duration-200">Contact</a>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                            Get Started
                        </button>
                    </div>

                    <button id="mobile-menu-button" class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <i data-lucide="menu" class="w-6 h-6 text-gray-700"></i>
                    </button>
                </div>
                
                <!-- Mobile Menu -->
                <div id="mobile-menu" class="hidden md:hidden py-4 border-t border-gray-100">
                    <div class="flex flex-col space-y-4">
                        <a href="#features" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2">Features</a>
                        <a href="#testimonials" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2">Testimonials</a>
                        <a href="#pricing" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2">Pricing</a>
                        <a href="#contact" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2">Contact</a>
                        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium w-full text-center">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        HTML;
    }
}
```

#### 6. Hero Component (`components/Hero.php`)
```php
<?php
declare(strict_types=1);

namespace Nexus;

class Hero
{
    public static function render(): string
    {
        $userAvatars = '';
        for ($i = 1; $i <= 4; $i++) {
            $userAvatars .= <<<HTML
            <img 
                src="https://placehold.co/40x40/6366f1/ffffff?text=U{$i}"
                alt="User {$i}"
                class="w-10 h-10 rounded-full border-2 border-white"
                loading="lazy"
            >
            HTML;
        }

        return <<<HTML
        <section class="relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-8">
                        <div class="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                            <i data-lucide="star" class="w-4 h-4 mr-2"></i>
                            Featured in TechCrunch
                        </div>
                        
                        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Transform Your Digital
                            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Experience</span>
                        </h1>
                        
                        <p class="text-xl text-gray-600 leading-relaxed">
                            The all-in-one platform that helps teams collaborate, create, and scale with ease. 
                            Join thousands of companies already using our cutting-edge solutions.
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4">
                            <button class="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg flex items-center justify-center">
                                Start Free Trial
                                <i data-lucide="chevron-right" class="w-5 h-5 ml-2"></i>
                            </button>
                            <button class="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-lg flex items-center justify-center">
                                <i data-lucide="play" class="w-5 h-5 mr-2"></i>
                                Watch Demo
                            </button>
                        </div>
                        
                        <div class="flex items-center space-x-8 pt-4">
                            <div class="flex -space-x-2">
                                {$userAvatars}
                            </div>
                            <p class="text-gray-600">
                                <span class="font-semibold text-gray-900">50,000+</span> users trust us
                            </p>
                        </div>
                    </div>
                    
                    <div class="relative">
                        <div class="relative z-10">
                            <img 
                                src="https://placehold.co/600x500/f8fafc/64748b?text=Dashboard+Preview"
                                alt="Dashboard Preview"
                                class="rounded-2xl shadow-2xl w-full"
                                loading="lazy"
                            >
                        </div>
                        <div class="absolute -top-4 -right-4 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
        HTML;
    }
}
```

#### 7. Stats Component (`components/Stats.php`)
```php
<?php
declare(strict_types=1);

namespace Nexus;

class Stats
{
    public static function render(array $stats): string
    {
        $statsHtml = '';
        foreach ($stats as $index => $stat) {
            $statsHtml .= <<<HTML
            <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{$stat['value']}</div>
                <div class="text-gray-600">{$stat['label']}</div>
            </div>
            HTML;
        }

        return <<<HTML
        <section class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {$statsHtml}
                </div>
            </div>
        </section>
        HTML;
    }
}
```

#### 8. Features Component (`components/Features.php`)
```php
<?php
declare(strict_types=1);

namespace Nexus;

class Features
{
    public static function render(array $features): string
    {
        $featuresHtml = '';
        foreach ($features as $index => $feature) {
            $iconSvg = self::getIconSvg($feature['icon']);
            $featuresHtml .= <<<HTML
            <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    {$iconSvg}
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-4">{$feature['title']}</h3>
                <p class="text-gray-600 leading-relaxed">{$feature['description']}</p>
            </div>
            HTML;
        }

        return <<<HTML
        <section id="features" class="py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Powerful Features
                    </h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to succeed in one comprehensive platform
                    </p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8">
                    {$featuresHtml}
                </div>
            </div>
        </section>
        HTML;
    }

    private static function getIconSvg(string $iconName): string
    {
        $icons = [
            'zap' => '<i data-lucide="zap" class="w-8 h-8"></i>',
            'shield' => '<i data-lucide="shield" class="w-8 h-8"></i>',
            'users' => '<i data-lucide="users" class="w-8 h-8"></i>',
        ];

        return $icons[$iconName] ?? $icons['zap'];
    }
}
```

#### 9. Testimonials Component (`components/Testimonials.php`)
```php
<?php
declare(strict_types=1);

namespace Nexus;

class Testimonials
{
    public static function render(array $testimonials): string
    {
        $testimonialsHtml = '';
        foreach ($testimonials as $index => $testimonial) {
            $stars = str_repeat('<i data-lucide="star" class="w-5 h-5 text-yellow-400 fill-current"></i>', 5);
            
            $testimonialsHtml .= <<<HTML
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div class="flex items-center mb-6">
                    <img 
                        src="{$testimonial['avatar']}"
                        alt="{$testimonial['name']}"
                        class="w-12 h-12 rounded-full mr-4"
                        loading="lazy"
                    >
                    <div>
                        <div class="font-semibold text-gray-900">{$testimonial['name']}</div>
                        <div class="text-gray-600 text-sm">{$testimonial['role']}</div>
                    </div>
                </div>
                <p class="text-gray-700 italic">"{$testimonial['content']}"</p>
                <div class="flex mt-4">
                    {$stars}
                </div>
            </div>
            HTML;
        }

        return <<<HTML
        <section id="testimonials" class="py-20 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        What Our Users Say
                    </h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it
                    </p>
                </div>
                
                <div class="grid md:grid-cols-3 gap-8">
                    {$testimonialsHtml}
                </div>
            </div>
        </section>
        HTML;
    }
}
```

#### 10. CTA Component (`components/CTA.php`)
```php
<?php
declare(strict_types=1);

namespace Nexus;

class CTA
{
    public static function render(): string
    {
        return <<<HTML
        <section class="py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
                    <h2 class="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p class="text-xl mb-8 opacity-90">
                        Join thousands of teams already using our platform to achieve their goals
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <button class="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg">
                            Start Free Trial
                        </button>
                        <button class="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors duration-200 font-semibold text-lg">
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </div>
        </section>
        HTML;
    }
}
```

#### 11. Footer Component (`components/Footer.php`)
```php
<?php
declare(strict_types=1);

namespace Nexus;

class Footer
{
    public static function render(): string
    {
        return <<<HTML
        <footer id="contact" class="bg-gray-900 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div class="col-span-1 md:col-span-2">
                        <div class="flex items-center space-x-2 mb-4">
                            <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span class="text-white font-bold text-sm">N</span>
                            </div>
                            <span class="text-xl font-bold">Nexus</span>
                        </div>
                        <p class="text-gray-400 mb-6 max-w-md">
                            The all-in-one platform that helps teams collaborate, create, and scale with ease.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                                <i data-lucide="facebook" class="w-6 h-6"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                                <i data-lucide="twitter" class="w-6 h-6"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                                <i data-lucide="instagram" class="w-6 h-6"></i>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                                <i data-lucide="linkedin" class="w-6 h-6"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Product</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white transition-colors duration-200">Features</a></li>
                            <li><a href="#" class="hover:text-white transition-colors duration-200">Pricing</a></li>
                            <li><a href="#" class="hover:text-white transition-colors duration-200">Integrations</a></li>
                            <li><a href="#" class="hover:text-white transition-colors duration-200">Updates</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold mb-4">Support</h3>
                        <ul class="space-y-2 text-gray-400">
                            <li><a href="#" class="hover:text-white transition-colors duration-200">Help Center</a></li>
                            <li><a href="#" class="hover:text-white transition-colors duration-200">Contact Us</a></li>
                            <li><a href="#" class="hover:text-white transition-colors duration-200">Community</a></li>
                            <li><a href="#" class="hover:text-white transition-colors duration-200">Status</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div class="flex items-center space-x-6 mb-4 md:mb-0 flex-wrap gap-4">
                        <div class="flex items-center text-gray-400">
                            <i data-lucide="mail" class="w-4 h-4 mr-2"></i>
                            <span>hello@nexus.com</span>
                        </div>
                        <div class="flex items-center text-gray-400">
                            <i data-lucide="phone" class="w-4 h-4 mr-2"></i>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div class="flex items-center text-gray-400">
                            <i data-lucide="map-pin" class="w-4 h-4 mr-2"></i>
                            <span>San Francisco, CA</span>
                        </div>
                    </div>
                    
                    <div class="text-gray-400 text-sm">
                        © 2024 Nexus. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
        HTML;
    }
}
```

#### 12. Build Script (`build.php`)
```php
<?php
declare(strict_types=1);

// Build script for Tailwind CSS v4
class BuildScript
{
    public function build(): void
    {
        // Create public directory if it doesn't exist
        if (!is_dir('public/css')) {
            mkdir('public/css', 0755, true);
        }

        // Build Tailwind CSS
        $inputFile = 'styles/input.css';
        $outputFile = 'public/css/styles.css';
        
        if (!file_exists($inputFile)) {
            throw new Exception("Input CSS file not found: {$inputFile}");
        }

        // In a real scenario, you would use the Tailwind CLI
        // For this example, we'll simulate the build process
        $cssContent = file_get_contents($inputFile);
        
        // Add some basic processing (in reality, use Tailwind CLI)
        $cssContent .= "\n/* Built with Tailwind CSS v4 */\n";
        
        file_put_contents($outputFile, $cssContent);
        
        echo "✅ Build completed successfully!\n";
        echo "📁 Output: {$outputFile}\n";
    }
}

// Run build
if (php_sapi_name() === 'cli') {
    $build = new BuildScript();
    $build->build();
}
```

#### 13. Setup Instructions

1. **Install PHP 8.4.5** and ensure it's available in your PATH
2. **Install Composer** and run:
   ```bash
   composer install
   ```
3. **Install Tailwind CSS v4**:
   ```bash
   npm install -g tailwindcss@next
   ```
4. **Build CSS** (using the simulated build script):
   ```bash
   php build.php
   ```
5. **Start PHP development server**:
   ```bash
   php -S localhost:8000
   ```

### Key Features of This PHP 8.4.5 Implementation:

1. **Strict Typing**: All files use `declare(strict_types=1)`
2. **Namespaced Components**: Organized with PSR-4 autoloading
3. **Modern PHP Features**: Type declarations, named parameters (ready)
4. **Tailwind CSS v4**: Using the latest version with CLI build process
5. **Component-Based Architecture**: Reusable, maintainable components
6. **Performance Optimized**: Lazy loading images, efficient rendering
7. **Mobile Responsive**: Fully responsive design
8. **Accessibility**: Proper alt texts, semantic HTML

---

## Mobile Apps Code Example

Here is the code example with the tech stack for the multiplatform mobile app using Kotlin Multiplatform Mobile (KMM) for both Android and iOS with the complete implementation:

### Project Structure
```
mobile-apps/
├── shared/
│   ├── src/
│   │   ├── commonMain/
│   │   ├── androidMain/
│   │   └── iosMain/
│   ├── build.gradle.kts
│   └── gradle.properties
├── androidApp/
│   ├── src/
│   └── build.gradle.kts
├── iosApp/
│   ├── iosApp/
│   └── iosApp.xcodeproj
├── build.gradle.kts
└── settings.gradle.kts
```

#### 1. Project Configuration

##### Root `build.gradle.kts`
```kotlin
buildscript {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:1.9.22")
        classpath("com.android.tools.build:gradle:8.2.2")
        classpath("com.squareup.sqldelight:gradle-plugin:1.5.5")
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        maven(url = "https://maven.pkg.jetbrains.space/public/p/compose/dev")
    }
}
```

##### `settings.gradle.kts`
```kotlin
pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "NexusMobile"
include(":androidApp")
include(":shared")
```

#### 2. Shared Module (`shared/`)

##### `shared/build.gradle.kts`
```kotlin
plugins {
    kotlin("multiplatform")
    kotlin("native.cocoapods")
    id("com.android.library")
    id("com.squareup.sqldelight")
    id("kotlinx-serialization")
}

kotlin {
    androidTarget {
        compilations.all {
            kotlinOptions {
                jvmTarget = "11"
            }
        }
    }
    
    iosX64()
    iosArm64()
    iosSimulatorArm64()

    cocoapods {
        summary = "Nexus Mobile Shared Module"
        homepage = "https://nexus.com"
        version = "1.0.0"
        ios.deploymentTarget = "14.1"
        podfile = project.file("../iosApp/Podfile")
        framework {
            baseName = "shared"
            isStatic = true
        }
    }
    
    sourceSets {
        val commonMain by getting {
            dependencies {
                // Coroutines
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
                
                // Ktor for networking
                implementation("io.ktor:ktor-client-core:2.3.7")
                implementation("io.ktor:ktor-client-content-negotiation:2.3.7")
                implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.7")
                
                // Serialization
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.2")
                
                // SQLDelight for database
                implementation("com.squareup.sqldelight:runtime:1.5.5")
                implementation("com.squareup.sqldelight:coroutines-extensions:1.5.5")
                
                // Koin for dependency injection
                implementation("io.insert-koin:koin-core:3.5.0")
            }
        }
        
        val androidMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-android:2.3.7")
                implementation("com.squareup.sqldelight:android-driver:1.5.5")
            }
        }
        
        val iosMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-darwin:2.3.7")
                implementation("com.squareup.sqldelight:native-driver:1.5.5")
            }
        }
    }
}

android {
    namespace = "com.nexus.shared"
    compileSdk = 34
    defaultConfig {
        minSdk = 24
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

sqldelight {
    database("NexusDatabase") {
        packageName = "com.nexus.shared.db"
        sourceFolders = listOf("sqldelight")
    }
}
```

#### 3. Data Models (`shared/src/commonMain/kotlin/models/`)

##### `Feature.kt`
```kotlin
package com.nexus.shared.models

import kotlinx.serialization.Serializable

@Serializable
data class Feature(
    val id: String,
    val title: String,
    val description: String,
    val icon: String,
    val isActive: Boolean = true
)

@Serializable
data class FeaturesResponse(
    val features: List<Feature>,
    val success: Boolean,
    val message: String
)
```

##### `Testimonial.kt`
```kotlin
package com.nexus.shared.models

import kotlinx.serialization.Serializable

@Serializable
data class Testimonial(
    val id: String,
    val name: String,
    val role: String,
    val content: String,
    val avatar: String,
    val rating: Int,
    val isActive: Boolean = true
)

@Serializable
data class TestimonialsResponse(
    val testimonials: List<Testimonial>,
    val success: Boolean,
    val message: String
)
```

##### `Stat.kt`
```kotlin
package com.nexus.shared.models

import kotlinx.serialization.Serializable

@Serializable
data class Stat(
    val id: String,
    val value: String,
    val label: String,
    val order: Int
)

@Serializable
data class StatsResponse(
    val stats: List<Stat>,
    val success: Boolean,
    val message: String
)
```

##### `Contact.kt`
```kotlin
package com.nexus.shared.models

import kotlinx.serialization.Serializable

@Serializable
data class ContactRequest(
    val name: String,
    val email: String,
    val subject: String,
    val message: String
)

@Serializable
data class ContactResponse(
    val success: Boolean,
    val message: String,
    val data: ContactData? = null
)

@Serializable
data class ContactData(
    val id: String,
    val name: String,
    val email: String
)
```

#### 4. Database (`shared/src/commonMain/kotlin/db/`)

##### SQLDelight Schema (`shared/src/commonMain/sqldelight/com/shared/db/`)

###### `Database.sq`
```sql
CREATE TABLE feature (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    is_active INTEGER AS Boolean DEFAULT 1
);

CREATE TABLE testimonial (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    avatar TEXT NOT NULL,
    rating INTEGER NOT NULL,
    is_active INTEGER AS Boolean DEFAULT 1
);

CREATE TABLE stat (
    id TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    display_order INTEGER NOT NULL
);

insertFeature:
INSERT OR REPLACE INTO feature(id, title, description, icon, is_active)
VALUES(?, ?, ?, ?, ?);

selectAllFeatures:
SELECT * FROM feature WHERE is_active = 1 ORDER BY id;

insertTestimonial:
INSERT OR REPLACE INTO testimonial(id, name, role, content, avatar, rating, is_active)
VALUES(?, ?, ?, ?, ?, ?, ?);

selectAllTestimonials:
SELECT * FROM testimonial WHERE is_active = 1 ORDER BY rating DESC;

insertStat:
INSERT OR REPLACE INTO stat(id, value, label, display_order)
VALUES(?, ?, ?, ?);

selectAllStats:
SELECT * FROM stat ORDER BY display_order;
```

##### Database Manager (`shared/src/commonMain/kotlin/db/DatabaseManager.kt`)
```kotlin
package com.shared.db

import com.shared.models.Feature
import com.shared.models.Stat
import com.shared.models.Testimonial
import com.shared.NexusDatabase
import kotlinx.coroutines.flow.Flow

class DatabaseManager(private val database: NexusDatabase) {
    
    // Features
    suspend fun insertFeature(feature: Feature) {
        database.nexusDatabaseQueries.insertFeature(
            id = feature.id,
            title = feature.title,
            description = feature.description,
            icon = feature.icon,
            is_active = feature.isActive
        )
    }
    
    fun getFeatures(): Flow<List<Feature>> {
        return database.nexusDatabaseQueries.selectAllFeatures { id, title, description, icon, is_active ->
            Feature(
                id = id,
                title = title,
                description = description,
                icon = icon,
                isActive = is_active
            )
        }.asFlow()
    }
    
    // Testimonials
    suspend fun insertTestimonial(testimonial: Testimonial) {
        database.nexusDatabaseQueries.insertTestimonial(
            id = testimonial.id,
            name = testimonial.name,
            role = testimonial.role,
            content = testimonial.content,
            avatar = testimonial.avatar,
            rating = testimonial.rating.toLong(),
            is_active = testimonial.isActive
        )
    }
    
    fun getTestimonials(): Flow<List<Testimonial>> {
        return database.nexusDatabaseQueries.selectAllTestimonials { id, name, role, content, avatar, rating, is_active ->
            Testimonial(
                id = id,
                name = name,
                role = role,
                content = content,
                avatar = avatar,
                rating = rating.toInt(),
                isActive = is_active
            )
        }.asFlow()
    }
    
    // Stats
    suspend fun insertStat(stat: Stat) {
        database.nexusDatabaseQueries.insertStat(
            id = stat.id,
            value = stat.value,
            label = stat.label,
            display_order = stat.order.toLong()
        )
    }
    
    fun getStats(): Flow<List<Stat>> {
        return database.nexusDatabaseQueries.selectAllStats { id, value, label, display_order ->
            Stat(
                id = id,
                value = value,
                label = label,
                order = display_order.toInt()
            )
        }.asFlow()
    }
    
    suspend fun clearAllData() {
        database.nexusDatabaseQueries.transaction {
            database.nexusDatabaseQueries.removeAllFeatures()
            database.nexusDatabaseQueries.removeAllTestimonials()
            database.nexusDatabaseQueries.removeAllStats()
        }
    }
}
```

#### 5. API Service (`shared/src/commonMain/kotlin/network/`)

##### `ApiService.kt`
```kotlin
package com.shared.network

import com.shared.models.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.serialization.json.Json

class ApiService(private val client: HttpClient) {
    
    suspend fun getFeatures(): FeaturesResponse {
        return client.get("https://your-api.com/api/features").body()
    }
    
    suspend fun getTestimonials(): TestimonialsResponse {
        return client.get("https://your-api.com/api/testimonials").body()
    }
    
    suspend fun getStats(): StatsResponse {
        return client.get("https://your-api.com/api/stats").body()
    }
    
    suspend fun submitContact(contactRequest: ContactRequest): ContactResponse {
        return client.post("https://your-api.com/api/contact") {
            contentType(ContentType.Application.Json)
            setBody(contactRequest)
        }.body()
    }
    
    suspend fun getDashboardData(): DashboardData {
        // Fetch all data in parallel
        val features = getFeatures()
        val testimonials = getTestimonials()
        val stats = getStats()
        
        return DashboardData(
            features = features.features,
            testimonials = testimonials.testimonials,
            stats = stats.stats
        )
    }
}

data class DashboardData(
    val features: List<Feature>,
    val testimonials: List<Testimonial>,
    val stats: List<Stat>
)
```

##### `HttpClientFactory.kt`
```kotlin
package com.shared.network

import io.ktor.client.*
import io.ktor.client.engine.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.logging.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

expect class HttpClientFactory {
    fun create(): HttpClient
}

actual class HttpClientFactory actual constructor() {
    actual fun create(): HttpClient {
        return HttpClient(engineFactory) {
            install(ContentNegotiation) {
                json(Json {
                    prettyPrint = true
                    isLenient = true
                    ignoreUnknownKeys = true
                })
            }
            
            install(Logging) {
                logger = Logger.DEFAULT
                level = LogLevel.HEADERS
            }
            
            defaultRequest {
                url("https://your-api.com/")
                header("Content-Type", "application/json")
            }
            
            install(HttpTimeout) {
                requestTimeoutMillis = 15000
                connectTimeoutMillis = 15000
                socketTimeoutMillis = 15000
            }
        }
    }
}

// Platform-specific implementations
actual expect val engineFactory: HttpClientEngineFactory<HttpClientEngineConfig>
```

#### 6. Repository (`shared/src/commonMain/kotlin/repository/`)

##### `NexusRepository.kt`
```kotlin
package com.shared.repository

import com.shared.db.DatabaseManager
import com.shared.models.*
import com.shared.network.ApiService
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

class NexusRepository(
    private val apiService: ApiService,
    private val databaseManager: DatabaseManager
) {
    
    // Features
    suspend fun refreshFeatures() {
        val response = apiService.getFeatures()
        if (response.success) {
            response.features.forEach { feature ->
                databaseManager.insertFeature(feature)
            }
        }
    }
    
    fun getFeatures(): Flow<List<Feature>> {
        return databaseManager.getFeatures()
    }
    
    // Testimonials
    suspend fun refreshTestimonials() {
        val response = apiService.getTestimonials()
        if (response.success) {
            response.testimonials.forEach { testimonial ->
                databaseManager.insertTestimonial(testimonial)
            }
        }
    }
    
    fun getTestimonials(): Flow<List<Testimonial>> {
        return databaseManager.getTestimonials()
    }
    
    // Stats
    suspend fun refreshStats() {
        val response = apiService.getStats()
        if (response.success) {
            response.stats.forEach { stat ->
                databaseManager.insertStat(stat)
            }
        }
    }
    
    fun getStats(): Flow<List<Stat>> {
        return databaseManager.getStats()
    }
    
    // Contact
    suspend fun submitContact(contactRequest: ContactRequest): ContactResponse {
        return apiService.submitContact(contactRequest)
    }
    
    // Refresh all data
    suspend fun refreshAllData() {
        try {
            refreshFeatures()
            refreshTestimonials()
            refreshStats()
        } catch (e: Exception) {
            throw Exception("Failed to refresh data: ${e.message}")
        }
    }
}
```

#### 7. ViewModel (`shared/src/commonMain/kotlin/viewmodel/`)

##### `MainViewModel.kt`
```kotlin
package com.shared.viewmodel

import com.shared.models.*
import com.shared.repository.NexusRepository
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.*
import kotlin.coroutines.CoroutineContext

class MainViewModel(
    private val repository: NexusRepository,
    coroutineContext: CoroutineContext
) {
    private val scope = CoroutineScope(coroutineContext + Job())
    
    private val _uiState = MutableStateFlow<UiState>(UiState.Loading)
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()
    
    private val _contactState = MutableStateFlow<ContactState>(ContactState.Idle)
    val contactState: StateFlow<ContactState> = _contactState.asStateFlow()
    
    val features: StateFlow<List<Feature>> = repository.getFeatures()
        .stateIn(scope, SharingStarted.WhileSubscribed(5000), emptyList())
    
    val testimonials: StateFlow<List<Testimonial>> = repository.getTestimonials()
        .stateIn(scope, SharingStarted.WhileSubscribed(5000), emptyList())
    
    val stats: StateFlow<List<Stat>> = repository.getStats()
        .stateIn(scope, SharingStarted.WhileSubscribed(5000), emptyList())
    
    init {
        loadInitialData()
    }
    
    fun loadInitialData() {
        scope.launch {
            _uiState.value = UiState.Loading
            try {
                repository.refreshAllData()
                _uiState.value = UiState.Success
            } catch (e: Exception) {
                _uiState.value = UiState.Error(e.message ?: "Unknown error")
            }
        }
    }
    
    fun submitContact(contactRequest: ContactRequest) {
        scope.launch {
            _contactState.value = ContactState.Loading
            try {
                val response = repository.submitContact(contactRequest)
                if (response.success) {
                    _contactState.value = ContactState.Success(response.message)
                } else {
                    _contactState.value = ContactState.Error(response.message)
                }
            } catch (e: Exception) {
                _contactState.value = ContactState.Error("Failed to send message: ${e.message}")
            }
        }
    }
    
    fun resetContactState() {
        _contactState.value = ContactState.Idle
    }
    
    fun refreshData() {
        scope.launch {
            try {
                repository.refreshAllData()
            } catch (e: Exception) {
                // Handle refresh error silently or show toast
            }
        }
    }
    
    fun clear() {
        scope.cancel()
    }
}

sealed class UiState {
    object Loading : UiState()
    object Success : UiState()
    data class Error(val message: String) : UiState()
}

sealed class ContactState {
    object Idle : ContactState()
    object Loading : ContactState()
    data class Success(val message: String) : ContactState()
    data class Error(val message: String) : ContactState()
}
```

#### 8. Dependency Injection (`shared/src/commonMain/kotlin/di/`)

##### `AppModule.kt`
```kotlin
package com.shared.di

import com.shared.db.DatabaseManager
import com.shared.network.ApiService
import com.shared.network.HttpClientFactory
import com.shared.repository.NexusRepository
import com.shared.NexusDatabase
import org.koin.core.module.dsl.singleOf
import org.koin.dsl.module

val appModule = module {
    single { HttpClientFactory().create() }
    singleOf(::ApiService)
    single { NexusDatabase(get()) }
    singleOf(::DatabaseManager)
    singleOf(::NexusRepository)
}
```

#### 9. Android App (`androidApp/`)

##### `androidApp/build.gradle.kts`
```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.squareup.sqldelight")
}

android {
    namespace = "com.android"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.android"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
    }

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.7"
    }

    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    implementation(project(":shared"))
    
    implementation("androidx.compose.ui:ui:1.5.4")
    implementation("androidx.compose.ui:ui-tooling:1.5.4")
    implementation("androidx.compose.ui:ui-tooling-preview:1.5.4")
    implementation("androidx.compose.foundation:foundation:1.5.4")
    implementation("androidx.compose.material3:material3:1.1.2")
    implementation("androidx.activity:activity-compose:1.8.0")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.navigation:navigation-compose:2.7.4")
    
    implementation("io.coil-kt:coil-compose:2.5.0")
    
    implementation("io.insert-koin:koin-android:3.5.0")
    implementation("io.insert-koin:koin-androidx-compose:3.5.0")
    
    implementation("androidx.core:core-ktx:1.12.0")
}
```

##### Android Main Activity (`androidApp/src/main/java/com/android/MainActivity.kt`)
```kotlin
package com.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.remember
import com.android.ui.screens.MainScreen
import com.shared.di.appModule
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        startKoin {
            androidContext(this@MainActivity)
            modules(appModule)
        }
        
        setContent {
            MainScreen()
        }
    }
}
```

#### 10. iOS App (`iosApp/`)

##### `iosApp/Podfile`
```ruby
platform :ios, '14.1'

target 'iosApp' do
  use_frameworks!
  
  pod 'shared', :path => '../shared'
  
  pod 'KMPNativeCoroutinesCore', '1.0.0-ALPHA-18'
  pod 'KMPNativeCoroutinesRxSwift', '1.0.0-ALPHA-18'
  
end
```

##### iOS App Delegate (`iosApp/iosApp/AppDelegate.swift`)
```swift
import UIKit
import shared

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        // Initialize Koin
        let appModule = AppModule()
        appModule.doInitKoin()
        return true
    }

    // MARK: UISceneSession Lifecycle
    func application(
        _ application: UIApplication,
        configurationForConnecting connectingSceneSession: UISceneSession,
        options: UIScene.ConnectionOptions
    ) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }
}
```

##### iOS Main View (`iosApp/iosApp/ContentView.swift`)
```swift
import SwiftUI
import shared

struct ContentView: View {
    @StateObject private var viewModel = MainViewModel()
    
    var body: some View {
        NavigationView {
            MainScreen(viewModel: viewModel)
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
}

struct MainScreen: View {
    @ObservedObject var viewModel: MainViewModel
    
    var body: some View {
        ScrollView {
            LazyVStack(spacing: 24) {
                // Hero Section
                HeroSection()
                
                // Stats Section
                StatsSection(stats: viewModel.stats)
                
                // Features Section
                FeaturesSection(features: viewModel.features)
                
                // Testimonials Section
                TestimonialsSection(testimonials: viewModel.testimonials)
                
                // Contact Section
                ContactSection(viewModel: viewModel)
            }
            .padding()
        }
        .navigationTitle("Nexus")
        .onAppear {
            viewModel.loadInitialData()
        }
    }
}
```

#### 11. Platform-Specific Implementations

##### Android HTTP Client (`shared/src/androidMain/kotlin/network/`)
```kotlin
package com.nexus.shared.network

import io.ktor.client.engine.android.Android

actual val engineFactory = Android
```

##### iOS HTTP Client (`shared/src/iosMain/kotlin/network/`)
```kotlin
package com.nexus.shared.network

import io.ktor.client.engine.darwin.Darwin

actual val engineFactory = Darwin
```

### SQLDelight Drivers
#### Android (`shared/src/androidMain/kotlin/db/`)
```kotlin
package com.nexus.shared.db

import android.content.Context
import com.shared.Database
import com.squareup.sqldelight.android.AndroidSqliteDriver
import com.squareup.sqldelight.db.SqlDriver

actual class DriverFactory(private val context: Context) {
    actual fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(Database.Schema, context, "mobile-apps.db")
    }
}
```

#### iOS (`shared/src/iosMain/kotlin/db/`)
```kotlin
package com.shared.db

import com.shared.NexusDatabase
import com.squareup.sqldelight.db.SqlDriver
import com.squareup.sqldelight.drivers.native.NativeSqliteDriver

actual class DriverFactory {
    actual fun createDriver(): SqlDriver {
        return NativeSqliteDriver(Database.Schema, "mobile-apps.db")
    }
}
```

#### 12. Build and Run

##### Build for Android:
```bash
./gradlew :androidApp:assembleDebug
```

##### Build for iOS:
```bash
cd iosApp
pod install
open iosApp.xcworkspace
```

### Key Features of This KMM Implementation:

1. **Shared Business Logic**: All data models, networking, database, and view models are shared
2. **Native UI**: Platform-specific UI using Jetpack Compose (Android) and SwiftUI (iOS)
3. **Offline Support**: SQLDelight for local data caching
4. **Dependency Injection**: Koin for shared dependency management
5. **Coroutines**: Asynchronous programming with Flow for reactive updates
6. **Type Safety**: Full Kotlin type safety across platforms
7. **Modern Architecture**: MVVM with repository pattern
8. **Error Handling**: Comprehensive error states and loading states

This KMM setup allows you to maintain 80-90% code sharing between Android and iOS while providing native user experiences on both platforms.

---
