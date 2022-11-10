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
exports.OutgoingController = void 0;
const api_errors_1 = require("../helpers/api-errors");
const CategoryModel_1 = require("../models/CategoryModel");
const OutGoingModel_1 = require("../models/OutGoingModel");
const client_1 = require("../prisma/client");
const DateUseCase_1 = require("../providers/DateUseCase");
class OutgoingController {
    static postOutgoing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, value, month, year, day, category } = req.body;
            // Casting string to enum
            const enumCategory = CategoryModel_1.Category[category];
            if (!description || !value || !month || !year || !day) {
                throw new api_errors_1.BadRequestError("All fields must be filled");
            }
            const alreadyExists = yield OutGoingModel_1.Outgoing.findByMonthAndDescription(year, month, description);
            const date = new Date(year, month, day);
            if (alreadyExists) {
                throw new api_errors_1.DuplicatedFieldError(`Entry with description ${description} and date ${date} already exists`);
            }
            const outgoing = yield OutGoingModel_1.Outgoing.createOutgoing(description, value, date, enumCategory);
            return res.json(outgoing);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const outgoings = yield client_1.client.outgoing.findMany();
            return res.json(outgoings);
        });
    }
    static getOutgoingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { outgoing_id } = req.params;
            const outgoing = yield OutGoingModel_1.Outgoing.findById(outgoing_id);
            if (!outgoing) {
                throw new api_errors_1.BadRequestError("Outgoing does not exists");
            }
            return res.json(outgoing);
        });
    }
    static atualizeOutgoing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { outgoing_id } = req.params;
            const { description, value } = req.body;
            if (!description || !value) {
                throw new api_errors_1.BadRequestError("All fields must be filled");
            }
            const outgoing = yield OutGoingModel_1.Outgoing.updateById(outgoing_id, description, value);
            if (!outgoing) {
                throw new api_errors_1.BadRequestError("Outgoing does not exists");
            }
            return res.json(outgoing);
        });
    }
    static deleteOutgoing(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { outgoing_id } = req.params;
            const outgoing = yield client_1.client.outgoing.delete({
                where: {
                    id: outgoing_id
                }
            });
            if (!outgoing) {
                throw new api_errors_1.BadRequestError("Outgoing does not exists");
            }
            return res.json(outgoing);
        });
    }
    static findByDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const description = req.query.description;
            const outgoing = yield OutGoingModel_1.Outgoing.findByDescription(description);
            if (!outgoing) {
                throw new api_errors_1.BadRequestError("Outgoing does not exists");
            }
            return res.json(outgoing);
        });
    }
    static indexOrDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.query.description) {
                OutgoingController.index(req, res);
            }
            else {
                OutgoingController.findByDescription(req, res);
            }
        });
    }
    static findByMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { year, month } = req.params;
            if (!year || !month) {
                throw new api_errors_1.BadRequestError("All fields must be filled");
            }
            const { maximumDate, minimumDate } = DateUseCase_1.DateUseCase.monthReference(year, month);
            const outgoings = yield OutGoingModel_1.Outgoing.findByMonthExtent(minimumDate, maximumDate);
            if (!outgoings) {
                throw new api_errors_1.BadRequestError("No matches with given date");
            }
            return res.json(outgoings);
        });
    }
}
exports.OutgoingController = OutgoingController;
