//// heroku url pinger
var https = require('https');
var config = require('../config');
var { MessageEmbed, WebhookClient } = require('discord.js');
var moment = require('moment');
const webhookClient = new WebhookClient({ id: config.webhook.id, token: config.webhook.token });
var url = "https://blue-api-v3.herokuapp.com/";

/**
 * @param {string} pinger pinger for heroku apps
 * @author Blue
 * @description pings the url to see if it is up
 */
function pinger() {
    https.get(url, function(res) {
        var time = moment().add(5, 'minutes').format('h:mm A');
        const embed = new MessageEmbed()
            .setTitle("Pinged " + url)
            .setColor("#00ff00")
            .setFooter({
                text: "The server will be pinged again at " + time
            });
        webhookClient.send({
            embeds: [embed]
        });
    }).on('error', function(e) {
        console.log("error pinging " + url);
    });
}

module.exports = pinger;