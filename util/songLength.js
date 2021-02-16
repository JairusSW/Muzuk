const parseTime = require('convert-seconds')

const songLength = (time) => {

    const data = parseTime(time)

    let hours = data.hours.toString()

    let minutes = data.minutes.toString()

    let seconds = data.seconds.toString()

    if (data.seconds <= 9) seconds = `0${seconds}`

		if (data.minutes <= 9) minutes = `0${minutes}`

    if (data.hours >= 1) return `${hours}:${minutes}:${seconds}`

    return `${minutes}:${seconds}`

}

module.exports = songLength