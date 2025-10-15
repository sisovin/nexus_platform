import {
    createBookmark,
    findBookmarksByUser,
    findBookmark,
    deleteBookmark,
} from '../models/bookmark'

export class BookmarkService {
    static async addBookmark(userId: string, languageId: string) {
        // Check if bookmark already exists
        const existing = await findBookmark(userId, languageId)
        if (existing) {
            throw new Error('Bookmark already exists')
        }

        return createBookmark(userId, languageId)
    }

    static async getUserBookmarks(userId: string) {
        return findBookmarksByUser(userId)
    }

    static async removeBookmark(userId: string, languageId: string) {
        const existing = await findBookmark(userId, languageId)
        if (!existing) {
            throw new Error('Bookmark not found')
        }

        return deleteBookmark(userId, languageId)
    }

    static async toggleBookmark(userId: string, languageId: string) {
        const existing = await findBookmark(userId, languageId)
        if (existing) {
            await this.removeBookmark(userId, languageId)
            return { action: 'removed', bookmark: null }
        } else {
            const bookmark = await this.addBookmark(userId, languageId)
            return { action: 'added', bookmark }
        }
    }
}
