let activeDj = null;
let activeButton = null;
const lastPlayedDj = document.currentScript.getAttribute('lastPlayedDj');
// console.log(lastPlayedDj)

if (lastPlayedDj){
    const djNames = Array.from(document.getElementsByClassName("djname"));
    console.log(djNames)
    for (const i in djNames){
        if (djNames[i].textContent == lastPlayedDj){
            console.log("found", djNames[i])
            setDj(djNames[i]);
            break;
        }
    }
}


scrollmenu.addEventListener("click", function(event){
    if (event.target.classList.contains("playDjButton")){
        const djnamebox = event.target.nextElementSibling;
        setDj(djnamebox);
        
    }
});

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
    console.log( document.getElementById("current-song-name"))
    document.getElementById("current-song-name").textContent = djBox.querySelector("#musicQueue").querySelector("div.song").querySelector("#songname").textContent;
    document.getElementById("artist-name").textContent = "Played by " + djnamebox.textContent;
    

    console.log(djBox)
    // console.log(djBox.querySelector("#musicQueue").querySelector("div.song").querySelector("#songname").textContent)
    // console.log(playerArtistName)

    activeDj = djBox;
    activeButton = playbutton;
    
    const djName = djnamebox.textContent;

    fetch(`/listen/${djName}`, { method: 'POST' })
        .then(response => response.text())
        .then(message => {
            alert(message);
        });
}
