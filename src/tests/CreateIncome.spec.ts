import { Prisma } from "@prisma/client"
import { Income, IncomeRequest } from "../models/IncomeModel"

describe("Creating income", () => {
    it("Must create new income and return Id", async () => {

        const incomeData: IncomeRequest = {
            description: "Teste",
            value: new Prisma.Decimal(500),
            date: new Date()
        }

        const income = await Income.createIncome(incomeData)

        expect(income).toHaveProperty("id")
    })
})