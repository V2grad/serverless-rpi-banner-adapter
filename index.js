const listing = require('./src/banner')
const seats = require('./src/seats')


function errHandle(err) {
    let status = err.response.status
    let statusText = err.response.statusText
    return `[${status}] ${statusText}`
}
// Let AWS to handle the route
exports.listing = (event, context, callback) => {
    let terms = event.terms
    listing.listing(terms).then(res => {
        callback(null, res)
    }).
    catch((err => {
        callback(errHandle(err))
    }));
};

exports.seats = (event, context, callback) => {
    let terms = event.terms
    seats.seats(terms).then(res => {
        callback(null, res)
    }).catch((err => {
        callback(errHandle(err))
    }))
}
