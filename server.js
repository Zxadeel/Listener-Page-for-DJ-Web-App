var express = require('express');
const ejs = require('ejs');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    var username = "starbuckslover69"
    res.render('pages/pref.ejs', {
        username:username
    });
});

// app.post('/processPref', (req, res) =>{
    
//     res.redirect('/player', { selectedCheckboxes });
// });



app.get('/player', (req, res) => {
    var prefData = req.query.prefData;
    // console.log('on player get')
    // console.log(prefData)
    res.render('pages/player.ejs', {prefData})
});

app.listen(8080);

