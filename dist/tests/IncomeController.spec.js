"use strict";
/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const supertest_1 = __importDefault(require("supertest"));
describe('Testing Income Controller', () => {
    it("Should be able to create a new income", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app)
            .post('/incomes')
            .send({
            description: 'test-create-income',
            value: 250,
            day: 19,
            month: 10,
            year: 2022
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id");
    }));
    it("Should no be able to create duplicated income", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post('/incomes').send({
            description: 'test-duplicated-entry',
            value: 250,
            day: 19,
            month: 10,
            year: 2022
        });
        const response = yield (0, supertest_1.default)(app_1.app).post('/incomes').send({
            description: 'test-duplicated-entry',
            value: 250,
            day: 19,
            month: 10,
            year: 2022
        });
        expect(response.status).toBe(400);
    }));
    it("Should return income created at given date", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/incomes/2022/10');
        expect(response.status).toBe(200);
    }));
    it('Try to post income without parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.app).post('/incomes').send({
            description: 'test-income-without-value',
            day: 19,
            month: 10,
            year: 2022
        });
        expect(response.status).toBe(400);
        response = yield (0, supertest_1.default)(app_1.app).post('/incomes').send({
            description: 'test-income-without-day',
            value: 100,
            month: 10,
            year: 2022
        });
        expect(response.status).toBe(400);
        response = yield (0, supertest_1.default)(app_1.app).post('/incomes').send({
            description: 'test-income-without-month',
            value: 100,
            day: 19,
            year: 2022
        });
        expect(response.status).toBe(400);
        response = yield (0, supertest_1.default)(app_1.app).post('/incomes').send({
            description: 'test-income-without-year',
            value: 100,
            day: 19,
            month: 10,
        });
        expect(response.status).toBe(400);
    }));
    it('Should return income filtered by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const income = yield (0, supertest_1.default)(app_1.app).post('/incomes').send({
            description: 'test-filter-id',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        });
        const response = yield (0, supertest_1.default)(app_1.app).get(`/incomes/${income.body.id}`);
        expect(response.body).toHaveProperty('description', income.body.description);
    }));
    it('Should not return income by invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const income = yield (0, supertest_1.default)(app_1.app).get('/incomes/123');
        expect(income.status).toBe(400);
    }));
    it('Should find an created income by description', () => __awaiter(void 0, void 0, void 0, function* () {
        const pastCreatedIncome = 'test-filter-id';
        const income = yield (0, supertest_1.default)(app_1.app).get(`/incomes?description=${pastCreatedIncome}`);
        expect(income.body[0]).toHaveProperty('id');
    }));
    it('Should atualize an created income', () => __awaiter(void 0, void 0, void 0, function* () {
        const pastCreatedIncome = 'test-filter-id';
        const income = yield (0, supertest_1.default)(app_1.app).get(`/incomes?description=${pastCreatedIncome}`);
        const incomeId = income.body[0].id;
        let atualizedIncome = yield (0, supertest_1.default)(app_1.app).put(`/incomes/${incomeId}`).send({
            description: 'atualized-income',
            value: 300
        });
        expect(atualizedIncome.status).toBe(400);
        atualizedIncome = yield (0, supertest_1.default)(app_1.app).put(`/incomes/${incomeId}`).send({
            description: 'atualized-income',
            value: 300,
            month: 10,
            year: 2022,
            day: 20
        });
        expect(atualizedIncome.status).toBe(200);
    }));
    it("Should delete income filtered by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const description = 'atualized-income';
        const income = yield (0, supertest_1.default)(app_1.app).get(`/incomes?description=${description}`);
        expect(income.body[0]).toHaveProperty('id');
        const id = income.body[0].id;
        const deletedIncome = yield (0, supertest_1.default)(app_1.app).delete(`/incomes/${id}`);
        expect(deletedIncome.status).toBe(200);
    }));
});
