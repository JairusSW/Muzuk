const createCode = async (code, database) => {

    return await database.get(code)

}

module.exports = createCode