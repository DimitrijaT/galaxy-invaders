//PLAYER CONTROLS AND CREATION
const Player = {
    w:40,
    h:30,
    x:canvas.width/2-30,
    y:canvas.height-35,
    speed:5,
    dx:0,
    dy:0,
    unkillable: false,
    isDead: false,
    amountOfShots: 1,
    bulletCount: 1,
    typeShip: 1,
    sharpness: 0
}

function MovePlayer(){


    if (keys['ArrowLeft'] || directionX === 1){
        Player.dx=Player.speed*-1;
    }
    else if (keys['ArrowRight'] || directionX === 2){
        Player.dx=Player.speed;
    }

    if (keys['ArrowUp'] || directionY === 2){
        Player.dy=Player.speed*-1;
    }
    else if (keys['ArrowDown'] || directionY === 1){
        Player.dy=Player.speed;
    }


    if (Player.x + Player.w >= canvas.width){
        Player.x -= 0.5;
    }
    else if (Player.x <= 0 ){
        Player.x +=0.5;
    }
    else if (Player.y <= 0 ){
        Player.y +=0.5;
    }
    else if (Player.y + Player.h >= canvas.height ){
        Player.y -=0.5;
    }
    else{
        Player.x += Player.dx;
        Player.y += Player.dy;
    }

    Player.dx = 0;
    Player.dy = 0;



}


function drawPlayer(){

    switch(Player.bulletCount){
        case 7:
            ctx.drawImage(image5,Player.x,Player.y,Player.w,Player.h);
            break;
        case 5:
            ctx.drawImage(image4,Player.x,Player.y,Player.w,Player.h);
            break;
        case 3:
            ctx.drawImage(image3,Player.x,Player.y,Player.w,Player.h);
            break;
        case 2:
            ctx.drawImage(image2,Player.x,Player.y,Player.w,Player.h);
            break;
        default:
            ctx.drawImage(image,Player.x,Player.y,Player.w,Player.h);

    }

    if (Player.unkillable === true) {
        ctx.drawImage(invic, Player.x - 10, Player.y - 10, Player.w + 20, 20);
    }
}

let DamageShield


function takeDamage(x = 1){
    Player.unkillable = true;

    time = 2100;
    MaxTime = time;
    clearTimeout(DamageShield);

    DamageShield = setTimeout(function(){
        Player.unkillable = false;
    }, time);

    lives -= x;

    if (points - 100 < 0){
        points = 0;
    }
    else{
        points -= 100;
    }

    if (Player.sharpness >= 1){
        Player.sharpness--;
    }
    deathSound.currentTime = 0;
    deathSound.play();
    if (Player.amountOfShots > 1){
        Player.amountOfShots--;
    }
    if (Player.bulletCount >= 2){
        if (Player.bulletCount === 2 || Player.bulletCount === 3) {
            Player.bulletCount--;
        }
        else{
            Player.bulletCount-=2;
        }
    }
}





