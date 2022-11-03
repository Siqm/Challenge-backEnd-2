/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { app } from "../app"
import request from 'supertest'

describe('Testing Income Controller', () => {
    
    it ("Should be able to create a new income", async () => {

        const response = await request(app)
        .post('/incomes')
        .send({
            description: 'test-create-income',
            value: 250,
            day: 19,
            month: 10,
            year: 2022
        })

        console.log(response.status)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id")
    })

    it ("Should no be able to create duplicated income", async () =>{ 

        await request(app).post('/incomes').send({
            description: 'test-duplicated-entry',
            value: 250,
            day: 19,
            month: 10,
            year: 2022
        })

        const response = await request(app).post('/incomes').send({
            description: 'test-duplicated-entry',
            value: 250,
            day: 19,
            month: 10,
            year: 2022
        })

        expect(response.status).toBe(400);
    })

    it("Should return income created at given date", async () => {
        
        await request(app).post('/incomes').send({
            description: 'test-create-income',
            value: 250,
            day: 19,
            month: 10,
            year: 2022
        })

        const response = await request(app).get('/incomes/2022/10').send({
            params: {
                year: 2022,
                month: 10
            }
        })

        expect(response.status).toBe(200)
    })
} )