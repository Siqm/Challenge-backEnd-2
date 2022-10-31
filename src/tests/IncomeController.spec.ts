import { app } from "../app"
import request from 'supertest'

describe('Testing Income Controller', () => {
    
    it ("Should be able to create a new income", async () => {

        const response = await request(app)
        .post('/incomes')
        .send({
            description: 'test-integration',
            value: 250,
            date: new Date()
        })

        console.log(response.status)
    })
} )