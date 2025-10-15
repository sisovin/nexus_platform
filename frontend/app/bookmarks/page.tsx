'use client'

import { useBookmarks } from '../hooks/use-bookmarks'
import Link from 'next/link'

// Mock user ID - in real app, get from auth context
const mockUserId = 'user-123'

export default function BookmarksPage() {
    const { bookmarks, loading, error } = useBookmarks(mockUserId)

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
                <div>Loading bookmarks...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
                <div className="text-red-600">Error loading bookmarks: {error}</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>

            {bookmarks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">You haven't bookmarked any languages yet.</p>
                    <Link
                        href="/languages"
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        Browse languages →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarks.map((bookmark) => (
                        <div
                            key={bookmark.id}
                            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {bookmark.language.name}
                            </h2>
                            {bookmark.language.ranking && (
                                <p className="text-sm text-gray-600 mb-2">
                                    Rank: #{bookmark.language.ranking}
                                </p>
                            )}
                            {bookmark.language.summary && (
                                <p className="text-sm mb-4">{bookmark.language.summary}</p>
                            )}
                            <Link
                                href={`/languages/${bookmark.languageId}`}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                View Details →
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
