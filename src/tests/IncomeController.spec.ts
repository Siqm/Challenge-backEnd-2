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
        
        const response = await request(app).get('/incomes/2022/10')

        expect(response.status).toBe(200)
    })

    it ('Try to post income without parameter', async () => {

        let response = await request(app).post('/incomes').send({
            description: 'test-income-without-value',
            day: 19,
            month: 10,
            year: 2022
        })

        expect(response.status).toBe(400)

        response = await request(app).post('/incomes').send({
            description: 'test-income-without-day',
            value: 100,
            month: 10,
            year: 2022
        })

        expect(response.status).toBe(400)

        response = await request(app).post('/incomes').send({
            description: 'test-income-without-month',
            value: 100,
            day: 19,
            year: 2022
        })

        expect(response.status).toBe(400)

        response = await request(app).post('/incomes').send({
            description: 'test-income-without-year',
            value: 100,
            day: 19,
            month: 10,
        })

        expect(response.status).toBe(400)
    })

    it('Should return income filtered by id', async ()  => {

        const income = await request(app).post('/incomes').send({
            description: 'test-filter-id',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        })

        const response = await request(app).get(`/incomes/${income.body.id}`)

        expect(response.body).toHaveProperty('description', income.body.description)
    })

    it ('Should not return income by invalid id', async () => {

        const income = await request(app).get('/incomes/123')

        expect(income.status).toBe(400)
    })

    it ('Should find an created income by description', async () => {

        const pastCreatedIncome = 'test-filter-id'

        const income = await request(app).get(`/incomes?description=${pastCreatedIncome}`)

        expect(income.body[0]).toHaveProperty('id')
    })

    it ('Should atualize an created income', async () => {

        const pastCreatedIncome = 'test-filter-id'

        const income = await request(app).get(`/incomes?description=${pastCreatedIncome}`)
        const incomeId = income.body[0].id

        let atualizedIncome = await request(app).put(`/incomes/${incomeId}`).send({
            description: 'atualized-income',
            value: 300
        })

        console.log(atualizedIncome.body)

        expect(atualizedIncome.status).toBe(400)
        
        atualizedIncome = await request(app).put(`/incomes/${incomeId}`)
    })
} )