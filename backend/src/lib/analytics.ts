interface AnalyticsEvent {
    id: string
    eventType: string
    userId?: string
    languageId?: string
    page?: string
    userAgent?: string
    ipAddress?: string
    timestamp: Date
    metadata?: Record<string, any>
}

class AnalyticsService {
    private events: AnalyticsEvent[] = []

    // Track page views
    trackPageView(userId: string | undefined, page: string, userAgent?: string, ipAddress?: string) {
        this.recordEvent({
            eventType: 'page_view',
            userId,
            page,
            userAgent,
            ipAddress,
            metadata: { page },
        })
    }

    // Track language views
    trackLanguageView(userId: string | undefined, languageId: string, userAgent?: string, ipAddress?: string) {
        this.recordEvent({
            eventType: 'language_view',
            userId,
            languageId,
            userAgent,
            ipAddress,
            metadata: { languageId },
        })
    }

    // Track bookmark actions
    trackBookmark(userId: string, languageId: string, action: 'add' | 'remove') {
        this.recordEvent({
            eventType: 'bookmark',
            userId,
            languageId,
            metadata: { action },
        })
    }

    // Track testimonial submissions
    trackTestimonialSubmission(userId: string | undefined) {
        this.recordEvent({
            eventType: 'testimonial_submit',
            userId,
            metadata: { submitted: true },
        })
    }

    // Generic event recording
    private recordEvent(eventData: Omit<AnalyticsEvent, 'id' | 'timestamp'>) {
        const event: AnalyticsEvent = {
            id: this.generateId(),
            timestamp: new Date(),
            ...eventData,
        }

        this.events.push(event)

        // In a real implementation, this would be persisted to a database
        // For now, we'll just log it
        console.log('Analytics event:', event)
    }

    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2)
    }

    // Analytics reporting methods
    getPageViewStats(timeRange: 'day' | 'week' | 'month' = 'week') {
        const now = new Date()
        const startDate = new Date()

        switch (timeRange) {
            case 'day':
                startDate.setDate(now.getDate() - 1)
                break
            case 'week':
                startDate.setDate(now.getDate() - 7)
                break
            case 'month':
                startDate.setMonth(now.getMonth() - 1)
                break
        }

        const pageViews = this.events.filter(
            event => event.eventType === 'page_view' && event.timestamp >= startDate
        )

        const pageStats = pageViews.reduce((acc, event) => {
            const page = event.page || 'unknown'
            acc[page] = (acc[page] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        return {
            totalViews: pageViews.length,
            uniquePages: Object.keys(pageStats).length,
            pageBreakdown: pageStats,
            timeRange,
        }
    }

    getLanguageViewStats(timeRange: 'day' | 'week' | 'month' = 'week') {
        const now = new Date()
        const startDate = new Date()

        switch (timeRange) {
            case 'day':
                startDate.setDate(now.getDate() - 1)
                break
            case 'week':
                startDate.setDate(now.getDate() - 7)
                break
            case 'month':
                startDate.setMonth(now.getMonth() - 1)
                break
        }

        const languageViews = this.events.filter(
            event => event.eventType === 'language_view' && event.timestamp >= startDate
        )

        const languageStats = languageViews.reduce((acc, event) => {
            const languageId = event.languageId || 'unknown'
            acc[languageId] = (acc[languageId] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        return {
            totalViews: languageViews.length,
            uniqueLanguages: Object.keys(languageStats).length,
            languageBreakdown: languageStats,
            timeRange,
        }
    }

    getBookmarkStats(timeRange: 'day' | 'week' | 'month' = 'week') {
        const now = new Date()
        const startDate = new Date()

        switch (timeRange) {
            case 'day':
                startDate.setDate(now.getDate() - 1)
                break
            case 'week':
                startDate.setDate(now.getDate() - 7)
                break
            case 'month':
                startDate.setMonth(now.getMonth() - 1)
                break
        }

        const bookmarks = this.events.filter(
            event => event.eventType === 'bookmark' && event.timestamp >= startDate
        )

        const bookmarkStats = bookmarks.reduce((acc, event) => {
            const action = event.metadata?.action || 'unknown'
            acc[action] = (acc[action] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        return {
            totalBookmarks: bookmarks.length,
            bookmarkActions: bookmarkStats,
            timeRange,
        }
    }

    getTestimonialStats(timeRange: 'day' | 'week' | 'month' = 'week') {
        const now = new Date()
        const startDate = new Date()

        switch (timeRange) {
            case 'day':
                startDate.setDate(now.getDate() - 1)
                break
            case 'week':
                startDate.setDate(now.getDate() - 7)
                break
            case 'month':
                startDate.setMonth(now.getMonth() - 1)
                break
        }

        const testimonials = this.events.filter(
            event => event.eventType === 'testimonial_submit' && event.timestamp >= startDate
        )

        return {
            totalSubmissions: testimonials.length,
            timeRange,
        }
    }

    // Get comprehensive analytics dashboard data
    getDashboardStats() {
        return {
            pageViews: this.getPageViewStats(),
            languageViews: this.getLanguageViewStats(),
            bookmarks: this.getBookmarkStats(),
            testimonials: this.getTestimonialStats(),
            generatedAt: new Date().toISOString(),
        }
    }
}

// Export singleton instance
export const analyticsService = new AnalyticsService()
