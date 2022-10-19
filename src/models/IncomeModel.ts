import { Decimal } from "@prisma/client/runtime";
import { DateUseCase } from "../handlers/DateUseCase";
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

    static async findByMonthAndDescription (year, month, description) {

        const { minimumDate, maximumDate } = DateUseCase.monthReference(month, year)

        const income = await client.income.findFirst({
            where: {
                AND: [
                    {
                        date: {
                            gte: minimumDate,
                            lt: maximumDate
                        }
                    }, {
                        description: description
                    }
                ]
            }
        })

        return income;
    }

}

export { Income }