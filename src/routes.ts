import { Router } from "express";
import { IncomeController } from "./controllers/IncomeController";

const router = Router()

router.post('/incomes', IncomeController.postIncome)

export { router };