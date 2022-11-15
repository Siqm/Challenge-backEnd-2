import { Income } from "../models/IncomeModel";
import { Request, Response } from "express"
import { client } from "../prisma/client";
import { DateUseCase } from "../providers/DateUseCase";
import { BadRequestError } from "../helpers/api-errors";

class IncomeController {

    static async findByMonth(req: Request, res: Response) {

        const { year, month } = req.params

        if(!year || !month) {
            throw new BadRequestError('Year or month invalid')
        }

        const {minimumDate, maximumDate} = DateUseCase.monthReference(year, month)

        const incomes = await Income.findByMonthExtent(minimumDate, maximumDate)

        if (!incomes) {
            throw new BadRequestError("No matches with given date")
        }

        return res.json(incomes)
    }

    static async detailIncome(req: Request, res: Response) {
        const { income_id } = req.params;
        const income = await Income.findById(income_id)

        if (!income) {
            throw new BadRequestError('No matche with given id')
        }

        return res.json(income)
    }

    static async postIncome (req: Request, res: Response) {

        const { description, value, day, month, year } = req.body

        if (!description || !value || !day || !month || !year) {
            throw new BadRequestError("All fields must be provided")
        }

        const alreadyExists = await Income.findByMonthAndDescription(year, month, description)

        if (alreadyExists) {
            throw new BadRequestError("Duplicated entry")
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
            throw new BadRequestError('All fields must be provided')
        }

        const date = new Date(year, month, day)
        
        const income = await Income.update(description, value, date, income_id)

        return res.json(income)
    }

    static async deleteIncome(req: Request, res: Response) {
        const { income_id } = req.params;

        const income = await Income.deleteById(income_id)

        if (!income) {
            throw new BadRequestError("No matches to the given id")
        }

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

        if (!income) {
            throw new BadRequestError("No match to the given description")
        }

        return res.json(income)
    }
    
    static async deleteByDescription(req: Request, res: Response) {
        const incomes = await Income.clearAllDescription(req.query.description)

        console.log(incomes)


        return res.json(incomes)
    }
}

export { IncomeController }