//// heroku url pinger
var https = require('https');
var url = "https://blues-api-v2.herokuapp.com/"; /// change this to your own url

/**
 * @param {string} pinger pinger for heroku apps
 */
function pinger() {
    https.get(url, function(res) {
        console.log("pinged " + url);
    }).on('error', function(e) {
        console.log("error pinging " + url);
    });
}

module.exports = pinger;