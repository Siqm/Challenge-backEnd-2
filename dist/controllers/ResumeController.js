"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeController = void 0;
const api_errors_1 = require("../helpers/api-errors");
const IncomeModel_1 = require("../models/IncomeModel");
const OutGoingModel_1 = require("../models/OutGoingModel");
const DateUseCase_1 = require("../providers/DateUseCase");
class ResumeController {
    static monthResume(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { year, month } = req.params;
            const { minimumDate, maximumDate } = DateUseCase_1.DateUseCase.monthReference(year, month);
            const incomesSum = (yield IncomeModel_1.Income.getTotalByMonth(minimumDate, maximumDate))._sum.value.toFixed(2);
            const outgoingsSum = (yield OutGoingModel_1.Outgoing.getTotalByMonth(minimumDate, maximumDate))._sum.value.toFixed(2);
            if (!outgoingsSum && !incomesSum) {
                throw new api_errors_1.BadRequestError("ERROR: No matches to the given year and month");
            }
            const incomesBalance = parseFloat(incomesSum);
            const outgoingBalance = parseFloat(outgoingsSum);
            const balance = incomesBalance - outgoingBalance;
            const categorys = yield OutGoingModel_1.Outgoing.groupByCategoryFilterByDate(minimumDate, maximumDate);
            const response = { categorys, balance, incomesBalance, outgoingBalance };
            return res.json(response);
        });
    }
}
exports.ResumeController = ResumeController;
