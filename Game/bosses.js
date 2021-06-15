


let Boss = {};
let bossMode = false;
let bossRateOfFire = 250;
let fasterDecent = 0;
let startingHealth;
function createBoss() {
    Boss = {
        w: 237,
        h: 97,
        x: 135,
        y: 50,
        speed: 3,
        descent: 0.04,
        isDead: false,
        DirectionBias: 0,
        isDamaged: false,
        isHealing: false,
        isProtected: false,
        isAngry: false,
        Health: 5,
        typeBoss: Math.ceil(Math.random() * 3)
    }

    if(Boss.typeBoss === 1){
        Boss.Health = BossHealthBoost + Level*10;
        Boss.descent += fasterDecent;
    }
    else if (Boss.typeBoss === 2){
        Boss.Health = BossHealthBoost + Level*10;
    }
    else{
        Boss.Health = BossHealthBoost*2 + Level*4;
        Boss.isProtected = true;
    }

    startingHealth = Boss.Health;
    bossMode = true;
}


function  drawBoss(){
    if (Boss.typeBoss === 1) {
        if (Boss.isDamaged === true) {
            ctx.drawImage(motherShipHurt, Boss.x, Boss.y, Boss.w, Boss.h);
            setTimeout(function () {
                Boss.isDamaged = false;
            }, 100);
        } else {
            ctx.drawImage(motherShip, Boss.x, Boss.y, Boss.w, Boss.h);
        }
    }
    else if (Boss.typeBoss === 2) {
        if(Boss.isHealing === true) {
            ctx.drawImage(motherShip2Heal, Boss.x, Boss.y, Boss.w, Boss.h);
            setTimeout(function () {
                Boss.isHealing = false;
            }, 300);
        }
        else if (Boss.isDamaged === true) {
            ctx.drawImage(motherShip2Hurt, Boss.x, Boss.y, Boss.w, Boss.h);
            setTimeout(function () {
                Boss.isDamaged = false;
            }, 100);
        }
        else{
            if (Boss.Health <= startingHealth/3){
                ctx.drawImage(motherShip2Angry, Boss.x, Boss.y, Boss.w, Boss.h);
            }
            else {
                ctx.drawImage(motherShip2, Boss.x, Boss.y, Boss.w, Boss.h);
            }
        }
    }
    else {
        if (Boss.isProtected === true) {
            ctx.drawImage(motherShip3Protected, Boss.x, Boss.y, Boss.w, Boss.h);

        } else {

            Boss3Shoot();

            if (Boss.isHealing === true){
                ctx.drawImage(motherShip3Heal, Boss.x, Boss.y, Boss.w, Boss.h);
            }
            else {
                if (Boss.isDamaged === true) {
                    ctx.drawImage(motherShip3Hurt, Boss.x, Boss.y, Boss.w, Boss.h);
                    setTimeout(function () {
                        Boss.isDamaged = false;
                    }, 300);
                } else {
                    if (Boss.Health <= startingHealth / 3) {
                        Boss.isAngry = true;
                        ctx.drawImage(motherShip3Angry, Boss.x, Boss.y, Boss.w, Boss.h);
                    } else {
                        Boss.isAngry = false;
                        ctx.drawImage(motherShip3, Boss.x, Boss.y, Boss.w, Boss.h);
                    }
                }
            }
        }
    }
}
function newBossPosition(){

    if (Boss.isProtected === false) {

        if (Boss.DirectionBias > 0) {
            Boss.x += Boss.speed;
            Boss.DirectionBias--;
        } else if (Boss.DirectionBias < 0) {
            Boss.x += Boss.speed * -1;
            Boss.DirectionBias++;
        }

        if (Boss.x + Boss.w >= canvas.width) {
            Boss.DirectionBias *= -1;
        } else if (Boss.x <= 0) {
            Boss.DirectionBias *= -1;
        }


        if (Boss.DirectionBias === 0 && Math.ceil(Math.random() * 2) === 1) {
            Boss.DirectionBias = 10;
        } else if (Boss.DirectionBias === 0) {
            Boss.DirectionBias = -10;
        }

        Boss.y += Boss.descent;

    }

    if (Boss.y >= canvas.height - Boss.h && Boss.isDead === false){
        youLOST();
    }

}

