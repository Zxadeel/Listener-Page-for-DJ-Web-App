
//prototype for when we get data for songs and djs and i figure out how to select the next dj card

document.getElementById("playerprev").addEventListener("click", function(){
    console.log("clicked prev player button");
    choosePrevDj();
})

document.getElementById("playernext").addEventListener("click", function(){
    console.log("clicked next player button");
    chooseNextDj();
})

document.addEventListener("keydown", function(event){
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

function chooseNextDj(){
    window.alert("Selecting next DJ");
}

function choosePrevDj(){
    window.alert("Selecting previous DJ");
}