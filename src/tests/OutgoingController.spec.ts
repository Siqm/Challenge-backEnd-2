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

    it('Should return income created at given date', async () => {
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
})