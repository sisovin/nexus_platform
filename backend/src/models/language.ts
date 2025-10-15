import { prisma } from '../lib/db'

export interface Language {
    id: string
    name: string
    summary: string | null
    ranking: number | null
    trendData: any | null
    resources: string[]
    images: string[]
}

export const findAllLanguages = async (limit = 50) => {
    return prisma.language.findMany({
        take: limit,
        orderBy: { ranking: 'asc' }
    })
}

export const findLanguageById = async (id: string) => {
    return prisma.language.findUnique({
        where: { id }
    })
}
