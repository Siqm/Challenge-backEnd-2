import { Decimal } from "@prisma/client/runtime";
import { client } from "../prisma/client";

interface IncomeRequest { 
    description: string;
    value: Decimal;
    date: Date
}

class Income {
    
    static async createIncome ({ description, value, date }: IncomeRequest) {

        if (!description || !value) {
            throw Error('All fields must be filled')
        }

        const income = await client.income.create({
            data: {
                description,
                value,
                date
            }
        })

        return income;
    }

}

export { Income }