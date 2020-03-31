const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const placesFetch = require('./utils/places_fetch')
const geocode = require('./utils/geocode')
// define the app instance
const app = express()
// set up config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// serve static dir
app.use(express.static(publicDir))

/****************/
/**** Routes ****/
/****************/

// get the current time and date - use this to prove to the user that the data is current
const now = new Date;
// route for index
app.get('', (req, res) => {
    res.render('index', {
        title: 'Get My Food',
        currentTime: now
    })
    /* Run geocode when a place name is provided in the query string
    this will return a set o co-ordinates to be used in the places API 
    set up in placesFetch.js */
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        // if error is encountered pull from geocode and display to the user
        if (error) {
            return res.send({ error })
            // otherwise, pass the lat and long to placesFetch to get a list of food outlets open within a 2KM radius
        } else {
            placesFetch(latitude, longitude, (error, addr) => {
                // if an error is encountered, display to the user
                if (error) {
                    return res.send({ error })
                } else {
                    console.log(addr);

                    // res.send({
                    //     address: address,
                    //     name: name,
                    //     opening_hours: opening_hours,
                    //     location
                    // })
                }
            })

        }


    })

})

/****************/
/** Run Server **/
/****************/
app.listen(3000, () => {
    console.log('Server is up on port 3000.');

})