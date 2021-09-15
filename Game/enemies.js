
//CREATE ENEMIES

function EnemyConstructor(w,h,x,y,speed,Direction,firingMode,Health,isDamaged,isDead,typeEnemy,lowerMode,shields,descending,sx,sy,sw,sh,img)
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
    this.isDead = isDead;
    this.typeEnemy = typeEnemy;
    this.lowerMode = false;
    this.shieldMode = false;
    this.descending = true;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.img = img;
}


let numOfEnemies = 10;
let Enemy = [];  // new Array();
let levelEnemyMixer = 1;
function fillEnemies(){
    let offsetXaxis = 10;
    let offsetYaxis = -310;

    if (levelEnemyMixer > 6){
        levelEnemyMixer = 1;
    }
    let typeEnemy = levelEnemyMixer;

    let typeArray = [Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 6)]

    for (let i=0;i<numOfEnemies;i++){
        let TotalHealth = EnemyHealth;
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

        if (typeEnemy === 4){
            TotalHealth = EnemyHealth * 2;
        }
        else if (typeEnemy === 5){
            TotalHealth = Math.ceil(EnemyHealth/2);
        }

        Enemy[i] = new EnemyConstructor(
            30,
            30,
            offsetXaxis,
            offsetYaxis,
            enemySpeed,
            true,
            false,
            TotalHealth,
            false,
            false,
            typeEnemy,
            false,
            false,
            true,
            0,
            0,
            35,
            35,
            enemy
        );



        offsetXaxis +=50;

    }
    for (let i in Enemy) {
        switch (Enemy[i].typeEnemy) {
            case 6:
                Enemy[i].sx = 140;
                Enemy[i].sy = 0;
                Enemy[i].sw = 35
                Enemy[i].sh = 35;
                break;
            case 5:
                Enemy[i].sx = 175;
                Enemy[i].sy = 0;
                Enemy[i].sw = 35
                Enemy[i].sh = 35;
                break;
            case 4:
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

function drawEnemy(){
    for (let i in Enemy)
    {
        if(Enemy[i].isDead === false){

            if (Enemy[i].typeEnemy === 6 && Math.ceil(Math.random() * 380) === 1){
                Enemy[i].shieldMode = true;
                setTimeout(function () {
                    Enemy[i].shieldMode = false;
                }, 1900);
            }

            if
                    (Enemy[i].firingMode === true)
                {
                    ctx.drawImage(Enemy[i].img,Enemy[i].sx, Enemy[i].sy+37, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                    setTimeout(function () {
                        Enemy[i].firingMode = false;
                    }, 350);
                }
            else if (Enemy[i].shieldMode === true){
                ctx.drawImage(Enemy[i].img,Enemy[i].sx, Enemy[i].sy+107, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
            }
            else if (Enemy[i].isDamaged === true) {
                ctx.drawImage(Enemy[i].img,Enemy[i].sx, Enemy[i].sy+75, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                        setTimeout(function () {
                            Enemy[i].isDamaged = false;
                        }, 200);
                    }
            else{
                        ctx.drawImage(Enemy[i].img,Enemy[i].sx, Enemy[i].sy, Enemy[i].sw, Enemy[i].sh, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                    }


        }

    }
}

function newEnemyPosition(){

    let offsetXaxis = 10;
    let offsetYaxis = 10;

    for (let i in Enemy) {

        if (Enemy[i].descending === true) {
            Enemy[i].y += 5;

            if (i % 8 === 0) {
                offsetXaxis = 10;
                offsetYaxis += 50;
            }

            if (Enemy[i].y >= offsetYaxis) {
                Enemy[i].descending = false;
            }

        } else {


            if (Enemy[i].x + Enemy[i].w > canvas.width && Enemy[i].Direction === true) {
                if (Enemy[i].typeEnemy === 1 || Enemy[i].typeEnemy === 4 || Enemy[i].typeEnemy === 5 || Enemy[i].typeEnemy === 6) {

                    Enemy[i].lowerMode = true;
                    setTimeout(function () {
                        Enemy[i].lowerMode = false;
                    }, 150)


                }

                Enemy[i].Direction = false;
            } else if (Enemy[i].x < 0 && Enemy[i].Direction === false) {
                if (Enemy[i].typeEnemy === 1 || Enemy[i].typeEnemy === 4 || Enemy[i].typeEnemy === 5 || Enemy[i].typeEnemy === 6) {

                    Enemy[i].lowerMode = true;
                    setTimeout(function () {
                        Enemy[i].lowerMode = false;
                    }, 150)

                }
                Enemy[i].Direction = true;
            }

            if (Enemy[i].Direction === true) {
                switch (Enemy[i].typeEnemy) {
                    case 6:
                        if (Enemy[i].lowerMode === true) {
                            Enemy[i].y += 3;
                        }
                        Enemy[i].x += Enemy[i].speed / 3;
                        break;

                    case 4:
                        Enemy[i].x += Enemy[i].speed / 3;
                        if (Enemy[i].lowerMode === true) {
                            Enemy[i].y += 3;
                        }

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

                    case 1:
                    case 5:
                        if (Enemy[i].lowerMode === true) {
                            Enemy[i].y += 3;
                        }
                    default:
                        Enemy[i].x += Enemy[i].speed;
                        break;


                }
            } else {
                switch (Enemy[i].typeEnemy) {
                    case 6:
                        if (Enemy[i].lowerMode === true) {
                            Enemy[i].y += 3;
                        }
                        Enemy[i].x -= Enemy[i].speed / 3;
                        break;
                    case 4:
                        Enemy[i].x -= Enemy[i].speed / 3;
                        if (Enemy[i].lowerMode === true) {
                            Enemy[i].y += 3;
                        }
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
                    case 1:
                    case 5:
                        if (Enemy[i].lowerMode === true) {
                            Enemy[i].y += 3;
                        }
                    default:
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

function EnemyFireConstructor(w,h,x,y,speed,Active,typeFire,sx,sy,sw,sh,img)
{
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.Active = Active;
    this.typeFire = typeFire;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.img = img;
}

function enemyShoot() {
    for (let i in Enemy) {

        if ( Enemy[i].isDead===false  && (Math.ceil(Math.random() * RateOfFire) <= 1) && Enemy[i].shieldMode === false && Enemy[i].descending === false) {

            EnemyFire[EnemyShots] = new EnemyFireConstructor(
                10,
                20,
                Enemy[i].x + Enemy[i].w / 2 - 5,
                Enemy[i].y,enemyProjectileSpeed,
                true,
                Enemy[i].typeEnemy,
                0,
                0,
                50,
                80,
                enemyLaser)
            ;
            Enemy[i].firingMode = true;
            EnemyShots++;
        }

    }

    for (let i in EnemyFire) {
        switch(EnemyFire[i].typeFire){
            case 6:
                EnemyFire[i].sx = 50;
                EnemyFire[i].sy = 0;
                EnemyFire[i].sw = 50
                EnemyFire[i].sh = 80;
                break;
            case 5:
                EnemyFire[i].sx = 150;
                EnemyFire[i].sy = 0;
                EnemyFire[i].sw = 50
                EnemyFire[i].sh = 80;
                break;
            case 4:
                EnemyFire[i].sx = 100;
                EnemyFire[i].sy = 0;
                EnemyFire[i].sw = 50
                EnemyFire[i].sh = 80;
                break;
            case 3:
                EnemyFire[i].sx = 200;
                EnemyFire[i].sy = 0;
                EnemyFire[i].sw = 50
                EnemyFire[i].sh = 80;
                break;
            case 2:
                EnemyFire[i].sx = 200;
                EnemyFire[i].sy = 0;
                EnemyFire[i].sw = 50
                EnemyFire[i].sh = 80;
                break;
            default:
                EnemyFire[i].sx = 0;
                EnemyFire[i].sy = 0;
                EnemyFire[i].sw = 50
                EnemyFire[i].sh = 80;
                break;
        }

    }
}

function drawEnemyLaser(){
    for (let i in EnemyFire) {
        if (EnemyFire[i].y >= 500) {
            EnemyFire[i].Active = false;
        }
        else if ( EnemyFire[i].Active === true){
            ctx.drawImage(EnemyFire[i].img,EnemyFire[i].sx, EnemyFire[i].sy, EnemyFire[i].sw, EnemyFire[i].sh, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
        }

    }
}

function newEnemyLaserPosition(){
    for (let i in EnemyFire){
        EnemyFire[i].y+=EnemyFire[i].speed;
    }
}


function isPlayerHIT() {
    for (let i in EnemyFire) {  //let i=0;i<EnemyFire.length;i++
        if (EnemyFire[i].Active === true &&
            EnemyFire[i].x + EnemyFire[i].w >= Player.x &&
            EnemyFire[i].x <= Player.x + Player.w &&
            EnemyFire[i].y + EnemyFire[i].h >= Player.y &&
            EnemyFire[i].y <= Player.y + Player.h
            ) {

            if (Player.unkillable === true) {
                EnemyFire[i].Active = false;
                deflectSound.currentTime = 0;
                deflectSound.play();
            } else if (lives - 1 >= 1) {
                if (EnemyFire[i].typeFire === 5) {
                    Player.speed *= 0.4;
                    playerLaserSpeed *= 0.4;
                    setTimeout(function () {
                        Player.speed = 5;
                        playerLaserSpeed = 4;
                    }, 2000)
                }


                EnemyFire[i].Active = false;
                takeDamage();
            } else {
                quit();
            }
        }
    }

    for (let i in Enemy) {
        if (Enemy[i].y >= canvas.height - 30 && Enemy[i].isDead === false) {
            quit();
        }

        if (Enemy[i].isDead === false &&
            Enemy[i].x + Enemy[i].w >= Player.x &&
            Enemy[i].x <= Player.x + Player.w &&
            Enemy[i].y + Enemy[i].h >= Player.y &&
            Enemy[i].y <= Player.y + Player.h
            ) {
                Player.y+=4.5;
            if (Player.unkillable === true) {
                deflectSound.currentTime = 0;
                deflectSound.play();
            } else if (lives - 1 >= 1) {
                Enemy[i].isDead = true;
                takeDamage();
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
                if (Enemy[i].isDead === false &&
                    Laser[j].x + Laser[j].w >= Enemy[i].x &&
                    Laser[j].x <= Enemy[i].x + Enemy[i].w &&
                    Laser[j].y + Laser[j].h >= Enemy[i].y &&
                    Laser[j].y <= Enemy[i].y + Enemy[i].h
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
                                    true,
                                    Enemy[i].typeEnemy,
                                    150,
                                    0,
                                    50,
                                    80,
                                    enemyLaser);
                                Enemy[i].firingMode = true;
                                EnemyShots++;
                            }
                        } else {
                            createExplosion(i);
                            if (Enemy[i].typeEnemy === 6 || difficulty === 3) {
                                for (let i in Enemy) {
                                    if (Enemy[i].isDead === false && Enemy[i].typeEnemy === 6) {
                                        Enemy[i].speed += 0.525;
                                    }
                                }
                            }
                        }



                        Enemy[i].isDead = true;
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
                    } else {
                        //Deal damage
                        Enemy[i].Health--;
                        Enemy[i].isDamaged = true;

                        //Laser lose health
                        if (Laser[j].Health <= 1) {
                            Laser[j].Active = false;
                        }
                        Laser[j].Health--;

                        //play damage sound
                        enemyHurtSound[j % 5].currentTime = 0;
                        enemyHurtSound[j % 5].play();


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

    let checkIfAllDead = false;
    for (let i in Enemy){
        if (Enemy[i].isDead===false){
            checkIfAllDead = true;
        }
    }

    if (checkIfAllDead === false || ForceBoss === true) {

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



