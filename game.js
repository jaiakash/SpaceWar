var time = 0;
var score = 0;

var ship_js = document.getElementById("Ship");
ship_js.style.top = "75%";
ship_js.style.left = "50%";

var bullet_js = document.getElementById("Bullet");
bullet_js.style.display = "none";

var enemy_js = document.getElementById("Enemy");

document.onkeydown = arrowKey;

gameLoop();
enemyLoop();

function enemyLoop() {
    enemy_js.style.top = getRandomInt(10,50)+"%";
    enemy_js.style.left = getRandomInt(5,90)+"%";
}

function gameLoop() {
    document.getElementById("time").innerHTML = "Time : "+time.toFixed(2);
    document.getElementById("score").innerHTML = "Score : "+score;
    time+=0.01;

    bullet_js.style.top = parseFloat(bullet_js.style.top)-0.5 +"%";

    if(parseFloat(bullet_js.style.top) < 0 ){
        bullet_js.style.top = "0%";
        bullet_js.style.left = "0%" 
        bullet_js.style.display = "none";
    }

    collisionDetector();
    window.requestAnimationFrame(gameLoop);
}


function collisionDetector(){
    //console.log(Math.abs(parseFloat(bullet_js.style.top)-parseFloat(enemy_js.style.top)));
    if(Math.abs(parseFloat(bullet_js.style.top)-parseFloat(enemy_js.style.top))<5 &&
        Math.abs(parseFloat(bullet_js.style.left)-parseFloat(enemy_js.style.left))<5){
        score++;
        bullet_js.style.display = "none";
        enemyLoop();
    }
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
    else if (e.keyCode == '32') {   //space
        if(bullet_js.style.display == "none"){
            bullet_js.style.display = "block";
            bullet_js.style.top = ship_js.style.top;
            bullet_js.style.left = ship_js.style.left;
        }
    }

}

function getRandomInt(min,max) {
    var temp = Math.floor(Math.random() * max);

    if(temp>=min)
        return temp;
    else 
        return getRandomInt(min,max);
}