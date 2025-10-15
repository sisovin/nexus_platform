import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createUserIfNotExists(email: string, name: string, password: string, role: string) {
    try {
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) {
            console.log(`User ${email} already exists`)
            return existing
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role,
            },
        })
        console.log(`Created user: ${email}`)
        return user
    } catch (error: any) {
        console.log(`Error creating user ${email}:`, error.message)
        // Try to find existing user
        return await prisma.user.findUnique({ where: { email } })
    }
}

async function createLanguageIfNotExists(langData: any) {
    try {
        const existing = await prisma.language.findUnique({ where: { id: langData.id } })
        if (existing) {
            console.log(`Language ${langData.name} already exists`)
            return existing
        }

        const language = await prisma.language.create({ data: langData })
        console.log(`Created language: ${langData.name}`)
        return language
    } catch (error: any) {
        console.log(`Error creating language ${langData.name}:`, error.message)
    }
}

async function createTestimonialIfNotExists(testimonialData: any) {
    try {
        // Since testimonials don't have unique constraints, we'll just create them
        const testimonial = await prisma.testimonial.create({ data: testimonialData })
        console.log(`Created testimonial for: ${testimonialData.name}`)
        return testimonial
    } catch (error: any) {
        console.log(`Error creating testimonial for ${testimonialData.name}:`, error.message)
    }
}

async function createBookmarkIfNotExists(bookmarkData: any) {
    try {
        const existing = await prisma.bookmark.findFirst({
            where: {
                userId: bookmarkData.userId,
                languageId: bookmarkData.languageId
            }
        })
        if (existing) {
            console.log(`Bookmark already exists for user ${bookmarkData.userId} and language ${bookmarkData.languageId}`)
            return existing
        }

        const bookmark = await prisma.bookmark.create({ data: bookmarkData })
        console.log(`Created bookmark for user ${bookmarkData.userId}`)
        return bookmark
    } catch (error: any) {
        console.log(`Error creating bookmark:`, error.message)
    }
}

