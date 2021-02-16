const toSeconds = (time) => {

    const data = time.split(':')

    let hours

    let minutes

    let seconds

    if (data.length <= 3) {
        
        hours = parseInt(data[0])

        minutes = parseInt(data[1])

        seconds = parseInt(data[2])

    }

    if (data.length <= 2) {
        
        hours = 0

        minutes = parseInt(data[0])

        seconds = parseInt(data[1])

    }

    if (data.length <= 1) {
        
        hours = 0

        minutes = 0

        seconds = parseInt(time)

    }

    if (!hours === 0) {

        return (minutes * 60) + seconds
        
    }

    return ((hours * 60) * 60) + (minutes * 60) + seconds

}

module.exports = toSeconds