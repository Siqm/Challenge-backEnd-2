import { Decimal } from "@prisma/client/runtime";
import { DateUseCase } from "../providers/DateUseCase";
import { client } from "../prisma/client";

interface IncomeRequest { 
    description: string;
    value: Decimal;
    date: Date
}

class Income {
    
    static async createIncome ({ description, value, date }: IncomeRequest) {
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

    static async update ({description, value, date}: IncomeRequest, income_id) {
        const income = client.income.update({
            where: {
                id: income_id
            },
            data: {
                description: description,
                value: value,
                date: date
            }
        })

        return income;
    }
}

export { Income }