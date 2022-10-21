import { Income } from "../models/IncomeModel";
import { Request, Response } from "express"
import { client } from "../prisma/client";
import { DateUseCase } from "../providers/DateUseCase";

class IncomeController {

    static async detailIncome(req: Request, res: Response) {
        const { income_id } = req.params;
        const income = await client.income.findFirst({
            where: {
                id: income_id
            }
        })

        if (!income) {
            return res.json("ERROR: Income not find").status(502)
        }

        return res.json(income)
    }

    static async postIncome (req: Request, res: Response) {
        var { description, value, day, month, year } = req.body;

        if(!description || !value || !month || !year || !day) {
            return res.json("ERROR: All fields must be filled");
        }

        const alreadyExists = await Income.findByMonthAndDescription(year, month, description)
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
        const { description, value, month, year, day } = req.body;

        if (!description || !value || !month || !year || !day) {
            return res.json("ERROR: All fields must be provided").status(502)
        }

        const date = new Date(year, month, day)

        const income = await Income.update({description, value, date}, income_id)

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