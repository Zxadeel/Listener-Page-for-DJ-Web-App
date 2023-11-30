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
    const randGenre = genres[rand(3)];
    const randEmot = emotions[rand(3)];
    const randRhy = rhythms[rand(2)];
    var duration = 0;
    var year = 2000 + rand(23) + '';
    var mediaId = '';
    var album = '';
    
    switch (randGenre) {
        case genres[0]:
            duration = 228;
            mediaId = "6566ba349f356d8f6c97c932";
            album = 'rap album';
            break;
        case genres[1]:
            duration = 174;
            mediaId = "6566f9a69f356d8f6c97c94c";
            album = 'pop album';
            break;
        case genres[2]:
            duration = 200;
            mediaId = "6566f94e9f356d8f6c97c94a";
            album = 'r&b album';
            break;
                    
    }


    return {
        title: `${uniqueNamesGenerator({dictionaries: [colors, adjectives, ], separator: " ", style: "capital"})}`,
        artist: `${uniqueNamesGenerator({dictionaries : [names,], style: "capital"})}`,
        duration: duration,
        album: album,
        year: year,
        genre: randGenre,
        emotion: randEmot,
        rhythm: randRhy,
        media: mediaId,
    };
}
//mediaSchema: {url, alt, src}

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
        playlist.push(relatedSongs[randInd])
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