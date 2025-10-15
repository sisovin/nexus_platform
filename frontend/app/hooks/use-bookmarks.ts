import { useState, useEffect } from 'react'
import { apiClient } from '../../lib/api-client'

interface Language {
    id: string
    name: string
    summary: string | null
    ranking: number | null
}

interface Bookmark {
    id: string
    languageId: string
    language: Language
    createdAt: string
}

export function useBookmarks(userId?: string) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchBookmarks = async () => {
        if (!userId) return

        setLoading(true)
        try {
            const data = await apiClient.get('/user/bookmarks')
            setBookmarks(data)
            setError(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleBookmark = async (languageId: string) => {
        if (!userId) return

        try {
            const result = await apiClient.post('/user/bookmarks', { languageId })
            if (result.action === 'added') {
                setBookmarks(prev => [...prev, result.bookmark])
            } else if (result.action === 'removed') {
                setBookmarks(prev => prev.filter(b => b.languageId !== languageId))
            }
            return result
        } catch (err: any) {
            setError(err.message)
            throw err
        }
    }

    const isBookmarked = (languageId: string) => {
        return bookmarks.some(b => b.languageId === languageId)
    }

    useEffect(() => {
        fetchBookmarks()
    }, [userId])

    return {
        bookmarks,
        loading,
        error,
        toggleBookmark,
        isBookmarked,
        refetch: fetchBookmarks,
    }
}
