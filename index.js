const showRequests = require('./functions/requests');
const express = require('express');
const app = require('express')();
const api = require('./endpoints/api/index');
const config = require('./config');
const cors = require("cors");
const pinger = require('./functions/pinger');
const path = require('path');
const http = require('http').Server(app);

const interval = 10 * 60 * 1000;

setInterval(() => {
    pinger();
}, interval);

//// reander the index.ejs file
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(showRequests);

app.use('/', api);
http.listen(process.env.PORT || config.port, function() {
    console.log(`listening on *:${process.env.PORT || config.port}`);
});