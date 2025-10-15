const { expect } = require('chai')
const supertest = require('supertest')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

describe('Bookmarks API Integration Tests', () => {
    let app
    let testUser
    let testLanguage
    let authToken

    before(async () => {
        // Start test app - assuming we have a test setup
        // This would need to be configured with test database
        app = require('../../src/app') // Adjust path

        // Create test user and language
        testUser = await prisma.user.create({
            data: {
                name: 'Test User',
                email: 'test@example.com',
                role: 'USER',
            },
        })

        testLanguage = await prisma.language.create({
            data: {
                name: 'Test Language',
                summary: 'A test programming language',
                ranking: 10,
            },
        })

        // Mock JWT token for test user
        authToken = 'mock-jwt-token-for-test-user'
    })

    after(async () => {
        // Cleanup
        await prisma.bookmark.deleteMany({})
        await prisma.language.deleteMany({})
        await prisma.user.deleteMany({})
        await prisma.$disconnect()
    })

    it('should add a bookmark', async () => {
        const response = await supertest(app)
            .post('/api/user/bookmarks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ languageId: testLanguage.id })
            .expect(200)

        expect(response.body).to.have.property('action', 'added')
        expect(response.body.bookmark).to.have.property('userId', testUser.id)
        expect(response.body.bookmark).to.have.property('languageId', testLanguage.id)
    })

    it('should get user bookmarks', async () => {
        const response = await supertest(app)
            .get('/api/user/bookmarks')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)

        expect(response.body).to.be.an('array')
        expect(response.body.length).to.be.greaterThan(0)
        expect(response.body[0]).to.have.property('language')
    })

    it('should toggle bookmark (remove existing)', async () => {
        const response = await supertest(app)
            .post('/api/user/bookmarks')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ languageId: testLanguage.id })
            .expect(200)

        expect(response.body).to.have.property('action', 'removed')
    })

    it('should return 401 without auth', async () => {
        await supertest(app)
            .get('/api/user/bookmarks')
            .expect(401)
    })
})
