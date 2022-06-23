/// a geolocation function for the browser
//// thing we need to do is get the user's location
//// we need to get the user's ip address
//// we need to get the user's location
const http = require('http');
require('dotenv').config();

/***
 * @param {string} city - the city to get the location of weather (required)
 * @param {string} country - the country to get the location of weather (required)
 * @returns {object} - This is the location of the user.
 */
function WeatherApi(city, req, res, next) {
    /// country code and city are required for url
    const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=no`;
    http.get(url, (response, err) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            if(err) {
                console.log(err);
            } else {
                const weather = JSON.parse(data);
                req.weather = weather;
                next();
            }
        });
        response.on('error', (err) => {
            console.log(err);
        });
   });
}

module.exports = WeatherApi;