import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from './auth'

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

        if (decoded.role !== 'ADMIN') {
            res.status(403).json({ error: 'Access denied. Admin role required.' })
            return
        }

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' })
    }
}

export const requireSuperAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        res.status(401).json({ error: 'Access denied. No token provided.' })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

        if (decoded.role !== 'SUPER_ADMIN') {
            res.status(403).json({ error: 'Access denied. Super admin role required.' })
            return
        }

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' })
    }
}
