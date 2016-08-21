var express = require('express');
var app = express();
var path = require('path');

var highScore = [];

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

app.get('/score/:score/name/:name', function (req, res) {
    var newObj = {
        score: +req.params.score,
        name: req.params.name
    };

    highScore.push(newObj);
    sortHighScoreArray();
});

app.get('/get/hiscore', function (req, res) {
    if (highScore[0]) {
        res.send(highScore[0].score.toString());
    } else {
        res.send('0');
    }
});

app.get('/get/top/:amount', function (req, res) {
    var result = [];

    for (var i = 0, len = +req.params.amount; i < len; i += 1) {
        if (highScore[i]) {
            result.push(highScore[i]);
        } else {
            break;
        }
    }

    if (result.length < 3) {
        for (let i = result.length; i < 3; i += 1) {
            result.push({
                score: '0',
                name: 'NON'
            });
        }
    }

    res.send(result);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

function sortHighScoreArray() {
    highScore.sort(function (a, b) {
        return b.score - a.score;
    });
}