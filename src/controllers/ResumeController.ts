import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { Income } from "../models/IncomeModel";
import { Outgoing } from "../models/OutGoingModel";
import { client } from "../prisma/client";
import { DateUseCase } from "../providers/DateUseCase";

class ResumeController {

    static async monthResume(req: Request, res: Response) {

        const { year, month } = req.params;
        const { minimumDate, maximumDate } = DateUseCase.monthReference(year, month)

        const incomesSum = (await Income.getTotalByMonth
            (minimumDate, maximumDate))._sum.value.toFixed(2)
        const outgoingsSum = (await Outgoing.getTotalByMonth
            (minimumDate, maximumDate))._sum.value.toFixed(2)

        if (!outgoingsSum && !incomesSum) {
            throw new BadRequestError("ERROR: No matches to the given year and month")
        }

        const incomesBalance = parseFloat(incomesSum)
        const outgoingBalance = parseFloat(outgoingsSum)

        const balance = incomesBalance - outgoingBalance

        const categorys = await Outgoing.groupByCategoryFilterByDate(minimumDate, maximumDate)

        const response = { categorys, balance, incomesBalance, outgoingBalance}

        return res.json(response);
    }
}

export { ResumeController }