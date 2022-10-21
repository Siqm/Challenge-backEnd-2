import { Router } from "express";
import { IncomeController } from "./controllers/IncomeController";
import { OutgoingController } from "./controllers/OutGoingController";
import { TesteController } from "./controllers/TesteController";

const router = Router()

router.post('/incomes', IncomeController.postIncome)
router.get('/incomes', (req, res) => {
    if (req.query.description) {
        return IncomeController.findByDescription(req, res)
    } else {
        return IncomeController.index(req, res)
    }
})
router.get('/incomes/:income_id', IncomeController.detailIncome)
router.put('/incomes/:income_id', IncomeController.atualizeIncome)
router.delete('/incomes/:income_id', IncomeController.deleteIncome)

router.post('/outgoings', OutgoingController.postOutgoing)
router.get('/outgoings', (req, res) => {
    if (req.query.description) {
        return OutgoingController.findByDescription(req, res)
    } else {
        return OutgoingController.index(req, res)
    }
})
router.get('/outgoings/:outgoing_id', OutgoingController.getOutgoingById)
router.put('/outgoings/:outgoing_id', OutgoingController.atualizeOutgoing)
router.delete('/outgoings/:outgoing_id', OutgoingController.deleteOutgoing)

router.get('/teste', TesteController.getByDate)
router.get('/teste1', TesteController.testeData)
router.post('/testeenum', TesteController.testeEnum)

export { router };