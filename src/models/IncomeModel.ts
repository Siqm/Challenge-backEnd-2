import { Decimal } from "@prisma/client/runtime";
import { DateUseCase } from "../providers/DateUseCase";
import { client } from "../prisma/client";
import { Prisma } from "@prisma/client";

interface IncomeRequest { 
    description: string;
    value: Decimal;
    date: Date
}

class Income {

    static async deleteById(income_id: string) {
        try {
            const income = await client.income.delete({
                where: {
                    id: income_id
                }
            })
            return income
        } catch (error) {
        return `ERROR: ${error}`
        }
    }
    
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

    static async findByMonthExtent (minimumDate, maximumDate) {

        const incomes = await client.income.findMany({
            where: {   
                date: {
                    gte: minimumDate,
                    lt: maximumDate
                }
            }
        })

        return incomes;
    }

    static async findByMonthAndDescription (year, month, description) {
        const { minimumDate, maximumDate } = DateUseCase.monthReference(year, month)


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

    static async update (description, value, date, income_id) {

        try {
            const income = await client.income.update({
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
        } catch (error) {
            return `ERROR ${error}`
        }

        
    }

    static async findById (id) {
        const income = await client.income.findFirst({
            where: {
                id: id
            }
        })

        return income;
    }

    static async findAndValidateDescription(description) {
        const validatedDescription = (description: string) => {
            return Prisma.validator<Prisma.IncomeWhereInput>()({
                description
            })
        }

        const income = await client.income.findMany({
            where: validatedDescription(description)
        })

        return income
    }

    static async clearAllDescription (description) {
        const incomes = await client.income.deleteMany({
            where:{
                description
            }
        })


        return incomes
    }

    static async getTotalByMonth(minimumDate, maximumDate) {
        const sum = await client.income.aggregate({
            _sum: {
                value: true,
            },
            where: {
                date: {
                    gte: minimumDate,
                    lt: maximumDate
                }
            }
        })

        return sum;
    }
}

export { Income, IncomeRequest }