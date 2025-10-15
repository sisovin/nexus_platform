import { Request, Response } from 'express'
import { findAllLanguages, findLanguageById } from '../models/language'

export const getLanguages = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50
        const languages = await findAllLanguages(limit)
        res.json(languages)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch languages' })
    }
}

export const getLanguageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const language = await findLanguageById(id)
        if (!language) {
            return res.status(404).json({ error: 'Language not found' })
        }
        res.json(language)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch language' })
    }
}
