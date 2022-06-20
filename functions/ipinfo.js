const http = require('http');
const requestIP = require('request-ip');
const weather = require('weather-js');

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
            ///  weather api
            weather.find({
                search: data.city,
                degreeType: 'C',
                lang: 'en'
            }, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    req.weather = result;
                    console.log(result);
                }
            });
            next();
        });
        next();
    }).on('error', function(e) {
        /// show error on getting the info
        console.log("error getting" + e.message);
    });
    return req.ipinfo;
}

///// weather info using latitude and longitude

module.exports = ipinfo;