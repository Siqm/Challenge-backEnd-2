import { Request, Response } from "express";
import { Category } from "../models/CategoryModel";
import { client } from "../prisma/client";

class TesteController {

    static async getByDate(req: Request, res: Response) {
        const data = await client.income.findMany({
            where: {
                date: {
                    gt: new Date("2022-10-18")
                }
            }
        })


        return res.json(data)
    }

    static async testeData(req: Request, res: Response) {
        const { month, year } = req.body;

        const date = new Date

        date.setFullYear(year, month)

        console.log(date.toString())

        return res.json().status(200);
    }

    static async testeEnum(req: Request, res: Response) {

        const { category } = req.body;

        const eNum = Category[category]

        return res.json(eNum)
    }
}

export { TesteController }