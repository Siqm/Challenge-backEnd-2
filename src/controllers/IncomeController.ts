import { Income } from "../models/IncomeModel";
import { json, Request, Response } from "express"
import { client } from "../prisma/client";

class IncomeController {

    static async postIncome (req: Request, res: Response) {
        const { description, value, date } = req.body;

        const income = await Income.createIncome({
            description,
            value,
            date
        })

        return res.json(income)
    }
}

export { IncomeController }