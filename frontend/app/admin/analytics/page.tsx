'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { apiClient } from '../../../lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { Eye, Globe, Bookmark, MessageSquare, RefreshCw, Home } from 'lucide-react'

interface AnalyticsData {
    pageViews: {
        totalViews: number
        uniquePages: number
        pageBreakdown: Record<string, number>
        timeRange: string
    }
    languageViews: {
        totalViews: number
        uniqueLanguages: number
        languageBreakdown: Record<string, number>
        timeRange: string
    }
    bookmarks: {
        totalBookmarks: number
        bookmarkActions: Record<string, number>
        timeRange: string
    }
    testimonials: {
        totalSubmissions: number
        timeRange: string
    }
    generatedAt: string
}

export default function AdminAnalyticsPage() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('week')

    const fetchAnalytics = async () => {
        setLoading(true)
        try {
            const data = await apiClient.get(`/admin/analytics?timeRange=${timeRange}`)
            setAnalytics(data)
            setError(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [timeRange])

    const handleRefresh = () => {
        fetchAnalytics()
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/admin" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Home className="h-4 w-4" />
                        Admin Dashboard
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <span>Analytics</span>
                </div>
                <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-4 w-24" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-8 w-16 mb-2" />
                                <Skeleton className="h-3 w-32" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/admin" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Home className="h-4 w-4" />
                        Admin Dashboard
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <span>Analytics</span>
                </div>
                <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
                <Alert variant="destructive">
                    <AlertDescription>
                        Error loading analytics: {error}
                    </AlertDescription>
                </Alert>
                <Button onClick={handleRefresh} className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                </Button>
            </div>
        )
    }

    if (!analytics) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/admin" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                        <Home className="h-4 w-4" />
                        Admin Dashboard
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <span>Analytics</span>
                </div>
                <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
                <Alert>
                    <AlertDescription>
                        No analytics data available.
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-2 mb-8">
                <Link href="/admin" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                    <Home className="h-4 w-4" />
                    Admin Dashboard
                </Link>
                <span className="text-muted-foreground">/</span>
                <span>Analytics</span>
            </div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <div className="flex items-center gap-4">
                    <Select value={timeRange} onValueChange={(value) => setTimeRange(value as 'day' | 'week' | 'month')}>
                        <SelectTrigger className="w-48">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Last 24 Hours</SelectItem>
                            <SelectItem value="week">Last 7 Days</SelectItem>
                            <SelectItem value="month">Last 30 Days</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleRefresh} variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Page Views Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.pageViews.totalViews.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {analytics.pageViews.uniquePages} unique pages
                        </p>
                    </CardContent>
                </Card>

                {/* Language Views Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Language Views</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.languageViews.totalViews.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {analytics.languageViews.uniqueLanguages} unique languages
                        </p>
                    </CardContent>
                </Card>

                {/* Bookmarks Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bookmarks</CardTitle>
                        <Bookmark className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.bookmarks.totalBookmarks.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            {(analytics.bookmarks.bookmarkActions.add || 0)} added, {(analytics.bookmarks.bookmarkActions.remove || 0)} removed
                        </p>
                    </CardContent>
                </Card>

                {/* Testimonials Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.testimonials.totalSubmissions.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Submissions</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Page Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Page Views Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {Object.entries(analytics.pageViews.pageBreakdown).map(([page, count]) => (
                                <div key={page} className="flex justify-between">
                                    <span className="text-sm">{page}</span>
                                    <span className="text-sm font-medium">{count.toLocaleString()}</span>
                                </div>
                            ))}
                            {Object.keys(analytics.pageViews.pageBreakdown).length === 0 && (
                                <p className="text-sm text-muted-foreground">No page views recorded</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Language Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Language Views Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {Object.entries(analytics.languageViews.languageBreakdown).map(([languageId, count]) => (
                                <div key={languageId} className="flex justify-between">
                                    <span className="text-sm">Language {languageId}</span>
                                    <span className="text-sm font-medium">{count.toLocaleString()}</span>
                                </div>
                            ))}
                            {Object.keys(analytics.languageViews.languageBreakdown).length === 0 && (
                                <p className="text-sm text-muted-foreground">No language views recorded</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-8 text-sm text-muted-foreground text-center">
                Last updated: {new Date(analytics.generatedAt).toLocaleString()}
            </div>
        </div>
    )
}
