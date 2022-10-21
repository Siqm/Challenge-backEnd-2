import { Request, Response } from "express";
import { Outgoing } from "../models/OutgoingModel";
import { client } from "../prisma/client";

class OutgoingController {

    static async postOutgoing (req: Request, res: Response) {

        const { description, value, month, year, day, category } = req.body;

        if(!description || !value || !month || !year || !day) {
            return res.json("ERROR: All fields must be filled").status(502);
        }

        const alreadyExists = await Outgoing.findByMonthAndDescription(year, month, description)
        if (alreadyExists) {
            return res.json("ERROR: There is already a entry with same description and month").status(400)
        }
        
        const date = new Date(year, month, day);
        const outgoing = await Outgoing.createOutgoing(description, value, date, category)

        return res.json(outgoing);
    }

    static async index (req: Request, res: Response) {

        const outgoings = await client.outgoing.findMany()

        return res.json(outgoings)
    }

    static async getOutgoingById (req: Request, res: Response) {
        const { outgoing_id } = req.params
        const outgoing = await client.outgoing.findFirst({
            where: {
                id: outgoing_id
            }
        })

        if (!outgoing) {
            return res.json('Error: Id Didn\'t match any result')
        }

        return res.json(outgoing)
    }

    static async atualizeOutgoing (req: Request, res: Response) {
        const { outgoing_id } = req.params;
        const { description, value } = req.body;

        if (!description || !value) {
            throw Error("All fields must be provided!")
        }

        const outgoing = await client.outgoing.update({
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

        const outgoing = await client.outgoing.delete({
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

export { OutgoingController }