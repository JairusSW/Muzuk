const numeral = require('numeral')

const isCode = (code) => {

    const number = numeral(parseInt(code.toString().trim()))

    return number.format('0,0')

}

module.exports = isCode