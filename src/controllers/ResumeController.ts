import { Request, Response } from "express";
import { Income } from "../models/IncomeModel";
import { Outgoing } from "../models/OutgoingModel";
import { client } from "../prisma/client";
import { DateUseCase } from "../providers/DateUseCase";

class ResumeController {

    static async monthResume(req: Request, res: Response) {

        const { year, month } = req.params;
        const { minimumDate, maximumDate } = DateUseCase.monthReference(year, month)

        const incomesSum = await Income.getTotalByMonth(minimumDate, maximumDate)
        const outgoingsSum = await Outgoing.getTotalByMonth(minimumDate, maximumDate)

        const incomesBalance = outgoingsSum._sum.value.toFixed(2)
        const outgoingBalance = incomesSum._sum.value.toFixed(2)

        const balance = parseFloat(incomesBalance) - parseFloat(outgoingBalance)

        const categorys = await Outgoing.groupByMonthFilterByMonth(minimumDate, maximumDate)

        console.log(balance, categorys)
        return true;
    }
}

export { ResumeController }