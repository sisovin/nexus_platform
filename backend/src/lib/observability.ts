import * as Sentry from '@sentry/node'

if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development'
    })
}

export const logger = {
    info: (message: string, meta?: any) => {
        console.log(`[INFO] ${message}`, meta)
    },
    error: (message: string, error?: any) => {
        console.error(`[ERROR] ${message}`, error)
        if (Sentry) {
            Sentry.captureException(error || new Error(message))
        }
    },
    warn: (message: string, meta?: any) => {
        console.warn(`[WARN] ${message}`, meta)
    }
}
