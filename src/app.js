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

const now = new Date;

app.get('', (req, res) => {
    res.render('index', {
        title: 'Get My Food',
        currentTime: now
    })

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        } else {
            placesFetch(latitude, longitude, (error, address, name, opening_hours) => {
                if (error) {
                    return res.send({ error })
                }
                console.log(name);
                console.log(address);
                console.log(opening_hours);
                console.log(location);
                
                
                // res.send({
                //     address: address,
                //     name: name,
                //     opening_hours: opening_hours,
                //     location
                // })
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