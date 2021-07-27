// Initialising all variables 
var time = 0;
var score = 0;
var enemy_speed = 0.1;
var points = 1;

// Initialising all element variables 
var ship_js = document.getElementById("Ship");
var bullet_js = document.getElementById("Bullet");
var enemy_js = document.getElementById("Enemy");
ship_js.style.top = "75%";
ship_js.style.left = "50%";
bullet_js.style.display = "none";

document.onkeydown = arrowKey;

console.log(localStorage.getItem('HighScore'));

// Save high score to 0 if is null
if(localStorage.getItem('HighScore')==null){
    localStorage.setItem('HighScore', "0");
}

// 4 different enemy type
var imgArray = ['enemy1.png', 'enemy2.png', 'enemy3.png', 'enemy0.png'];
var basePath="./enemy/";

function imgRandom() {
    var rand = imgArray[Math.floor(Math.random() * imgArray.length)];
    var image = new Image();
    image.src = basePath+rand;
    document.getElementById('Enemy').appendChild(image);
}

// gameLoop - called every frame
gameLoop();
// enemyLoop - called every new enemy respawn
enemyLoop();

function enemyLoop() {
    document.getElementById('Enemy').innerHTML = "";
    imgRandom();
    enemy_js.style.top = getRandomInt(10,50)+"%";
    enemy_js.style.left = getRandomInt(5,90)+"%";
}

function gameLoop() {
    document.getElementById("time").innerHTML = "Time : "+time.toFixed(2);
    document.getElementById("score").innerHTML = "Score : "+score;
    document.getElementById("level").innerHTML = "Level : "+(enemy_speed*10).toFixed(0);
    document.getElementById("highscore").innerHTML = "High Score : "+localStorage.getItem("HighScore");
    time+=0.02;

    points=parseInt(time/30) + 1;

    bullet_js.style.top = parseFloat(bullet_js.style.top)-0.5+"%";
    enemy_js.style.top = parseFloat(enemy_js.style.top)+enemy_speed+"%";

    // Increase speed every 10 seconds
    if(parseInt(time)>enemy_speed*100){
        enemy_speed+=0.1;
    }

    // Respawn enemy if it hits bottom
    if(parseFloat(enemy_js.style.top) > 90 ){
        enemyLoop();
    }

    // Hide bullet if crosses the top area
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
        score+=points;
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

// Arrow keys for movement
// Space for bullet firing
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