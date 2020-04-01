const request = require('request')
const getToken = require('../../keys.js')
// get your own tokens by signing up at https://account.mapbox.com
// import the token from keys.js to append to URL
const pt = getToken.sendMKey().toString()
// shorthand syntax & destructuring
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + pt + '&limit=1'
    // send the request and return the content of the body in JSON format
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Location Service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        } else {
            // using a callback function, send the lat long and location back to the application to use in placesFetch
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })

}

module.exports = geoCode