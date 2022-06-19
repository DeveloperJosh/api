var express = require('express');
const api = express.Router();
const fs = require('fs');
const path = require('path');
const rateLimitv2 = require('../../functions/rateLimiter.js');

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

api.get('/', rateLimitv2, (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

api.get('/keygen', rateLimitv2, get_token, (req, res) => {
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

module.exports = api;