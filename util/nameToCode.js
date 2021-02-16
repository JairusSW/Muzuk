const createCode = async (code, database) => {

    const data = await database.get(code)
    
    return data.title

}

module.exports = createCode