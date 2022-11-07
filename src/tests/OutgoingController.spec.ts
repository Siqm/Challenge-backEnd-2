/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../app"
import request from 'supertest'

describe('Testing Outgoing Controller', () => {
    
    it ("Should be able to create new outgoing", async () => {

        const response = await request(app).post('/outgoings').send({
            description: 'test-create-outgoing',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        })

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('category')
        expect(response.body).toHaveProperty('id')
        
    })

    it ('Should not be able to create duplicated outgoing', async () => {

        await request(app).post('/outgoings').send({
            description: 'test-duplicated-entry',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        })

        const response = await request(app).post('/outgoings').send({
            description: 'test-duplicated-entry',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        })

        expect(response.status).toBe(400);
    })

    it('Should return outgoing created at given date', async () => {
        const response = await request(app).get('/outgoings/2022/10')
        
        expect(response.status).toBe(200);
    })

    it ('Try to post outgoing without parameter', async () => {

        let response = await request(app).post('/outgoings').send({
            description: 'test-outgoing-without-value',
            day: 19,
            month: 10,
            year: 2022
        })

        expect(response.status).toBe(400)

        response = await request(app).post('/outgoings').send({
            description: 'test-outgoing-without-day',
            value: 100,
            month: 10,
            year: 2022
        })

        expect(response.status).toBe(400)

        response = await request(app).post('/outgoings').send({
            description: 'test-outgoing-without-month',
            value: 100,
            day: 19,
            year: 2022
        })

        expect(response.status).toBe(400)

        response = await request(app).post('/outgoings').send({
            description: 'test-outgoing-without-year',
            value: 100,
            day: 19,
            month: 10,
        })

        expect(response.status).toBe(400)
    })

    it('Should return outgoing filtered by id', async ()  => {

        const outgoing = await request(app).post('/outgoings').send({
            description: 'test-filter-id',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        })

        const response = await request(app).get(`/outgoings/${outgoing.body.id}`)

        expect(response.body).toHaveProperty('description', outgoing.body.description)
    })

    it ('Should not return outgoing by invalid id', async () => {

        const outgoing = await request(app).get('/outgoings/123')

        expect(outgoing.status).toBe(400)
    })

    it ('Should find an created outgoing by description', async () => {

        const pastCreatedOutgoing = 'test-filter-id'

        const outgoing = await request(app).get(`/outgoings?description=${pastCreatedOutgoing}`)

        expect(outgoing.body[0]).toHaveProperty('id')
    })

    it ('Should atualize an created outgoing', async () => {

        const pastCreatedOutgoing = 'test-filter-id'

        const outgoing = await request(app).get(`/outgoings?description=${pastCreatedOutgoing}`)
        const outgoingId = outgoing.body[0].id

        const atualizedOutgoing = await request(app).put(`/outgoings/${outgoingId}`).send({
            description: 'atualized-outgoing',
            value: 300
        })

        expect(atualizedOutgoing.status).toBe(200)

    })
})