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
exports.IncomeController = void 0;
const IncomeModel_1 = require("../models/IncomeModel");
const client_1 = require("../prisma/client");
const DateUseCase_1 = require("../providers/DateUseCase");
const api_errors_1 = require("../helpers/api-errors");
class IncomeController {
    static findByMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { year, month } = req.params;
            if (!year || !month) {
                throw new api_errors_1.BadRequestError('Year or month invalid');
            }
            const { minimumDate, maximumDate } = DateUseCase_1.DateUseCase.monthReference(year, month);
            const incomes = yield IncomeModel_1.Income.findByMonthExtent(minimumDate, maximumDate);
            if (!incomes) {
                throw new api_errors_1.BadRequestError("No matches with given date");
            }
            return res.json(incomes);
        });
    }
    static detailIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { income_id } = req.params;
            const income = yield IncomeModel_1.Income.findById(income_id);
            if (!income) {
                throw new api_errors_1.BadRequestError('No matche with given id');
            }
            return res.json(income);
        });
    }
    static postIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, value, day, month, year } = req.body;
            if (!description || !value || !day || !month || !year) {
                throw new api_errors_1.BadRequestError("All fields must be provided");
            }
            const alreadyExists = yield IncomeModel_1.Income.findByMonthAndDescription(year, month, description);
            if (alreadyExists) {
                throw new api_errors_1.BadRequestError("Duplicated entry");
            }
            const date = new Date(year, month, day);
            const income = yield IncomeModel_1.Income.createIncome({
                description,
                value,
                date
            });
            return res.json(income);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield client_1.client.income.findMany();
            return res.json(users);
        });
    }
    static atualizeIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { income_id } = req.params;
            const { description, value, month, year, day } = req.body;
            if (!description || !value || !month || !year || !day) {
                throw new api_errors_1.BadRequestError('All fields must be provided');
            }
            const date = new Date(year, month, day);
            const income = yield IncomeModel_1.Income.update(description, value, date, income_id);
            return res.json(income);
        });
    }
    static deleteIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { income_id } = req.params;
            const income = yield IncomeModel_1.Income.deleteById(income_id);
            if (!income) {
                throw new api_errors_1.BadRequestError("No matches to the given id");
            }
            return res.json(income);
        });
    }
    static indexOrDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.description) {
                IncomeController.index(req, res);
            }
            else {
                IncomeController.findByDescription(req, res);
            }
        });
    }
    static findByDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const description = req.query.description;
            const income = yield IncomeModel_1.Income.findAndValidateDescription(description);
            if (!income) {
                throw new api_errors_1.BadRequestError("No match to the given description");
            }
            return res.json(income);
        });
    }
    static deleteByDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const incomes = yield IncomeModel_1.Income.clearAllDescription(req.query.description);
            console.log(incomes);
            return res.json(incomes);
        });
    }
}
exports.IncomeController = IncomeController;
