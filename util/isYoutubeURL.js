const ytdl = require('ytdl-core')

const createCode = (url) => {

    try {

        ytdl.validateURL(url)

        return true

    } catch {

        return false

    }

}

module.exports = createCode