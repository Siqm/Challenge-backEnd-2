import { Decimal } from "@prisma/client/runtime";
import { client } from "../prisma/client";

interface IncomeRequest { 
    description: string;
    value: Decimal;
}

class Income {
    
    static async createIncome ({ description, value }: IncomeRequest) {

        if (!description || !value) {
            throw Error('All fields must be filled')
        }

        const date = new Date();

        const alreadyExists = await client.income.findMany({
            
        })

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