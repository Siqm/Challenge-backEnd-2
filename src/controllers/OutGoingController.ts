import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { BadRequestError, DuplicatedFieldError } from "../helpers/api-errors";
import { Category } from "../models/CategoryModel"
import { Outgoing } from "../models/OutGoingModel";
import { client } from "../prisma/client";
import { DateUseCase } from "../providers/DateUseCase";

class OutgoingController {

    static async postOutgoing (req: Request, res: Response) {

        const { description, value, month, year, day, category } = req.body;

        // Casting string to enum
        const enumCategory = Category[category]

        if (!description || !value || !month || !year || !day ) {
            throw new BadRequestError("All fields must be filled")
        }

        const alreadyExists = await Outgoing.findByMonthAndDescription(year, month, description)
        const date = new Date(year, month, day);

        if (alreadyExists) {
            throw new DuplicatedFieldError(
                `Entry with description ${description} and date ${date} already exists`
           )
        }
        
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
            throw new BadRequestError("Outgoing does not exists")
        }

        return res.json(outgoing)
    }

    static async atualizeOutgoing (req: Request, res: Response) {
        const { outgoing_id } = req.params;
        const { description, value } = req.body;

        if(!description || !value) {
            throw new BadRequestError("All fields must be filled")
        }

        const outgoing = await Outgoing.updateById(outgoing_id, description, value)

        if (!outgoing) {
            throw new BadRequestError("Outgoing does not exists")
        }
    
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
            throw new BadRequestError("Outgoing does not exists")
        }

        return res.json(outgoing)
    }

    static async findByDescription(req: Request, res: Response) {
        const description = req.query.description as string

        const outgoing = await Outgoing.findByDescription(description)

        if(!outgoing) {
            throw new BadRequestError("Outgoing does not exists")
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

        if (!year || !month) {
            throw new BadRequestError("All fields must be filled")
        }

        const { maximumDate, minimumDate } = DateUseCase.monthReference(year, month)

        const outgoings = await Outgoing.findByMonthExtent(minimumDate, maximumDate)

        if (!outgoings) {
            throw new BadRequestError("No matches with given date")
        }
        return res.json(outgoings)
    }
}

export { OutgoingController }