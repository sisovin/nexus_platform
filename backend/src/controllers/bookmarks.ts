import { Request, Response } from 'express'
import { BookmarkService } from '../services/bookmarkService'
import { AuthRequest } from '../middleware/auth'

export const getUserBookmarks = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }

        const bookmarks = await BookmarkService.getUserBookmarks(userId)
        res.json(bookmarks)
        return
    } catch (error) {
        console.error('Error fetching bookmarks:', error)
        res.status(500).json({ error: 'Failed to fetch bookmarks' })
        return
    }
}

export const addBookmark = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }

        const { languageId } = req.body
        if (!languageId) {
            res.status(400).json({ error: 'Language ID is required' })
            return
        }

        const result = await BookmarkService.toggleBookmark(userId, languageId)
        res.json(result)
        return
    } catch (error: any) {
        console.error('Error toggling bookmark:', error)
        if (error.message === 'Bookmark already exists') {
            res.status(409).json({ error: error.message })
        } else {
            res.status(500).json({ error: 'Failed to toggle bookmark' })
        }
        return
    }
}
