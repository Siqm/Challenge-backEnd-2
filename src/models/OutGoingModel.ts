import { Decimal } from "@prisma/client/runtime";
import { DateUseCase } from "../providers/DateUseCase";
import { client } from "../prisma/client";



class OutGoing {

    static async createOutGoing (description, value, date) {

        const outgoing = await client.outGoing.create({
            data: {
                description,
                value,
                date
            }
        })

        return outgoing;
    }

    static async findByMonthAndDescription (year, month, description) {

        const { minimumDate, maximumDate } = DateUseCase.monthReference(month, year)

        const outGoing = await client.outGoing.findFirst({
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

        return outGoing;
    }
}

export { OutGoing }