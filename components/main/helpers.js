// timeAgo return difference between now and post created 
const timeAgo = (value) => {
    const day = 86400000 // day = 1000 * 60 * 60 * 24
    // const timeAgoZone = new Date().getTimezoneOffset()
    const actualDate = new Date()
    const timeNow = Math.floor(actualDate.getTime()/1000)
    const createdDate = new Date(value*1000)
    const diffDays = Math.floor((actualDate - createdDate)/day)
    // const dif = new Date((timeNow - value)*1000).toISOString().substr() // ({YEA}{R-MM-DD(T)hh:mm:ss})
    const dif2 = new Date((timeNow - value)*1000)//.toLocaleTimeString()
    // if difference between now and post created > 1 day than return YEARS/MONTHS/DAYS else return HOURS/MINUTES
    const answer = diffDays >= 1 ? dateChecker(diffDays) : timeChecker(dif2)
    return `${answer} ago`
}
// timeChecker return hours or minutes
const timeChecker = (time) => {
    const hours = time.getUTCHours()
    const minutes = time.getUTCMinutes()
    // const seconds = time.getUTCSeconds()
    let timeAgo = "few seconds"
    if (hours > 0) {
        if (hours < 2) {
            timeAgo = `hour`
        } else timeAgo = `${hours} hours`
    } else if (minutes > 0) {
        if (minutes < 2) {
            timeAgo = `minute`
        } else timeAgo = `${minutes} minutes`
    }
    return timeAgo
}

// dateChecker return years, months, days
const dateChecker = (days) => {
    let dateAgo = "day"
    if (days > 30) {
        const months = Math.floor(days/30.4)
        if (months > 12) {
            dateAgo = `${parseInt(months/12)} years`
        } else dateAgo = `${months} months`
    } else dateAgo = `${days} days`
    return dateAgo
}

// KMBformat return readable number: example 22560 => 22.56k
const KMBformat = (n) => {
    const pow = Math.pow, floor = Math.floor, abs = Math.abs, log = Math.log
    const abbrev = 'kmb'
    const round = (n, precision) => {
        const prec = Math.pow(10, precision)
        return Math.round(n*prec)/prec
    }
    let base = floor(log(abs(n)) / log(1000))
    const suffix = abbrev[Math.min(2, base - 1)]
    base = abbrev.indexOf(suffix) + 1
    console.log("KMBformat " + n)
    return suffix ? round(n/pow(1000, base), 2) + suffix : '' + n
}

export  {timeAgo, KMBformat}