const ytdl = require('ytdl-core')

const createCode = (url) => {

    try {

        ytdl.validateURL(url)

        return true

    } catch (err) {

        return false

    }

}

module.exports = createCode