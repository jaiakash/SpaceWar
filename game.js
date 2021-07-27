document.getElementById("time").innerHTML = "Time : 0";
document.getElementById("score").innerHTML = "Score : 0";

var ship_js = document.getElementById("Ship");
ship_js.style.top = "75%";
ship_js.style.left = "50%";

document.onkeydown = arrowKey;

function arrowKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {    // up arrow
        ship_js.style.top = parseInt(ship_js.style.top)-1+"%";
    }
    else if (e.keyCode == '40') {   // down arrow
        ship_js.style.top = parseInt(ship_js.style.top)+1+"%";
    }
    else if (e.keyCode == '37') {   // left arrow
        ship_js.style.left = parseInt(ship_js.style.left)-1+"%";
    }
    else if (e.keyCode == '39') {   // right arrow
        ship_js.style.left = parseInt(ship_js.style.left)+1+"%";
    }

}