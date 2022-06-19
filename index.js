const express = require('express');
const morgan = require('morgan');
const app = require('express')();
const api = require('./endpoints/api/index');
const config = require('./config');
const cors = require("cors");
const http = require('http').Server(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use('/', api);
http.listen(process.env.PORT || config.port, () => {
    console.log(`listening on *:${process.env.PORT || config.port}`);
});