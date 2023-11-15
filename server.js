var express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const { MongoClient, ServerApiVersion } = require('mongodb');
const Song = require('./public/models/song');
const DJ = require('./public/models/dj');
const genDB = require('./public/js/genDB');
const { Cursor } = require('mongoose');
const { genDj, genSong, genPlaylist } = genDB;


const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs')

const client = new MongoClient('mongodb://127.0.0.1:27017')

async function runDB(){
    try{
        await client.connect();
        console.log("connected");

        const db = client.db("swedb")
        // script for sample data
        const djInsertResult = await db.collection('djs').insertMany(Array.from({ length: 60 }, genDj));
        const djIds = djInsertResult.insertedIds;
        
        // Insert Songs
        await db.collection('songs').insertMany(Array.from({ length: 200 }, genSong));
        
        // Insert Playlists
        const djIdArray = Object.values(djIds); // Extract the values from the object
        await Promise.all(djIdArray.map(djId => genPlaylist(djId, db).then(playlist => db.collection('playlists').insertOne(playlist))));
        
        console.log("done")
    }
    catch (e){
        console.log(e);
    }
}

// runDB();

async function getData(prefData){
    try{
        await client.connect();
        console.log("connected");
        const db = client.db("swedb")
        // console.log(prefData)
        const query = {"$and": []}
        for (const categ in prefData){
            // console.log({$or: prefData[categ]})
            const filter = {[categ]: {$in: prefData[categ]}};
            query["$and"].push(filter);
        }
        // console.log(query);
        const filteredDjs = db.collection('djs').find(query);
        // console.log(filteredDjs)
        const djData = [];
        for await (const dj of filteredDjs) {
            // console.log(dj._id);
            // console.log(dj);
            const playlistObj = await db.collection('playlists').find({dj:dj._id}).next();
            const songs = playlistObj.playlist;
            // console.log(songs);
            const songNames = []
            for (const ind in songs){
                const songObj = await db.collection('songs').find({_id : songs[ind].song}).next();
                songNames.push(songObj.title);

            }
            djData.push({name: dj.name, playlist: songNames});
        }
        console.log(djData.length)
        
        console.log("got dj data from db")

        return JSON.stringify(djData);
      }
      catch (e){
        console.log(e);
      }
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



app.get('/player', async (req, res) => {
    const prefData = req.query.prefData;
    // console.log('on player get')
    // console.log(prefData)
    const parsedData = JSON.parse(prefData);
    const djData = await getData(parsedData);

    res.render('pages/player.ejs', {prefData, djData})
});

app.listen(8080);

