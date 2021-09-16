
let Boss = {};
let bossMode = false;
let bossRateOfFire = 250;
let fasterDecent = 0;
let startingHealth;
let levelBossMixer = 1;

function deleteBossLaser(a){

    BossFire.splice(a,1);

}


function createBoss() {
    Boss = {
        w: 237,
        h: 97,
        x: 135,
        y: -140,
        speed: 3,
        descent: 0.04,
        isDead: false,
        DirectionBias: 0,
        isDamaged: false,
        isHealing: false,
        isProtected: false,
        isAngry: false,
        Health: 5,
        isDescending : true,
        typeBoss: levelBossMixer,
        sx : 0,
        sy : 0,
        sw : 240,
        sh : 100,
        img : motherShip
    }

    switch(Boss.typeBoss){
        case 1:
            Boss.Health = BossHealthBoost + Level*10;
            Boss.descent += fasterDecent;
            levelBossMixer ++;
            break;
        case 2:
            Boss.Health = BossHealthBoost + Level*10;
            levelBossMixer ++;

            Boss.sx = 240;
            Boss.sy = 0;
            Boss.sw = 240
            Boss.sh = 100;
            break;
        case 3:
            Boss.Health = BossHealthBoost*2 + Level*4;
            Boss.isProtected = true;
            levelBossMixer = 1;

            Boss.sx = 480;
            Boss.sy = 0;
            Boss.sw = 240
            Boss.sh = 100;
            break;
    }

    startingHealth = Boss.Health;
    bossMode = true;
}




