import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seeding...')

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@nexusplatform.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    const hashedPassword = await bcrypt.hash(adminPassword, 12)

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: hashedPassword,
            role: 'ADMIN',
        },
    })

    console.log('✅ Admin user created:', admin.email)

    // Seed programming languages with comprehensive data
    const languages = [
        {
            id: 'javascript',
            name: 'JavaScript',
            summary: 'A versatile, high-level programming language primarily used for web development. Known for its ability to run in browsers and on servers.',
            ranking: 1,
            trendData: JSON.stringify({
                popularity: 95,
                growth: 2.3,
                jobDemand: 89,
                learningCurve: 'Medium'
            }),
            resources: JSON.stringify([
                'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                'https://javascript.info/',
                'https://eloquentjavascript.net/'
            ]),
            images: JSON.stringify([
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'
            ])
        },
        {
            id: 'python',
            name: 'Python',
            summary: 'A high-level, interpreted programming language known for its simplicity and readability. Widely used in data science, AI, and web development.',
            ranking: 2,
            trendData: JSON.stringify({
                popularity: 92,
                growth: 3.1,
                jobDemand: 94,
                learningCurve: 'Easy'
            }),
            resources: JSON.stringify([
                'https://docs.python.org/3/',
                'https://realpython.com/',
                'https://www.python.org/about/gettingstarted/'
            ]),
            images: JSON.stringify([
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
            ])
        },
        {
            id: 'typescript',
            name: 'TypeScript',
            summary: 'A strongly typed superset of JavaScript that compiles to plain JavaScript. Adds static typing and advanced features to JavaScript.',
            ranking: 3,
            trendData: JSON.stringify({
                popularity: 88,
                growth: 4.2,
                jobDemand: 87,
                learningCurve: 'Medium'
            }),
            resources: JSON.stringify([
                'https://www.typescriptlang.org/docs/',
                'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html',
                'https://basarat.gitbook.io/typescript/'
            ]),
            images: JSON.stringify([
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
            ])
        },
        {
            id: 'java',
            name: 'Java',
            summary: 'A class-based, object-oriented programming language designed to have as few implementation dependencies as possible.',
            ranking: 4,
            trendData: JSON.stringify({
                popularity: 85,
                growth: 1.8,
                jobDemand: 82,
                learningCurve: 'Medium'
            }),
            resources: JSON.stringify([
                'https://docs.oracle.com/en/java/',
                'https://www.oracle.com/java/technologies/javase-downloads.html',
                'https://www.baeldung.com/java-tutorial'
            ]),
            images: JSON.stringify([
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
            ])
        },
        {
            id: 'csharp',
            name: 'C#',
            summary: 'A modern, object-oriented programming language developed by Microsoft. Used for building Windows applications, games, and web services.',
            ranking: 5,
            trendData: JSON.stringify({
                popularity: 78,
                growth: 2.1,
                jobDemand: 76,
                learningCurve: 'Medium'
            }),
            resources: JSON.stringify([
                'https://docs.microsoft.com/en-us/dotnet/csharp/',
                'https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/',
                'https://www.w3schools.com/cs/index.php'
            ]),
            images: JSON.stringify([
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg'
            ])
        },
        {
            id: 'golang',
            name: 'Go',
            summary: 'A statically typed, compiled programming language designed at Google. Known for its simplicity, efficiency, and strong support for concurrent programming.',
            ranking: 6,
            trendData: JSON.stringify({
                popularity: 72,
                growth: 3.8,
                jobDemand: 79,
                learningCurve: 'Medium'
            }),
            resources: JSON.stringify([
                'https://golang.org/doc/',
                'https://golang.org/learn/',
                'https://tour.golang.org/'
            ]),
            images: JSON.stringify([
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg'
            ])
        },
        {
            id: 'rust',
            name: 'Rust',
            summary: 'A systems programming language focused on safety, speed, and concurrency. Provides memory safety without garbage collection.',
            ranking: 7,
            trendData: JSON.stringify({
                popularity: 68,
                growth: 5.2,
                jobDemand: 71,
                learningCurve: 'Hard'
            }),
            resources: JSON.stringify([
                'https://www.rust-lang.org/learn',
                'https://doc.rust-lang.org/book/',
                'https://www.rust-lang.org/learn/get-started'
            ]),
            images: JSON.stringify([
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg'
            ])
        },
        {
            id: 'kotlin',
            name: 'Kotlin',
            summary: 'A modern programming language that makes developers happier. Fully interoperable with Java and designed for the JVM.',
            ranking: 8,
            trendData: JSON.stringify({
                popularity: 65,
                growth: 4.1,
                jobDemand: 68,
                learningCurve: 'Medium'
            }),
            resources: JSON.stringify([
                'https://kotlinlang.org/docs/',
                'https://play.kotlinlang.org/',
                'https://kotlinlang.org/docs/kotlin-docs.pdf'
            ]),
            images: JSON.stringify([
                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg'
            ])
        }
    ]

    for (const lang of languages) {
        await prisma.language.upsert({
            where: { id: lang.id },
            update: lang,
            create: lang,
        })
    }

    console.log('✅ Seeded programming languages')

    // Seed testimonials
    const testimonials = [
        {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            message: 'Nexus Platform helped me discover Python and start my journey in data science. The detailed language comparisons and resources were invaluable!',
            rating: 5,
            isApproved: true,
        },
        {
            name: 'Michael Chen',
            email: 'm.chen@example.com',
            message: 'As a bootcamp graduate, I was overwhelmed by language choices. This platform made it clear which languages to focus on for web development.',
            rating: 5,
            isApproved: true,
        },
        {
            name: 'Emily Rodriguez',
            email: 'emily.r@example.com',
            message: 'The trend analysis and job market insights helped me choose TypeScript for my career transition. Highly recommend!',
            rating: 4,
            isApproved: true,
        },
        {
            name: 'David Kim',
            email: 'david.kim@example.com',
            message: 'Great platform for staying updated with programming language trends. The bookmark feature helps me keep track of languages I want to learn.',
            rating: 5,
            isApproved: true,
        },
        {
            name: 'Lisa Thompson',
            email: 'lisa.t@example.com',
            message: 'The mobile app is fantastic! I can browse languages on the go and the offline functionality works perfectly.',
            rating: 5,
            isApproved: true,
        }
    ]

    for (const testimonial of testimonials) {
        await prisma.testimonial.upsert({
            where: { email: testimonial.email },
            update: testimonial,
            create: testimonial,
        })
    }

    console.log('✅ Seeded testimonials')

    // Create sample bookmarks for demo purposes
    const sampleUser = await prisma.user.create({
        data: {
            email: 'demo@nexusplatform.com',
            password: await bcrypt.hash('demo123', 12),
            role: 'USER',
        }
    })

    const sampleBookmarks = [
        { userId: sampleUser.id, languageId: 'python' },
        { userId: sampleUser.id, languageId: 'typescript' },
        { userId: sampleUser.id, languageId: 'golang' },
    ]

    for (const bookmark of sampleBookmarks) {
        await prisma.bookmark.upsert({
            where: {
                userId_languageId: {
                    userId: bookmark.userId,
                    languageId: bookmark.languageId
                }
            },
            update: {},
            create: bookmark,
        })
    }

    console.log('✅ Seeded sample bookmarks')

    console.log('🎉 Database seeding completed successfully!')
    console.log('')
    console.log('📊 Summary:')
    console.log(`   - Admin user: ${admin.email}`)
    console.log(`   - Languages: ${languages.length}`)
    console.log(`   - Testimonials: ${testimonials.length}`)
    console.log(`   - Sample user: ${sampleUser.email}`)
    console.log(`   - Bookmarks: ${sampleBookmarks.length}`)
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
