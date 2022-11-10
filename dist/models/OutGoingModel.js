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
exports.Outgoing = void 0;
const DateUseCase_1 = require("../providers/DateUseCase");
const client_1 = require("../prisma/client");
// import { Category } from "../enum/CategoryEnum";
const client_2 = require("@prisma/client");
class Outgoing {
    static createOutgoing(description, value, date, cat) {
        return __awaiter(this, void 0, void 0, function* () {
            const outgoing = yield client_1.client.outgoing.create({
                data: {
                    description,
                    value,
                    date,
                    category: cat
                }
            });
            return outgoing;
        });
    }
    static findByMonthAndDescription(year, month, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const { minimumDate, maximumDate } = DateUseCase_1.DateUseCase.monthReference(year, month);
            const outgoing = yield client_1.client.outgoing.findFirst({
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
            return outgoing;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const outgoing = yield client_1.client.outgoing.findFirst({
                where: {
                    id: id
                }
            });
            return outgoing;
        });
    }
    static updateById(id, description, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const outgoing = yield client_1.client.outgoing.update({
                where: {
                    id: id
                }, data: {
                    description: description,
                    value: value
                }
            });
            return outgoing;
        });
    }
    static findByDescription(description) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedDescription = (description) => {
                return client_2.Prisma.validator()({
                    description
                });
            };
            const outgoing = yield client_1.client.outgoing.findMany({
                where: validatedDescription(description)
            });
            return outgoing;
        });
    }
    static findByMonthExtent(minimumDate, maximumDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const outgoings = yield client_1.client.outgoing.findMany({
                where: {
                    date: {
                        gte: minimumDate,
                        lt: maximumDate
                    }
                }
            });
            return outgoings;
        });
    }
    static getTotalByMonth(minimumDate, maximumDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const sum = yield client_1.client.outgoing.aggregate({
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
    static groupByCategoryFilterByDate(minimumDate, maximumDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const outgoings = yield client_1.client.outgoing.groupBy({
                by: ['category'],
                where: {
                    date: {
                        gte: minimumDate,
                        lt: maximumDate
                    }
                },
                _sum: {
                    value: true
                }
            });
            return outgoings;
        });
    }
}
exports.Outgoing = Outgoing;
