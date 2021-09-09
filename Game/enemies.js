
//CREATE ENEMIES

function EnemyConstructor(w,h,x,y,speed,Direction,firingMode,Health,isDamaged,isDead,typeEnemy,lowerMode,shields)
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
}


let numOfEnemies = 10;
let Enemy = [];  // new Array();
function fillEnemies(){
    let offsetXaxis = 10;
    let offsetYaxis = 10;
    let typeEnemy;
    if (Level <= 15){
        typeEnemy = Math.ceil(Math.random() * 5);

    }
    else{
        typeEnemy = Math.ceil(Math.random() * 6);
    }
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
            false
        );



        offsetXaxis +=50;

    }
}

function drawEnemy(){
    for (let i in Enemy)
    {
        if(Enemy[i].isDead === false){

            let fE;
            let dE;
            let eE;

            switch (Enemy[i].typeEnemy){
                case 6:
                    fE = enemyshoots5;
                    dE = enemyHurt5;
                    eE = enemy5;
                    break;
                case 5:
                    fE = boss3FireSleep;
                    dE = boss3FireHurt;
                    eE = boss3Fire;
                    break;
                case 4:
                    fE = enemyshoots4;
                    dE = enemyHurt4;
                    eE = enemy4;
                    break;
                case 3:
                    fE = enemyshoots3;
                    dE = enemyHurt3;
                    eE = enemy3;
                    break;
                case 2:
                    fE = enemyshoots2;
                    dE = enemyHurt2;
                    eE = enemy2;
                    break;
                default:
                    fE = enemyshoots;
                    dE = enemyHurt;
                    eE = enemy;
                    break;
            }

            if (Enemy[i].typeEnemy === 6 && Math.ceil(Math.random() * 380) === 1){
                Enemy[i].shieldMode = true;
                setTimeout(function () {
                    Enemy[i].shieldMode = false;
                }, 1900);
            }

            if
                    (Enemy[i].firingMode === true)
                {
                    ctx.drawImage(fE, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                    setTimeout(function () {
                        Enemy[i].firingMode = false;
                    }, 350);
                }
            else if (Enemy[i].shieldMode === true){
                ctx.drawImage(enemyshield5, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
            }
            else if (Enemy[i].isDamaged === true) {
                        ctx.drawImage(dE, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                        setTimeout(function () {
                            Enemy[i].isDamaged = false;
                        }, 200);
                    }
            else{
                        ctx.drawImage(eE, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                    }


        }

    }
}

function newEnemyPosition(){
    for (let i in Enemy) {


        if (Enemy[i].x + Enemy[i].w > canvas.width && Enemy[i].Direction === true) {
            if (Enemy[i].typeEnemy === 1 || Enemy[i].typeEnemy === 4 || Enemy[i].typeEnemy === 5 || Enemy[i].typeEnemy === 6){

                    Enemy[i].lowerMode = true;
                setTimeout(function () {
                    Enemy[i].lowerMode = false;
                }, 150)


            }

            Enemy[i].Direction = false;
        } else if (Enemy[i].x < 0 && Enemy[i].Direction === false) {
            if (Enemy[i].typeEnemy === 1 || Enemy[i].typeEnemy === 4 || Enemy[i].typeEnemy === 5 || Enemy[i].typeEnemy === 6){

                    Enemy[i].lowerMode = true;
                setTimeout(function () {
                    Enemy[i].lowerMode = false;
                }, 150)

            }
            Enemy[i].Direction = true;
        }

        if (Enemy[i].Direction === true) {
            switch (Enemy[i].typeEnemy){
                case 6:
                    if (Enemy[i].lowerMode === true){
                        Enemy[i].y += 3;
                    }Enemy[i].x += Enemy[i].speed/3;
                    break;

                case 4:
                    Enemy[i].x += Enemy[i].speed/3;
                    if (Enemy[i].lowerMode === true){
                        Enemy[i].y += 3;
                    }

                    break;
                case 3:
                    Enemy[i].y += Enemy[i].speed/10;
                    Enemy[i].x += Enemy[i].speed/1.5;
                    break;
                case 2:
                    if (Enemy[i].x >= canvas.width/2){
                        Enemy[i].y += Enemy[i].speed/4;
                    }
                    else{
                        Enemy[i].y -= Enemy[i].speed/6;
                    }
                    Enemy[i].y += Enemy[i].speed/18;

                case 1:
                case 5:
                    if (Enemy[i].lowerMode === true){
                        Enemy[i].y += 3;
                    }
                default:
                    Enemy[i].x += Enemy[i].speed;
                    break;


            }
        } else {
            switch (Enemy[i].typeEnemy){
                case 6:
                    if (Enemy[i].lowerMode === true){
                        Enemy[i].y += 3;
                    }
                    Enemy[i].x -= Enemy[i].speed/3;
                    break;
                case 4:
                    Enemy[i].x -= Enemy[i].speed/3;
                    if (Enemy[i].lowerMode === true){
                        Enemy[i].y += 3;
                    }
                    break;
                case 3:
                    Enemy[i].x -= Enemy[i].speed*3;
                    break;
                case 2:
                    if (Enemy[i].x >= canvas.width/2){
                        Enemy[i].y -= Enemy[i].speed/4;
                    }
                    else{
                        Enemy[i].y += Enemy[i].speed/6;
                    }
                    Enemy[i].y += Enemy[i].speed/18;
                case 1:
                case 5:
                    if (Enemy[i].lowerMode === true){
                        Enemy[i].y += 3;
                    }
                default:
                    Enemy[i].x -= Enemy[i].speed;
                    break;
            }
        }
    }
}

//ENEMY PROJECTILE
let EnemyShots = 0;
let EnemyFire = [];

function EnemyFireConstructor(w,h,x,y,speed,Active,typeFire)
{
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.Active = Active;
    this.typeFire = typeFire
}

function enemyShoot() {
    for (let i in Enemy) {

        if ((Math.ceil(Math.random() * RateOfFire) <= 1)  && Enemy[i].isDead===false && Enemy[i].shieldMode === false) {

            EnemyFire[EnemyShots] = new EnemyFireConstructor(
                10,
                20,
                Enemy[i].x + Enemy[i].w / 2 - 5,
                Enemy[i].y,enemyProjectileSpeed,
                true,
                Enemy[i].typeEnemy);
            Enemy[i].firingMode = true;
            EnemyShots++;
        }

    }
}

function drawEnemyLaser(){
    for (let i in EnemyFire) {
        if (EnemyFire[i].y === 500) {
            EnemyFire[i].Active = false;
        }
        if (EnemyFire[i].Active === true) {
            switch(EnemyFire[i].typeFire){
                case 6:
                    ctx.drawImage(enemyLaser5, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
                    break;
                case 5:
                    ctx.drawImage(boss3FireAttack, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
                    break;
                case 4:
                    ctx.drawImage(boss2Fire, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
                    break;
                case 3:
                    ctx.drawImage(enemyLaser, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
                    break;
                case 2:
                    ctx.drawImage(bossLaser, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
                    break;
                default:
                    ctx.drawImage(enemyLaser, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
                    break;
            }

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
            EnemyFire[i].x >= Player.x &&
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
                youLOST();
            }
        }
    }

    for (let i in Enemy) {
        if (Enemy[i].y >= canvas.height - 30 && Enemy[i].isDead === false) {
            youLOST();
        }

        if (Enemy[i].isDead === false &&
            Enemy[i].x >= Player.x &&
            Enemy[i].x <= Player.x + Player.w &&
            Enemy[i].y + Enemy[i].h >= Player.y &&
            Enemy[i].y <= Player.y + Player.h
            ) {

            if (Player.unkillable === true) {
                deflectSound.play();
            } else if (lives - 1 >= 1) {
                Enemy[i].isDead = true;
                takeDamage();
            } else {
                youLOST();
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
                    Laser[j].x >= Enemy[i].x &&
                    Laser[j].x <= Enemy[i].x + Enemy[i].w &&
                    Laser[j].y + Laser[j].h >= Enemy[i].y &&
                    Laser[j].y <= Enemy[i].y + Enemy[i].h
                ) {

                    if (Enemy[i].shieldMode === true) {
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
                                    Enemy[i].typeEnemy);
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
                                summonHit[j % 5].play();
                                break;

                            default:
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
                        enemyHurtSound[j % 5].play();


                    }

                }
            }
        }
    }
    }
}



function ifLevelBeaten(){
    let checkIfAllDead = false;
    for (let i in Enemy){
        if (Enemy[i].isDead===false){
            checkIfAllDead = true;
        }
    }

    if (checkIfAllDead === false) {

        rememberAmountOfShots = Player.amountOfShots;
        rememberNukes = nukes;
        rememberPlayerBulletCount = Player.bulletCount;
        rememberSharpness = Player.sharpness;

        Level++;



        if (Level%waveTillBoss === 0 ){

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

            Laser = [];
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

//ENEMY DEATH EXPLOSIONS


let numBooms = 0;
let Boom = [];

function BoomConstructor(w,h,x,y,Active,typeOfBoom)
{
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.Active = Active;
    this.typeOfBoom = typeOfBoom;
}

function createExplosion(eX){
    Boom[numBooms] = new BoomConstructor(
        40,
        40,
        Enemy[eX].x + Enemy[eX].w / 2 - 5,
        Enemy[eX].y,
        true,
        Math.ceil(Math.random() * 2));

    numBooms++;
}

function drawBoom(){
    for (let i in Boom){

        if (Boom[i].Active === true) {

            switch(Boom[i].typeOfBoom) {
                case 1:
                    ctx.drawImage(enemyDeath1, Boom[i].x, Boom[i].y, Boom[i].w, Boom[i].h);
                    break;
                case 2:
                    ctx.drawImage(enemyDeath2, Boom[i].x, Boom[i].y, Boom[i].w, Boom[i].h);
                    break;
                default:
                    ctx.drawImage(enemyDeath1, Boom[i].x, Boom[i].y, Boom[i].w, Boom[i].h);
            }

            setTimeout(function(){
                Boom[i].Active = false;
            }, 300);

        }
    }
}

