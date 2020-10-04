const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=36de9bf7b88329f24f348c3a173032dc&query='+ latitude + ',' + longitude + '' 
request({url, json: true} , (error, {body}={}) => {
    if (error) {
        callback('Unable to connect', undefined)
    } 
    else if (body.error) {
        callback('Unable to find location. Please try again', undefined)
    }
    else {
        callback(undefined,'Now ' + body.location.localtime + ': ' + body.current.weather_descriptions[0] +'. Temperature now is ' + body.current.temperature + '°C. And feels like: ' + body.current.feelslike + '°C.')

    }
})
}
module.exports = forecast