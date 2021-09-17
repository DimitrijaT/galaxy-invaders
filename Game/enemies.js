
//CREATE ENEMIES

function EnemyConstructor(w,h,x,y,speed,Direction,firingMode,Health,isDamaged,typeEnemy,lowerMode,shields,descending,sx,sy,sw,sh,img,xd,oldy/*,shadowx,shadowy,am = false,rm = false*/)
{
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.Direction = Direction;
    this.firingMode = firingMode;
    this.Health = Health;
    this.isDamaged = isDamaged;
    this.typeEnemy = typeEnemy;
    this.lowerMode = false;
    this.shieldMode = false;
    this.descending = true;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.img = img;
    this.xd = xd;
    this.oldy = oldy;

    //TESTING PURPOSES ONLY
    //this.shadowx = shadowx;
    //this.shadowy = shadowy;
    //this.attackMode = am;
    //this.retreatMode = rm;
}

function deleteEnemy(a){
    Enemy.splice(a,1);

}

function deleteEnemyLaser(a){
    EnemyFire.splice(a,1)
}


let numOfEnemies = 10;
let Enemy = [];  // new Array();
let levelEnemyMixer = 1;
let checkIfAllDead
function fillEnemies(){

    checkIfAllDead = numOfEnemies;

    let offsetXaxis = 10;
    let offsetYaxis = -310;

    if (levelEnemyMixer > 7){
        levelEnemyMixer = 1;
    }

    let typeEnemy = levelEnemyMixer;
    let typeArray = [Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 7)]

    for (let i=0;i<numOfEnemies;i++){

        if (i%8 === 0){
            offsetXaxis = 10;
            offsetYaxis += 50;
        }

        if (difficulty === 3 || Level >= 50) {
            if (i >= 0 && i< 8){
                typeEnemy = typeArray[0];
            }
            if (i >= 8 && i < 16) {
                typeEnemy =  typeArray[1];
            } else if (i >= 16 && i < 24) {
                typeEnemy =  typeArray[2];
            } else if (i >= 24 && i < 32) {
                typeEnemy =  typeArray[3];
            } else if (i >= 32 && i < 40) {
                typeEnemy =  typeArray[4];
            }
        }
        Enemy[i] = new EnemyConstructor(
            30,
            30,
            offsetXaxis,
            offsetYaxis,
            enemySpeed,
            true,
            false,
            EnemyHealth,
            false,
            typeEnemy,
            false,
            false,
            true,
            0,
            0,
            35,
            35,
            enemy,
            0
        );


        offsetXaxis +=50;

    }

    for (let i in Enemy) {
        switch (Enemy[i].typeEnemy) {
            case 7:
                noHitChallenge = false;
                Enemy[i].img =  asteroid;
                Enemy[i].Health = EnemyHealth * 3;
                Enemy[i].y -= Math.ceil(Math.random() * 2000);
                Enemy[i].sx = 2;
                Enemy[i].sy = 0;
                Enemy[i].sw = 70;
                Enemy[i].sh = 75;
                Enemy[i].w  = Enemy[i].h += Math.ceil(Math.random() * 120);

                let x = Math.ceil(Math.random() * 6);
                for (let j=0;j<x;j++){
                    Enemy[i].sx += 75;
                }

            break;

            case 6:
                Enemy[i].sx = 140;
                Enemy[i].sy = 0;
                Enemy[i].sw = 35
                Enemy[i].sh = 35;
                break;
            case 5:
                Enemy[i].Health  = Math.ceil(Enemy[i].Health/2);
                Enemy[i].sx = 175;
                Enemy[i].sy = 0;
                Enemy[i].sw = 35
                Enemy[i].sh = 35;
                break;
            case 4:
                Enemy[i].Health *= 2;
                Enemy[i].sx = 105;
                Enemy[i].sy = 0;
                Enemy[i].sw = 35;
                Enemy[i].sh = 35;
                break;
            case 3:
                Enemy[i].sx = 70;
                Enemy[i].sy = 0;
                Enemy[i].sw = 35;
                Enemy[i].sh = 35;
                break;
            case 2:
                Enemy[i].sx = 35;
                Enemy[i].sy = 0;
                Enemy[i].sw = 35;
                Enemy[i].sh = 35;
                break;
            default:
                Enemy[i].sx = 0;
                Enemy[i].sy = 0;
                Enemy[i].sw = 35;
                Enemy[i].sh = 35;
                break;
        }
    }
}

