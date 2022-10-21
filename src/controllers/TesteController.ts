import { Request, Response } from "express";
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

        const date = new Date()
        
        console.log(date)

        return res.json(data)
    }
}

export { TesteController }