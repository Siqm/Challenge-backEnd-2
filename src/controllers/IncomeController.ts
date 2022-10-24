import { Income } from "../models/IncomeModel";
import { Request, Response } from "express"
import { client } from "../prisma/client";
import { DateUseCase } from "../providers/DateUseCase";
import { ArgumentError } from "../errors/ArgumentError";

class IncomeController {

    static async findByMonth(req: Request, res: Response) {

        const { year, month } = req.params
        const {minimumDate, maximumDate} = DateUseCase.monthReference(year, month)

        const incomes = await Income.findByMonthExtent(minimumDate, maximumDate)

        return res.json(incomes)
    }

    static async detailIncome(req: Request, res: Response) {
        const { income_id } = req.params;
        const income = await Income.findById(income_id)

        if (!income) {
            return res.json("ERROR: Income not find").status(502)
        }

        return res.json(income)
    }

    static async postIncome (req: Request, res: Response) {

        const { description, value, day, month, year } = req.body

        if (ArgumentError.missingArgument(req.body)) {
            return res.json("ERROR: All fields must be filled").status(502)
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

        if (ArgumentError.missingArgument(req.body)) {
            return res.json("ERROR: All fields must be filled").status(502)
        }

        const date = new Date(year, month, day)
        
        const income = await Income.update(description, value, date, income_id)

        return res.json(income)
    }

    static async deleteIncome(req: Request, res: Response) {
        const { income_id } = req.params;

        const income = await Income.deleteById(income_id)

        return res.json(income)
    }

    static async indexOrDescription (req: Request, res: Response) {

        if (!req.query.description) {
            IncomeController.index(req, res)
        } else {
            IncomeController.findByDescription(req, res)
        }
        
    }
    
    static async findByDescription(req: Request, res: Response) {
        const description = req.query.description 

        const income = await Income.findAndValidateDescription(description)

        return res.json(income)
    }
    
    static async deleteByDescription(req: Request, res: Response) {
        const incomes = await Income.clearAllDescription(req.query.description)

        console.log(incomes)


        return res.json(incomes)
    }
}

export { IncomeController }