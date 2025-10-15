import { Request, Response } from 'express'
import { BookmarkService } from '../services/bookmarkService'
import { AuthRequest } from '../middleware/auth'

export const getUserBookmarks = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const bookmarks = await BookmarkService.getUserBookmarks(userId)
        res.json(bookmarks)
    } catch (error) {
        console.error('Error fetching bookmarks:', error)
        res.status(500).json({ error: 'Failed to fetch bookmarks' })
    }
}

export const addBookmark = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' })
        }

        const { languageId } = req.body
        if (!languageId) {
            return res.status(400).json({ error: 'Language ID is required' })
        }

        const result = await BookmarkService.toggleBookmark(userId, languageId)
        res.json(result)
    } catch (error: any) {
        console.error('Error toggling bookmark:', error)
        if (error.message === 'Bookmark already exists') {
            res.status(409).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Failed to toggle bookmark' })
        }
    }
}
