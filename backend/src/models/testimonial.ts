import { prisma } from '../lib/db'

export interface Testimonial {
    id: string
    name: string
    email: string
    message: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
    createdAt: Date
    approvedAt?: Date
}

export const createTestimonial = async (data: {
    name: string
    email: string
    message: string
}) => {
    return prisma.testimonial.create({
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
            status: 'PENDING',
        },
    })
}

export const findAllTestimonials = async (status?: string) => {
    const where = status ? { status: status as any } : {}
    return prisma.testimonial.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    })
}

export const findTestimonialById = async (id: string) => {
    return prisma.testimonial.findUnique({
        where: { id },
    })
}

export const updateTestimonialStatus = async (
    id: string,
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
) => {
    const updateData: any = { status }
    if (status === 'APPROVED') {
        updateData.approvedAt = new Date()
    }

    return prisma.testimonial.update({
        where: { id },
        data: updateData,
    })
}
