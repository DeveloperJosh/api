//// heroku url pinger
// var url = "https://pinger-app.herokuapp.com/";
var https = require('https');
var url = "https://blues-api-v2.herokuapp.com/";

function pinger() {
    https.get(url, function(res) {
        console.log("pinged " + url);
    }).on('error', function(e) {
        console.log("error pinging " + url);
    });
}

module.exports = pinger;