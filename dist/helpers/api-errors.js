"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExistsError = exports.DuplicatedFieldError = exports.NotFoundError = exports.UnauthorizedError = exports.BadRequestError = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
class BadRequestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}
exports.NotFoundError = NotFoundError;
class DuplicatedFieldError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}
exports.DuplicatedFieldError = DuplicatedFieldError;
class AlreadyExistsError extends ApiError {
    constructor(message) {
        super(message, 403);
    }
}
exports.AlreadyExistsError = AlreadyExistsError;
