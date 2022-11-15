"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const api_errors_1 = require("../helpers/api-errors");
function ensureAuthentication(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        throw new api_errors_1.UnauthorizedError("Unauthorized");
    }
    (0, jsonwebtoken_1.verify)(authToken, process.env.PRIVATE_KEY);
    return next();
}
exports.ensureAuthentication = ensureAuthentication;
