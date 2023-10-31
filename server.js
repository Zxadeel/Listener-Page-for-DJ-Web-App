var express = require('express');
const ejs = require('ejs');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    var username = "coolguy97"
    res.render('pages/pref.ejs', {
        username:username
    });
});

app.get('/player', function(req, res){
    res.render('pages/player.ejs');
});

app.listen(8080);

