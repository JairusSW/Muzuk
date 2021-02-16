const { nanoid } = require("nanoid/non-secure")

const createCode = () => {

    return `muzuk-${nanoid(7)}`

}

module.exports = createCode