function isBossDamaged(){
    for (let j=0;j<LaserShot;j++) {
        if (Boss.isDead === false &&
            Laser[j].x >= Boss.x &&
            Laser[j].x <= Boss.x + Boss.w &&
            Laser[j].y >= Boss.y &&
            Laser[j].y <= Boss.y + Boss.h &&
            Laser[j].Active === true && Boss.isProtected === false)
        {
            if (Boss.typeBoss === 3 && Boss.isHealing === true) {
                if (Laser[j].Health <= 1) {
                    Laser[j].Active = false;
                }
                Laser[j].Health--;
                motherShipHeal[0].currentTime = 0;
                motherShipHeal[0].play();
                Boss.Health++;
            }
            else {

                if (Math.ceil(Math.random() * chanceOfPower-15) === 1) {
                    generatePower(Boss.x,false);
                }
                Boss.isDamaged = true;
                Boss.Health--;

                if (Laser[j].Health <= 1) {
                    Laser[j].Active = false;
                }
                Laser[j].Health--;

                createExplosion(0);
                points += 100 * scoreMultiplier;

                if (Boss.typeBoss === 1) {
                    Boss.y -= 0.5;
                    enemyExplode[j % 5].play();
                } else if (Boss.typeBoss === 2) {
                    motherShipHit[j % 5].play();
                } else {
                    motherShip3Hit[j % 5].play();
                }
            }


        }
    }
    if (Boss.typeBoss === 3) {
        for (let i = 0; i < LaserShot; i++) {
            for (let j = 0; j < BossWaveShots; j++) {
                if (Laser[i].x >= BossWave[j].x &&
                    Laser[i].x <= BossWave[j].x + BossWave[j].w &&
                    Laser[i].y >= BossWave[j].y &&
                    Laser[i].y <= BossWave[j].y + BossWave[j].h &&
                    Laser[i].Active === true  &&
                    BossWave[j].Active === true){


                    points += 25;

                    summonHit[j%5].play();
                    BossWave[j].isDamaged = true;

                    if (BossWave[j].Health <= 1) {
                        if (Math.ceil(Math.random() * chanceOfPower/2) < 4){
                            generatePower(j,true);
                        }
                        BossWave[j].Active = false;
                    }
                    BossWave[j].Health--;

                    Laser[i].Active = false;

                }
            }
        }
    }

}


let BossShots = 0;
let BossFire = [];

function BossShoot(){
    if ((Math.ceil(Math.random() * bossRateOfFire - (Boss.y / 20) - Level) <= 1)  && Boss.isDead===false) {

        BossFire[BossShots] = {
            w: 10,
            h: Level+20,
            x: 0,
            y: 0,
            speed: enemyProjectileSpeed,
            Active: true,
            redLaser: true,
        }

        BossFire[BossShots+1] = {
            w: 10,
            h: Level+20,
            x: 0,
            y: 0,
            speed: enemyProjectileSpeed,
            Active: true,
            redLaser: true
        }

        BossFire[BossShots+2] = {
            w: 10,
            h: 15,
            x: 0,
            y: 0,
            speed: enemyProjectileSpeed,
            Active: true,
            redLaser: false
        }

        BossFire[BossShots+3] = {
            w: 10,
            h: 15,
            x: 0,
            y: 0,
            speed: enemyProjectileSpeed,
            Active: true,
            redLaser: false
        }


        BossFire[BossShots].x = Boss.x + Boss.w / 2 + 80;
        BossFire[BossShots].y = Boss.y+60;

        BossFire[BossShots+1].x = Boss.x + Boss.w / 2 - 90;
        BossFire[BossShots+1].y = Boss.y+60;

        BossFire[BossShots+2].x = Boss.x + Boss.w / 2 + 90;
        BossFire[BossShots+2].y = Boss.y+60;

        BossFire[BossShots+3].x = Boss.x + Boss.w / 2 - 100;
        BossFire[BossShots+3].y = Boss.y+60;


        BossShots+=4;
    }


}

let BossRadialShots = 0;
let BossRadialFire = [];
let AngryBoost;

function Boss2Shoot(){

    if (Boss.Health <= startingHealth/3){
        AngryBoost = Level*2;
    }
    else{
        AngryBoost = Level/2;
    }

    if ((Math.ceil(Math.random() * bossRateOfFire) <= AngryBoost)  && Boss.isDead===false) {

        for (let i=BossRadialShots;i<BossRadialShots+5;i++) {

            BossRadialFire[i] = {
                w: 18,
                h: 22,
                x: 0,
                y: 0,
                speed: 4,
                Active: true
            }

            BossRadialFire[i].x = Boss.x + Boss.w / 2;
            BossRadialFire[i].y = Boss.y;
        }

        BossRadialShots+=5;
    }

}

