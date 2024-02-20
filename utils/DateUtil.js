const moment = require('moment')

class DateUtil{

    validateDate(valor) {
        return moment(valor, 'YYYYMMDD', true).isValid();
    }

}

module.exports = DateUtil