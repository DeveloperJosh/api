const pinger = require('./functions/pinger');
const showRequests = require('./functions/requests');
const express = require('express');
const app = require('express')();
const api = require('./endpoints/api/index');
const config = require('./config');
const cors = require("cors");
const http = require('http').Server(app);

const interval = 1 * 60 * 1000;

setInterval(pinger, interval);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(showRequests);

app.use('/', api);
http.listen(process.env.PORT || config.port, function() {
    console.log(`listening on *:${process.env.PORT || config.port}`);
});