class ArgumentError {

    static missingArgument({ description, value, day, month, year }) {

        if(!description || !value || !month || !year || !day) {
            return true;
        }
        return false;
    }

    static missingDescriptionAndValue (description, value) {
        
        if (!description || !value) {
            return true;
        }
        return false;
    }
    
    static missingMonthYear (year, month) {

        if (!year || !month) {
            return true
        }
        return false
    }
}

export { ArgumentError }