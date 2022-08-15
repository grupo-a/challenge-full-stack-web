
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000)
    return this
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

Date.prototype.removeDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() - days)
    return date
}

Date.prototype.addMonth = function (month) {
    var date = new Date(this.valueOf())
    date.setMonth(date.getMonth() + month)
    return date
}
