//// heroku url pinger
var https = require('https');
var config = require('../config');
var { MessageEmbed, WebhookClient } = require('discord.js');
const moment = require('moment-timezone');
const webhookClient = new WebhookClient({ id: config.webhook.id, token: config.webhook.token });
var url = "https://blue-api-v3.herokuapp.com/";

/**
 * @param {string} pinger pinger for heroku apps
 * @author Blue
 * @description pings the url to see if it is up
 */
function pinger() {
    https.get(url, function(res) {
        //// use est time zone for the time
        console.log(`${moment().tz('America/New_York').format('h:mm:ss a')} - ${url} is up ${res.statusCode}`);
        console.log("The next ping will be at " + moment().tz('America/New_York').add(5, 'minutes').format('h:mm:ss a'));
    }).on('error', function(e) {
        console.log("error pinging " + url);
    });
}

module.exports = pinger;