function asteroidSwap(object,i){
    object[i].sy += 75;
    if ( object[i].sy >= 1650){
        object[i].sy = 0;
    }
}

function drawEnemy(){
    for (let i in Enemy)
    {
            if (Enemy[i].typeEnemy === 7 && Enemy[i].y>=-(Enemy[i].h+5)){
                ctx.drawImage(Enemy[i].img,Enemy[i].sx, Enemy[i].sy, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
               asteroidSwap(Enemy,i);
            }
            else {

                if (Enemy[i].typeEnemy === 6 &&  Enemy[i].shieldMode === false && Math.ceil(Math.random() * 400) === 1) {
                    Enemy[i].shieldMode = true;
                    setTimeout(function () {
                        Enemy[i].shieldMode = false;
                    }, 1500);
                }
                if (Enemy[i].typeEnemy === 6 &&  Enemy[i].shieldMode === true){
                    setTimeout(function () {
                        Enemy[i].shieldMode = false;
                    }, 1200);
                }

/*
                if (Enemy[i].typeEnemy === 1  &&  Enemy[i].y <= 600 && Enemy[i].attackMode === false &&  Enemy[i].retreatMode === false && Math.ceil(Math.random() * 3000) === 1){
                    Enemy[i].shadowy =  Enemy[i].y;
                    Enemy[i].shadowx =  Enemy[i].x;
                    Enemy[i].attackMode = true;
                    setTimeout(function () {
                        Enemy[i].attackMode = false;
                        Enemy[i].retreatMode = true;
                        setTimeout(function () {
                            Enemy[i].retreatMode = false;
                            Enemy[i].x = Enemy[i].shadowx;
                            Enemy[i].y = Enemy[i].shadowy;
                        }, 2000);
                    }, 2000);
                }

 */

                if
                (Enemy[i].firingMode === true) {
                    ctx.drawImage(Enemy[i].img, Enemy[i].sx, Enemy[i].sy + 37, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                    setTimeout(function () {
                        Enemy[i].firingMode = false;
                    }, 350);
                } else if (Enemy[i].shieldMode === true) {
                    ctx.drawImage(Enemy[i].img, Enemy[i].sx, Enemy[i].sy + 107, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                } else if (Enemy[i].isDamaged === true) {
                    ctx.drawImage(Enemy[i].img, Enemy[i].sx, Enemy[i].sy + 75, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                    setTimeout(function () {
                        Enemy[i].isDamaged = false;
                    }, 200);
                } else {
                    ctx.drawImage(Enemy[i].img, Enemy[i].sx, Enemy[i].sy, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                }


            }

        if (Enemy[i].y >= canvas.height + 10 /*&& Enemy[i].attackMode === false && Enemy[i].retreatMode === false*/) {
            if ( Enemy[i].typeEnemy === 7){
                checkIfAllDead--;
                deleteEnemy(i);
            }
            else{
                quit();
            }
        }

    }

    for (let i in Enemy){
        Death(Enemy, i);
    }
}

function newEnemyPosition(){

    let offsetXaxis = 10;
    let offsetYaxis = 10;

    for (let i in Enemy) {

        if (Enemy[i].descending === true || Enemy[i].typeEnemy === 7) {

            if (Enemy[i].typeEnemy === 7){
                let speedUp = 1/(Enemy[i].w / 200)
                if (speedUp > 5){
                    speedUp = 5;
                }
                else if (speedUp < 0.5){
                    speedUp = 0.5;
                }
                if (Enemy[i].y <= -10){
                    speedUp*=1.5;
                }
                Enemy[i].y += speedUp;
                Enemy[i].x += Enemy[i].xd;
                if (Enemy[i].xd > 0){
                    setTimeout(function (){
                        Enemy[i].xd -= 0.2;
                        if (Enemy[i].xd < 0){
                            Enemy[i].xd = 0;
                        }
                    },200);
                }

            }
            else{
                Enemy[i].y += 5;
            }

            if (i % 8 === 0) {
                offsetXaxis = 10;
                offsetYaxis += 50;
            }

            if (Enemy[i].y >= offsetYaxis) {
                Enemy[i].descending = false;
            }

        } else {

            if ( (Enemy[i].x + Enemy[i].w >= canvas.width && Enemy[i].Direction === true)   || (Enemy[i].x <= 0 && Enemy[i].Direction === false)
              //  || (Enemy[i].shadowx + Enemy[i].w >= canvas.width && Enemy[i].Direction === true)   || (Enemy[i].shadowx <= 0 && Enemy[i].Direction === false)
            ) {
                Enemy[i].Direction = Enemy[i].Direction === false;
                if (Enemy[i].typeEnemy === 1 || Enemy[i].typeEnemy === 4 || Enemy[i].typeEnemy === 5 || Enemy[i].typeEnemy === 6) {
                    Enemy[i].lowerMode = true;
                    /*
                    if (Enemy[i].attackMode === true){
                        Enemy[i].oldy = Enemy[i].shadowy;
                    }
                     */
                    Enemy[i].oldy = Enemy[i].y;
                }
            }

            if (Enemy[i].lowerMode === true && Enemy[i].typeEnemy !== 3) {
                if (Enemy[i].y + 3 <= Enemy[i].oldy + 30){
                    Enemy[i].y += 3;
                }
                /*
                if (Enemy[i].shadowy + 3 <= Enemy[i].oldy + 30){
                    Enemy[i].shadowy += 3;
                }

                 */
                setTimeout(function () {
                    Enemy[i].lowerMode = false;
                }, 150)
            }

            if (Enemy[i].Direction === true) {
                switch (Enemy[i].typeEnemy) {
                    case 6:
                        Enemy[i].x += Enemy[i].speed / 3;
                        break;

                    case 4:
                        Enemy[i].x += Enemy[i].speed / 3;
                        break;
                    case 3:
                        Enemy[i].y += Enemy[i].speed / 10;
                        Enemy[i].x += Enemy[i].speed / 1.5;
                        break;
                    case 2:
                                if (Enemy[i].x >= canvas.width / 2) {
                                    Enemy[i].y += Enemy[i].speed / 4;
                                } else {
                                    Enemy[i].y -= Enemy[i].speed / 6;
                                }
                                Enemy[i].y += Enemy[i].speed / 18;

                                Enemy[i].x += Enemy[i].speed;
                        break;

                    case 1:/*

                        if (Enemy[i].attackMode === true){

                            if (Player.x < Enemy[i].x) {
                                Enemy[i].x -= 2
                                Enemy[i].y += 2

                            }
                            if (Player.x > Enemy[i].x) {
                                Enemy[i].x += 2
                                Enemy[i].y += 2
                            }

                            Enemy[i].shadowx += Enemy[i].speed;
                        }
                        else if (Enemy[i].retreatMode === true){

                            Enemy[i].shadowx += Enemy[i].speed;

                            if ( Enemy[i].x < Enemy[i].shadowx) {
                                Enemy[i].x += Enemy[i].speed*2;
                            }
                            if (Enemy[i].x > Enemy[i].shadowx) {
                                Enemy[i].x -= Enemy[i].speed*2;
                            }

                            if (Enemy[i].y  > Enemy[i].shadowy) {
                                Enemy[i].y -= Enemy[i].speed*2;
                            }
                            if ( Enemy[i].y < Enemy[i].shadowy) {
                                Enemy[i].y += Enemy[i].speed*2;
                            }

                        }
                        else{*/
                            Enemy[i].x += Enemy[i].speed;
                       // }
                        break;
                    case 5:
                        Enemy[i].x += Enemy[i].speed;
                        break;
                }
            } else {
                switch (Enemy[i].typeEnemy) {
                    case 6:
                        Enemy[i].x -= Enemy[i].speed / 3;
                        break;
                    case 4:
                        Enemy[i].x -= Enemy[i].speed / 3;
                        break;
                    case 3:
                        Enemy[i].x -= Enemy[i].speed * 3;
                        break;
                    case 2:
                                if (Enemy[i].x >= canvas.width / 2) {
                                    Enemy[i].y -= Enemy[i].speed / 4;
                                } else {
                                    Enemy[i].y += Enemy[i].speed / 6;
                                }
                                Enemy[i].y += Enemy[i].speed / 18;
                                Enemy[i].x -= Enemy[i].speed;

                        break;

                    case 1:/*
                        if (Enemy[i].attackMode === true){

                            if (Player.x < Enemy[i].x) {
                                Enemy[i].x -= 2
                                Enemy[i].y += 2

                            }
                            if (Player.x > Enemy[i].x) {
                                Enemy[i].x += 2
                                Enemy[i].y += 2
                            }
                            Enemy[i].shadowx -= Enemy[i].speed;
                        }
                        else if (Enemy[i].retreatMode === true){

                            Enemy[i].shadowx -= Enemy[i].speed;

                            if ( Enemy[i].x < Enemy[i].shadowx) {
                                Enemy[i].x += Enemy[i].speed*2;
                            }
                            if (Enemy[i].x > Enemy[i].shadowx) {
                                Enemy[i].x -= Enemy[i].speed*2;
                            }

                            if (Enemy[i].y  > Enemy[i].shadowy) {
                                Enemy[i].y -= Enemy[i].speed*2;
                            }
                            if ( Enemy[i].y < Enemy[i].shadowy) {
                                Enemy[i].y += Enemy[i].speed*2;
                            }

                        }
                        else { */
                            Enemy[i].x -= Enemy[i].speed;
                       // }
                        break;
                    case 5:
                        Enemy[i].x -= Enemy[i].speed;
                        break;

                }
            }
        }
    }
}

//ENEMY PROJECTILE
let EnemyShots = 0;
let EnemyFire = [];

function EnemyFireConstructor(w,h,x,y,speed,typeFire,sx,sy,sw,sh,img)
{
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.typeFire = typeFire;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.img = img;
}

function enemyShoot() {
    for (let i in Enemy) {

        if (Enemy[i].typeEnemy !== 7 && (Math.ceil(Math.random() * RateOfFire) <= 1) && Enemy[i].shieldMode === false && Enemy[i].descending === false) {

            EnemyFire[EnemyShots] = new EnemyFireConstructor(
                10,
                20,
                Enemy[i].x + Enemy[i].w / 2 - 5,
                Enemy[i].y,enemyProjectileSpeed,
                Enemy[i].typeEnemy,
                0,
                0,
                50,
                80,
                enemyLaser,
                0)
            ;
            Enemy[i].firingMode = true;

            switch(EnemyFire[EnemyShots].typeFire){
                case 6:
                    EnemyFire[EnemyShots].sx = 50;
                    EnemyFire[EnemyShots].sy = 0;
                    EnemyFire[EnemyShots].sw = 50
                    EnemyFire[EnemyShots].sh = 80;
                    break;
                case 5:
                    EnemyFire[EnemyShots].sx = 150;
                    EnemyFire[EnemyShots].sy = 0;
                    EnemyFire[EnemyShots].sw = 50
                    EnemyFire[EnemyShots].sh = 80;
                    break;
                case 4:
                    EnemyFire[EnemyShots].sx = 100;
                    EnemyFire[EnemyShots].sy = 0;
                    EnemyFire[EnemyShots].sw = 50
                    EnemyFire[EnemyShots].sh = 80;
                    break;
                case 3:
                    EnemyFire[EnemyShots].sx = 200;
                    EnemyFire[EnemyShots].sy = 0;
                    EnemyFire[EnemyShots].sw = 50
                    EnemyFire[EnemyShots].sh = 80;
                    break;
                case 2:
                    EnemyFire[EnemyShots].sx = 200;
                    EnemyFire[EnemyShots].sy = 0;
                    EnemyFire[EnemyShots].sw = 50
                    EnemyFire[EnemyShots].sh = 80;
                    break;
                default:

                    break;
            }
            EnemyShots++;

        }






    }
}

function drawEnemyLaser(){
    for (let i in EnemyFire) {
        ctx.drawImage(EnemyFire[i].img,EnemyFire[i].sx, EnemyFire[i].sy, EnemyFire[i].sw, EnemyFire[i].sh, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
        EnemyFire[i].y += EnemyFire[i].speed;
        if (EnemyFire[i].y >= 500) {
            deleteEnemyLaser(i);
        }
    }
}

function Death(Enemy, i){

    if (Enemy[i].Health < 1 || difficulty === 1) {

        createExplosion(i);
        points += 100 * scoreMultiplier;
        enemyExplode[i % 5].currentTime = 0;
        enemyExplode[i % 5].play();
        if (Math.ceil(Math.random() * chanceOfPower) <= 10) {
            generatePower(i, false);
        }
        checkIfAllDead--;
        deleteEnemy(i);
    }

}




function isPlayerHIT() {
    for (let i in EnemyFire) {  //let i=0;i<EnemyFire.length;i++
        if (
            EnemyFire[i].x + EnemyFire[i].w >= Player.x &&
            EnemyFire[i].x <= Player.x + Player.w &&
            EnemyFire[i].y + EnemyFire[i].h >= Player.y &&
            EnemyFire[i].y <= Player.y + Player.h
            ) {

            if (Player.unkillable === true) {
                deflectSound.currentTime = 0;
                deflectSound.play();
                deleteEnemyLaser(i);
            } else if (lives - 1 >= 1) {
                if (EnemyFire[i].typeFire === 5) {
                    Player.speed *= 0.4;
                    playerLaserSpeed *= 0.4;
                    setTimeout(function () {
                        Player.speed = 5;
                        playerLaserSpeed = 4;
                    }, 2000)
                }
                takeDamage();
                deleteEnemyLaser(i);
            } else {
                quit();
            }
        }
    }

    for (let i in Enemy) {


        if (
            Enemy[i].x + Enemy[i].w - 10 >= Player.x &&
            Enemy[i].x <= Player.x + Player.w  - 10 &&
            Enemy[i].y + Enemy[i].h  - 10>= Player.y &&
            Enemy[i].y <= Player.y + Player.h - 10
            ) {

            if (Enemy[i].typeEnemy !== 7){
                Player.y+=5;
            }

            if (Player.unkillable === true) {
                deflectSound.play();
            } else if (lives - 1 >= 1) {
                createExplosion(i,true);
                Player.y+=10;
                takeDamage();

                checkIfAllDead--;
                deleteEnemy(i);
            } else {
                quit();
            }
        }

    }
}


//PROJECTILE
function isHIT() {
    for (let j in Laser) {
        if (Laser[j].Active === true) {
            for (let i in Enemy) {
                if (Laser.hasOwnProperty(j)) {   //WEBSTORM COMPLAINS
                    if (
                        Laser[j].x + Laser[j].w >= Enemy[i].x &&
                        Laser[j].x <= Enemy[i].x + Enemy[i].w &&
                        Laser[j].y + Laser[j].h - Enemy[i].h / 3 >= Enemy[i].y &&
                        Laser[j].y <= Enemy[i].y + Enemy[i].h - Enemy[i].h / 3
                    ) {


                        if (Enemy[i].shieldMode === true || Enemy[i].descending === true) {
                            Laser[j].Active = false;
                            enemyHurtSound[j % 5].play();
                        } else if (Enemy[i].Health <= 1) {
                            //make random explosion at location of enemy
                            if (Enemy[i].typeEnemy === 5) {
                                if ((Math.ceil(Math.random() * 3) === 1)) {
                                    EnemyFire[EnemyShots] = new EnemyFireConstructor(
                                        15,
                                        25,
                                        Enemy[i].x + Enemy[i].w / 2 - 5,
                                        Enemy[i].y - 5,
                                        enemyProjectileSpeed / 2,
                                        Enemy[i].typeEnemy,
                                        150,
                                        0,
                                        50,
                                        80,
                                        enemyLaser);
                                    EnemyShots++;
                                }
                            } else if (Enemy[i].typeEnemy === 7) {
                                createExplosion(i, true);
                                noHitChallenge = true;
                                if (Enemy[i].w / 2 >= 30) {
                                    checkIfAllDead++;
                                    Enemy[checkIfAllDead] = new EnemyConstructor(
                                        Enemy[i].w / 2,
                                        Enemy[i].h / 2,
                                        Enemy[i].x + Enemy[i].w / 2 - 5,
                                        Enemy[i].y + Enemy[i].h / 2 - 5,
                                        enemySpeed / 2,
                                        true,
                                        false,
                                        EnemyHealth * 2,
                                        false,
                                        7,
                                        false,
                                        false,
                                        true,
                                        0,
                                        0,
                                        70,
                                        75,
                                        asteroid,
                                        -1.5
                                    );

                                    checkIfAllDead++;
                                    Enemy[checkIfAllDead] = Object.assign({}, Enemy[checkIfAllDead - 1]);
                                    Enemy[checkIfAllDead].xd = 1.5

                                    let x = Math.ceil(Math.random() * 6);


                                    for (let j = 0; j < x; j++) {
                                        Enemy[checkIfAllDead].sx += 75;
                                        Enemy[checkIfAllDead - 1].sx += 75;
                                    }

                                }

                            } else {

                                createExplosion(i, true);

                                if (Enemy[i].typeEnemy === 6 || difficulty === 3) {
                                    for (let i in Enemy) {
                                        if (Enemy[i].typeEnemy === 6) {
                                            Enemy[i].speed += 0.525;
                                        }
                                    }
                                }
                            }


                            points += 100 * scoreMultiplier;

                            //Laser lose health

                            if (Laser[j].Health < 2) {
                                Laser[j].Active = false;
                            }
                            Laser[j].Health--;

                            //play death sound
                            switch (Enemy[i].typeEnemy) {

                                case 5:
                                    summonHit[j % 5].currentTime = 0;
                                    summonHit[j % 5].play();
                                    break;

                                default:
                                    enemyExplode[j % 5].currentTime = 0;
                                    enemyExplode[j % 5].play();

                            }


                            //generate powerup
                            if (Math.ceil(Math.random() * chanceOfPower) <= 10) {
                                generatePower(i, false);
                            }
                            checkIfAllDead--;
                            deleteEnemy(i);

                        } else {
                            //Deal damage
                            Enemy[i].Health--;
                            Enemy[i].isDamaged = true;
                            if (Enemy[i].typeEnemy === 7) {
                                if (Laser[j].x + Laser[j].w >=  Enemy[i].x + Enemy[i].w/2  ){
                                    Enemy[i].xd = -1;
                                }
                                else{
                                    Enemy[i].xd = 1;
                                }
                                Enemy[i].y -= 5;
                            }

                            enemyHurtSound[j % 5].currentTime = 0;
                            enemyHurtSound[j % 5].play();

                            if (Laser[j].Health <= 1) {
                                Laser[j].Active = false;
                            }
                            Laser[j].Health--;

                        }

                    }
                }
            }
        }
    }

}

let backgroundChange = false;
let backgroundChange2 = false;

function ifLevelBeaten(ForceBoss = false){

    if (checkIfAllDead === 0 || ForceBoss === true) {

        if (noHitChallenge === false){
            points = 125 * numOfEnemies * scoreMultiplier

        }
        else{
            noHitChallenge = false;
        }

        readySetGo.currentTime = 0;
        readySetGo.play();

        levelEnemyMixer++;

        if (Level === 1 || Level === 2|| Level === 3 || Level === 4){
            backgroundChange = true;
            backgroundChange2 = true;
        }


        Level++;



        if (Level%waveTillBoss === 0 || ForceBoss === true){


            createBoss();

            if (Boss.typeBoss === 3) {
                BossMusic = new Audio();
                BossMusic.src = 'Sounds/MotherShip3Theme.mp3';
            }
            else{
                BossMusic = new Audio();
                BossMusic.src = 'Sounds/BossMusic.mp3';
            }


            BossMusic.currentTime = 0;
            BossMusic.play();


            StartTheGame.pause();
        }
        else {


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


            fillEnemies();

        }

        if (Level % 10 === 0){
            EnemyHealth++;
            numOfEnemies-=6;
        }

        printing1 = true;
        readySetGo.currentTime = 0;
    }

}



