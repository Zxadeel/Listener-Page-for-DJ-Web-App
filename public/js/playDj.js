const scrollmenu = document.getElementById("scrollmenu");
// console.log(scrollmenu);
let activeDj = null;
let activeButton = null;


scrollmenu.addEventListener("click", function(event){
    if (event.target.classList.contains("playDjButton")){
        const djBox = event.target.parentElement.parentElement;
        // console.log(event);
        if (activeDj) {
            activeDj.style.backgroundColor = "";
            activeButton.textContent = "Play";
        }
        djBox.style.backgroundColor = "#385070";
        event.target.textContent = "Playing";
        document.getElementById("current-song-name").textContent = djBox.querySelector("#musicQueue").querySelector("div.song").querySelector("#songname").textContent;
        document.getElementById("artist-name").textContent = "Played by " + djBox.querySelector("div").querySelector("p").textContent;
        

        // console.log(djBox)
        // console.log(djBox.querySelector("#musicQueue").querySelector("div.song").querySelector("#songname").textContent)
        // console.log(playerArtistName)

        activeDj = djBox;
        activeButton = event.target;
    }
})