var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/app.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/app.js'));
});

app.get('/styles/main.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/styles/main.css'));
});

app.get('/imgs/bg.jpg', function (req, res) {
    res.sendFile(path.join(__dirname + '/imgs/bg.jpg'));
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});