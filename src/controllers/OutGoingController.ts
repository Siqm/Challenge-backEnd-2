import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ArgumentError } from "../errors/ArgumentError";
import { Category } from "../models/CategoryModel"
import { Outgoing } from "../models/OutgoingModel";
import { client } from "../prisma/client";
import { DateUseCase } from "../providers/DateUseCase";

class OutgoingController {

    static async postOutgoing (req: Request, res: Response) {

        const { description, value, month, year, day, category } = req.body;

        // Casting string to enum
        const enumCategory = Category[category]

        if (ArgumentError.missingArgument(req.body)) {
            return res.json("ERROR: All fields must be filled").status(502)
        }

        const alreadyExists = await Outgoing.findByMonthAndDescription(year, month, description)
        if (alreadyExists) {
            return res.json("ERROR: There is already a entry with same description and month").status(400)
        }
        
        const date = new Date(year, month, day);
        const outgoing = await Outgoing.createOutgoing(description, value, date, enumCategory)

        return res.json(outgoing);
    }

    static async index (req: Request, res: Response) {

        const outgoings = await client.outgoing.findMany()

        return res.json(outgoings)
    }

    static async getOutgoingById (req: Request, res: Response) {
        const { outgoing_id } = req.params
        const outgoing = await Outgoing.findById(outgoing_id)

        if (!outgoing) {
            return res.json('Error: Id Didn\'t match any result')
        }

        return res.json(outgoing)
    }

    static async atualizeOutgoing (req: Request, res: Response) {
        const { outgoing_id } = req.params;
        const { description, value } = req.body;

        if(ArgumentError.missingDescriptionAndValue(description, value)) {
            return res.json("ERROR: Fields description and value must be filled").status(502)
        }

        const outgoing = await Outgoing.updateById(outgoing_id, description, value)
    
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

    static async findByDescription(req: Request, res: Response) {
        const description = req.query.description as string

        const outgoing = await Outgoing.findByDescription(description)

        if(!outgoing) {
            return res.json("ERROR: No matches with the given description")
        }

        return res.json(outgoing)
    }

    static async indexOrDescription (req: Request, res: Response) {

        if (!req.query.description) {
            OutgoingController.index(req, res)
        } else {
            OutgoingController.findByDescription(req, res)
        }
        
    }

    static async findByMonth(req: Request, res: Response) {

        const { year, month } = req.params
        if (ArgumentError.missingMonthYear(year, month)) {
            return res.status(502).json("ERROR: Missing year or month")
        }

        const date = new Date(parseInt(year), parseInt(month))
        const { maximumDate, minimumDate } = DateUseCase.monthReference(year, month)

        const outgoings = await Outgoing.findByMonthExtent(minimumDate, maximumDate)
        return res.json(outgoings)
    }
}

export { OutgoingController }