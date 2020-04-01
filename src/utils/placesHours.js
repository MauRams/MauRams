// import required packages
const request = require('request')
const getToken = require('../../keys.js')
// get the apikey
const placesKey = getToken.pApiKey().toString()

const urlList = new Array()

const getPlaceHours = (placeIDs, callback) => {
    const pullIds = placeIDs.placeIds
    
    for (const p in pullIds) {
        const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + pullIds[p] + '&fields=name,rating,formatted_phone_number,opening_hours&key=' + placesKey
        
        urlList.push(url)
        
    }
    console.log(urlList);
    
    // for (u in urlList) {
    //     request({ u, json: true }, (error, { body } = {}) => {
    //         if (error) {
    //             callback(error)
    //         } else {
    //             console.log(body);
                
    //             // callback(undefined, {

    //             // })
    //         }
    //     })
    // }
    
    
    /*  the challenge here is to chain the requests to return a list of the following fields from the
        place/details endpoint
        * name
        * rating
        * formatted_phone_number
        * opening_hours
        It's likely that an array will be needed to store the JSON object, in order to access it in app.js
    */
    
}

module.exports = getPlaceHours