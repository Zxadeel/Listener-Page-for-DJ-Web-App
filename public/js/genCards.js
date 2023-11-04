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
const names = ["Dr Erd", "Dj Somebody", "Dr Binary Beat", "Dj Luna Flux", "Dj Groove", "DJ Das", "Cool Beats", "Dj Crazy", "Lovely"];
const genres = ["rap", "pop", "rb"];
const emotions = ["hype", "sad", "romance"];
const rhythms = ["slow", "fast"];
const prefData = JSON.parse(document.getElementById('data-container').getAttribute('prefData'));
console.log(prefData);

const filters = [
    {attribute: 'genre', value: prefData.genre},
    {attribute: 'emotions', value: prefData.emotion},
    {attribute: 'rhythm', value: prefData.rhythm}

]


const dj1 = new Dj(names[rand(names.length)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Urban Legends","Mic Drop Madness","Street Chronicles",]);
const dj2 = new Dj(names[rand(names.length)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Starstruck Serenade","Radiant Love","Pop Princess Dreams",]);
const dj3 = new Dj(names[rand(names.length)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Soulful Whispers","Rhythm & Romance","Smooth Velvet Vibes",]);
const dj4 = new Dj(names[rand(names.length)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Bassline Boulevard","Lyric Labyrinth","Grit and Grind",]);
const dj5 = new Dj(names[rand(names.length)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Urban Legends","Mic Drop Madness","Street Chronicles",]);
const dj6 = new Dj(names[rand(names.length)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Starstruck Serenade","Radiant Love","Pop Princess Dreams",]);
const dj7 = new Dj(names[rand(names.length)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Soulful Whispers","Rhythm & Romance","Smooth Velvet Vibes",]);
const dj8 = new Dj(names[rand(names.length)], genres[rand(3)], emotions[rand(3)], rhythms[rand(2)], ["Bassline Boulevard","Lyric Labyrinth","Grit and Grind",]);

const djs = [dj1,dj2,dj3,dj4, dj5, dj6, dj7, dj8];
const filteredDjs = djs.filter(dj => {
    return filters.every(filter => {
      const { attribute, value } = filter;
      
      if (Array.isArray(value)) {
        return value.some(val => val === dj[attribute]);
      } else {
        return false; 
      }
    });
  });

console.log(djs)
console.log(filteredDjs)


const djTemplate = document.getElementById("djBox");
for (let i = 0; i < filteredDjs.length; i++){
    const card = document.importNode(djTemplate.content, true);
    setCard(card, filteredDjs[i])
    document.getElementById("scrollmenu").appendChild(card);
}