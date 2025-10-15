import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Seed languages
    const languages = [
        { name: 'JavaScript', summary: 'Versatile scripting language', ranking: 1 },
        { name: 'Python', summary: 'Easy to learn, powerful language', ranking: 2 },
        { name: 'TypeScript', summary: 'Typed superset of JavaScript', ranking: 3 },
        { name: 'Java', summary: 'Object-oriented programming language', ranking: 4 },
        { name: 'C#', summary: 'Modern, object-oriented language', ranking: 5 },
    ]

    for (const lang of languages) {
        await prisma.language.upsert({
            where: { name: lang.name },
            update: {},
            create: lang,
        })
    }

    console.log('Seeded languages')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
