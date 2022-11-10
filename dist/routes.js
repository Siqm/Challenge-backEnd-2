"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const AuthenticateUserController_1 = require("./controllers/AuthenticateUserController");
const IncomeController_1 = require("./controllers/IncomeController");
const OutGoingController_1 = require("./controllers/OutGoingController");
const ResumeController_1 = require("./controllers/ResumeController");
const UserController_1 = require("./controllers/UserController");
const ensureAuthentication_1 = require("./middlewares/ensureAuthentication");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/incomes', ensureAuthentication_1.ensureAuthentication, IncomeController_1.IncomeController.postIncome);
router.get('/incomes', ensureAuthentication_1.ensureAuthentication, IncomeController_1.IncomeController.indexOrDescription);
router.get('/incomes/:income_id', ensureAuthentication_1.ensureAuthentication, IncomeController_1.IncomeController.detailIncome);
router.put('/incomes/:income_id', ensureAuthentication_1.ensureAuthentication, IncomeController_1.IncomeController.atualizeIncome);
router.delete('/incomes/:income_id', ensureAuthentication_1.ensureAuthentication, IncomeController_1.IncomeController.deleteIncome);
router.get('/incomes/:year/:month', ensureAuthentication_1.ensureAuthentication, IncomeController_1.IncomeController.findByMonth);
// router.get('/incomesdel', IncomeController.deleteByDescription)
router.post('/outgoings', ensureAuthentication_1.ensureAuthentication, OutGoingController_1.OutgoingController.postOutgoing);
router.get('/outgoings', ensureAuthentication_1.ensureAuthentication, OutGoingController_1.OutgoingController.indexOrDescription);
router.get('/outgoings/:outgoing_id', ensureAuthentication_1.ensureAuthentication, OutGoingController_1.OutgoingController.getOutgoingById);
router.put('/outgoings/:outgoing_id', ensureAuthentication_1.ensureAuthentication, OutGoingController_1.OutgoingController.atualizeOutgoing);
router.delete('/outgoings/:outgoing_id', ensureAuthentication_1.ensureAuthentication, OutGoingController_1.OutgoingController.deleteOutgoing);
router.get('/outgoings/:year/:month', ensureAuthentication_1.ensureAuthentication, OutGoingController_1.OutgoingController.findByMonth);
router.get('/resume/:year/:month', ensureAuthentication_1.ensureAuthentication, ResumeController_1.ResumeController.monthResume);
router.post('/users', UserController_1.UserController.create);
router.post('/login', AuthenticateUserController_1.AuthenticateUserController.refreshToken);
router.get('/teste', ensureAuthentication_1.ensureAuthentication, (request, response) => {
    return response.json([
        { id: 1, name: 'Teste' },
        { id: 2, name: 'Lindo' }
    ]);
});
