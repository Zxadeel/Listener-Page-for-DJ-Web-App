var express = require('express');
const ejs = require('ejs');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    var username = "starbuckslover69"
    res.render('pages/pref.ejs', {
        username:username
    });
});

app.post('/processPref', (req, res) =>{
    // const genres = req.body.Genre;
    // const emotions = req.body.Emotion;
    // const rhythms = req.body.Rhythm;
    
    // const prefData = `${genres}, ${emotions}, ${rhythms}`;
    const prefData = req.body;

    res.redirect(`/player?prefData=${prefData}`);
});

// app.post('/processEmot', (req, res) =>{
//     const prefData = req.body.prefData;
//     res.redirect(`/player?prefData=${prefData}`);
// });

// app.post('/processRhyth', (req, res) =>{
//     const prefData = req.body.prefData;
//     res.redirect(`/player?prefData=${prefData}`);
// });

app.get('/player', (req, res) => {
    const prefData = req.query.prefData;
    
    res.render('pages/player.ejs', { prefData });
});

app.listen(8080);

