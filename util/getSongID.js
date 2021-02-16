const getSongID = (url) => {

    const split = url.replace('?', '&').split('&')

    split.shift()

    const query = {}

    for (const bit of split) {

        const data = bit.split('=')

        query[data[0]] = data[1]

    }

    if (query['v']) return query['v']

    return

}

module.exports = getSongID