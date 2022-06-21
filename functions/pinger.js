//// heroku url pinger
var https = require('https');
const moment = require('moment-timezone');
var url = "https://blue-api-v3.herokuapp.com/";

/**
 * @param {string} Ping This is the main function that pings the url.
 * @returns {Promise<{statusCode: number}>}
 */
function ping() {
    //// ping without https or http
    return new Promise((resolve, reject) => {
        https.get(url, function(res) {
            resolve({ statusCode: res.statusCode });
        }).on('error', function(e) {
            reject(e);
        });
    });
}

function pinger() {
    ping(url).then(res => {
        console.log(`${moment().tz('America/New_York').format('h:mm:ss a')} - ${url} is up`);
        console.log("The next ping will be at " + moment().tz('America/New_York').add(10, 'minutes').format('h:mm:ss a'));
    }).catch(err => {
        console.log("error pinging " + url);
    });
}

module.exports = pinger;