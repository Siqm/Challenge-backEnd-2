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
describe('Testing Outgoing Controller', () => {
    it("Should be able to create new outgoing", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).post('/outgoings').send({
            description: 'test-create-outgoing',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('category');
        expect(response.body).toHaveProperty('id');
    }));
    it('Should not be able to create duplicated outgoing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post('/outgoings').send({
            description: 'test-duplicated-entry',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        });
        const response = yield (0, supertest_1.default)(app_1.app).post('/outgoings').send({
            description: 'test-duplicated-entry',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        });
        expect(response.status).toBe(400);
    }));
    it('Should return outgoing created at given date', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.app).get('/outgoings/2022/10');
        expect(response.status).toBe(200);
    }));
    it('Try to post outgoing without parameter', () => __awaiter(void 0, void 0, void 0, function* () {
        let response = yield (0, supertest_1.default)(app_1.app).post('/outgoings').send({
            description: 'test-outgoing-without-value',
            day: 19,
            month: 10,
            year: 2022
        });
        expect(response.status).toBe(400);
        response = yield (0, supertest_1.default)(app_1.app).post('/outgoings').send({
            description: 'test-outgoing-without-day',
            value: 100,
            month: 10,
            year: 2022
        });
        expect(response.status).toBe(400);
        response = yield (0, supertest_1.default)(app_1.app).post('/outgoings').send({
            description: 'test-outgoing-without-month',
            value: 100,
            day: 19,
            year: 2022
        });
        expect(response.status).toBe(400);
        response = yield (0, supertest_1.default)(app_1.app).post('/outgoings').send({
            description: 'test-outgoing-without-year',
            value: 100,
            day: 19,
            month: 10,
        });
        expect(response.status).toBe(400);
    }));
    it('Should return outgoing filtered by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const outgoing = yield (0, supertest_1.default)(app_1.app).post('/outgoings').send({
            description: 'test-filter-id',
            value: 100,
            day: 19,
            month: 10,
            year: 2022
        });
        const response = yield (0, supertest_1.default)(app_1.app).get(`/outgoings/${outgoing.body.id}`);
        expect(response.body).toHaveProperty('description', outgoing.body.description);
    }));
    it('Should not return outgoing by invalid id', () => __awaiter(void 0, void 0, void 0, function* () {
        const outgoing = yield (0, supertest_1.default)(app_1.app).get('/outgoings/123');
        expect(outgoing.status).toBe(400);
    }));
    it('Should find an created outgoing by description', () => __awaiter(void 0, void 0, void 0, function* () {
        const pastCreatedOutgoing = 'test-filter-id';
        const outgoing = yield (0, supertest_1.default)(app_1.app).get(`/outgoings?description=${pastCreatedOutgoing}`);
        expect(outgoing.body[0]).toHaveProperty('id');
    }));
    it('Should atualize an created outgoing', () => __awaiter(void 0, void 0, void 0, function* () {
        const pastCreatedOutgoing = 'test-filter-id';
        const outgoing = yield (0, supertest_1.default)(app_1.app).get(`/outgoings?description=${pastCreatedOutgoing}`);
        const outgoingId = outgoing.body[0].id;
        const atualizedOutgoing = yield (0, supertest_1.default)(app_1.app).put(`/outgoings/${outgoingId}`).send({
            description: 'atualized-outgoing',
            value: 300
        });
        expect(atualizedOutgoing.status).toBe(200);
    }));
    it("Should delete outgoing filtered by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const description = 'atualized-outgoing';
        const outgoing = yield (0, supertest_1.default)(app_1.app).get(`/outgoings?description=${description}`);
        expect(outgoing.body[0]).toHaveProperty('id');
        const id = outgoing.body[0].id;
        const deletedOutgoing = yield (0, supertest_1.default)(app_1.app).delete(`/outgoings/${id}`);
        expect(deletedOutgoing.status).toBe(200);
    }));
});