function nukeTheMap(){
    if (isGamePaused === false && isGameRunning === true) {

        if (nukes !== 0) {
            nukes--;
            isNuked = true;

            LaserShot = 0;
            EnemyShots = 0;
            BossShots = 0;

            BossFire = [];
            EnemyFire = [];


            if (Level % waveTillBoss === 0) {
                Boss.isDamaged = true;
                Boss.Health -= 10;
                createExplosion(0);
                points += 100 * scoreMultiplier;
                enemyExplode[0].play();
            } else {

                for (let i in Enemy) {
                    if (Enemy.hasOwnProperty(i)) {
                        if ((Enemy[i].Health <= 1 && Enemy[i].isDead === false) || (difficulty === 1 && Enemy[i].isDead === false)) {

                            createExplosion(i);
                            Enemy[i].isDead = true;
                            points += 100 * scoreMultiplier;


                            enemyExplode[i % 5].setDuration = 0;
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
}

let LaserShot = 0;
let CoolDown = false;
let Laser = [];
let SoundCounter = 0;

function LaserConstructor(w,h,x,y,speedY,speedX,Active,Health){
    this.w =  w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speedY = speedY;
    this.speedX = speedX;
    this.Active = Active;
    this.Health = Health;
}

function Shoot(){
    if (isGamePaused === false && isGameRunning === true) {
        if (CoolDown === false) {

            let sharpnessPointsToSpend = Player.sharpness;

            SoundCounter++;

            if (Player.bulletCount >= 6) {
                shootLaser2[SoundCounter % 5].play();
            } else {
                shootLaser[SoundCounter % 5].play();
            }

            Laser[LaserShot] = new LaserConstructor(
                10,
                25,
                Player.x + Player.w / 2 - 5,
                Player.y,
                playerLaserSpeed,
                0,
                true,
                startingLaserHealth);

            if (sharpnessPointsToSpend <= 3) {
                Laser[LaserShot].Health += sharpnessPointsToSpend
            } else {
                Laser[LaserShot].Health = 4;
            }

            if (Player.bulletCount >= 2) {
                Laser[LaserShot].x -= 15;
                Laser[LaserShot + 1] = new LaserConstructor(
                    10,
                    25,
                    Player.x + Player.w / 2 + 10,
                    Player.y,
                    playerLaserSpeed,
                    0,
                    true,
                    startingLaserHealth);


                if (sharpnessPointsToSpend <= 3) {
                    Laser[LaserShot + 1].Health += sharpnessPointsToSpend
                } else {
                    Laser[LaserShot + 1].Health = 4;
                }


            }
            sharpnessPointsToSpend -= Laser[LaserShot].Health - 1;


            if (Player.bulletCount >= 3) {

                Laser[LaserShot].speedX = 0.3;
                Laser[LaserShot + 1].speedX = -0.3;

                Laser[LaserShot + 2] = new LaserConstructor(
                    15,
                    25,
                    Player.x + Player.w / 2 - 7,
                    Player.y - 5,
                    playerLaserSpeed,
                    0,
                    true,
                    1);


                if (sharpnessPointsToSpend <= 3) {
                    Laser[LaserShot + 2].Health += sharpnessPointsToSpend
                } else {
                    Laser[LaserShot + 2].Health = 4;
                }
                sharpnessPointsToSpend -= Laser[LaserShot + 2].Health - 1;

            }


            if (Player.bulletCount >= 4) {

                Laser[LaserShot + 3] = new LaserConstructor(
                    10,
                    20,
                    Player.x + Player.w / 2 - 25,
                    Player.y + 15,
                    playerLaserSpeed,
                    0.3,
                    true,
                    false,
                    1);

                Laser[LaserShot + 4] = new LaserConstructor(
                    10,
                    20,
                    Player.x + Player.w / 2 + 15,
                    Player.y + 15,
                    playerLaserSpeed,
                    -0.3,
                    true,
                    false,
                    1);

                if (sharpnessPointsToSpend <= 3) {
                    Laser[LaserShot + 3].Health += sharpnessPointsToSpend;
                    Laser[LaserShot + 4].Health += sharpnessPointsToSpend;
                } else {
                    Laser[LaserShot + 3].Health = 4;
                    Laser[LaserShot + 4].Health = 4;
                }
                sharpnessPointsToSpend -= Laser[LaserShot + 3].Health - 1;

            }


            if (Player.bulletCount >= 6) {

                Laser[LaserShot + 1].x -= 3;

                Laser[LaserShot].h = 30;
                Laser[LaserShot].w = 20;

                Laser[LaserShot].h = 25;
                Laser[LaserShot].w = 15;

                Laser[LaserShot + 1].h = 25;
                Laser[LaserShot + 1].w = 15;

                Laser[LaserShot + 5] = new LaserConstructor(
                    10,
                    20,
                    Player.x + Player.w / 2 - 35,
                    Player.y + 30,
                    playerLaserSpeed,
                    0.3,
                    true,
                    false,
                    1);

                Laser[LaserShot + 6] = new LaserConstructor(
                    10,
                    20,
                    Player.x + Player.w / 2 + 25,
                    Player.y + 30,
                    playerLaserSpeed,
                    -0.3,
                    true,
                    false,
                    1);

                if (sharpnessPointsToSpend <= 3) {
                    Laser[LaserShot + 5].Health += sharpnessPointsToSpend;
                    Laser[LaserShot + 6].Health += sharpnessPointsToSpend;
                } else {
                    Laser[LaserShot + 5].Health = 4;
                    Laser[LaserShot + 6].Health = 4;
                }

            }


            LaserShot = LaserShot + Player.bulletCount;

        }
    }

}


function drawLaser(){
    let count = 0;
    let countGroup = 0;

    for (let i in Laser) {
        if (Laser[i].y <= 0){
            Laser[i].Active = false;
        }
        if (Laser[i].Active === true) {

            switch (Laser[i].Health){
                case 4:
                    ctx.drawImage(laserPiercing3, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                    break;
                case 3:
                    ctx.drawImage(laserPiercing2, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                    break;
                case 2:
                    ctx.drawImage(laserPiercing1, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                    break;
                default:
                    ctx.drawImage(laser, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                    break;
            }

            countGroup++;
            if (countGroup === Player.bulletCount){
                count++;
                countGroup = 0;
            }

        /*
            ctx.font = "25px VT323";
            ctx.fillStyle= "red";
            ctx.fillText(Player.bulletCount + "<-->" + countGroup + " " + Player.amountOfShots + "<-->" + count,100,200);
           */
        }
    }

    if (count >= Player.amountOfShots){
        CoolDown = true;
    }
    else{
        CoolDown = false;
    }


}

function newLaserPosition(){
    for (let i in Laser){
        Laser[i].y-=Laser[i].speedY;
        Laser[i].x-=Laser[i].speedX;
    }
}
let rememberSpeed;
let flagSpeed=false;
let hacks1 = false;
let hacks2 = false;
let keys = [];
let directionX;
let directionY;// 1 left 2 right 3 bomb

function keyPressActions(){

    if (isGamePaused === false && isGameRunning === true) {

        //MOVEMENT

        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown'  ) {
                e.preventDefault();
                keys[e.key] = true;
            } else if (e.key === ' ' && printing1 === false && printing2 === false && printing3 === false) {
                e.preventDefault();
                Shoot();
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                nukeTheMap();
            }
            if (e.key === 'P' || e.key === 'p'){
                e.preventDefault();
                PauseResume();
            }
            if (e.key === 'j'){
                hacks1 = true;
            }
            if (hacks1 === true){
                if (e.key === 'o'){
                    hacks2 = true;
                }
                if (hacks2 === true){
                    if (e.key === '1'){
                        grantPower(1);
                    }
                    else if (e.key === '2'){
                        grantPower(2);
                    }
                    if (e.key === '3'){
                        grantPower(3);
                    }
                    if (e.key === '4'){
                        grantPower(4);
                    }
                    if (e.key === '5'){
                        grantPower(5);
                    }
                    if (e.key === '6'){
                        grantPower(6);
                    }
                    if (e.key === '-'){
                        takeDamage(1);
                    }
                    if (e.key === 'b'){
                        Laser = [];
                        BossFire = [];
                        EnemyFire = [];
                        Enemy = [];
                        BossMusic.pause();

                        if (Level%waveTillBoss !== 0){
                            for (let i in Enemy){
                                if (Enemy[i].isDead===false){
                                    Enemy[i].isDead = true;
                                }
                            }
                        }

                        Level = 9;
                        ifLevelBeaten(true);
                    }
                    if (e.key === 'v'){
                        for (let i in Enemy){
                            Enemy[i].Health++;
                        }
                    }

                    if (e.key === 'c'){
                        console.log(rememberSpeed);

                        if (flagSpeed === false) {
                            flagSpeed = true;
                            rememberSpeed = Enemy[0].speed;
                        }
                        else{
                            flagSpeed = false;
                        }

                        for (let i in Enemy){
                            if (flagSpeed === true) {
                                Enemy[i].speed = 0;
                            }
                            else{
                                Enemy[i].speed = rememberSpeed;
                            }
                        }


                    }
                }

            }
        });
        document.addEventListener('keyup', function (e) {
            delete keys[e.key];
        });



        //MOUSE CONTROLS

        if (mouseControls === true) {
            document.addEventListener('click', function (e){
                e.preventDefault();
                Shoot();
            });

            canvas.addEventListener("mousemove", function (e) {
                let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
                let canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas
                let canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make
                ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas


                Player.x = canvasX;
                Player.y = canvasY;

                /*
                if (canvasX < Player.x){
                    directionX = 1;
                }
                else if (canvasX > Player.x + Player.w){
                    directionX = 2;

                }
                else{
                    directionX = 0;
                }

                if (canvasY > Player.y + Player.h){
                    directionY = 1;

                }
                else if (canvasY < Player.y){
                    directionY = 2;
                }
                else{
                    directionY = 0;
                }

                setTimeout(function (){
                    directionY = 0;
                    directionX = 0;
                },1);


                 */
            });

        }



        //PHONE CONTROLS

        canvas.addEventListener('touchstart', function (e) {
            let touch;
            let shoot;
            switch (e.touches.length) {
                case 1:
                    touch = e.touches[0];

                    console.log(touch.clientX + "  " + touch.clientY + "   " + canvas.clientWidth + "-" + canvas.clientHeight + " " + (canvas.clientHeight - canvas.clientHeight / 4));

                    if (touch.clientY >= 0 && touch.clientY < canvas.clientHeight / 3) {
                        nukeTheMap();
                    } else if (touch.clientX <= canvas.clientWidth / 2) {
                        directionX = 1;
                    } else if (touch.clientX > canvas.clientWidth / 2) {
                        directionX = 2;
                    }
                    if (touch.clientY > (canvas.clientHeight - canvas.clientHeight / 4.5)) {
                        Shoot();
                    }

                    break;
                case 2:
                    touch = e.touches[0];
                    shoot = e.touches[1];

                    console.log(touch.clientX + "  " + touch.clientY);

                    if (touch.clientY >= 0 && touch.clientY < canvas.clientHeight / 3 ||
                        shoot.clientY >= 0 && shoot.clientY < canvas.clientHeight / 3) {
                        nukeTheMap();
                    }
                    if (touch.clientY > canvas.clientHeight - canvas.clientHeight / 4.5 || shoot.clientY > canvas.clientHeight - canvas.clientHeight / 4.5) {
                        Shoot();
                    } else if (touch.clientX <= canvas.clientWidth / 2 || shoot.clientX <= canvas.clientWidth / 2) {
                        directionX = 1;
                    } else if (touch.clientX > canvas.clientWidth / 2 || shoot.clientX > canvas.clientWidth / 2) {
                        directionX = 2;
                    }


                    break;
            }

        });

        window.addEventListener('touchend', function () {
            directionX = 0;
        });


    }

}


