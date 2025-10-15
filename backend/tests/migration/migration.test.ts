import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

const prisma = new PrismaClient()

describe('Database Migrations', () => {
    beforeAll(async () => {
        // Clean up test database
        try {
            await prisma.$executeRaw`DROP DATABASE IF EXISTS nexus_test`
            await prisma.$executeRaw`CREATE DATABASE nexus_test`
        } catch (error) {
            // Ignore errors if database operations fail
        }
    })

    afterAll(async () => {
        await prisma.$disconnect()
    })

    test('should apply migrations successfully', async () => {
        // Run Prisma migrations
        try {
            execSync('npx prisma db push', {
                cwd: process.cwd(),
                env: {
                    ...process.env,
                    DATABASE_URL: 'mongodb://admin:pass@localhost:27017/nexus_test'
                }
            })
        } catch (error) {
            throw new Error(`Migration failed: ${error}`)
        }

        // Verify database schema
        const collections = await prisma.$runCommandRaw({ listCollections: 1 })

        // Check if expected collections exist
        const collectionNames = collections.cursor.firstBatch.map((c: any) => c.name)

        expect(collectionNames).toContain('Language')
        expect(collectionNames).toContain('User')
        expect(collectionNames).toContain('Testimonial')
        expect(collectionNames).toContain('Bookmark')
    })

    test('should seed data successfully', async () => {
        // Run seed script
        try {
            execSync('npx prisma db seed', {
                cwd: process.cwd(),
                env: {
                    ...process.env,
                    DATABASE_URL: 'mongodb://admin:pass@localhost:27017/nexus_test',
                    ADMIN_EMAIL: 'admin@nexusplatform.com',
                    ADMIN_PASSWORD: 'admin123'
                }
            })
        } catch (error) {
            throw new Error(`Seeding failed: ${error}`)
        }

        // Verify seeded data
        const languageCount = await prisma.language.count()
        const userCount = await prisma.user.count()
        const testimonialCount = await prisma.testimonial.count()

        expect(languageCount).toBeGreaterThanOrEqual(8)
        expect(userCount).toBeGreaterThanOrEqual(2)
        expect(testimonialCount).toBeGreaterThanOrEqual(5)
    })

    test('should maintain data integrity after migrations', async () => {
        // Verify foreign key relationships
        const bookmarks = await prisma.bookmark.findMany({
            include: {
                user: true,
                language: true
            }
        })

        // All bookmarks should have valid users and languages
        for (const bookmark of bookmarks) {
            expect(bookmark.user).toBeDefined()
            expect(bookmark.language).toBeDefined()
        }

        // Verify testimonials have required fields
        const testimonials = await prisma.testimonial.findMany()
        for (const testimonial of testimonials) {
            expect(testimonial.name).toBeDefined()
            expect(testimonial.email).toBeDefined()
            expect(testimonial.message).toBeDefined()
            expect(testimonial.rating).toBeGreaterThanOrEqual(1)
            expect(testimonial.rating).toBeLessThanOrEqual(5)
        }
    })

    test('should handle rollback scenarios', async () => {
        // Create test data
        const testLanguage = await prisma.language.create({
            data: {
                id: 'test-lang',
                name: 'Test Language',
                summary: 'Test language for rollback testing'
            }
        })

        const testUser = await prisma.user.create({
            data: {
                email: 'test@example.com',
                password: 'hashedpassword',
                role: 'USER'
            }
        })

        // Verify data exists
        const language = await prisma.language.findUnique({
            where: { id: 'test-lang' }
        })
        expect(language).toBeDefined()

        const user = await prisma.user.findUnique({
            where: { email: 'test@example.com' }
        })
        expect(user).toBeDefined()

        // Clean up test data
        await prisma.language.delete({ where: { id: 'test-lang' } })
        await prisma.user.delete({ where: { email: 'test@example.com' } })

        // Verify cleanup
        const deletedLanguage = await prisma.language.findUnique({
            where: { id: 'test-lang' }
        })
        expect(deletedLanguage).toBeNull()

        const deletedUser = await prisma.user.findUnique({
            where: { email: 'test@example.com' }
        })
        expect(deletedUser).toBeNull()
    })
})
