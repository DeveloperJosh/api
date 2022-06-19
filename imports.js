const pinger = require('./functions/pinger');
const showRequests = require('./functions/requests');
const express = require('express');
const app = require('express')();
const api = require('./endpoints/api/index');
const config = require('./config');
const cors = require("cors");
const http = require('http').Server(app);

module.exports = {
    pinger,
    showRequests,
    express,
    app,
    api,
    config,
    cors,
    http
}