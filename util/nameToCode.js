const createCode = async (code, database) => {

    const data = await database.get(code)

    console.log(data)
    
    return data.title

}

module.exports = createCode