async function main() {
    console.log('🌱 Starting database seeding...')

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@nexusplatform.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminPas$&123'

    const admin = await createUserIfNotExists(adminEmail, 'Admin User', adminPassword, 'ADMIN')
    console.log('✅ Admin user ready:', admin?.email)

    // Seed programming languages with comprehensive data
    const languages = [
        {
            id: 'javascript',
            name: 'JavaScript',
            summary: 'A versatile, high-level programming language primarily used for web development. Known for its ability to run in browsers and on servers.',
            ranking: 1,
            trendData: {
                popularity: 95,
                growth: 2.3,
                jobDemand: 89,
                learningCurve: 'Medium'
            },
            resources: [
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                'https://javascript.info/',
                'https://eloquentjavascript.net/'
            ],
            images: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
            ]
        },
        {
            id: 'python',
            name: 'Python',
            summary: 'A high-level, interpreted programming language known for its simplicity and readability. Widely used in data science, AI, and web development.',
            ranking: 2,
            trendData: {
                popularity: 92,
                growth: 3.1,
                jobDemand: 94,
                learningCurve: 'Easy'
            },
            resources: [
                'https://docs.python.org/3/',
                'https://realpython.com/',
                'https://www.python.org/about/gettingstarted/'
            ],
            images: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
            ]
        },
        {
            id: 'typescript',
            name: 'TypeScript',
            summary: 'A strongly typed superset of JavaScript that compiles to plain JavaScript. Adds static typing and advanced features to JavaScript.',
            ranking: 3,
            trendData: {
                popularity: 88,
                growth: 4.2,
                jobDemand: 87,
                learningCurve: 'Medium'
            },
            resources: [
                'https://www.typescriptlang.org/docs/',
                'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
                'https://basarat.gitbook.io/typescript/'
            ],
            images: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
            ]
        },
        {
            id: 'java',
            name: 'Java',
            summary: 'A class-based, object-oriented programming language designed to have as few implementation dependencies as possible.',
            ranking: 4,
            trendData: {
                popularity: 85,
                growth: 1.8,
                jobDemand: 82,
                learningCurve: 'Medium'
            },
            resources: [
                'https://docs.oracle.com/en/java/',
                'https://www.oracle.com/java/technologies/javase-downloads.html',
                'https://www.baeldung.com/java-tutorial'
            ],
            images: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
            ]
        },
        {
            id: 'csharp',
            name: 'C#',
            summary: 'A modern, object-oriented programming language developed by Microsoft. Used for building Windows applications, games, and web services.',
            ranking: 5,
            trendData: {
                popularity: 78,
                growth: 2.1,
                jobDemand: 76,
                learningCurve: 'Medium'
            },
            resources: [
                'https://docs.microsoft.com/en-us/dotnet/csharp/',
                'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/',
                'https://www.w3schools.com/cs/index.php'
            ],
            images: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg'
            ]
        },
        {
            id: 'golang',
            name: 'Go',
            summary: 'A statically typed, compiled programming language designed at Google. Known for its simplicity, efficiency, and strong support for concurrent programming.',
            ranking: 6,
            trendData: {
                popularity: 72,
                growth: 3.8,
                jobDemand: 79,
                learningCurve: 'Medium'
            },
            resources: [
                'https://golang.org/doc/',
                'https://golang.org/learn/',
                'https://tour.golang.org/'
            ],
            images: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg'
            ]
        },
        {
            id: 'rust',
            name: 'Rust',
            summary: 'A systems programming language focused on safety, speed, and concurrency. Provides memory safety without garbage collection.',
            ranking: 7,
            trendData: {
                popularity: 68,
                growth: 5.2,
                jobDemand: 71,
                learningCurve: 'Hard'
            },
            resources: [
                'https://www.rust-lang.org/learn',
                'https://doc.rust-lang.org/book/',
                'https://www.rust-lang.org/learn/get-started'
            ],
            images: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg'
            ]
        },
        {
            id: 'kotlin',
            name: 'Kotlin',
            summary: 'A modern programming language that makes developers happier. Fully interoperable with Java and designed for the JVM.',
            ranking: 8,
            trendData: {
                popularity: 65,
                growth: 4.1,
                jobDemand: 68,
                learningCurve: 'Medium'
            },
            resources: [
                'https://kotlinlang.org/docs/',
                'https://play.kotlinlang.org/',
                'https://kotlinlang.org/docs/kotlin-docs.pdf'
            ],
            images: [
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg'
            ]
        }
    ]

    let languageCount = 0
    for (const lang of languages) {
        await createLanguageIfNotExists(lang)
        languageCount++
    }
    console.log(`✅ Processed ${languageCount} programming languages`)

    // Seed testimonials
    const testimonials = [
        {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            message: 'Nexus Platform helped me discover Python and start my journey in data science. The detailed language comparisons and resources were invaluable!',
            status: 'APPROVED',
        },
        {
            name: 'Michael Chen',
            email: 'm.chen@example.com',
            message: 'As a bootcamp graduate, I was overwhelmed by language choices. This platform made it clear which languages to focus on for web development.',
            status: 'APPROVED',
        },
        {
            name: 'Emily Rodriguez',
            email: 'emily.r@example.com',
            message: 'The trend analysis and job market insights helped me choose TypeScript for my career transition. Highly recommend!',
            status: 'APPROVED',
        },
        {
            name: 'David Kim',
            email: 'david.kim@example.com',
            message: 'Great platform for staying updated with programming language trends. The bookmark feature helps me keep track of languages I want to learn.',
            status: 'APPROVED',
        },
        {
            name: 'Lisa Thompson',
            email: 'lisa.t@example.com',
            message: 'The mobile app is fantastic! I can browse languages on the go and the offline functionality works perfectly.',
            status: 'APPROVED',
        }
    ]

    let testimonialCount = 0
    for (const testimonial of testimonials) {
        await createTestimonialIfNotExists(testimonial)
        testimonialCount++
    }
    console.log(`✅ Processed ${testimonialCount} testimonials`)

    // Create sample bookmarks for demo purposes
    const sampleUser = await createUserIfNotExists('demo@nexusplatform.com', 'Demo User', 'demo123', 'USER')

    if (sampleUser) {
        const sampleBookmarks = [
            { userId: sampleUser.id, languageId: 'python' },
            { userId: sampleUser.id, languageId: 'typescript' },
            { userId: sampleUser.id, languageId: 'golang' },
        ]

        let bookmarkCount = 0
        for (const bookmark of sampleBookmarks) {
            await createBookmarkIfNotExists(bookmark)
            bookmarkCount++
        }
        console.log(`✅ Processed ${bookmarkCount} sample bookmarks`)
    }

    console.log('🎉 Database seeding completed successfully!')
    console.log('')
    console.log('📊 Summary:')
    console.log(`   - Admin user: ${admin?.email || 'N/A'}`)
    console.log(`   - Languages: ${languageCount}`)
    console.log(`   - Testimonials: ${testimonialCount}`)
    console.log(`   - Sample user: ${sampleUser?.email || 'N/A'}`)
    console.log(`   - Bookmarks: ${sampleUser ? 3 : 0}`)
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
