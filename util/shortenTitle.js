const shortenTitle = (data) => {

    let array = data.toString().split('')

    if (array.length >= 25) {

        array = [array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13], array[14], array[15], array[16], array[17], array[18], array[19], array[20], array[21], array[22], array[23], array[24], '.', '.', '.']

    }

    return array.join('')
    
}

module.exports = shortenTitle