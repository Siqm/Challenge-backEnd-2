import { Decimal } from "@prisma/client/runtime";
import { DateUseCase } from "../handlers/DateUseCase";
import { client } from "../prisma/client";

interface OutGoingRequest {
    description: string;
    value: Decimal;
    date: Date
}

class OutGoing {

    static async createOutGoing ({ description, value, date}: OutGoingRequest) {

        if (!description || !value) {
            throw Error('All fields must be filled')
        }

        const outgoing = await client.outGoing.create({
            data: {
                description,
                value,
                date
            }
        })

        return outgoing
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