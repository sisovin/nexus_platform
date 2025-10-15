'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '../../../lib/api-client'

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

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
                <div>Loading analytics...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
                <div className="text-red-600">Error: {error}</div>
            </div>
        )
    }

    if (!analytics) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
                <div>No analytics data available</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'month')}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="day">Last 24 Hours</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Page Views Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Page Views</h3>
                    <div className="text-3xl font-bold text-blue-600">{analytics.pageViews.totalViews}</div>
                    <p className="text-sm text-gray-600">{analytics.pageViews.uniquePages} unique pages</p>
                </div>

                {/* Language Views Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Language Views</h3>
                    <div className="text-3xl font-bold text-green-600">{analytics.languageViews.totalViews}</div>
                    <p className="text-sm text-gray-600">{analytics.languageViews.uniqueLanguages} unique languages</p>
                </div>

                {/* Bookmarks Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Bookmarks</h3>
                    <div className="text-3xl font-bold text-yellow-600">{analytics.bookmarks.totalBookmarks}</div>
                    <p className="text-sm text-gray-600">
                        {analytics.bookmarks.bookmarkActions.add || 0} added, {analytics.bookmarks.bookmarkActions.remove || 0} removed
                    </p>
                </div>

                {/* Testimonials Card */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Testimonials</h3>
                    <div className="text-3xl font-bold text-purple-600">{analytics.testimonials.totalSubmissions}</div>
                    <p className="text-sm text-gray-600">Submissions</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Page Breakdown */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Page Views Breakdown</h3>
                    <div className="space-y-2">
                        {Object.entries(analytics.pageViews.pageBreakdown).map(([page, count]) => (
                            <div key={page} className="flex justify-between">
                                <span className="text-sm">{page}</span>
                                <span className="text-sm font-medium">{count}</span>
                            </div>
                        ))}
                        {Object.keys(analytics.pageViews.pageBreakdown).length === 0 && (
                            <p className="text-sm text-gray-500">No page views recorded</p>
                        )}
                    </div>
                </div>

                {/* Language Breakdown */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Language Views Breakdown</h3>
                    <div className="space-y-2">
                        {Object.entries(analytics.languageViews.languageBreakdown).map(([languageId, count]) => (
                            <div key={languageId} className="flex justify-between">
                                <span className="text-sm">Language {languageId}</span>
                                <span className="text-sm font-medium">{count}</span>
                            </div>
                        ))}
                        {Object.keys(analytics.languageViews.languageBreakdown).length === 0 && (
                            <p className="text-sm text-gray-500">No language views recorded</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 text-sm text-gray-500 text-center">
                Last updated: {new Date(analytics.generatedAt).toLocaleString()}
            </div>
        </div>
    )
}
