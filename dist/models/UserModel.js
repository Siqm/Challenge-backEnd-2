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
exports.User = void 0;
const bcryptjs_1 = require("bcryptjs");
const api_errors_1 = require("../helpers/api-errors");
const client_1 = require("../prisma/client");
class User {
    static execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield this.findByEmail(email);
            if (userAlreadyExists) {
                throw new api_errors_1.AlreadyExistsError('User already exists');
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 10);
            const user = yield client_1.client.user.create({
                data: {
                    name,
                    email,
                    password: passwordHash
                }
            });
            return user;
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield client_1.client.user.findFirst({
                where: {
                    email
                }
            });
            return user;
        });
    }
}
exports.User = User;
