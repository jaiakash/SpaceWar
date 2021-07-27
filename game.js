var time = 0;
var score = 0;
var enemy_speed = 0.1;

var ship_js = document.getElementById("Ship");
var bullet_js = document.getElementById("Bullet");
var enemy_js = document.getElementById("Enemy");
ship_js.style.top = "75%";
ship_js.style.left = "50%";
bullet_js.style.display = "none";

document.onkeydown = arrowKey;

console.log(localStorage.getItem('HighScore'));

if(localStorage.getItem('HighScore')==null){
    localStorage.setItem('HighScore', "0");
}

gameLoop();
enemyLoop();

function enemyLoop() {
    enemy_js.style.top = getRandomInt(10,50)+"%";
    enemy_js.style.left = getRandomInt(5,90)+"%";
}

function gameLoop() {
    document.getElementById("time").innerHTML = "Time : "+time.toFixed(2);
    document.getElementById("score").innerHTML = "Score : "+score;
    document.getElementById("level").innerHTML = "Level : "+enemy_speed*10;
    document.getElementById("highscore").innerHTML = "High Score : "+localStorage.getItem("HighScore");
    time+=0.02;

    bullet_js.style.top = parseFloat(bullet_js.style.top)-0.5+"%";
    enemy_js.style.top = parseFloat(enemy_js.style.top)+enemy_speed+"%";

    if(parseInt(time)>enemy_speed*100){
        enemy_speed+=0.1;
    }

    if(parseFloat(enemy_js.style.top) > 90 ){
        enemyLoop();
    }

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

    // Collision for Bullet and Enemy
    if(Math.abs(parseFloat(bullet_js.style.top)-parseFloat(enemy_js.style.top))<5 &&
        Math.abs(parseFloat(bullet_js.style.left)-parseFloat(enemy_js.style.left))<5){
        score++;
        bullet_js.style.display = "none";
        enemyLoop();
    }

    // Collision for Enemy and Ship
    // Game Over
    if(Math.abs(parseFloat(ship_js.style.top)-parseFloat(enemy_js.style.top))<5 &&
        Math.abs(parseFloat(ship_js.style.left)-parseFloat(enemy_js.style.left))<5){
        alert("Game Over, Your final score is "+score);
        
        console.log(parseInt(localStorage.getItem('HighScore')));

        if(parseInt(localStorage.getItem('HighScore'))<score){
            localStorage.setItem('HighScore', score+"");
        }

        score=0;
        time=0;
        enemy_speed=0.1;
        enemyLoop();
    }
}

function arrowKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {    // up arrow
        ship_js.style.top = parseInt(ship_js.style.top)-5+"%";
    }
    else if (e.keyCode == '40') {   // down arrow
        ship_js.style.top = parseInt(ship_js.style.top)+5+"%";
    }
    else if (e.keyCode == '37') {   // left arrow
        ship_js.style.left = parseInt(ship_js.style.left)-5+"%";
    }
    else if (e.keyCode == '39') {   // right arrow
        ship_js.style.left = parseInt(ship_js.style.left)+5+"%";
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