function  drawBoss(){

    switch(Boss.typeBoss){
        case 1:

                if (Boss.isDamaged === true) {
                    ctx.drawImage(Boss.img,Boss.sx, Boss.sy+100, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                    setTimeout(function () {
                        Boss.isDamaged = false;
                    }, 100);
                } else {
                    ctx.drawImage(Boss.img,Boss.sx, Boss.sy, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                }

            break;
        case 2:

                if(Boss.isHealing === true) {
                    ctx.drawImage(Boss.img,Boss.sx, Boss.sy+200, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                    setTimeout(function () {
                        Boss.isHealing = false;
                    }, 300);

                }
                else if (Boss.isDamaged === true) {
                    ctx.drawImage(Boss.img,Boss.sx+1, Boss.sy+101, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                    setTimeout(function () {
                        Boss.isDamaged = false;
                    }, 100);
                }
                else{
                    if (Boss.Health <= startingHealth/3){
                        ctx.drawImage(Boss.img,Boss.sx, Boss.sy+302, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                    }
                    else {
                        ctx.drawImage(Boss.img,Boss.sx, Boss.sy, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                    }
                }


            break;
        case 3:

                if (Boss.isProtected === true) {
                    ctx.drawImage(Boss.img,Boss.sx, Boss.sy+403, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);

                } else {
                    
                    if (Boss.isHealing === true){
                        ctx.drawImage(Boss.img,Boss.sx, Boss.sy+203, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);

                    }
                    else {
                        if (Boss.isDamaged === true) {
                            ctx.drawImage(Boss.img,Boss.sx, Boss.sy+103, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                            setTimeout(function () {
                                Boss.isDamaged = false;
                            }, 300);
                        } else {
                            if (Boss.Health <= startingHealth / 3) {
                                Boss.isAngry = true;
                                ctx.drawImage(Boss.img,Boss.sx, Boss.sy+303, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                            } else {
                                Boss.isAngry = false;
                                ctx.drawImage(Boss.img,Boss.sx, Boss.sy, Boss.sw, Boss.sh, Boss.x, Boss.y, Boss.w, Boss.h);
                            }
                        }
                    }
                }

            break;
    }
}


function newBossPosition(){

    if (Boss.isDescending === true){
            Boss.y+=3;
            if (Boss.y >= 70){
                Boss.isDescending = false;
            }
    }
    else {
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

        if (Boss.y >= canvas.height - Boss.h && Boss.isDead === false) {
            quit();
        }
    }

}

function isBossDamaged(){
    for (let j in Laser) {
        if (Laser[j].Active === true) {
            if (Laser.hasOwnProperty(j)) {
                if (Boss.isDead === false && Boss.isProtected === false &&
                    Laser[j].x + Laser[j].w >= Boss.x &&
                    Laser[j].x <= Boss.x + Boss.w &&
                    Laser[j].y + Laser[j].h >= Boss.y - 15 &&
                    Laser[j].y + 15 <= Boss.y + Boss.h
                ) {
                    if (Boss.isDescending === true) {
                        Laser[j].Active = false;
                    } else if (Boss.typeBoss === 3 && Boss.isHealing === true) {
                        if (Laser[j].Health <= 1) {
                            Laser[j].Active = false;
                        }
                        Laser[j].Health--;
                        motherShipHeal[0].currentTime = 0;
                        motherShipHeal[0].play();
                        if (Boss.Health < startingHealth) {
                            Boss.Health++;
                        }

                    } else {

                        if (Math.ceil(Math.random() * chanceOfPower - 15) === 1) {
                            generatePower(Boss.x, false);
                        }
                        Boss.isDamaged = true;

                        Boss.Health -= Laser[j].Health;

                        points += 100 * scoreMultiplier;

                        if (Boss.typeBoss === 1) {
                            Boss.y -= 0.3;

                            enemyExplode[j % 5].play();
                        } else if (Boss.typeBoss === 2) {

                            motherShipHit[j % 5].play();
                        } else {

                            motherShip3Hit[j % 5].play();
                        }

                        Laser[j].Active = false;
                    }


                }
            }
        }
    }
    if (Boss.typeBoss === 3) {
        for (let i in Laser) {
            if (Laser[i].Active === true) {
                for (let j in BossFire) {
                    if (Laser.hasOwnProperty(i)) {
                        if (Laser[i].x + Laser[i].w >= BossFire[j].x &&
                            Laser[i].x <= BossFire[j].x + BossFire[j].w &&
                            Laser[i].y + Laser[i].h >= BossFire[j].y &&
                            Laser[i].y <= BossFire[j].y + BossFire[j].h
                        ) {


                            summonHit[j % 5].play();
                            BossFire[j].isDamaged = true;
                            BossFire[j].Health--;

                            if (BossFire[j].Health < 1) {
                                points += 5;
                                if (Math.ceil(Math.random() * chanceOfPower / 2) < 4) {
                                    generatePower(j, true);
                                }
                                deleteBossLaser(j);
                            }


                            Laser[i].Active = false;

                        }
                    }
                }
            }
        }
    }

}


function BossFireConstructor (w,h,x,y,speed,Health = 1,isDamaged,sx,sy,sw,sh,img,xd){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.Health = Health;
    this.isDamaged = isDamaged;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.img = img;
    this.xd = xd;
}

let BossShots = 0;
let BossFire = [];
let AngryBoost;

function BossShoot(){

    if (Boss.isDescending  === false) {

        switch (Boss.typeBoss) {
            case 1:
                if ((Math.ceil(Math.random() * bossRateOfFire - (Boss.y / 20) - Level) <= 1) && Boss.isDead === false) {

                    BossFire[BossShots] = new BossFireConstructor(
                        10,
                        Level / 2 + 30,
                        Boss.x + Boss.w / 2 + 80,
                        Boss.y + 60,
                        enemyProjectileSpeed,
                        1,
                        false,
                        200,
                        0,
                        50,
                        80,
                        enemyLaser,
                        0);

                    BossFire[BossShots + 1] = Object.assign({}, BossFire[BossShots]);
                    BossFire[BossShots + 1].x = Boss.x + Boss.w / 2 - 90


                    BossFire[BossShots + 2] = new BossFireConstructor(
                        10,
                        15,
                        Boss.x + Boss.w / 2 + 90,
                        Boss.y + 60,
                        enemyProjectileSpeed,
                        1,
                        false,
                        0,
                        0,
                        50,
                        80,
                        enemyLaser,
                        0);

                    BossFire[BossShots + 3] = Object.assign({}, BossFire[BossShots+2]);
                    BossFire[BossShots + 3].x = Boss.x + Boss.w / 2 - 100;


                    BossShots += 4;
                }


                break;

            case 2:

                if (Boss.Health <= startingHealth / 3) {
                    AngryBoost = Level * 2;
                } else {
                    AngryBoost = Level / 2;
                }

                if ((Math.ceil(Math.random() * bossRateOfFire) <= AngryBoost) && Boss.isDead === false) {

                    BossFire[BossShots] = new BossFireConstructor(18, 22, Boss.x + Boss.w / 2, Boss.y, 4,  1,
                        false,
                        100,
                        0,
                        50,
                        80,
                        enemyLaser,
                        4);

                    BossFire[BossShots+1] = Object.assign({}, BossFire[BossShots]);
                    BossFire[BossShots+1].xd =  2
                    BossFire[BossShots+2] = Object.assign({}, BossFire[BossShots]);
                    BossFire[BossShots+2].xd =  0;
                    BossFire[BossShots+3] = Object.assign({}, BossFire[BossShots]);
                    BossFire[BossShots+3].xd =  -4
                    BossFire[BossShots+4] = Object.assign({}, BossFire[BossShots]);
                    BossFire[BossShots+4].xd =  -2


                    BossShots += 5;
                }


                break;

            case 3:

                if (Boss.Health <= startingHealth / 3) {
                    AngryBoost = Level / 1.5;
                } else {
                    AngryBoost = Level / 2;
                }

                if ((Math.ceil(Math.random() * bossRateOfFire * 1.5) <= AngryBoost) && Boss.isDead === false && Boss.isProtected === false) {

                    BossFire[BossShots] = new BossFireConstructor(
                        40,
                        40,
                        Boss.x + Boss.w / 2 - 15,
                        Boss.y + 35,
                        (Math.random() * 2) + 1.5,
                        3,
                        false,
                        175,
                        1,
                        35,
                        35,
                        enemy
                    );

                    if (difficulty === 1) {
                        BossFire[BossShots].Health = 2;
                    }

                    BossShots++;
                }

                break;

        }
    }

}



function  drawBossLaser(){
    switch (Boss.typeBoss){
        case 1:  case 2:
            for (let i in BossFire) {
                ctx.drawImage(BossFire[i].img,BossFire[i].sx, BossFire[i].sy, BossFire[i].sw, BossFire[i].sh, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                if (BossFire[i].y === 500) {
                    deleteBossLaser(i);
                }

            }
            break;


        case 3:

            for (let i in BossFire) {
                if (BossFire[i].isDamaged === true) {
                        ctx.drawImage(BossFire[i].img,BossFire[i].sx, BossFire[i].sy+71, BossFire[i].sw, BossFire[i].sh, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                        setTimeout(function () {
                            BossFire[i].isDamaged = false;
                        }, 300);
                    } else if (Boss.isProtected === true && Boss.isAngry === false) {
                        ctx.drawImage(BossFire[i].img,BossFire[i].sx, BossFire[i].sy+36, BossFire[i].sw, BossFire[i].sh, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                    }
                    else if(Boss.isAngry === false){
                        ctx.drawImage(BossFire[i].img, BossFire[i].sx, BossFire[i].sy, BossFire[i].sw, BossFire[i].sh, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                    }
                    else{
                        ctx.drawImage(BossFire[i].img,BossFire[i].sx, BossFire[i].sy+107, BossFire[i].sw, BossFire[i].sh, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                    }

            }


            break;

    }


}

function newBossLaserPosition(){

    switch (Boss.typeBoss){

        case 1:

            for (let i in BossFire) {
                BossFire[i].y += BossFire[i].speed;
            }

            break;
        case 2:

            for (let i in BossFire) {

                BossFire[i].y += BossFire[i].speed + (Math.ceil(Math.random() * 9))/5;
                BossFire[i].x += BossFire[i].xd;

            }

            break;
        case 3:

            for (let i in BossFire) {

                if (Boss.isProtected === false || BossFire[i].y >= 400 || (Boss.isProtected === true && Boss.isAngry === true)) {

                    if (Player.x < BossFire[i].x) {
                        BossFire[i].x -= 0.8 + (0.4 - (Boss.Health / startingHealth * 0.4));

                    } else if (Player.x > BossFire[i].x) {
                        BossFire[i].x += 0.8+ (0.4 - (Boss.Health / startingHealth * 0.4));
                    }

                    if (Boss.isAngry === false || (Boss.isAngry === true && Boss.isProtected === true)){
                        BossFire[i].y += BossFire[i].speed;

                    }
                    else {
                        BossFire[i].y += BossFire[i].speed*1.5;
                    }

                }

            }


            break;
    }

}


function isPlayerHITbyBoss(){
        for (let i in BossFire) {
                if (
                    BossFire[i].x +  BossFire[i].w - 5 >= Player.x &&
                    BossFire[i].x <= Player.x + Player.w - 5 &&
                    BossFire[i].y +  BossFire[i].h -5  >= Player.y &&
                    BossFire[i].y  <= Player.y + Player.h -5 ) {

                    if (Player.unkillable === true) {
                        deleteBossLaser(i);
                        deflectSound.currentTime = 0;
                        deflectSound.play();
                    }
                    else if (Boss.typeBoss === 3) {

                        if (lives - BossFire[i].Health >= 1) {
                            takeDamage(1);
                            deleteBossLaser(i);
                        }
                        else {
                            quit();
                        }
                    }
                    else if (lives - 1 >= 1) {
                        takeDamage();
                        if (Boss.typeBoss === 2) {
                            motherShipHeal[i%5].play();
                            Boss.Health+=10;
                            if (Boss.Health >= startingHealth){
                                Boss.Health = startingHealth;
                            }

                            Boss.isHealing = true;
                        }
                        deleteBossLaser(i);
                    } else {
                        quit();
                    }

                }

        }

    if (Boss.isDead === false &&
        Boss.isProtected === false &&
        Boss.x +  Boss.w  >= Player.x &&
        Boss.x  <= Player.x + Player.w &&
        Boss.y +  Boss.h - 5 >= Player.y &&
        Boss.y <= Player.y + Player.h ) {

        if (Boss.isProtected === false){
            Player.y+=4.5;
        }

        if (Player.unkillable === true) {
            deflectSound.play();

        } else if (lives - 1 >= 1) {
            Boss.Health -= 5;
            takeDamage();
        } else {
            quit();
        }

    }

}

function isBossBeaten(){
    if (Boss.Health <= 0){

        readySetGo.currentTime = 0;
        readySetGo.play();

        if (Level% 10 === 0){
            backgroundChange = true;
            backgroundChange2 = true;
        }

        createExplosion(0);
        motherShipDeathSound.play();
        BossMusic.pause();
        StartTheGame.currentTime = 0;
        StartTheGame.play();
        bossMode = false;
        points += 1500;
        fasterDecent +=0.05;
        Level++;

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

        BossFire = [];
        EnemyFire = [];
        Enemy = [];


        if (Level % 10 === 0){
            EnemyHealth++;
        }

        fillEnemies();
        printing1 = true;
        readySetGo.currentTime = 0;
    }



}

setInterval(function () {

    if (Boss.typeBoss === 3) {

        if (Boss.isProtected === false) {
            Boss.isProtected = true;
        } else {
            Boss.isHealing = Math.ceil(Math.random() * 2) === 1 && Boss.isHealing === false;
            Boss.isProtected = false;
        }
    }

}, 3500);

setInterval(function () {

    if (Boss.Health < startingHealth && Boss.isProtected=== false && Boss.isHealing === true && Boss.typeBoss === 3){
        Boss.Health += 5;
    }
    if (Boss.Health > startingHealth){
        Boss.Health = startingHealth;
    }
}, 500);

setInterval(function () {

    if (Level >= 40 &&  Boss.Health < startingHealth && Boss.typeBoss === 2){
        if (Boss.isAngry === true){
            Boss.Health += 5;
        }
        else{
            Boss.Health += 1;
        }

    }
    if (Boss.Health > startingHealth){
        Boss.Health = startingHealth;
    }
}, 500);