let BossWaveShots = 0;
let BossWave = [];

function Boss3Shoot(){

    if (Boss.Health <= startingHealth/3){
        AngryBoost = Level/1.5;
    }
    else{
        AngryBoost = Level/2;
    }

    if ((Math.ceil(Math.random() * bossRateOfFire * 1.5 ) <= AngryBoost) && Boss.isDead === false) {

        BossWave[BossWaveShots] = {
            w: 40 ,
            h: 40 ,
            x: 0 ,
            y: 20,
            speed: (Math.random() * 2) + 1.5 ,
            Health: 3,
            isHurt: false,
            Active: true
        }

        BossWave[BossWaveShots].x = Boss.x + Boss.w / 2 -15;
        BossWave[BossWaveShots].y = Boss.y +35 ;

        if (difficulty === 1){
            BossWave[BossWaveShots].Health = 2;
        }

        BossWaveShots++;
    }


}




function  drawBossLaser(){

    if (Boss.typeBoss === 1) {
        for (let i = 0; i < BossShots; i++) {
            if (BossFire[i].y === 500) {
                BossFire[i].Active = false;
            }
            if (BossFire[i].Active === true) {
                if (Boss.typeBoss === 1) {
                    if (BossFire[i].redLaser === true) {
                        ctx.drawImage(bossLaser, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                    } else {
                        ctx.drawImage(enemyLaser, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                    }
                }
            }
        }
    }
    else if (Boss.typeBoss === 2){
        for (let i = 0; i < BossRadialShots; i+=5) {

            ctx.drawImage(boss2Fire, BossRadialFire[i].x, BossRadialFire[i].y, BossRadialFire[i].w, BossRadialFire[i].h);


            ctx.drawImage(boss2Fire, BossRadialFire[i+1].x, BossRadialFire[i+1].y, BossRadialFire[i+1].w, BossRadialFire[i+1].h);


            ctx.drawImage(boss2Fire, BossRadialFire[i+2].x, BossRadialFire[i+2].y, BossRadialFire[i+2].w, BossRadialFire[i+2].h);


            ctx.drawImage(boss2Fire, BossRadialFire[i+3].x, BossRadialFire[i+3].y, BossRadialFire[i+3].w, BossRadialFire[i+3].h);


            ctx.drawImage(boss2Fire, BossRadialFire[i+4].x, BossRadialFire[i+4].y, BossRadialFire[i+4].w, BossRadialFire[i+4].h);
        }

    }

    else if (Boss.typeBoss === 3){
        for (let i = 0; i < BossWaveShots; i++) {
            if (BossWave[i].Active === true) {
                if (BossWave[i].isDamaged === true) {
                    ctx.drawImage(boss3FireHurt, BossWave[i].x, BossWave[i].y, BossWave[i].w, BossWave[i].h);
                    setTimeout(function () {
                        BossWave[i].isDamaged = false;
                    }, 300);
                } else if (Boss.isProtected === true && Boss.isAngry === false) {
                    ctx.drawImage(boss3FireSleep, BossWave[i].x, BossWave[i].y, BossWave[i].w, BossWave[i].h);
                }
                else if(Boss.isAngry === false){
                    ctx.drawImage(boss3Fire, BossWave[i].x, BossWave[i].y, BossWave[i].w, BossWave[i].h);
                }
                else{
                    ctx.drawImage(boss3FireAngry, BossWave[i].x, BossWave[i].y, BossWave[i].w, BossWave[i].h);
                }
            }
        }
    }


}

function newBossLaserPosition(){
    if (Boss.typeBoss === 1) {
        for (let i = 0; i < BossShots; i++) {
            BossFire[i].y += BossFire[i].speed;
        }
    }
    else if (Boss.typeBoss === 2) {
        for (let i = 0; i < BossRadialShots; i+=5) {
            BossRadialFire[i].y += BossRadialFire[i].speed;
            BossRadialFire[i].x -= BossRadialFire[i].speed;

            BossRadialFire[i+1].y += BossRadialFire[i].speed;
            BossRadialFire[i+1].x -= BossRadialFire[i].speed/2;

            BossRadialFire[i+2].y += BossRadialFire[i].speed;

            BossRadialFire[i+3].y += BossRadialFire[i].speed;
            BossRadialFire[i+3].x += BossRadialFire[i].speed/2;

            BossRadialFire[i+4].y += BossRadialFire[i].speed;
            BossRadialFire[i+4].x += BossRadialFire[i].speed;

        }
    }
    else if (Boss.typeBoss === 3) {
        for (let i = 0; i < BossWaveShots; i++) {

            if (Boss.isProtected === false || BossWave[i].y >= 400) {

                if (Player.x < BossWave[i].x) {
                    BossWave[i].x -= 0.8;
                } else if (Player.x > BossWave[i].x) {
                    BossWave[i].x += 0.8;
                }

                if (Boss.isAngry === false){
                    BossWave[i].y += BossWave[i].speed;
                }
                else{
                    BossWave[i].y += BossWave[i].speed*1.5;
                }

            }
            else if (Boss.isProtected === true && Boss.isAngry === true){
                BossWave[i].y += BossWave[i].speed/3.5;
            }
        }
    }
}


function isPlayerHITbyBoss(){
    if (Boss.typeBoss === 1) {
        for (let i = 0; i < BossShots; i++) {

            if (Boss.typeBoss === 1) {

                if (
                    BossFire[i].x >= Player.x &&
                    BossFire[i].x  <= Player.x + Player.w &&
                    BossFire[i].y +  BossFire[i].h - 3 >= Player.y &&
                    BossFire[i].y + BossFire[i].h - 3<= Player.y + Player.h &&
                    BossFire[i].Active === true &&
                    unkillable === false) {
                    if (lives - 1 >= 1) {
                        BossFire[i].Active = false;
                        takeDamage();

                    } else {
                        youLOST();
                    }

                }
            }
        }
    }
    else if (Boss.typeBoss === 2) {
        for (let i = 0; i < BossRadialShots; i++) {
            if (
                BossRadialFire[i].x >= Player.x &&
                BossRadialFire[i].x <= Player.x + Player.w &&
                BossRadialFire[i].y >= Player.y &&
                BossRadialFire[i].y <= Player.y + Player.h &&
                BossRadialFire[i].Active === true &&
                unkillable === false) {
                if (lives - 1 >= 1) {
                    motherShipHeal[i%5].play();
                    Boss.Health+=10;
                    Boss.isHealing = true;
                    BossRadialFire[i].Active = false;
                    takeDamage();
                } else {
                    youLOST();
                }
            }

        }
    }

    // BEST LOGIC. DO TO OTHERS SAME LATER
    else if (Boss.typeBoss === 3) {
        for (let i = 0; i < BossWaveShots; i++) {
            if (
                BossWave[i].x +  BossWave[i].w - 5 >= Player.x &&
                BossWave[i].x  + 5  <= Player.x + Player.w &&
                BossWave[i].y +  BossWave[i].h - 5 >= Player.y &&
                BossWave[i].y + 5 <= Player.y + Player.h &&
                BossWave[i].Active === true &&
                unkillable === false) {
                if (lives - BossWave[i].Health >= 1) {
                    BossWave[i].Active = false;
                    takeDamage(BossWave[i].Health);

                } else {
                    youLOST();
                }
            }

        }
    }


    for (let i=0;i<numOfEnemies;i++){
        if (Enemy[i].y >= canvas.height-30 && Enemy[i].isDead === false){
            youLOST();
        }
    }


}

function isBossBeaten(){
    if (Boss.Health <= 0){
        rememberAmountOfShots = amountOfShots;
        rememberNukes = nukes;
        rememberPlayerBulletCount = playerBulletCount;

        motherShipDeathSound.play();
        BossMusic.pause();
        StartTheGame.currentTime = 0;
        StartTheGame.play();
        bossMode = false;
        points += 1500;
        fasterDecent +=0.05;

        if (lives < maxLives){
            lives += gainLifePerStage;
        }

        numOfEnemies += 2;
        if (numOfEnemies >= 40) {
            numOfEnemies = 40;
        }
        if (RateOfFire >= 220) {
            RateOfFire -= 5;
        }
        enemySpeed += 0.1;
        if (enemyProjectileSpeed < 3) {
            enemyProjectileSpeed += 0.2;
        }

        Level++;
        LaserShot = 0;
        EnemyShots = 0;
        InactiveShots = 0;
        BossShots = 0;
        BossRadialShots = 0;




        if (Level % 10 === 0){
            EnemyHealth++;
        }

        fillEnemies();
    }


}


setInterval(function () {

    if (Boss.typeBoss === 3) {

        if (Boss.isProtected === false) {
            Boss.isProtected = true;
        } else {
            if (Math.ceil(Math.random() * 2) === 1 && Boss.isHealing === false) {
                Boss.isHealing = true;
            } else {
                Boss.isHealing = false;
            }
            Boss.isProtected = false;
        }
    }

}, 3000);