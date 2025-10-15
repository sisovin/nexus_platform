import { prisma } from '../lib/db'

export interface User {
    id: string
    name: string
    email: string
    role: 'USER' | 'ADMIN'
}

export const createUser = async (data: { name: string; email: string; password: string }) => {
    // Hash password logic here
    return prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: 'USER'
        }
    })
}

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email }
    })
}
