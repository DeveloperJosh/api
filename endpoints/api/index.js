var express = require('express');
const api = express.Router();
const fs = require('fs');
const path = require('path');
const rateLimit = require('../../functions/ratelimiter');
const WeatherApi = require('../../functions/weather_api');
const requestIP = require('request-ip');
const NodeCache = require( "node-cache" );
const Logined = new NodeCache();

function token_generator(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function get_token(req, res, next) {
    /// check if the token in req.headers.token is valid
    var token = req.headers.auth;
    /// find token in txt file
    fs.readFile(path.join(__dirname, '../../txt/tokens.txt'), 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            /// if token is valid, continue
            if (data.includes(token)) {
                next();
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        }
    });
}

function check_cache(req, res, next) {
    /// check if the user is logged in
    const ip = requestIP.getClientIp(req);
    if (Logined.has(ip)) {
        next();
    } else {
        res.render('login');
    }
}

function logout(req, res, next) {
    /// check if the user is logged in
    const ip = requestIP.getClientIp(req);
    if (Logined.has(ip)) {
        Logined.del(ip);
        next();
    } else {
        res.render('login');
    }
}

api.get('/', rateLimit, (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

api.get('/keygen', rateLimit, (req, res) => {
    const token = token_generator(32);
    fs.appendFile(path.join(__dirname, '../../txt/tokens.txt'), token + '\n', function (err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json({token: token});
        }
    })
});

api.get('/test', get_token, (req, res) => {
    res.json({
        message: 'success'
    });
});

api.get('/weather', (req, res) => {
    /// if geoweather is successful, return the weather
    res.render('weather', {
        url: req.hostname
    })
});

api.get('/weather/:city', (req, res) => {
    /// if geoweather is successful, return the weather
    const city = req.params.city; 
    WeatherApi(city, req, res, () => {
        res.json(req.weather);
    });
});

api.get('/dash', check_cache, (req, res) => {
    res.render('dashboard');
});

api.post('/logout', logout, (req, res) => {
    res.redirect('/');
});

api.post('/login_check', (req, res) => {
    //// check if username and password are correct
    const username = req.body.username;
    const password = req.body.password;
    const ip = requestIP.getClientIp(req);
    if (username === 'admin' && password === 'ZBMslnOHeQrDt9qP4e5hQx5OgkyBJHvv') {
        //// set a cache for the user to be logged in for 1 hour
        Logined.set(ip, true, 3600);
        res.redirect('/dash');
    } else {
        res.send('Invalid username or password');
    }
});

module.exports = api;