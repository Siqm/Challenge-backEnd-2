import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { IncomeController } from "./controllers/IncomeController";
import { OutgoingController } from "./controllers/OutGoingController";
import { ResumeController } from "./controllers/ResumeController";
import { TesteController } from "./controllers/TesteController";
import { UserController } from "./controllers/UserController";
import { ensureAuthentication } from "./middlewares/ensureAuthentication";

const router = Router()

router.post('/incomes', ensureAuthentication, IncomeController.postIncome)
router.get('/incomes', ensureAuthentication, IncomeController.indexOrDescription)
router.get('/incomes/:income_id', ensureAuthentication, IncomeController.detailIncome)
router.put('/incomes/:income_id', ensureAuthentication, IncomeController.atualizeIncome)
router.delete('/incomes/:income_id', ensureAuthentication, IncomeController.deleteIncome)
router.get('/incomes/:year/:month', ensureAuthentication, IncomeController.findByMonth)
// router.get('/incomesdel', IncomeController.deleteByDescription)

router.post('/outgoings', ensureAuthentication, OutgoingController.postOutgoing)
router.get('/outgoings', ensureAuthentication, OutgoingController.indexOrDescription)
router.get('/outgoings/:outgoing_id', ensureAuthentication, OutgoingController.getOutgoingById)
router.put('/outgoings/:outgoing_id', ensureAuthentication, OutgoingController.atualizeOutgoing)
router.delete('/outgoings/:outgoing_id', ensureAuthentication, OutgoingController.deleteOutgoing)
router.get('/outgoings/:year/:month', ensureAuthentication, OutgoingController.findByMonth)

router.get('/resume/:year/:month', ensureAuthentication, ResumeController.monthResume)

router.post('/users', UserController.create)
router.post('/login', AuthenticateUserController.refreshToken)

router.get('/teste', ensureAuthentication, (request, response) => {
    return response.json([
        {id: 1, name: 'Teste'},
        {id: 2, name: 'Lindo'}
    ])
})

export { router };