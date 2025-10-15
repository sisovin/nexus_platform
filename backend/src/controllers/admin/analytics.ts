import { Request, Response } from 'express'
import { analyticsService } from '../../lib/analytics'

export const getAnalytics = async (req: Request, res: Response) => {
    try {
        const { timeRange } = req.query

        // Validate timeRange parameter
        const validRanges = ['day', 'week', 'month']
        const range = validRanges.includes(timeRange as string) ? timeRange as 'day' | 'week' | 'month' : 'week'

        const analytics = analyticsService.getDashboardStats()

        // Override time ranges if specified
        if (timeRange) {
            analytics.pageViews = analyticsService.getPageViewStats(range)
            analytics.languageViews = analyticsService.getLanguageViewStats(range)
            analytics.bookmarks = analyticsService.getBookmarkStats(range)
            analytics.testimonials = analyticsService.getTestimonialStats(range)
        }

        res.json(analytics)
    } catch (error) {
        console.error('Error fetching analytics:', error)
        res.status(500).json({ error: 'Failed to fetch analytics' })
    }
}

export const getPageViewAnalytics = async (req: Request, res: Response) => {
    try {
        const { timeRange } = req.query
        const range = timeRange as 'day' | 'week' | 'month' || 'week'

        const stats = analyticsService.getPageViewStats(range)
        res.json(stats)
    } catch (error) {
        console.error('Error fetching page view analytics:', error)
        res.status(500).json({ error: 'Failed to fetch page view analytics' })
    }
}

export const getLanguageViewAnalytics = async (req: Request, res: Response) => {
    try {
        const { timeRange } = req.query
        const range = timeRange as 'day' | 'week' | 'month' || 'week'

        const stats = analyticsService.getLanguageViewStats(range)
        res.json(stats)
    } catch (error) {
        console.error('Error fetching language view analytics:', error)
        res.status(500).json({ error: 'Failed to fetch language view analytics' })
    }
}

export const getBookmarkAnalytics = async (req: Request, res: Response) => {
    try {
        const { timeRange } = req.query
        const range = timeRange as 'day' | 'week' | 'month' || 'week'

        const stats = analyticsService.getBookmarkStats(range)
        res.json(stats)
    } catch (error) {
        console.error('Error fetching bookmark analytics:', error)
        res.status(500).json({ error: 'Failed to fetch bookmark analytics' })
    }
}

export const getTestimonialAnalytics = async (req: Request, res: Response) => {
    try {
        const { timeRange } = req.query
        const range = timeRange as 'day' | 'week' | 'month' || 'week'

        const stats = analyticsService.getTestimonialStats(range)
        res.json(stats)
    } catch (error) {
        console.error('Error fetching testimonial analytics:', error)
        res.status(500).json({ error: 'Failed to fetch testimonial analytics' })
    }
}
