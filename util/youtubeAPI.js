const API = require('simple-youtube-api')

const youtubeAPI = (keys) => {

    return new API(keys[(Math.random() * keys.length) | 0])

}

module.exports = youtubeAPI