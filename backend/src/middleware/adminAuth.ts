import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from './auth'

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

        if (decoded.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Access denied. Admin role required.' })
        }

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' })
    }
}

export const requireSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

        if (decoded.role !== 'SUPER_ADMIN') {
            return res.status(403).json({ error: 'Access denied. Super admin role required.' })
        }

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' })
    }
}
