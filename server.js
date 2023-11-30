var express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const genDB = require('./public/js/genDB');
const { Cursor } = require('mongoose');
const { genDj, genSong, genPlaylist } = genDB;
const yt_audio = require('youtube-audio-stream');



const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret: 'keysecret',
    resave: false,
    saveUninitialized: true,
}))
app.set('view engine', 'ejs')


const client = new MongoClient('mongodb://127.0.0.1:27017')

async function runDB(){
    try{
        await client.connect();
        console.log("connected");

        const db = client.db("swedb")
        // script for entering sample data in db
        const djInsertResult = await db.collection('djs').insertMany(Array.from({ length: 60 }, genDj));
        const djIds = djInsertResult.insertedIds;
        
        await db.collection('songs').insertMany(Array.from({ length: 200 }, genSong));

        const djIdArray = Object.values(djIds); // Extract the values from the object
        await Promise.all(djIdArray.map(djId => genPlaylist(djId, db).then(playlist => db.collection('playlists').insertOne(playlist))));
        
        console.log("done")
    }
    catch (e){
        console.log(e);
    }
}
// runDB();

async function getDJData(prefData){
    try{
        await client.connect();
        console.log("connected to db");
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
                const songTitle = songObj.title;
                const mediaObj = await db.collection('media').findOne({"_id" : new ObjectId(songObj.media)})
                const songArt = mediaObj.url;
                songNames.push({
                    "name" : songTitle,
                    "art" : songArt,
                });

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

async function getOneDj(name) {
    try{
        await client.connect();
        console.log("connected to db");
        const db = client.db("swedb");
        const dj = await db.collection("djs").findOne({"name" : name});
        console.log("found dj");
        return JSON.stringify(dj);
      }
      catch (e){
        console.log(e);
      }
}

async function getDjSongs(djData) {
    try{
        await client.connect();
        console.log("connected to db");
        const db = client.db("swedb");
        
        const playlist = await db.collection("playlists").findOne({"dj" : new ObjectId(djData._id)});
        // console.log(playlist)
        var songs = [];
        for (var i = 0; i < playlist.playlist.length; i++) {
            const songId = playlist.playlist[i].song;
            const songData = await db.collection("songs").findOne({"_id" : new ObjectId(songId)});
            const mediaData = await db.collection("media").findOne({"_id" : new ObjectId(songData.media)})
            // console.log(songData);
            // console.log(mediaData);
            const playerData = {
                'title' : songData.title,
                'artist' : songData.artist,
                'image' : mediaData.url,
                'duration' : songData.duration,
                'link' : mediaData.src,
            }
            songs.push(playerData);        
        }

        return JSON.stringify({
            'playlist' : songs
        });
      }
      catch (e){
        console.log(e);
      }
}



async function getUserData(name){
    try{
        await client.connect();
        console.log("connected to db");
        const db = client.db("swedb")

        const user = db.collection("users").find({name:name});
        if (await user.hasNext()) {
            console.log("found user data");
            return user.next();

        }
        console.log("couldn't find user data")
        return false;

      }
      catch (e){
        console.log(e);
      }
}

async function initUserData(name){
    try{
        await client.connect();
        console.log("connected to db");
        const db = client.db("swedb");
        
        const insertResult = db.collection("users").insertOne({
            name: name,
            prefData: "",
            lastPlayedDj: ""
        });
        console.log("created db user data");
        return await insertResult;

      }
      catch (e){
        console.log(e);
      }
}

async function updatePrefData(name, prefData){
    try{
        await client.connect();
        console.log("connected to db");
        const db = client.db("swedb");
        
        const res = await db.collection("users").updateOne({name: name}, {$set: {prefData: prefData}})
        // console.log(res);
        console.log("updated db pref data");
      }
      catch (e){
        console.log(e);
      }
}

async function updateListeningData(name, lastPlayedDj){
    try{
        await client.connect();
        console.log("connected to db");
        const db = client.db("swedb");
        
        const res = await db.collection("users").updateOne({name: name}, {$set: {lastPlayedDj: lastPlayedDj}})
        // console.log(res);
        console.log("updated db lastplayeddj data");
      }
      catch (e){
        console.log(e);
      }
}

app.use((req, res, next) => {
    res.locals.active = true;
    next();
});


app.get('/', (req, res) => {
    res.render('pages/key.ejs', { username: "" });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

app.post('/key', async (req, res) => {
    const username = req.body.username;
    const data = await getUserData(username);
    req.session.username = username;
    if (data){
        // console.log(data)
        if (!data.prefData) {
            res.redirect('/pref');
            return;
        }
        res.redirect('/player');
        return;
    }
    const insertRes = await initUserData(username);
    req.session.userId = ""+insertRes.insertedId;
    res.redirect('/pref');
})

app.get('/pref', (req, res) => {
    const username = req.session.username;
    res.render('pages/pref.ejs', {
        username:username
    });
});

app.post('/pref/record/:prefData', async (req, res) => {
    const prefData = req.params.prefData;
    // console.log("pref data in /pref/rec0rd", prefData)
    const parsedData = JSON.parse(prefData)
    await updatePrefData(req.session.username, parsedData)
});

app.put('/update/:dj', async (req, res) => {
    var { dj } = req.params;
    await updateListeningData(req.session.username, dj);
    // console.log("listening to dj")
    const dj_data = await getOneDj(dj);
    const dj_inf = await JSON.parse(dj_data);
    const playlist = JSON.parse(await getDjSongs(dj_inf));
    // console.log(playlist)

    res.json(playlist)
});

app.post('/listen/:dj', async (req, res) => {
    const { dj } = req.params;
    const dj_data = await getOneDj(dj);
    const dj_inf = await JSON.parse(dj_data);
    const playlist = JSON.parse(await getDjSongs(dj_inf));
    // console.log(playlist)
    
    // res.json(playlist);
    // res.status(200);
});


app.get('/stream', (req, res) => {
    const youtubeVideoUrl = req.query.url;

    // Validate the YouTube video URL
    if (!youtubeVideoUrl) {
        return 
    }

    // Stream the audio from YouTube
    yt_audio(youtubeVideoUrl)
        .pipe(res)
        .on('error', (err) => {
            console.error('Error streaming audio:', err);
            res.status(500).send('Internal Server Error');
        });
});


app.get('/playertest', async (req, res) => {
    res.render('pages/playertest.ejs');
});

app.get('/player', async (req, res) => {
    const userData = await getUserData(req.session.username);
    const prefData = userData.prefData;
    const lastPlayedDj = userData.lastPlayedDj;
    // console.log('on player get')
    console.log("in /player", lastPlayedDj)
    // const parsedData = JSON.parse(prefData);
    const djData = await getDJData(prefData);

    res.render('pages/player.ejs', {djData: djData, lastPlayedDj: lastPlayedDj, username: req.session.username})
});

app.listen(8080);

