
class DateUseCase {

    // Returns a array containing two Dates, to match the beggining and end of the month
    static monthReference (month, year) {

        const minimumDate = new Date(year, month, 1)
        const maximumDate = new Date(year, month +1, 1)

        return {minimumDate, maximumDate}
    }
}

export { DateUseCase }