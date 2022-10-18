import { Decimal } from "@prisma/client/runtime";
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
}

export { OutGoing }