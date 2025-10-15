import { Request, Response } from 'express'
import {
    createTestimonial,
    findAllTestimonials,
    findTestimonialById,
    updateTestimonialStatus,
} from '../models/testimonial'
import { AuthRequest } from '../middleware/auth'

export const submitTestimonial = async (req: Request, res: Response) => {
    try {
        const { name, email, message } = req.body

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                error: 'Name, email, and message are required',
            })
        }

        if (name.length < 2 || name.length > 100) {
            return res.status(400).json({
                error: 'Name must be between 2 and 100 characters',
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format',
            })
        }

        if (message.length < 10 || message.length > 1000) {
            return res.status(400).json({
                error: 'Message must be between 10 and 1000 characters',
            })
        }

        // Sanitize input (basic)
        const sanitizedMessage = message.trim().replace(/[<>]/g, '')

        const testimonial = await createTestimonial({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            message: sanitizedMessage,
        })

        res.status(201).json({
            message: 'Testimonial submitted successfully',
            testimonial: {
                id: testimonial.id,
                status: testimonial.status,
                createdAt: testimonial.createdAt,
            },
        })
    } catch (error) {
        console.error('Error submitting testimonial:', error)
        res.status(500).json({ error: 'Failed to submit testimonial' })
    }
}

export const getTestimonials = async (req: AuthRequest, res: Response) => {
    try {
        // Check if user is admin
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' })
        }

        const { status } = req.query
        const testimonials = await findAllTestimonials(status as string)

        res.json(testimonials)
    } catch (error) {
        console.error('Error fetching testimonials:', error)
        res.status(500).json({ error: 'Failed to fetch testimonials' })
    }
}

export const updateTestimonial = async (req: AuthRequest, res: Response) => {
    try {
        // Check if user is admin
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Admin access required' })
        }

        const { id } = req.params
        const { status } = req.body

        if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
            return res.status(400).json({
                error: 'Invalid status. Must be PENDING, APPROVED, or REJECTED',
            })
        }

        const testimonial = await updateTestimonialStatus(id, status)
        res.json(testimonial)
    } catch (error) {
        console.error('Error updating testimonial:', error)
        res.status(500).json({ error: 'Failed to update testimonial' })
    }
}
