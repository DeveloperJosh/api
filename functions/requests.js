const http = require('http');
const moment = require('moment-timezone');

/** 
* @type {http.Server} server - The server object.
* @param {string} ShowRequests - This is a function that shows the requests made to the server.
*/
function showRequests(req, res, next) {
    /// on request, log the request
    console.log(`${moment().tz('America/New_York').format('h:mm:ss a')} - ${req.method} - ${req.url}`);
    next();
}

module.exports = showRequests;