import { DateUseCase } from "../providers/DateUseCase";
import { client } from "../prisma/client";
// import { Category } from "../enum/CategoryEnum";
import { Category, Prisma } from "@prisma/client"


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

        const { minimumDate, maximumDate } = DateUseCase.monthReference( year, month)

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

    static async findById(id) {
        const outgoing = await client.outgoing.findFirst({
            where: {
                id: id
            }
        })

        return outgoing
    }

    static async updateById(id, description, value) {
        const outgoing = await client.outgoing.update({
            where: {
                id: id
            }, data: {
                description: description,
                value: value
            }
        })

        return outgoing;
    }

    static async findByDescription(description) {
        const validatedDescription = (description: string) => {
            return Prisma.validator<Prisma.OutgoingWhereInput>()({
                description
            })
        }

        const outgoing = await client.outgoing.findMany({
            where: validatedDescription(description)
        })

        return outgoing
    }
}

export { Outgoing }