const listing = require('./src/banner')
const seats = require('./src/seats')

// Let AWS to handle the route
exports.listing = async (event) => {
    let terms = event.terms
    return await listing.listing(terms);
};

exports.seats = async (event) => {
    let terms = event.terms
    return await seats.seats(terms)
}