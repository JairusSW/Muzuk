const ytsr = require('ytsr')

const searchYoutube = async (query, options = {
    limit: 5
}) => {

    const result = await ytsr(query, {
        limit: options.limit || 5,
				safeSearch: true
    })

    return result['items']

}

module.exports = searchYoutube