function setCard(card, djObj){
    const name = card.getElementById("djname");
    name.textContent = djObj.name;
    const list = card.getElementById("musicQueue");
    const songTemplate = document.getElementById("songtemplate");
    // console.log(songTemplate)
    for (const s in djObj.playlist){
        const song = document.importNode(songTemplate.content, true);
        
        const songname = song.getElementById("songname");
        // console.log(songname)
        songname.textContent = djObj.playlist[s];
        list.appendChild(song)
        // console.log(djObj.playlist[i]);
    }
}

const djData = JSON.parse(document.currentScript.getAttribute('djdata'));

const djTemplate = document.getElementById("djBoxtemplate");
for (const dj in djData){
    const card = document.importNode(djTemplate.content, true);
    setCard(card, djData[dj])
    document.getElementById("scrollmenu").appendChild(card);
}