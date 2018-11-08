const xml = require('./utils/xml')
const axios = require('axios')

function extractSeats(data) {
    let arr = []
    let jsonObj = xml.parseXML(data)
    jsonObj.CourseDB.SECTION.forEach(e => {
        let attr = e.attr
        arr.push({
            crn: attr.crn,
            shortname: attr.num,
            seats: attr.seats,
            seats_taken: attr.students
        })
    })
    return {
        sections: arr
    }
}

module.exports = {
    seats(termShortName) {
        const section = `https://sis.rpi.edu/reg/rocs/YACS_${termShortName}.xml`
        return axios(section).then(res => {
            return extractSeats(res.data)
        }).catch((err => {
            return err
        }))
    },
}