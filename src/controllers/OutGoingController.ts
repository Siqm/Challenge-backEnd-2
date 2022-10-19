import { Request, Response } from "express";
import { OutGoing } from "../models/OutGoingModel";
import { client } from "../prisma/client";

class OutGoingController {

    static async postOutGoing (req: Request, res: Response) {

        const { description, value, month, year, day } = req.body;

        

        const outGoing = await OutGoing.createOutGoing({description, value, date})

        return res.json(outGoing);
    }

    static async index (req: Request, res: Response) {

        const outgoings = await client.outGoing.findMany()

        return res.json(outgoings)
    }

    static async getOutgoingById (req: Request, res: Response) {
        const { outgoing_id } = req.params
        const outGoing = await client.outGoing.findFirst({
            where: {
                id: outgoing_id
            }
        })

        if (!outGoing) {
            return res.json('Error: Id Didn\'t match any result')
        }

        return res.json(outGoing)
    }

    static async atualizeOutgoing (req: Request, res: Response) {
        const { outgoing_id } = req.params;
        const { description, value } = req.body;

        if (!description || !value) {
            throw Error("All fields must be provided!")
        }

        const outgoing = await client.outGoing.update({
            where: {
                id: outgoing_id
            }, data: {
                description: description,
                value: value
            }
        })
    
        return res.json(outgoing)
    }

    static async deleteOutgoing (req: Request, res: Response) {
        const { outgoing_id } = req.params;

        const outgoing = await client.outGoing.delete({
            where: {
                id: outgoing_id
            }
        })

        return res.json(outgoing)
    }
}

export { OutGoingController }