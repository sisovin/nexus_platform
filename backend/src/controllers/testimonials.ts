import { Request, Response } from 'express'
import {
    createTestimonial,
    findAllTestimonials,
    findTestimonialById,
    updateTestimonialStatus,
} from '../models/testimonial'
import { AuthRequest } from '../middleware/auth'

export const submitTestimonial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, message } = req.body

        // Basic validation
        if (!name || !email || !message) {
            res.status(400).json({
                error: 'Name, email, and message are required',
            })
            return
        }

        if (name.length < 2 || name.length > 100) {
            res.status(400).json({
                error: 'Name must be between 2 and 100 characters',
            })
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            res.status(400).json({
                error: 'Invalid email format',
            })
            return
        }

        if (message.length < 10 || message.length > 1000) {
            res.status(400).json({
                error: 'Message must be between 10 and 1000 characters',
            })
            return
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
        return
    } catch (error) {
        console.error('Error submitting testimonial:', error)
        res.status(500).json({ error: 'Failed to submit testimonial' })
        return
    }
}

export const getTestimonials = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Check if user is admin
        if (req.user?.role !== 'ADMIN') {
            res.status(403).json({ error: 'Admin access required' })
            return
        }

        const testimonials = await findAllTestimonials()
        res.json(testimonials)
        return
    } catch (error) {
        console.error('Error fetching testimonials:', error)
        res.status(500).json({ error: 'Failed to fetch testimonials' })
        return
    }
}

export const updateTestimonial = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Check if user is admin
        if (req.user?.role !== 'ADMIN') {
            res.status(403).json({ error: 'Admin access required' })
            return
        }

        const { id } = req.params
        const { status } = req.body

        if (!id) {
            res.status(400).json({ error: 'Testimonial ID is required' })
            return
        }

        // Validate status
        const validStatuses = ['PENDING', 'APPROVED', 'REJECTED']
        if (!validStatuses.includes(status)) {
            res.status(400).json({
                error: 'Invalid status. Must be PENDING, APPROVED, or REJECTED',
            })
            return
        }

        const testimonial = await updateTestimonialStatus(id, status)
        res.json({
            message: 'Testimonial updated successfully',
            testimonial,
        })
        return
    } catch (error) {
        console.error('Error updating testimonial:', error)
        res.status(500).json({ error: 'Failed to update testimonial' })
        return
    }
}
