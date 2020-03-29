const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
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
var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
    now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Get My Food',
        currentTime: now
    })
})

/****************/
/** Run Server **/
/****************/
app.listen(3000, () => {
    console.log('Server is up on port 3000.');

})