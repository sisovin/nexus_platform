'use client'

import { useBookmarks } from '../../hooks/use-bookmarks'

interface BookmarkButtonProps {
    languageId: string
    userId?: string
    className?: string
}

export default function BookmarkButton({
    languageId,
    userId,
    className = '',
}: BookmarkButtonProps) {
    const { toggleBookmark, isBookmarked, loading } = useBookmarks(userId)

    const handleClick = async () => {
        if (!userId) {
            alert('Please log in to bookmark languages')
            return
        }

        try {
            await toggleBookmark(languageId)
        } catch (error) {
            console.error('Failed to toggle bookmark:', error)
        }
    }

    const isBookmarkedState = isBookmarked(languageId)

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`p-2 rounded-full transition-colors ${isBookmarkedState
                    ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${className}`}
            aria-label={isBookmarkedState ? 'Remove bookmark' : 'Add bookmark'}
        >
            {loading ? (
                <span className="text-sm">...</span>
            ) : (
                <svg
                    className="w-5 h-5"
                    fill={isBookmarkedState ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
            )}
        </button>
    )
}
