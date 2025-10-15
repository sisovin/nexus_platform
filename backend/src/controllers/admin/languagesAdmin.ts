import { Request, Response } from 'express'
import { prisma } from '../../lib/db'

export const getAllLanguages = async (req: Request, res: Response): Promise<void> => {
    try {
        const languages = await prisma.language.findMany({
            orderBy: { ranking: 'asc' },
        })
        res.json(languages)
        return
    } catch (error) {
        console.error('Error fetching languages:', error)
        res.status(500).json({ error: 'Failed to fetch languages' })
        return
    }
}

export const getLanguageById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        if (!id) {
            res.status(400).json({ error: 'Language ID is required' })
            return
        }
        const language = await prisma.language.findUnique({
            where: { id },
        })

        if (!language) {
            res.status(404).json({ error: 'Language not found' })
            return
        }

        res.json(language)
        return
    } catch (error) {
        console.error('Error fetching language:', error)
        res.status(500).json({ error: 'Failed to fetch language' })
        return
    }
}

export const createLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, summary, ranking, trendData, resources, images } = req.body

        // Validation
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            res.status(400).json({ error: 'Name is required and must be a non-empty string' })
            return
        }

        if (ranking !== undefined && (typeof ranking !== 'number' || ranking < 1)) {
            res.status(400).json({ error: 'Ranking must be a positive number' })
            return
        }

        // Check if language already exists
        const existing = await prisma.language.findUnique({
            where: { name: name.trim() },
        })

        if (existing) {
            res.status(409).json({ error: 'Language with this name already exists' })
            return
        }

        const language = await prisma.language.create({
            data: {
                name: name.trim(),
                summary: summary?.trim() || null,
                ranking: ranking || null,
                trendData: trendData || null,
                resources: resources || [],
                images: images || [],
            },
        })

        res.status(201).json(language)
        return
    } catch (error) {
        console.error('Error creating language:', error)
        res.status(500).json({ error: 'Failed to create language' })
        return
    }
}

export const updateLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { name, summary, ranking, trendData, resources, images } = req.body

        if (!id) {
            res.status(400).json({ error: 'Language ID is required' })
            return
        }

        // Validation
        if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
            res.status(400).json({ error: 'Name must be a non-empty string' })
            return
        }

        if (ranking !== undefined && (typeof ranking !== 'number' || ranking < 1)) {
            res.status(400).json({ error: 'Ranking must be a positive number' })
            return
        }

        // Check if language exists
        const existing = await prisma.language.findUnique({
            where: { id },
        })

        if (!existing) {
            res.status(404).json({ error: 'Language not found' })
            return
        }

        // Check if new name conflicts with existing language
        if (name && name.trim() !== existing.name) {
            const nameConflict = await prisma.language.findUnique({
                where: { name: name.trim() },
            })

            if (nameConflict) {
                res.status(409).json({ error: 'Language with this name already exists' })
                return
            }
        }

        const language = await prisma.language.update({
            where: { id },
            data: {
                ...(name !== undefined && { name: name.trim() }),
                ...(summary !== undefined && { summary: summary?.trim() || null }),
                ...(ranking !== undefined && { ranking }),
                ...(trendData !== undefined && { trendData }),
                ...(resources !== undefined && { resources }),
                ...(images !== undefined && { images }),
            },
        })

        res.json(language)
        return
    } catch (error) {
        console.error('Error updating language:', error)
        res.status(500).json({ error: 'Failed to update language' })
        return
    }
}

export const deleteLanguage = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        if (!id) {
            res.status(400).json({ error: 'Language ID is required' })
            return
        }

        // Check if language exists
        const existing = await prisma.language.findUnique({
            where: { id },
        })

        if (!existing) {
            res.status(404).json({ error: 'Language not found' })
            return
        }

        // Check if language has bookmarks (prevent deletion if it does)
        const bookmarkCount = await prisma.bookmark.count({
            where: { languageId: id },
        })

        if (bookmarkCount > 0) {
            res.status(409).json({
                error: 'Cannot delete language that has bookmarks. Remove all bookmarks first.',
            })
            return
        }

        await prisma.language.delete({
            where: { id },
        })

        res.json({ message: 'Language deleted successfully' })
        return
    } catch (error) {
        console.error('Error deleting language:', error)
        res.status(500).json({ error: 'Failed to delete language' })
        return
    }
}
