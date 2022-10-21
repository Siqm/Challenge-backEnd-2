import { Decimal } from "@prisma/client/runtime";
import { DateUseCase } from "../providers/DateUseCase";
import { client } from "../prisma/client";



class Outgoing {

    static async createOutgoing (description, value, date, category) {

        if (!category) {
            console.log("category null")
            category = Category.Other
        }
        const outgoing = await client.outgoing.create({
            data: {
                description,
                value,
                date,
                category
            }
        })

        return outgoing;
    }

    static async findByMonthAndDescription (year, month, description) {

        const { minimumDate, maximumDate } = DateUseCase.monthReference(month, year)

        const outgoing = await client.outgoing.findFirst({
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

        return outgoing;
    }
}

export { Outgoing }