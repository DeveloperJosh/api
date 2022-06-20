const http = require('http');
const requestIP = require('request-ip');


/**
 * 
 * @param {*} req We use this to get the ip of the client.
 * @param {*} res This is the response object.
 * @param {*} next This is the next function.
 */
function ipinfo(req, res, next) {
    http.get('http://ipwho.is/' + requestIP.getClientIp(req), function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            var data = JSON.parse(body);
            req.ipinfo = data;
            /// get latitude and longitude
            const l = req.ipinfo.latitude = data.latitude;
            const y =req.ipinfo.longitude = data.longitude;
            console.log(`The latitude is ${l} and the longitude is ${y}`);
            next();
        });
        next();
    }).on('error', function(e) {
        /// show error on getting the info
        console.log("error getting" + e.message);
    });
}

module.exports = ipinfo;