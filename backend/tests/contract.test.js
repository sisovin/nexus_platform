const { expect } = require('chai')
const supertest = require('supertest')
const express = require('express')
const routes = require('../dist/routes')

// Create test app
const app = express()
app.use(express.json())
app.use('/api', routes.default)

describe('Languages API Contract', () => {
    it('should return languages list', async () => {
        const response = await supertest(app)
            .get('/api/languages')
            .expect(200)

        expect(response.body).to.be.an('array')
        if (response.body.length > 0) {
            expect(response.body[0]).to.have.property('id')
            expect(response.body[0]).to.have.property('name')
        }
    })

    it('should return language by id', async () => {
        // Assuming a language exists from seed
        const response = await supertest(app)
            .get('/api/languages/javascript') // Use string ID from seed
            .expect(200)

        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('name')
    })

    it('should return 404 for non-existent language', async () => {
        await supertest(app)
            .get('/api/languages/nonexistent')
            .expect(404)
    })
})
