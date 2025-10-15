const { expect } = require('chai')
const supertest = require('supertest')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

describe('Testimonials API Integration Tests', () => {
    let app

    before(async () => {
        // Start test app
        app = require('../../src/app')
    })

    after(async () => {
        // Cleanup
        await prisma.testimonial.deleteMany({})
        await prisma.$disconnect()
    })

    describe('POST /api/testimonials', () => {
        it('should create a testimonial with valid data', async () => {
            const testimonialData = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'This is a great platform for learning programming languages!',
            }

            const response = await supertest(app)
                .post('/api/testimonials')
                .send(testimonialData)
                .expect(201)

            expect(response.body).to.have.property('message', 'Testimonial submitted successfully')
            expect(response.body).to.have.property('testimonial')
            expect(response.body.testimonial).to.have.property('id')
            expect(response.body.testimonial).to.have.property('status', 'PENDING')

            // Verify in database
            const saved = await prisma.testimonial.findUnique({
                where: { id: response.body.testimonial.id },
            })
            expect(saved).to.not.be.null
            expect(saved.name).to.equal(testimonialData.name)
            expect(saved.email).to.equal(testimonialData.email)
            expect(saved.message).to.equal(testimonialData.message)
            expect(saved.status).to.equal('PENDING')
        })

        it('should reject testimonial with missing required fields', async () => {
            const response = await supertest(app)
                .post('/api/testimonials')
                .send({ name: 'John Doe' }) // Missing email and message
                .expect(400)

            expect(response.body).to.have.property('error')
        })

        it('should reject testimonial with invalid email', async () => {
            const testimonialData = {
                name: 'John Doe',
                email: 'invalid-email',
                message: 'Valid message',
            }

            const response = await supertest(app)
                .post('/api/testimonials')
                .send(testimonialData)
                .expect(400)

            expect(response.body).to.have.property('error', 'Invalid email format')
        })

        it('should reject testimonial with message too short', async () => {
            const testimonialData = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'Hi', // Too short
            }

            const response = await supertest(app)
                .post('/api/testimonials')
                .send(testimonialData)
                .expect(400)

            expect(response.body).to.have.property('error')
        })

        it('should reject testimonial with message too long', async () => {
            const testimonialData = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'a'.repeat(1001), // Too long
            }

            const response = await supertest(app)
                .post('/api/testimonials')
                .send(testimonialData)
                .expect(400)

            expect(response.body).to.have.property('error')
        })

        it('should sanitize message content', async () => {
            const testimonialData = {
                name: 'John Doe',
                email: 'john@example.com',
                message: 'Message with <script>alert("xss")</script> dangerous content',
            }

            const response = await supertest(app)
                .post('/api/testimonials')
                .send(testimonialData)
                .expect(201)

            // Verify dangerous tags are removed
            const saved = await prisma.testimonial.findUnique({
                where: { id: response.body.testimonial.id },
            })
            expect(saved.message).to.not.include('<script>')
            expect(saved.message).to.not.include('alert')
        })
    })

    describe('GET /api/admin/testimonials', () => {
        let adminToken

        before(async () => {
            // Mock admin token - in real test, this would be obtained through login
            adminToken = 'mock-admin-jwt-token'
        })

        it('should return testimonials for admin', async () => {
            const response = await supertest(app)
                .get('/api/admin/testimonials')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.be.an('array')
        })

        it('should filter testimonials by status', async () => {
            const response = await supertest(app)
                .get('/api/admin/testimonials?status=PENDING')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.be.an('array')
            response.body.forEach(testimonial => {
                expect(testimonial.status).to.equal('PENDING')
            })
        })
    })

    describe('PUT /api/admin/testimonials/:id', () => {
        let testimonialId
        let adminToken

        before(async () => {
            // Create a test testimonial
            const testimonial = await prisma.testimonial.create({
                data: {
                    name: 'Test User',
                    email: 'test@example.com',
                    message: 'Test message',
                    status: 'PENDING',
                },
            })
            testimonialId = testimonial.id
            adminToken = 'mock-admin-jwt-token'
        })

        it('should update testimonial status', async () => {
            const response = await supertest(app)
                .put(`/api/admin/testimonials/${testimonialId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'APPROVED' })
                .expect(200)

            expect(response.body.status).to.equal('APPROVED')
            expect(response.body).to.have.property('approvedAt')

            // Verify in database
            const updated = await prisma.testimonial.findUnique({
                where: { id: testimonialId },
            })
            expect(updated.status).to.equal('APPROVED')
            expect(updated.approvedAt).to.not.be.null
        })

        it('should reject invalid status', async () => {
            const response = await supertest(app)
                .put(`/api/admin/testimonials/${testimonialId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({ status: 'INVALID' })
                .expect(400)

            expect(response.body).to.have.property('error')
        })
    })
})
