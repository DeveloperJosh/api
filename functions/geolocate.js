/// a geolocation function for the browser
//// thing we need to do is get the user's location
//// we need to get the user's ip address
//// we need to get the user's location
const http = require('http');
const geo = require('geoip-lite');

/***
 * @param {string} ip - This is the ip address of the user.
 * @returns {object} - This is the location of the user.
 */
function GeoWeather(ip, req, res, next) {
    const geoIP = geo.lookup(ip);
    const city = geoIP.city;
    /// url must have celcius
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=871b4e382aa126b9160bbf5f09cff2c3`;
    http.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            const weather = JSON.parse(data);
            req.weather = weather;
            next();
        });
        response.on('error', (err) => {
            console.log(err);
        });
   });
}

module.exports = GeoWeather;