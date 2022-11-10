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
exports.TesteController = void 0;
const CategoryModel_1 = require("../models/CategoryModel");
const client_1 = require("../prisma/client");
class TesteController {
    static getByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield client_1.client.income.findMany({
                where: {
                    date: {
                        gt: new Date("2022-10-18")
                    }
                }
            });
            return res.json(data);
        });
    }
    static testeData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { month, year } = req.body;
            const date = new Date;
            date.setFullYear(year, month);
            console.log(date.toString());
            return res.json().status(200);
        });
    }
    static testeEnum(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category } = req.body;
            const eNum = CategoryModel_1.Category[category];
            return res.json(eNum);
        });
    }
}
exports.TesteController = TesteController;
