import { Router } from "express";
import { IncomeController } from "./controllers/IncomeController";
import { Income } from "./models/IncomeModel";

const router = Router()

router.post('/incomes', IncomeController.postIncome)
router.get('/incomes', IncomeController.index)
router.get('/incomes/:income_id', IncomeController.detailIncome)
router.put('/incomes/:income_id', IncomeController.atualizeIncome)
router.delete('/incomes/:income_id', IncomeController.deleteIncome)

export { router };