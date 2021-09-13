


let Boss = {};
let bossMode = false;
let bossRateOfFire = 250;
let fasterDecent = 0;
let startingHealth;
let levelBossMixer = 1;
function createBoss() {
    Boss = {
        w: 237,
        h: 97,
        x: 135,
        y: 70,
        speed: 3,
        descent: 0.04,
        isDead: false,
        DirectionBias: 0,
        isDamaged: false,
        isHealing: false,
        isProtected: false,
        isAngry: false,
        Health: 5,
        typeBoss: levelBossMixer
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
            break;
        case 3:
            Boss.Health = BossHealthBoost*2 + Level*4;
            Boss.isProtected = true;
            levelBossMixer = 1;
            break;
    }

    startingHealth = Boss.Health;
    bossMode = true;
}




function  drawBoss(){

    switch(Boss.typeBoss){
        case 1:

                if (Boss.isDamaged === true) {
                    ctx.drawImage(motherShipHurt, Boss.x, Boss.y, Boss.w, Boss.h);
                    setTimeout(function () {
                        Boss.isDamaged = false;
                    }, 100);
                } else {
                    ctx.drawImage(motherShip, Boss.x, Boss.y, Boss.w, Boss.h);
                }

            break;
        case 2:

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


            break;
        case 3:

                if (Boss.isProtected === true) {
                    ctx.drawImage(motherShip3Protected, Boss.x, Boss.y, Boss.w, Boss.h);

                } else {
                    
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

            break;
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
    for (let j in Laser) {
        if (Laser[j].Active === true) {
            if (Laser.hasOwnProperty(j)) {
                if (Boss.isDead === false && Boss.isProtected === false &&
                    Laser[j].x >= Boss.x &&
                    Laser[j].x <= Boss.x + Boss.w &&
                    Laser[j].y + Laser[j].h >= Boss.y &&
                    Laser[j].y <= Boss.y + Boss.h
                    ) {
                    if (Boss.typeBoss === 3 && Boss.isHealing === true) {
                        if (Laser[j].Health <= 1) {
                            Laser[j].Active = false;
                        }
                        Laser[j].Health--;
                        motherShipHeal[0].currentTime = 0;
                        motherShipHeal[0].play();
                        if (Boss.Health < startingHealth){
                            Boss.Health++;
                        }
                    } else {

                        if (Math.ceil(Math.random() * chanceOfPower - 15) === 1) {
                            generatePower(Boss.x, false);
                        }
                        Boss.isDamaged = true;
                        Boss.Health--;

                        if (Laser[j].Health <= 1) {
                            Laser[j].Active = false;
                        }
                        Laser[j].Health--;

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
        }
    }
    if (Boss.typeBoss === 3) {
        for (let i in Laser) {
            if (Laser[i].Active === true) {
                for (let j in BossFire) {
                    if (Laser.hasOwnProperty(i)) {
                        if ( BossFire[j].Active === true && Laser[i].x >= BossFire[j].x &&
                            Laser[i].x <= BossFire[j].x + BossFire[j].w &&
                            Laser[i].y >= BossFire[j].y &&
                            Laser[i].y <= BossFire[j].y + BossFire[j].h
                            ) {


                            summonHit[j % 5].play();
                            BossFire[j].isDamaged = true;

                            if (BossFire[j].Health <= 1) {
                                points += 20 * scoreMultiplier;
                                if (Math.ceil(Math.random() * chanceOfPower / 2) < 4) {
                                    generatePower(j, true);
                                }
                                BossFire[j].Active = false;
                            }
                            BossFire[j].Health--;

                            Laser[i].Active = false;

                        }
                    }
                }
            }
        }
    }

}


function BossFireConstructor (w,h,x,y,speed,Active,redLaser = false,Health = 1,isHurt){
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.Active = Active;
    this.redLaser = redLaser;
    this.Health = Health;
    this.isHurt = isHurt;
}

let BossShots = 0;
let BossFire = [];
let AngryBoost;

function BossShoot(){
    
    switch (Boss.typeBoss){
        case 1:
                if ((Math.ceil(Math.random() * bossRateOfFire - (Boss.y / 20) - Level) <= 1)  && Boss.isDead===false) {
    
                    BossFire[BossShots] = new BossFireConstructor(
                        10,
                        Level/2+30,
                        Boss.x + Boss.w / 2 + 80,
                        Boss.y+60,
                        enemyProjectileSpeed,
                        true,
                        true,
                        1,
                        false);
    
                    BossFire[BossShots+1] = new BossFireConstructor(
                        10,
                        Level/2+30,
                        Boss.x + Boss.w / 2 - 90,
                        Boss.y+60,
                        enemyProjectileSpeed,
                        true,
                        true,
                        1,
                        false);
    
                    BossFire[BossShots+2] = new BossFireConstructor(
                        10,
                        15,
                        Boss.x + Boss.w / 2 + 90,
                        Boss.y+60,
                        enemyProjectileSpeed,
                        true,
                        false,
                        1,
                        false);
    
                    BossFire[BossShots+3] = new BossFireConstructor(
                        10,
                        15,
                        Boss.x + Boss.w / 2 - 100,
                        Boss.y+60,
                        enemyProjectileSpeed,
                        true,
                        false,
                        1,
                        false);
    
                    BossShots+=4;
                }
            
            
            break;
            
        case 2:

                if (Boss.Health <= startingHealth/3){
                    AngryBoost = Level*2;
                }
                else{
                    AngryBoost = Level/2;
                }
    
                if ((Math.ceil(Math.random() * bossRateOfFire) <= AngryBoost)  && Boss.isDead===false) {
                    
                        BossFire[BossShots] = new BossFireConstructor(18,22,Boss.x + Boss.w / 2,Boss.y,4,true,false,1);
                        BossFire[BossShots+1] = new BossFireConstructor(18,22,Boss.x + Boss.w / 2,Boss.y,4,true,false,1);
                        BossFire[BossShots+2] = new BossFireConstructor(18,22,Boss.x + Boss.w / 2,Boss.y,4,true,false,1);
                        BossFire[BossShots+3] = new BossFireConstructor(18,22,Boss.x + Boss.w / 2,Boss.y,4,true,false,1);
                        BossFire[BossShots+4] = new BossFireConstructor(18,22,Boss.x + Boss.w / 2,Boss.y,4,true,false,1);

                        BossShots+=5;
                }



            break;
        
        case 3:

            if (Boss.Health <= startingHealth/3){
                AngryBoost = Level/1.5;
            }
            else{
                AngryBoost = Level/2;
            }

            if ((Math.ceil(Math.random() * bossRateOfFire * 1.5 ) <= AngryBoost) && Boss.isDead === false && Boss.isProtected === false) {

                BossFire[BossShots] = new BossFireConstructor(
                    40,
                    40,
                    Boss.x + Boss.w / 2 -15,
                    Boss.y +35 ,
                    (Math.random() * 2) + 1.5,
                    true,
                    false,
                    3,
                    false
                 );
                
                if (difficulty === 1){
                    BossFire[BossShots].Health = 2;
                }

                BossShots++;
            }
            
            break;
        
    }

}



function  drawBossLaser(){
    switch (Boss.typeBoss){
        case 1:

            for (let i in BossFire) {
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

            break;


        case 2:

            for (let i in BossFire) {
                if (BossFire[i].Active === true) {
                    ctx.drawImage(boss2Fire, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                }
            }

            break;

        case 3:

            for (let i in BossFire) {
                if (BossFire[i].Active === true) {
                    if (BossFire[i].isDamaged === true) {
                        ctx.drawImage(boss3FireHurt, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                        setTimeout(function () {
                            BossFire[i].isDamaged = false;
                        }, 300);
                    } else if (Boss.isProtected === true && Boss.isAngry === false) {
                        ctx.drawImage(boss3FireSleep, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                    }
                    else if(Boss.isAngry === false){
                        ctx.drawImage(boss3Fire, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                    }
                    else{
                        ctx.drawImage(boss3FireAngry, BossFire[i].x, BossFire[i].y, BossFire[i].w, BossFire[i].h);
                    }
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


                switch (i%5){
                    case 0:
                        BossFire[i].x -= BossFire[i].speed;
                        break;
                    case 1:
                        BossFire[i].x -= BossFire[i].speed/2;

                        break;
                    case 2:

                        break;

                    case 3:
                        BossFire[i].x += BossFire[i].speed/2;

                        break;
                    case 4:
                        BossFire[i].x += BossFire[i].speed;
                        break;
                }
            }

            break;
        case 3:

            for (let i in BossFire) {

                if (Boss.isProtected === false || BossFire[i].y >= 400) {

                    if (Player.x < BossFire[i].x) {
                        BossFire[i].x -= 0.8 + (0.4 - (Boss.Health / startingHealth * 0.4));

                    } else if (Player.x > BossFire[i].x) {
                        BossFire[i].x += 0.8+ (0.4 - (Boss.Health / startingHealth * 0.4));
                    }

                    if (Boss.isAngry === false){
                        BossFire[i].y += BossFire[i].speed;
                    }
                    else{
                        BossFire[i].y += BossFire[i].speed*1.5;
                    }

                }
                else if (Boss.isProtected === true && Boss.isAngry === true){
                    BossFire[i].y += BossFire[i].speed/3.5;
                }
            }


            break;
    }

}


function isPlayerHITbyBoss(){
        for (let i in BossFire) {
                if (BossFire[i].Active === true &&
                    BossFire[i].x +  BossFire[i].w - 5 >= Player.x &&
                    BossFire[i].x  + 5  <= Player.x + Player.w &&
                    BossFire[i].y +  BossFire[i].h - 5 >= Player.y &&
                    BossFire[i].y + 5 <= Player.y + Player.h ) {

                    if (Player.unkillable === true) {
                        BossFire[i].Active = false;
                        deflectSound.currentTime = 0;
                        deflectSound.play();
                    }
                    else if (Boss.typeBoss === 3) {

                        if (lives - BossFire[i].Health >= 1) {
                            BossFire[i].Active = false;
                            takeDamage(1);

                        }
                        else {
                            youLOST();
                        }
                    }
                    else if (lives - 1 >= 1) {
                        BossFire[i].Active = false;
                        takeDamage();

                        if (Boss.typeBoss === 2) {
                            motherShipHeal[i%5].play();
                            Boss.Health+=10;
                            if (Boss.Health >= startingHealth){
                                Boss.Health = startingHealth;
                            }

                            Boss.isHealing = true;
                        }
                    } else {
                        youLOST();
                    }

                }

        }

    if (Boss.isDead === false &&
        Boss.isProtected === false &&
        Boss.x +  Boss.w - 5 >= Player.x &&
        Boss.x  + 5  <= Player.x + Player.w &&
        Boss.y +  Boss.h - 5 >= Player.y &&
        Boss.y + 5 <= Player.y + Player.h ) {

        if (Boss.isProtected === false){
            Player.y+=4.5;
        }

        if (Player.unkillable === true) {
            deflectSound.play();

        } else if (lives - 1 >= 1) {
            Boss.Health -= 5;
            takeDamage();
        } else {
            youLOST();
        }

    }

}

function isBossBeaten(){
    if (Boss.Health <= 0){
        backgroundChange = true;
        backgroundChange2 = true;
        rememberAmountOfShots = Player.amountOfShots;
        rememberNukes = nukes;
        rememberPlayerBulletCount = Player.bulletCount;
        rememberSharpness  = Player.sharpness;
        createExplosion(0);
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
        Laser = [];
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
            if (Math.ceil(Math.random() * 2) === 1 && Boss.isHealing === false) {
                Boss.isHealing = true;
            } else {
                Boss.isHealing = false;
            }
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