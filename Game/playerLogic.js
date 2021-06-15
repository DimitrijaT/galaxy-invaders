
function nukeTheMap(){

    if (nukes !== 0){
        nukes--;
        isNuked = true;

        LaserShot = 0;
        EnemyShots = 0;
        InactiveShots = 0;
        BossShots = 0;
        BossRadialShots = 0;
        BossWaveShots = 0;

        if (Level%waveTillBoss === 0){
            Boss.isDamaged = true;
            Boss.Health-=10;
            createExplosion(0);
            points += 100 * scoreMultiplier;
            enemyExplode[0].play();
        }
        else {

            for (let i = 0; i < numOfEnemies; i++) {
                if ((Enemy[i].Health <= 1  && Enemy[i].isDead === false) || (difficulty === 1 && Enemy[i].isDead === false)) {

                    createExplosion(i);
                    Enemy[i].isDead = true;
                    points += 100 * scoreMultiplier;

                    enemyExplode[i % 5].play();
                    if (Math.ceil(Math.random() * chanceOfPower) <= 10) {
                        generatePower(i,false);
                    }
                } else {
                    Enemy[i].Health--;
                    Enemy[i].isDamaged = true;
                    enemyHurtSound[i % 5].play();
                }

            }

        }
    }
}




let LaserShot = 0;
let CoolDown = false;
let Laser = [];
let SoundCounter = 0;

