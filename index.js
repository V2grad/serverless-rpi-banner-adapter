let client = require('./banner')

exports.handler = async (event) => {
    let res = {
        message: "Nothing to return."
    }
    let params = event.queryStringParameters
    if (params.term && params.type) {
        switch (params.type) {
            case 'seats':
                res = await client.section(params.term)
                break;
            default:
                res = await client.listing(params.term)
        }
    }
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify(res),
    };
    return response;
};