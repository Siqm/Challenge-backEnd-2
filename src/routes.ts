import { Router } from "express";
import { IncomeController } from "./controllers/IncomeController";
import { OutGoingController } from "./controllers/OutGoingController";
import { TesteController } from "./controllers/TesteController";

const router = Router()

router.post('/incomes', IncomeController.postIncome)
router.get('/incomes', IncomeController.index)
router.get('/incomes/:income_id', IncomeController.detailIncome)
router.put('/incomes/:income_id', IncomeController.atualizeIncome)
router.delete('/incomes/:income_id', IncomeController.deleteIncome)

router.post('/outgoings', OutGoingController.postOutGoing)
router.get('/outgoings', OutGoingController.index)
router.get('/outgoings/:outgoing_id', OutGoingController.getOutgoingById)
router.put('/outgoings/:outgoing_id', OutGoingController.atualizeOutgoing)
router.delete('/outgoings/:outgoing_id', OutGoingController.deleteOutgoing)

router.get('/teste', TesteController.getByDate)

export { router };