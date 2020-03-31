// import required packages
const request = require('request')
const getToken = require('../../keys.js')
// get the apikey
const placesKey = getToken.pApiKey().toString()
// create a list of ID's to pull data from Places Details API
const placesList = ['ChIJrTLr-GyuEmsRBfy61i59si0']

for (p in placesList){
    const url = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + placesList[p] + '&fields=name,rating,formatted_phone_number,opening_hours&key=' + placesKey
}

const getPlaceHours = (placeID, callback) => {
    /*  the challenge here is to chain the requests to return a list of the following fields from the
        place/details endpoint
        * name
        * rating
        * formatted_phone_number
        * opening_hours
        It's likely that an array will be needed to store the JSON object, in order to access it in app.js
    */
    request({ url, json: true }, (error, { body } = {}) => {
    })
}

