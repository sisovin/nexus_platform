import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
    user?: {
        id: string
        email: string
        role: string
    }
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        res.status(401).json({ error: 'Access denied' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
}

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (req.user?.role !== 'ADMIN') {
        res.status(403).json({ error: 'Admin access required' })
        return
    }
    next()
}
