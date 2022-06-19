const http = require('http');

/** 
* @type {http.Server} server - The server object.
* @param {string} ShowRequests - This is a function that shows the requests made to the server.
*/
function showRequests(req, res, next) {
    /// show all requests with status code
    console.log(`${req.method} ${req.url} ${res.statusCode}`);
    next();
}

module.exports = showRequests;