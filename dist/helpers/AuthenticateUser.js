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
exports.AuthenticateUser = void 0;
const UserModel_1 = require("../models/UserModel");
const api_errors_1 = require("./api-errors");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthenticateUser {
    static execute(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAlreadyExists = yield UserModel_1.User.findByEmail(email);
            if (!userAlreadyExists) {
                throw new api_errors_1.BadRequestError('Email or password incorrect!');
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, userAlreadyExists.password);
            if (!passwordMatch) {
                throw new api_errors_1.BadRequestError('Email or password incorrect!');
            }
            const token = (0, jsonwebtoken_1.sign)({ id: userAlreadyExists.id }, process.env.PRIVATE_KEY, {
                subject: userAlreadyExists.id,
                expiresIn: "20m"
            });
            return { token };
        });
    }
}
exports.AuthenticateUser = AuthenticateUser;
