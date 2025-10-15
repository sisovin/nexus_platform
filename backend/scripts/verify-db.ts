#!/usr/bin/env tsx

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyDatabase() {
    console.log('🔍 Verifying database state...')

    try {
        // Check if collections exist and have expected data
        const languageCount = await prisma.language.count()
        const userCount = await prisma.user.count()
        const testimonialCount = await prisma.testimonial.count()
        const bookmarkCount = await prisma.bookmark.count()

        console.log('📊 Database verification results:')
        console.log(`   - Languages: ${languageCount} (expected: 8+)`)
        console.log(`   - Users: ${userCount} (expected: 2+)`)
        console.log(`   - Testimonials: ${testimonialCount} (expected: 5+)`)
        console.log(`   - Bookmarks: ${bookmarkCount} (expected: 3+)`)

        // Verify data integrity
        if (languageCount < 8) {
            throw new Error(`Insufficient languages: ${languageCount}`)
        }

        if (userCount < 2) {
            throw new Error(`Insufficient users: ${userCount}`)
        }

        if (testimonialCount < 5) {
            throw new Error(`Insufficient testimonials: ${testimonialCount}`)
        }

        if (bookmarkCount < 3) {
            throw new Error(`Insufficient bookmarks: ${bookmarkCount}`)
        }

        // Verify admin user exists
        const adminUser = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        })

        if (!adminUser) {
            throw new Error('Admin user not found')
        }

        console.log('✅ Admin user verified:', adminUser.email)

        // Verify sample data
        const sampleUser = await prisma.user.findFirst({
            where: { email: 'demo@nexusplatform.com' }
        })

        if (!sampleUser) {
            throw new Error('Sample user not found')
        }

        console.log('✅ Sample user verified:', sampleUser.email)

        // Verify relationships
        const userBookmarks = await prisma.bookmark.findMany({
            where: { userId: sampleUser.id },
            include: { language: true }
        })

        if (userBookmarks.length === 0) {
            throw new Error('Sample user has no bookmarks')
        }

        console.log(`✅ Sample user bookmarks verified: ${userBookmarks.length} bookmarks`)

        // Verify approved testimonials
        const approvedTestimonials = await prisma.testimonial.findMany({
            where: { isApproved: true }
        })

        if (approvedTestimonials.length === 0) {
            throw new Error('No approved testimonials found')
        }

        console.log(`✅ Approved testimonials verified: ${approvedTestimonials.length} testimonials`)

        console.log('🎉 Database verification completed successfully!')

    } catch (error) {
        console.error('❌ Database verification failed:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

verifyDatabase()