function Shoot(){
    if (CoolDown === false) {

        SoundCounter ++;

        if (playerBulletCount >= 4){
            shootLaser2[SoundCounter % 5].play();
        }
        else{
            shootLaser[SoundCounter % 5].play();
        }

        Laser[LaserShot] = {
            w: 10,
            h: 20,
            x: 0,
            y: 0,
            speed: 4,
            Active: true,
            doesPierce: false,
            Health: startingLaserHealth
        }

        Laser[LaserShot].h = 25;
        Laser[LaserShot].x = Player.x + Player.w / 2 - 5;
        Laser[LaserShot].y = Player.y;

        if (playerBulletCount >= 2){

            Laser[LaserShot].Health = 2;

            Laser[LaserShot+1] = {
                w: 10,
                h: 20,
                x: 0,
                y: 0,
                speed: 4,
                Active: true,
                doesPierce: false,
                Health: 1
            }

            Laser[LaserShot+2] = {
                w: 10,
                h: 20,
                x: 0,
                y: 0,
                speed: 4,
                Active: true,
                doesPierce: false,
                Health: 1
            }

            Laser[LaserShot+1].x = Player.x + Player.w / 2 - 25;
            Laser[LaserShot+1].y = Player.y+15;

            Laser[LaserShot+2].x = Player.x + Player.w / 2 +15;
            Laser[LaserShot+2].y = Player.y+15;

        }
        if (playerBulletCount >= 4){

            Laser[LaserShot].Health = 3;
            Laser[LaserShot].h = 30;
            Laser[LaserShot].w = 15;
            Laser[LaserShot+1].Health = 2;
            Laser[LaserShot+2].Health = 2;

            Laser[LaserShot+3] = {
                w: 10,
                h: 20,
                x: 0,
                y: 0,
                speed: 4,
                Active: true,
                doesPierce: false,
                Health: 1

            }

            Laser[LaserShot+4] = {
                w: 10,
                h: 20,
                x: 0,
                y: 0,
                speed: 4,
                Active: true,
                doesPierce: false,
                Health: 1
            }

            Laser[LaserShot+3].x = Player.x + Player.w / 2 - 45;
            Laser[LaserShot+3].y = Player.y+30;

            Laser[LaserShot+4].x = Player.x + Player.w / 2 +35;
            Laser[LaserShot+4].y = Player.y+30;

        }
        LaserShot= LaserShot + 1 + playerBulletCount;

    }



}
function drawLaser(){
    let count =0;

    for (let i=0;i<LaserShot;i++) {
        if (Laser[i].y <= 0){
            Laser[i].Active = false;
        }
        if (Laser[i].Active === true) {

            if (Laser[i].Health > 2 ) {
                ctx.drawImage(laserPiercing2, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
            }
            else if (Laser[i].Health === 2) {
                ctx.drawImage(laserPiercing1, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
            }
            else{
                ctx.drawImage(laser, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
            }

            count=count+1;
        }
    }
    let countLimit;

    if (amountOfShots*playerBulletCount === 0){
        countLimit = amountOfShots;
    }
    else {
        countLimit =  amountOfShots*playerBulletCount+1;
    }



    if (count >= countLimit ){
        CoolDown = true;
    }
    else{
        CoolDown = false;
    }





}
function newLaserPosition(){
    for (let i=0;i<LaserShot;i++){
        Laser[i].y-=5;
    }


}



//PLAYER CONTROLS AND CREATION
const Player = {
    w:40,
    h:30,
    x:canvas.width/2-30,
    y:canvas.height-30,
    speed:5,
    dx:0
}
function drawPlayer(){
    if (playerBulletCount === 4){
        ctx.drawImage(image3,Player.x,Player.y,Player.w,Player.h);
    }
    else if (playerBulletCount === 2){
        ctx.drawImage(image2,Player.x,Player.y,Player.w,Player.h);
    }
    else{
        ctx.drawImage(image,Player.x,Player.y,Player.w,Player.h);
    }

    if (unkillable === true) {
        ctx.drawImage(invic, Player.x - 10, Player.y - 10, Player.w + 20, 20);
    }
}



function MovePlayer(){

    if (keys[37] || direction === 1){
        Player.dx=Player.speed*-1;
    }
    else if (keys[39] || direction === 2){
        Player.dx=Player.speed;
    }


    if (Player.x + Player.w >= canvas.width){
        Player.x -= 0.3;
    }
    else if (Player.x <= 0){
        Player.x +=0.3;
    }
    else{
        Player.x += Player.dx;
    }

    Player.dx = 0;

}


//MOVEMENT

const keys = [];

document.addEventListener('keydown', function (e) {
        if (e.keyCode !== 32) {
            e.preventDefault();
            keys[e.keyCode] = true;
        } else if (e.keyCode === 32) {
            e.preventDefault();
            Shoot();
        }
        if (e.keyCode === 13) {
            e.preventDefault();
            nukeTheMap();
        }
    });
    document.addEventListener('keyup', function (e) {
        delete keys[e.keyCode];
    });



function takeDamage(x = 1){
    unkillable = true;
    setTimeout(function(){ unkillable = false; }, 2000);
    lives -= x;

    if (points - 100 < 0){
        points = 0;
    }
    else{
        points -= 100;
    }

    deathSound.currentTime = 0;
    deathSound.play();
    if (amountOfShots > 1){
        amountOfShots=amountOfShots-1;
    }
    if (playerBulletCount > 0){
        playerBulletCount-=2;
    }
}


//PHONE CONTROLS


let direction; // 1 left 2 right 3 bomb


canvas.addEventListener('touchstart', function (e){
    let touch;
    let shoot;
    switch (e.touches.length) {
        case 1:
            touch = e.touches[0];

            console.log(touch.clientX + "  " + touch.clientY + "   " + canvas.scrollWidth + "-" + canvas.scrollHeight + " " + (canvas.scrollHeight  -  canvas.scrollHeight/4));

            if (touch.clientY >= 0 && touch.clientY < canvas.scrollHeight/3){
                nukeTheMap();
            }
            else if (touch.clientX <= canvas.scrollWidth/2) {
                direction = 1;
            }
            else if (touch.clientX > canvas.scrollWidth/2) {
                direction = 2;
            }
            if (touch.clientY > (canvas.scrollHeight  -  canvas.scrollHeight/4.5)){
                Shoot();
            }

            break;
        case 2:
            touch = e.touches[0];
            shoot = e.touches[1];

            console.log(touch.clientX + "  " + touch.clientY );

            if (touch.clientY >= 0 && touch.clientY < canvas.scrollHeight/3 ||
                shoot.clientY >= 0 && shoot.clientY < canvas.scrollHeight/3){
                nukeTheMap();
            }
            if (touch.clientY >  canvas.scrollHeight  -  canvas.scrollHeight/4.5|| shoot.clientY > canvas.scrollHeight  -  canvas.scrollHeight/4.5) {
                Shoot();
            }
            else if (touch.clientX <= canvas.scrollWidth/2 || shoot.clientX <= canvas.scrollWidth/2) {
                direction = 1;
            } else if (touch.clientX > canvas.scrollWidth/2  || shoot.clientX > canvas.scrollWidth/2 ) {
                direction = 2;
            }


            break;
    }

});

window.addEventListener('touchend',function (e) {
    direction = 0;
});