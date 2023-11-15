const { uniqueNamesGenerator, adjectives, colors, names, animals } = require('unique-names-generator');

//script to generate sample data

const genres = ["rap", "pop", "rb"];
const emotions = ["hype", "sad", "romance"];
const rhythms = ["slow", "fast"];
const timeslots = ["morning", "afternoon", "evening"];

function rand(to){
    return Math.floor(Math.random() * (to));
}

function genSong(){
    return {
        title: `${uniqueNamesGenerator({dictionaries: [colors, adjectives, ], separator: " ", style: "capital"})}`,
        artist: `${uniqueNamesGenerator({dictionaries : [names,], style: "capital"})}`,
        duration: rand(300),
        genre: genres[rand(3)],
        emotion: emotions[rand(3)],
        rhythm: rhythms[rand(2)],
    };
}

function genDj(){
    return {
        name: `DJ ${uniqueNamesGenerator({dictionaries: [adjectives, names ], separator: " ", style: "capital"})}`,
        timeslot: timeslots[rand(3)],
        genre: genres[rand(3)],
        emotion: emotions[rand(3)],
        rhythm: rhythms[rand(2)],
    };
}

async function genPlaylist(dj_id, db){
    const dj = await db.collection('djs').findOne({ _id: dj_id });

    const relatedSongs = await db.collection('songs').find({
        genre: dj.genre,
        emotion: dj.emotion,
        rhythm: dj.rhythm
    }).toArray();

    const playlist = [];

    for (let i = 0; i < 3; i++){
        const randInd = rand(relatedSongs.length);
        playlist.push(relatedSongs[i])
    }

    return {
        dj: dj_id,
        playlist: playlist.map((song) => ({
            song: song._id,
        })),
    };
}

module.exports = {
    genDj,
    genSong,
    genPlaylist
}