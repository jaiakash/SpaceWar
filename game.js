var time = 0;
var score = 0;

var ship_js = document.getElementById("Ship");
ship_js.style.top = "75%";
ship_js.style.left = "50%";

var enemy_js = document.getElementById("Enemy");
enemy_js.style.top = getRandomInt(10,50)+"%";
enemy_js.style.left = getRandomInt(5,90)+"%";

document.onkeydown = arrowKey;

gameLoop();

function gameLoop() {
    document.getElementById("time").innerHTML = "Time : "+time.toFixed(2);
    document.getElementById("score").innerHTML = "Score : "+score;
    time+=0.01;

    // highScore();
    // document.getElementById("board").innerHTML = "Score : "+score.toFixed(1);
    // //create a new block, if old one is lost
    // if(rectX<0){
    //     speed+=0.5;
    //     rectX = 550;
    //     randomY = (Math.random()<0.5) ? 5:65;
    // }

    // collision_detector();
    // draw();

    window.requestAnimationFrame(gameLoop);
}


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

function getRandomInt(min,max) {
    var temp = Math.floor(Math.random() * max);

    if(temp>=min)
        return temp;
    else 
        return getRandomInt(min,max);
}