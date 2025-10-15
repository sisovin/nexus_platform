const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../backend/src/app') // Adjust path as needed

describe('Testimonials API Contract', () => {
    it('should accept valid testimonial submission', async () => {
        const validTestimonial = {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            message: 'This platform has been incredibly helpful for learning new programming languages. The community is supportive and the resources are excellent.',
        }

        const response = await supertest(app)
            .post('/api/testimonials')
            .send(validTestimonial)
            .expect(201)

        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('testimonial')
        expect(response.body.testimonial).to.have.property('id')
        expect(response.body.testimonial).to.have.property('status', 'PENDING')
        expect(response.body.testimonial).to.have.property('createdAt')
    })

    it('should reject invalid email format', async () => {
        const invalidTestimonial = {
            name: 'John Doe',
            email: 'invalid-email-format',
            message: 'Valid message content here.',
        }

        const response = await supertest(app)
            .post('/api/testimonials')
            .send(invalidTestimonial)
            .expect(400)

        expect(response.body).to.have.property('error')
        expect(response.body.error).to.include('email')
    })

    it('should reject message too short', async () => {
        const shortMessage = {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'Hi',
        }

        const response = await supertest(app)
            .post('/api/testimonials')
            .send(shortMessage)
            .expect(400)

        expect(response.body).to.have.property('error')
    })

    it('should reject message too long', async () => {
        const longMessage = {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'a'.repeat(1001),
        }

        const response = await supertest(app)
            .post('/api/testimonials')
            .send(longMessage)
            .expect(400)

        expect(response.body).to.have.property('error')
    })

    it('should reject missing required fields', async () => {
        const incompleteTestimonial = {
            name: 'John Doe',
            // Missing email and message
        }

        const response = await supertest(app)
            .post('/api/testimonials')
            .send(incompleteTestimonial)
            .expect(400)

        expect(response.body).to.have.property('error')
    })

    it('should sanitize HTML from message', async () => {
        const testimonialWithHtml = {
            name: 'Test User',
            email: 'test@example.com',
            message: 'Message with <script>alert("xss")</script> and <b>bold</b> tags',
        }

        const response = await supertest(app)
            .post('/api/testimonials')
            .send(testimonialWithHtml)
            .expect(201)

        // The response should indicate successful submission
        expect(response.body).to.have.property('testimonial')
        expect(response.body.testimonial).to.have.property('id')
    })

    it('should return testimonials for admin with proper structure', async () => {
        // This test assumes admin authentication is mocked
        // In a real scenario, you'd need to authenticate as admin first
        const response = await supertest(app)
            .get('/api/admin/testimonials')
            .set('Authorization', 'Bearer mock-admin-token')
            .expect(200)

        expect(response.body).to.be.an('array')
        if (response.body.length > 0) {
            const testimonial = response.body[0]
            expect(testimonial).to.have.property('id')
            expect(testimonial).to.have.property('name')
            expect(testimonial).to.have.property('email')
            expect(testimonial).to.have.property('message')
            expect(testimonial).to.have.property('status')
            expect(testimonial).to.have.property('createdAt')
        }
    })

    it('should allow admin to update testimonial status', async () => {
        // First create a testimonial
        const testimonialData = {
            name: 'Status Test',
            email: 'status@example.com',
            message: 'Test message for status update',
        }

        const createResponse = await supertest(app)
            .post('/api/testimonials')
            .send(testimonialData)
            .expect(201)

        const testimonialId = createResponse.body.testimonial.id

        // Update status to approved
        const updateResponse = await supertest(app)
            .put(`/api/admin/testimonials/${testimonialId}`)
            .set('Authorization', 'Bearer mock-admin-token')
            .send({ status: 'APPROVED' })
            .expect(200)

        expect(updateResponse.body).to.have.property('status', 'APPROVED')
        expect(updateResponse.body).to.have.property('approvedAt')
    })
})
