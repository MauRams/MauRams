const request = require('request')
const getToken = require('../../keys.js')

const placesKey = getToken.pApiKey().toString()

const placesFetch = (latitude, longitude, callback) => {

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + 
    longitude + '&radius=1500&type=restaurant&key=' + placesKey
    console.log(url);
    
    request({url, json: true }, (error, { body }) => {
        
        if(error){
            console.log('Unable to connect to Location Service!', undefined)
        }else{
            const results = body.results;
            for (r in results) {
                // log to console for testing
                console.log(results[r].vicinity,);
                console.log(results[r].name,);
                console.log(results[r].opening_hours);
                
                // callback(undefined, {
                //     address: results[r].vicinity,
                //     name: results[r].name,
                //     open: results[r].opening_hours
                // })
                
            }
        }
    })
}


module.exports = placesFetch