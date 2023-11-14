var express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Song = require('public/models/song');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs')

db().catch(err => console.log(err));

async function db(){
    await mongoose.connect('mongodb://127.0.0.1:27017/swedb')
    console.log("connected")
    // const newSong = new 
}

app.get('/', (req, res) => {
    var username = "user49304"
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

