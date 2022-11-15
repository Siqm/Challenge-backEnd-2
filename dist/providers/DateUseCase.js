"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUseCase = void 0;
class DateUseCase {
    // Returns a array containing two Dates, to match the beggining and end of the month
    static monthReference(year, month) {
        month = parseInt(month);
        const minimumDate = new Date(year, month, 1);
        const maximumDate = new Date(year, month + 1, 1);
        return { minimumDate, maximumDate };
    }
}
exports.DateUseCase = DateUseCase;
