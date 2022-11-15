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
exports.Income = void 0;
const DateUseCase_1 = require("../providers/DateUseCase");
const client_1 = require("../prisma/client");
const client_2 = require("@prisma/client");
class Income {
    static deleteById(income_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const income = yield client_1.client.income.delete({
                    where: {
                        id: income_id
                    }
                });
                return income;
            }
            catch (error) {
                return `ERROR: ${error}`;
            }
        });
    }
    static createIncome({ description, value, date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = yield client_1.client.income.create({
                data: {
                    description,
                    value,
                    date
                }
            });
            return income;
        });
    }
    static findByMonthExtent(minimumDate, maximumDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const incomes = yield client_1.client.income.findMany({
                where: {
                    date: {
                        gte: minimumDate,
                        lt: maximumDate
                    }
                }
            });
            return incomes;
        });
    }
    static findByMonthAndDescription(year, month, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const { minimumDate, maximumDate } = DateUseCase_1.DateUseCase.monthReference(year, month);
            const income = yield client_1.client.income.findFirst({
                where: {
                    AND: [
                        {
                            date: {
                                gte: minimumDate,
                                lt: maximumDate
                            }
                        }, {
                            description: description
                        }
                    ]
                }
            });
            return income;
        });
    }
    static update(description, value, date, income_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const income = yield client_1.client.income.update({
                    where: {
                        id: income_id
                    },
                    data: {
                        description: description,
                        value: value,
                        date: date
                    }
                });
                return income;
            }
            catch (error) {
                return `ERROR ${error}`;
            }
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = yield client_1.client.income.findFirst({
                where: {
                    id: id
                }
            });
            return income;
        });
    }
    static findAndValidateDescription(description) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedDescription = (description) => {
                return client_2.Prisma.validator()({
                    description
                });
            };
            const income = yield client_1.client.income.findMany({
                where: validatedDescription(description)
            });
            return income;
        });
    }
    static clearAllDescription(description) {
        return __awaiter(this, void 0, void 0, function* () {
            const incomes = yield client_1.client.income.deleteMany({
                where: {
                    description
                }
            });
            return incomes;
        });
    }
    static getTotalByMonth(minimumDate, maximumDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const sum = yield client_1.client.income.aggregate({
                _sum: {
                    value: true,
                },
                where: {
                    date: {
                        gte: minimumDate,
                        lt: maximumDate
                    }
                }
            });
            return sum;
        });
    }
}
exports.Income = Income;
