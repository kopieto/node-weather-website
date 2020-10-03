const path = require('path')
const express = require('express')     // express is actually a function
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define path for Express config
const publicDirPath = path.join(__dirname, '../public' )
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')           //letting know EXPRESS that we install HBS npm. VIEW ENGINE is awlays written this way
hbs.registerPartials(partialsPath)

//Setup static directory to work with
app.use(express.static(publicDirPath))  

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather forecast',
        name: 'Ceco'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME',
        name: 'Stan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'This is our help page',
        name: 'Alex'
    })
})

app.get('/weather', (req, res) => {
   
    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
           return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            
            res.send({ 
                city: req.query.address,
                location, 
                forecast: forecastData
            })

        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
         return res.send({
            error: 'Please provide search value'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'not such an article',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 ',
        name: 'you',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})