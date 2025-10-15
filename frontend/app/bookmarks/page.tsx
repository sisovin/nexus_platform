'use client'

import { useBookmarks } from '../hooks/use-bookmarks'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Bookmark, Star, Home, ArrowRight } from 'lucide-react'

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

// Mock user ID - in real app, get from auth context
const mockUserId = 'user-123'

export default function BookmarksPage() {
    const { bookmarks, loading, error } = useBookmarks(mockUserId)

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <span>Bookmarks</span>
                </div>
                <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-16" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mb-4" />
                                <Skeleton className="h-4 w-24" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <span>Bookmarks</span>
                </div>
                <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>
                <Alert variant="destructive">
                    <AlertDescription>
                        Error loading bookmarks: {error}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-8">
                <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                    <Home className="h-4 w-4" />
                    Home
                </Link>
                <span className="text-muted-foreground">/</span>
                <span>Bookmarks</span>
            </div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Bookmarks</h1>
                <Button asChild>
                    <Link href="/languages">
                        Browse Languages
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            </div>

            {bookmarks.length === 0 ? (
                <Card className="max-w-md mx-auto">
                    <CardContent className="pt-6">
                        <div className="text-center">
                            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                            <p className="text-muted-foreground mb-4">
                                You haven't bookmarked any languages yet. Start exploring and save your favorites!
                            </p>
                            <Button asChild>
                                <Link href="/languages">
                                    Browse Languages
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookmarks.map((bookmark) => (
                        <Card key={bookmark.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bookmark className="h-5 w-5 text-primary" />
                                    {bookmark.language.name}
                                </CardTitle>
                                {bookmark.language.ranking && (
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 fill-current" />
                                        Rank #{bookmark.language.ranking}
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent>
                                {bookmark.language.summary && (
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {bookmark.language.summary}
                                    </p>
                                )}
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={`/languages/${bookmark.languageId}`}>
                                        View Details
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
