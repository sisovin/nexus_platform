const { expect } = require('chai')
const supertest = require('supertest')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

describe('Admin CRUD Integration Tests', () => {
    let app
    let adminToken

    before(async () => {
        // Start test app
        app = require('../../src/app')

        // Mock admin token - in real tests, this would be obtained through login
        adminToken = 'mock-admin-jwt-token'
    })

    after(async () => {
        // Cleanup
        await prisma.language.deleteMany({})
        await prisma.$disconnect()
    })

    describe('Language CRUD Operations', () => {
        let createdLanguageId

        it('should create a new language', async () => {
            const languageData = {
                name: 'Test Language',
                summary: 'A test programming language',
                ranking: 42,
                resources: ['https://example.com/docs', 'https://example.com/tutorial'],
                images: ['https://example.com/logo.png'],
            }

            const response = await supertest(app)
                .post('/api/admin/languages')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(languageData)
                .expect(201)

            expect(response.body).to.have.property('id')
            expect(response.body.name).to.equal(languageData.name)
            expect(response.body.summary).to.equal(languageData.summary)
            expect(response.body.ranking).to.equal(languageData.ranking)
            expect(response.body.resources).to.deep.equal(languageData.resources)
            expect(response.body.images).to.deep.equal(languageData.images)

            createdLanguageId = response.body.id
        })

        it('should get all languages', async () => {
            const response = await supertest(app)
                .get('/api/admin/languages')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.be.an('array')
            expect(response.body.length).to.be.greaterThan(0)
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('name')
        })

        it('should get a specific language by ID', async () => {
            const response = await supertest(app)
                .get(`/api/admin/languages/${createdLanguageId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body.id).to.equal(createdLanguageId)
            expect(response.body.name).to.equal('Test Language')
        })

        it('should update a language', async () => {
            const updateData = {
                name: 'Updated Test Language',
                summary: 'An updated test programming language',
                ranking: 43,
            }

            const response = await supertest(app)
                .put(`/api/admin/languages/${createdLanguageId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send(updateData)
                .expect(200)

            expect(response.body.name).to.equal(updateData.name)
            expect(response.body.summary).to.equal(updateData.summary)
            expect(response.body.ranking).to.equal(updateData.ranking)
        })

        it('should reject duplicate language names', async () => {
            const duplicateData = {
                name: 'Updated Test Language', // Same name as updated above
                summary: 'Another test language',
            }

            const response = await supertest(app)
                .post('/api/admin/languages')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(duplicateData)
                .expect(409)

            expect(response.body).to.have.property('error')
        })

        it('should delete a language', async () => {
            const response = await supertest(app)
                .delete(`/api/admin/languages/${createdLanguageId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.have.property('message', 'Language deleted successfully')

            // Verify it's deleted
            const getResponse = await supertest(app)
                .get(`/api/admin/languages/${createdLanguageId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(404)
        })
    })

    describe('Analytics Endpoints', () => {
        it('should get analytics dashboard data', async () => {
            const response = await supertest(app)
                .get('/api/admin/analytics')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.have.property('pageViews')
            expect(response.body).to.have.property('languageViews')
            expect(response.body).to.have.property('bookmarks')
            expect(response.body).to.have.property('testimonials')
            expect(response.body).to.have.property('generatedAt')

            expect(response.body.pageViews).to.have.property('totalViews')
            expect(response.body.pageViews).to.have.property('pageBreakdown')
        })

        it('should get page view analytics', async () => {
            const response = await supertest(app)
                .get('/api/admin/analytics/page-views')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.have.property('totalViews')
            expect(response.body).to.have.property('pageBreakdown')
            expect(response.body).to.have.property('timeRange')
        })

        it('should get language view analytics', async () => {
            const response = await supertest(app)
                .get('/api/admin/analytics/language-views')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.have.property('totalViews')
            expect(response.body).to.have.property('languageBreakdown')
            expect(response.body).to.have.property('timeRange')
        })

        it('should get bookmark analytics', async () => {
            const response = await supertest(app)
                .get('/api/admin/analytics/bookmarks')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.have.property('totalBookmarks')
            expect(response.body).to.have.property('bookmarkActions')
            expect(response.body).to.have.property('timeRange')
        })

        it('should get testimonial analytics', async () => {
            const response = await supertest(app)
                .get('/api/admin/analytics/testimonials')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body).to.have.property('totalSubmissions')
            expect(response.body).to.have.property('timeRange')
        })

        it('should support different time ranges', async () => {
            const response = await supertest(app)
                .get('/api/admin/analytics?page-views&timeRange=day')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200)

            expect(response.body.pageViews.timeRange).to.equal('day')
        })
    })

    describe('Authentication and Authorization', () => {
        it('should reject requests without authentication', async () => {
            await supertest(app)
                .get('/api/admin/languages')
                .expect(401)
        })

        it('should reject requests with invalid token', async () => {
            await supertest(app)
                .get('/api/admin/languages')
                .set('Authorization', 'Bearer invalid-token')
                .expect(401)
        })

        it('should reject non-admin users', async () => {
            // Mock regular user token
            const userToken = 'mock-user-jwt-token'

            await supertest(app)
                .get('/api/admin/languages')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403)
        })
    })
})
