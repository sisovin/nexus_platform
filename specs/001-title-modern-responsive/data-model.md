# Data Model: Modern responsive website + mobile apps

**Created**: 2025-10-15

## Entities

### User

- id: string (UUID or ObjectId)
- name: string (required)
- email: string (required, unique)
- role: enum [USER, ADMIN]
- bookmarks: array<Language.id>
- createdAt: datetime
- updatedAt: datetime

Validation:

- email must be valid format
- name length between 1 and 200 chars

### Language

- id: string (UUID or ObjectId)
- name: string (required)
- summary: string
- ranking: integer
- trendData: JSON/array (time-series points)
- resources: array<Resource.id>
- images: array<string>
- createdAt: datetime
- updatedAt: datetime

Validation:

- name required, unique per language record
- ranking must be non-negative integer

### Testimonial

- id: string
- authorName: string
- content: string (required)
- status: enum [PENDING, APPROVED, REJECTED]
- createdAt: datetime

Validation:

- content length limits (min 10, max 5000)

### Bookmark

- id: string
- userId: string
- languageId: string
- createdAt: datetime

### FeatureItem

- id: string
- title: string
- description: string
- icon: string (path/reference)

### AnalyticsEvent

- id: string
- eventType: string
- userId: string (nullable)
- languageId: string (nullable)
- metadata: JSON
- timestamp: datetime

## Relationships

- User has many Bookmarks
- Language has many Resources and Testimonials
- Bookmark references User and Language

## Prisma schema guidance

- Use MongoDB provider or choose ObjectId mapping for string IDs if using Prisma + MongoDB.
- Enforce unique indexes for User.email and Language.name where applicable.

_End of data model._
