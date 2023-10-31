class Dj {
    constructor(name, genre, emotions, rhythm, playlist) {
        this.name = name;
        this.genre = genre;
        this.emotions = emotions;
        this.rhythm = rhythm;
        this.playlist = playlist;
    }
}
function rand(to){
    return Math.floor(Math.random() * (to));
}
function setCard(card, djObj){
    const name = card.getElementById("djname");
    name.textContent = djObj.name;
    const list = card.getElementById("musicQueue");
    const songTemplate = document.getElementById("songtemplate");
    // console.log(songTemplate)
    for (let i = 0; i < djObj.playlist.length; i++){
        const song = document.importNode(songTemplate.content, true);
        
        const songname = song.getElementById("songname");
        // console.log(songname)
        songname.textContent = djObj.playlist[i];
        list.appendChild(song)
        // console.log(djObj.playlist[i]);
    }
}
const names = ["Dr Erd", "Dj Somebody", "Dr Binary Beat", "Dj Luna Flux", "Dj Groove"];
const genres = ["Rap", "Pop", "R&B"];
const emotions = ["Hype", "Sad", "Romantic"];
const rhythms = ["Slow tempo", "Fast tempo"];


const dj1 = new Dj(names[rand(5)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Urban Legends","Mic Drop Madness","Street Chronicles",]);
const dj2 = new Dj(names[rand(5)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Starstruck Serenade","Radiant Love","Pop Princess Dreams",]);
const dj3 = new Dj(names[rand(5)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Soulful Whispers","Rhythm & Romance","Smooth Velvet Vibes",]);
const dj4 = new Dj(names[rand(5)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Bassline Boulevard","Lyric Labyrinth","Grit and Grind",]);

const djs = [dj1,dj2,dj3,dj4];
const djTemplate = document.getElementById("djBox");
for (let i = 0; i < djs.length; i++){
    const card = document.importNode(djTemplate.content, true);
    setCard(card, djs[i])
    document.getElementById("scrollmenu").appendChild(card);
}