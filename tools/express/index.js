"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static('./'));
app.listen('8080', function () {
    console.log('Example app listening on port ' + 8080 + ' !');
});
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.get('/api', function (req, res) { return res.send('api'); });
app.post('/api', function (req, res) { return res.send('post api'); });
app.post('/data', function (req, res) {
    res.send(req.body);
});
app.post('/code', function (req, res) {
    res.status(req.body.status).send('发送成功');
});
