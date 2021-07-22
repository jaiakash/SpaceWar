document.getElementById("time").innerHTML = "Time : 0";
document.getElementById("score").innerHTML = "Score : 0";

var ship_js = document.getElementById("ship")



function getKeyAndMove(e) {
    console.log("Aksh")
    var key_code = e.which || e.keyCode;
    switch (key_code) {
        case 37: //left arrow key
            ship_js.style.left = parseInt(ship_js.style.left) - 5 + "px";
            break;
        case 38: //Up arrow key
            ship_js.style.top = parseInt(ship_js.style.top) - 5 + "px";
            break;
        case 39: //right arrow key
            ship_js.style.left = parseInt(ship_js.style.left) + 5 + "px";
            break;
        case 40: //down arrow key
            ship_js.style.top = parseInt(ship_js.style.top) + 5 + "px";
            break;
    }
}

function docReady(){
    console.log("Aksh")
    window.addEventListener('keydown', getKeyAndMove);
}