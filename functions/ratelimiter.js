/**
 * @license
 * Copyright Josh Wells. All Rights Reserved.
 */
const requestIP = require('request-ip');
const moment = require("moment");
const moment2 = require('moment-timezone');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const limit = 100;
const interval = 15 * 60 * 1000;

/**
 * @param {string} rateLimit - This is a custom function that limits the number of requests made to the server.
 */
function rateLimit(req, res, next) {
    //// using node-cache to store the ip and its count
    const ip = requestIP.getClientIp(req);
    const key = `${ip}_${moment().format("YYYY-MM-DD")}`;
    const count = myCache.get(key) || 0;
    if (count >= limit) {
        res.status(429).send(`Too Many Requests`);
        myCache.set(key, count + 1, interval);
    } else {
        myCache.set(key, count + 1, interval);
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', limit - myCache.get(key));
        res.setHeader('X-RateLimit-Reset', '1 Hour');
        setTimeout(() => {
            /// delete the key after the interval
            myCache.del(key);
        } , interval);
        next();
    }
} // end rateLimitv2

module.exports = rateLimit