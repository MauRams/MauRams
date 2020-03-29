const request = require('request')
const getToken = require('../../keys.js')

const placesKey = getToken.pApiKey().toString()

const placesFetch = (address, name, open, callback) => {

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + 
    longitude + '&radius=1500&type=restaurant&key=' + placesKey
    console.log(url);
    
    request({url, json: true }, (error, { body }) => {
        
        if(error){
            callback('Unable to connect to Location Service!', undefined)
        }else{
            const results = body.results;
            for (r in results) {
                callback(undefined, {
                    address: results[r].vicinity,
                    name: results[r].name,
                    open: results[r].opening_hours
                })
                
            }
        }

        
        
        
        
        
        
        // if(error){
        //     callback('Unable to connect to Location Service')
        // }
    })
}

placesFetch(53.455688, -6.219700)
// module.exports = placesFetch