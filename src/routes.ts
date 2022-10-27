import { Router } from "express";
import { IncomeController } from "./controllers/IncomeController";
import { OutgoingController } from "./controllers/OutGoingController";
import { ResumeController } from "./controllers/ResumeController";
import { TesteController } from "./controllers/TesteController";

const router = Router()

router.post('/incomes', IncomeController.postIncome)
router.get('/incomes', IncomeController.indexOrDescription)
router.get('/incomes/:income_id', IncomeController.detailIncome)
router.put('/incomes/:income_id', IncomeController.atualizeIncome)
router.delete('/incomes/:income_id', IncomeController.deleteIncome)
router.get('/incomes/:year/:month', IncomeController.findByMonth)
// router.get('/incomesdel', IncomeController.deleteByDescription)

router.post('/outgoings', OutgoingController.postOutgoing)
router.get('/outgoings', OutgoingController.indexOrDescription)
router.get('/outgoings/:outgoing_id', OutgoingController.getOutgoingById)
router.put('/outgoings/:outgoing_id', OutgoingController.atualizeOutgoing)
router.delete('/outgoings/:outgoing_id', OutgoingController.deleteOutgoing)
router.get('/outgoings/:year/:month', OutgoingController.findByMonth)

router.get('/resume/:year/:month', ResumeController.monthResume)

router.get('/teste', TesteController.getByDate)
router.get('/teste1', TesteController.testeData)
router.post('/testeenum', TesteController.testeEnum)
router.get('/', (req, res) => {
    throw new Error ("Erro lançado no get")
})

export { router };