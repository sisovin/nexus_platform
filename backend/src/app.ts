import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './routes'

const app: express.Application = express()
const PORT = process.env.PORT || 3333

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API routes
app.use('/api', routes)

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Something went wrong!' })
})

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`)
    })
}

export default app
