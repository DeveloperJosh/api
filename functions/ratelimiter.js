/**
 * @license
 * Copyright Josh Wells. All Rights Reserved.
 */
const requestIP = require('request-ip');
const moment = require("moment");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const limit = 10;
const interval = 1 * 60 * 1000;
const ips = {};

/**
* @param {string} rateLimit - The rate limit to be applied. Made by Blue @ SynTech.
*/
function rateLimit(req, res, next) {
    const ip = requestIP.getClientIp(req);
    if (ips[ip] >= limit) {
        res.status(429).send("Too Many Requests");
        ips[ip] = setTimeout(() => {
            delete ips[ip];
        } , interval);
    } else {
        ips[ip] = ips[ip] + 1 || 1;
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', limit - ips[requestIP.getClientIp(req)]); 
        setTimeout(() => {
            ips[ip] = ips[ip] - 1;
        } , interval);
        next();
    }

} // end rateLimit

/**
 * @param {string} rateLimitv2 - This is verson 2 of the rate limiter, made by Blue @ SynTech.
 */
function rateLimitv2(req, res, next) {
    //// using node-cache to store the ip and its count
    const ip = requestIP.getClientIp(req);
    const key = `${ip}_${moment().format("YYYY-MM-DD")}`;
    const count = myCache.get(key) || 0;
    if (count >= limit) {
        res.status(429).send("Too Many Requests");
        myCache.set(key, count + 1, interval);
    } else {
        myCache.set(key, count + 1, interval);
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', limit - myCache.get(key));
        setTimeout(() => {
            /// delete the key after the interval
            myCache.del(key);
        } , interval);
        next();
    }
} // end rateLimitv2

module.exports = rateLimitv2;