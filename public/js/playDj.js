let activeDj = null;
let activeDjNum = -1;
let activeButton = null;
let audio;
const lastPlayedDj = document.currentScript.getAttribute('lastPlayedDj');
// console.log(lastPlayedDj)



function playURL(videoUrl) {
    if (!videoUrl) {
        console.log("ERROR: invalid url:", videoUrl);
        return;
    }

    const streamUrl = `/stream?url=${encodeURIComponent(videoUrl)}`;
    if (!audio) {
        audio = document.getElementById('music-player');
    }

    // console.log(audio)
    audio.src = streamUrl;
    audio.load(); 
    audio.play();
}

if (lastPlayedDj) {
    const djNameBox = findDj(lastPlayedDj);
    if (djNameBox) {
        setDj(djNameBox);
    }

}


scrollmenu.addEventListener("click", function(event) {
    if (event.target.classList.contains("playDjButton")) {
        const djnamebox = event.target.nextElementSibling;
        setDj(djnamebox);
        
    }
});

document.getElementById("playerprev").addEventListener("click", function() {
    // console.log("clicked prev player button");
    choosePrevDj();
})

document.getElementById("playernext").addEventListener("click", function() {
    // console.log("clicked next player button");
    chooseNextDj();
})

document.addEventListener("keydown", function(event) {
    switch(event.key){
        case "ArrowUp":
            console.log("up arrow pressed");
            chooseNextDj();
            break;
        case "ArrowDown":
            console.log("down arrow pressed");
            choosePrevDj();
            break;
    }
})

function chooseNextDj() {
    if (activeDj) {
        const nextDj = activeDj.nextElementSibling;
        if (nextDj) {
            // console.log(nextDj.querySelector("div.button-and-name").querySelector("p.djname"))

            setDj(nextDj.querySelector("div.button-and-name").querySelector("p.djname"));
        }
    }
}

function choosePrevDj() {
    if (activeDj) {
        const prevDj = activeDj.previousElementSibling;
        if (prevDj) {
            // console.log(prevDj.querySelector("div.button-and-name").querySelector("p.djname"))

            setDj(prevDj.querySelector("div.button-and-name").querySelector("p.djname"));
        }
    }
}

function findDj(nameDjparam) {
    const djNames = Array.from(document.getElementsByClassName("djname"));
    // console.log(djNames)
    for (const i in djNames) {
        if (djNames[i].textContent == nameDjparam){
            // console.log("found", djNames[i]);
            return djNames[i];
        }
    }
    return false;
}

//element is either html element djname or playbutton
function setDj(djnamebox) {
    const djBox = djnamebox.parentElement.parentElement;
    const playbutton = djnamebox.parentElement.querySelector("button");
    // console.log(djnamebox.parentElement.querySelector("button"));
    if (activeDj) {
        activeDj.style.backgroundColor = "";
        activeButton.textContent = "Play";
    }
    djBox.style.backgroundColor = "#385070";
    playbutton.textContent = "Playing";
    // console.log( document.getElementById("current-song-name"))
    document.getElementById("current-song-name").textContent = djBox.querySelector("#musicQueue").querySelector("div.song").querySelector("#songname").textContent;
    document.getElementById("artist-name").textContent = "Played by " + djnamebox.textContent;
    

    // console.log(djBox)
    // console.log(djBox.querySelector("#musicQueue").querySelector("div.song").querySelector("#songname").textContent)
    // console.log(playerArtistName)

    activeDj = djBox;
    activeButton = playbutton;
    
    const djName = djnamebox.textContent;
    var playlistData = {};

    fetch(`/update/${djName}`, { method: 'PUT' })
        .then(response => response.text())
        .then(data => {
            playlistData = JSON.parse(data);
            // console.log(playlistData.playlist[0])
            for (var i = 0; i < playlistData.playlist.length; i++) {
                // console.log(playlistData.playlist[i])
                playURL(playlistData.playlist[i].link);
                setTimeout(playlistData.playlist[i].duration * 1000)
            }
        })
        .then(message => {
            // alert(message);
        });


    // fetch(`/listen/${djName}`, { method: 'GET' })
    //     .then(response => response.text())
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .then(message => {
    //         // alert(message);
    //     });

    
}
