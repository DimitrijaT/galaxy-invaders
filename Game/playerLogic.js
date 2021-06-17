//PLAYER CONTROLS AND CREATION
const Player = {
    w:40,
    h:30,
    x:canvas.width/2-30,
    y:canvas.height-30,
    speed:5,
    dx:0,
    isDead: false
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


function drawPlayer(){

    switch(playerBulletCount){
        case 4:
            ctx.drawImage(image3,Player.x,Player.y,Player.w,Player.h);
            break;
        case 2:
            ctx.drawImage(image2,Player.x,Player.y,Player.w,Player.h);
            break;
        default:
            ctx.drawImage(image,Player.x,Player.y,Player.w,Player.h);

    }

    if (unkillable === true) {
        ctx.drawImage(invic, Player.x - 10, Player.y - 10, Player.w + 20, 20);
    }
}




function takeDamage(x = 1){
    unkillable = true;

    setTimeout(function(){
        unkillable = false;
        }, 2100);

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





function nukeTheMap(){

    if (nukes !== 0){
        nukes--;
        isNuked = true;

        LaserShot = 0;
        EnemyShots = 0;
        BossShots = 0;

        BossFire = [];
        EnemyFire = [];


        if (Level%waveTillBoss === 0){
            Boss.isDamaged = true;
            Boss.Health-=10;
            createExplosion(0);
            points += 100 * scoreMultiplier;
            enemyExplode[0].play();
        }
        else {

            for (let i in Enemy) {
                if (Enemy.hasOwnProperty(i)) {
                    if ((Enemy[i].Health <= 1 && Enemy[i].isDead === false) || (difficulty === 1 && Enemy[i].isDead === false)) {

                        createExplosion(i);
                        Enemy[i].isDead = true;
                        points += 100 * scoreMultiplier;

                        enemyExplode[i % 5].play();
                        if (Math.ceil(Math.random() * chanceOfPower) <= 10) {
                            generatePower(i, false);
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
}

let LaserShot = 0;
let CoolDown = false;
let Laser = [];
let SoundCounter = 0;

function LaserConstructor(w,h,x,y,speed,Active,doesPierce,Health){
    this.w =  w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.Active = Active;
    this.doesPierce = doesPierce;
    this.Health = Health;

}

function Shoot(){
    if (CoolDown === false) {

        SoundCounter++;

        if (playerBulletCount >= 4){
            shootLaser2[SoundCounter % 5].play();
        }
        else{
            shootLaser[SoundCounter % 5].play();
        }

        Laser[LaserShot] = new LaserConstructor(
            10,
            25,
            Player.x + Player.w / 2 - 5,
            Player.y,
            4,
            true,
            false,
            startingLaserHealth);

        if (playerBulletCount >= 2){

            Laser[LaserShot].Health = 2;

            Laser[LaserShot+1] = new LaserConstructor(
                10,
                20,
                Player.x + Player.w / 2 - 25,
                Player.y+15,
                4,
                true,
                false,
                1);

            Laser[LaserShot+2] = new LaserConstructor(
                10,
                20,
                Player.x + Player.w / 2 +15,
                Player.y+15,
                4,
                true,
                false,
                1);

        }
        if (playerBulletCount >= 4){

            Laser[LaserShot].Health = 3;
            Laser[LaserShot].h = 30;
            Laser[LaserShot].w = 15;
            Laser[LaserShot+1].Health = 2;
            Laser[LaserShot+2].Health = 2;

            Laser[LaserShot+3] = new LaserConstructor(
                10,
                20,
                Player.x + Player.w / 2 - 45,
                Player.y+30,
                4,
                true,
                false,
                1);

            Laser[LaserShot+4] = new LaserConstructor(
                10,
                20,
                Player.x + Player.w / 2 +35,
                Player.y+30,
                4,
                true,
                false,
                1);

        }
        LaserShot= LaserShot + 1 + playerBulletCount;

    }

}
function drawLaser(){
    let count =0;

    for (let i in Laser) {
        if (Laser[i].y <= 0){
            Laser[i].Active = false;
        }
        if (Laser[i].Active === true) {

            switch (Laser[i].Health){
                case 1:
                    ctx.drawImage(laser, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                    break;
                case 2:
                    ctx.drawImage(laserPiercing1, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                    break;
                default:
                    ctx.drawImage(laserPiercing2, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                    break;
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
    for (let i in Laser){
        Laser[i].y-=5;
    }
}

const keys = [];
let direction; // 1 left 2 right 3 bomb

function keyPressActions(){

    //MOVEMENT

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




    //PHONE CONTROLS

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




}
