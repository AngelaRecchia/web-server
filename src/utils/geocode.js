const api = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5ncmVjIiwiYSI6ImNreGV1d3hqdzF2Z2cydmt0eDdkMjFsYW8ifQ.QNaVpiKoIQ4MeOHHBtn67g&limit=1'

    api({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to geolocating service")
        } else if (response.body.message) {
            callback(response.body.message)
        } else if (!response.body.features[0]) {
            callback("City not found: cannot load coordinates");
        }
        else {
            callback(undefined, {
                lon: response.body.features[0].center[0],
                lat: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode