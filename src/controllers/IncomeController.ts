import { Income } from "../models/IncomeModel";
import { Request, Response } from "express"
import { client } from "../prisma/client";
import { DateUseCase } from "../handlers/DateUseCase";

class IncomeController {

    static async detailIncome(req: Request, res: Response) {
        const { income_id } = req.params;
        const income = await client.income.findFirst({
            where: {
                id: income_id
            }
        })

        return res.json(income)
    }

    static async postIncome (req: Request, res: Response) {
        var { description, value, day, month, year } = req.body;
        const alreadyExists = Income.findByMonthAndDescription(year, month, description)

        if (alreadyExists) {
            return res.json("ERROR: There is already a entry with same description and month").status
        }

        const date = new Date(year, month, day)

        const income = await Income.createIncome({
            description,
            value,
            date
        })

        return res.json(income)
    }

    static async index (req: Request, res: Response) {
        const users = await client.income.findMany();

        return res.json(users)
    }

    static async atualizeIncome (req: Request, res: Response) {
        const { income_id } = req.params;
        const { description, value } = req.body;

        if (!description || !value) {
            throw Error("All fields must be provided!")
        }

        const income = await client.income.update({
            where: {
                id: income_id
            },
            data: {
                description: description,
                value: value
            }
        })

        return res.json(income)
    }

    static async deleteIncome(req: Request, res: Response) {
        const { income_id } = req.params;

        const income = await client.income.delete({
            where: {
                id: income_id
            }
        })

        return res.json(income)
    }
}

export { IncomeController }