const api = require('postman-request')

const weather = (lon, lat, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) + '&appid=9ef2dc55b5c758f6cc84cf8a0392a24f&units=metric'
    console.log(url);
    api({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service")
        } else if (body.message) {
            callback(body.message);
        } else {
            const weather = body.current.weather[0].main
            const temp = body.current.temp
            const feels_like = body.current.feels_like
            callback(undefined, {forecast: weather, temp, feels_like})
        }
    })
}

module.exports = weather