const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const weather = require('../src/utils/weather')

const app = express()
const directory = path.join(__dirname, '../public')
const viewsPath = path.join( __dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dir to serve
app.use(express.static(directory))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Ange"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Ange",
        message: "Helpful text"
    })
})

app.get('/weather', (req, res) => {
    if (req.query.search) {
        geocode(req.query.search, (error, {lon, lat, location} = {}) => {
            if (error) {
                return res.send({error})
            } else {
                weather(lon, lat, (error, {forecast, temp, feels_like}) => {
                    if (error) {
                        res.send({error})
                    } else {
                        res.send({
                            forecast,
                            location,
                            temp,
                            feels_like,
                            address: req.query.search
                        }) 
                    }
                })
            }       
        })    
    } else {
        res.send("Please insert a location")
    }  
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 page not found",
        name: "Ange",
        message: "Help resource not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 page not found",
        name: "Ange",
        message: "The page you searched does not exists."
    })
})

app.listen(3000, () => console.log("Server is up on port 3000"))