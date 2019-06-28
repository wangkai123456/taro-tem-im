var express = require('express');
var app = express();
app.use(express.static('./'));
app.listen('8080', function () {
    console.log('Example app listening on port ' + 8080 + ' !');
});
app.get('/', function (req, res) { return res.send('Hello World!'); });
app.get('/api', function (req, res) { return res.send('api'); });
app.post('/api', function (req, res) { return res.send('post api'); });
app.get('/data', function (req, res) { return res.send({ a: 1, b: 2 }); });
