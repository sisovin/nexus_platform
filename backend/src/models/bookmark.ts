import { prisma } from '../lib/db'

export interface Bookmark {
    id: string
    userId: string
    languageId: string
    createdAt: Date
}

export const createBookmark = async (userId: string, languageId: string) => {
    return prisma.bookmark.create({
        data: {
            userId,
            languageId,
        },
    })
}

export const findBookmarksByUser = async (userId: string) => {
    return prisma.bookmark.findMany({
        where: { userId },
        include: {
            language: true,
        },
        orderBy: { createdAt: 'desc' },
    })
}

export const findBookmark = async (userId: string, languageId: string) => {
    return prisma.bookmark.findFirst({
        where: {
            userId,
            languageId,
        },
    })
}

export const deleteBookmark = async (userId: string, languageId: string) => {
    return prisma.bookmark.deleteMany({
        where: {
            userId,
            languageId,
        },
    })
}
