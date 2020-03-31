const request = require('request')
const getToken = require('../../keys.js')

const placesKey = getToken.pApiKey().toString()

const placesFetch = (latitude, longitude, callback) => {

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' +
        longitude + '&radius=1500&type=restaurant&key=' + placesKey

    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to Places API Service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // grab the next page token to display the results to users
            // const npt = body.next_page_token;
            
            // get the full page of results
            const results = body.results;
            /// create empty array to store id's of each place
            const idList = new Array()
            // loop through the page of results and add the list of id's to the array
            for (r in results) {

                // idList.push(results[r.place_id])

                callback(undefined, {
                /*  Only the ID is needed here, to pass to placesHours
                    placesHours will request the required data for the user */
                    // pageToken: npt,
                    // idList: idList
                    placeID: results[r].place_id,
                    // address: results[r].vicinity,
                    // name: results[r].name,
                    // open: results[r].opening_hours
                })
            }


        }
    })
}


module.exports = placesFetch