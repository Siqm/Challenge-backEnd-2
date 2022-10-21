import { DateUseCase } from "../providers/DateUseCase";
import { client } from "../prisma/client";
// import { Category } from "../enum/CategoryEnum";
import { Category } from "@prisma/client"


class Outgoing {

    static async createOutgoing (description, value, date, cat) {


        const outgoing = await client.outgoing.create({
            data: {
                description,
                value,
                date,
                category: cat
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