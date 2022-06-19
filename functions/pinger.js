//// heroku url pinger
var https = require('https');
var config = require('../config');
var { MessageEmbed, WebhookClient } = require('discord.js');
const webhookClient = new WebhookClient({ id: config.webhook.id, token: config.webhook.token });
var url = "https://blues-api-v2.herokuapp.com/"; /// change this to your own url

/**
 * @param {string} pinger pinger for heroku apps
 * @author Blue
 * @description pings the url to see if it is up
 */
function pinger() {
    https.get(url, function(res) {
        console.log("pinged " + url);
        const embed = new MessageEmbed()
            .setTitle("Pinged " + url)
            .setColor("#00ff00")
            .setTimestamp();
        webhookClient.send({
            embeds: [embed]
        });
    }).on('error', function(e) {
        console.log("error pinging " + url);
    });
}

module.exports = pinger;