import { Request, Response } from "express";
import { OutGoing } from "../models/OutGoingModel";
import { client } from "../prisma/client";

class OutGoingController {

    static async postOutGoing (req: Request, res: Response) {

        const { description, value, month, year, day } = req.body;

        if(!description || !value || !month || !year || !day) {
            return res.json("ERROR: All fields must be filled").status(502);
        }

        const alreadyExists = await OutGoing.findByMonthAndDescription(year, month, description)
        if (alreadyExists) {
            return res.json("ERROR: There is already a entry with same description and month").status(400)
        }
        
        const date = new Date(year, month, day);
        const outGoing = await OutGoing.createOutGoing(description, value, date)

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

        if (!outgoing) {
            return res.json("ERROR: Outgoing not find").status(502)
        }

        return res.json(outgoing)
    }
}

export { OutGoingController }