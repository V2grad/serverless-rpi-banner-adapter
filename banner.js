const axios = require('axios')
const xml = require('fast-xml-parser')

String.prototype.titleize = function() {
    return this.toLowerCase().replace(/(?:^|\s|-)\S/g, function(m) {
        return m.toUpperCase();
    });
}

const options = {
    attributeNamePrefix: "",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    localeRange: "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly: false,
    // attrValueProcessor: a => a //default is a=>a
    // tagValueProcessor: a => he.decode(a) //default is a=>a
};

function extractSeats(data) {
    let arr = []
    let jsonObj = xml.parse(data, options)
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

function extractCourse(data) {
    let result = {}
    let jsonObj = xml.parse(data, options)
    let course = jsonObj.CourseDB.COURSE
    course.forEach(c => {
        let a = c.attr
        if (result[a.dept] === undefined) {
            result[a.dept] = []
        }
        result[a.dept].push({
            min_credits: a.credmin,
            max_credits: a.credmax,
            shortname: a.num,
            longname: a.name.titleize(), // Titleize
            // subject: {
            //     shortname: a.dept
            // },
            sections: extractSection(c.SECTION)
        })
    })
    let wrapper = []
    Object.keys(result).forEach(d => {
        wrapper.push({
            shortname: d,
            listings: result[d]
        })
    })
    return {
        subjects: wrapper
    }
}

function extractSection(data) {
    let result = []
    if (data) { // May not exist
        wrapper(data).forEach(s => {
            let a = s.attr
            let p = extractPeriod(s.PERIOD)
            result.push({
                shortname: a.num,
                crn: a.crn,
                seats: a.seats,
                seats_taken: a.students,
                periods: p,
                instructors: [...new Set([].concat.apply([], p.map((v) => {
                    return v.instructor
                })))].filter((i) => { return i !== 'Staff' })
            })
        })
    }

    return result
}

function extractPeriod(data) {
    let result = []
    if (data) { // May not exist
        wrapper(data).forEach(p => {
            let a = p.attr
            let perday = {
                type: a.type,
                start: a.start,
                end: a.end,
                location: a.location,
                instructor: a.instructor.split('/')
            }
            if (p.DAY) { // Day may not exist
                wrapper(p.DAY).forEach(d => {
                    let day = d + 1
                    result.push({
                        ...perday,
                        day: day
                    })
                })
            }
        })
    }

    return result
}

function wrapper(data) {

    if (!(data instanceof Array)) {
        data = [data];
    }

    return data
}

module.exports = {
    section(termShortName) {
        const section = `https://sis.rpi.edu/reg/rocs/YACS_${termShortName}.xml`
        return axios.get(section).then(res => {
            return extractSeats(res.data)
        })
    },
    listing(termShortName) {
        const listing = `https://sis.rpi.edu/reg/rocs/${termShortName}.xml`
        return axios.get(listing).then(res => {
            return extractCourse(res.data)
        })
    }
}
