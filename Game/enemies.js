
//CREATE ENEMIES



function EnemyConstructor(w,h,x,y,speed,Direction,firingMode,Health,isDamaged,isDead)
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
}


let numOfEnemies = 10;
let Enemy = [];  // new Array();
function fillEnemies(){
    let offsetXaxis = 10;
    let offsetYaxis = 10;
    for (let i=0;i<numOfEnemies;i++){
        if (i%8 === 0){
            offsetXaxis = 10;
            offsetYaxis += 50;
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
            false
        );
        offsetXaxis +=50;

    }
}

function drawEnemy(){
    for (let i in Enemy)
    {
        if(Enemy[i].isDead === false){
            if(Enemy[i].firingMode === true){
                ctx.drawImage(enemyshoots, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                setTimeout(function(){ Enemy[i].firingMode = false; }, 300);
            }
            else if (Enemy[i].isDamaged === true){
                ctx.drawImage(enemyHurt, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
                setTimeout(function(){ Enemy[i].isDamaged = false; }, 200);
            }
            else{
                ctx.drawImage(enemy, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
            }
        }

    }
}

function newEnemyPosition(){
    for (let i in Enemy) {
        if (Enemy[i].x + Enemy[i].w >= canvas.width) {
            Enemy[i].y += 30;
            Enemy[i].Direction = false;
        } else if (Enemy[i].x <= 0) {
            Enemy[i].y += 30;
            Enemy[i].Direction = true;
        }

        if (Enemy[i].Direction === true) {
            Enemy[i].x += Enemy[i].speed;
        } else {
            Enemy[i].x -= Enemy[i].speed;
        }
    }
}

//ENEMY PROJECTILE
let EnemyShots = 0;
let EnemyFire = [];

function EnemyFireConstructor(w,h,x,y,speed,Active)
{
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.Active = Active;
}

function enemyShoot() {
    for (let i in Enemy) {

        if ((Math.ceil(Math.random() * RateOfFire) <= 1)  && Enemy[i].isDead===false) {

            EnemyFire[EnemyShots] = new EnemyFireConstructor(
                10,
                20,
                Enemy[i].x + Enemy[i].w / 2 - 5,
                Enemy[i].y,enemyProjectileSpeed,
                true);
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
            ctx.drawImage(enemyLaser, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
        }
    }
}

function newEnemyLaserPosition(){
    for (let i in EnemyFire){
        EnemyFire[i].y+=EnemyFire[i].speed;
    }
}


function isPlayerHIT(){
    for (let i in EnemyFire){  //let i=0;i<EnemyFire.length;i++
        if (
            EnemyFire[i].x >= Player.x &&
            EnemyFire[i].x <= Player.x + Player.w &&
            EnemyFire[i].y +  EnemyFire[i].h >= Player.y &&
            EnemyFire[i].y <= Player.y + Player.h &&
            EnemyFire[i].Active === true){

            if (unkillable === true){
                EnemyFire[i].Active=false;
                deflectSound.currentTime = 0;
                deflectSound.play();
            }
            else if (lives - 1 >= 1) {
                EnemyFire[i].Active=false;
                takeDamage();
            }
            else{
                youLOST();
            }
        }
    }

    for (let i=0;i<numOfEnemies;i++){
        if (Enemy[i].y >= canvas.height-30 && Enemy[i].isDead === false){
            youLOST();
        }
    }


}


//PROJECTILE
function isHIT() {
    for (let j in Laser) {
        for (let i in Enemy) {
            if (Laser.hasOwnProperty(j)) {   //WEBSTORM COMPLAINS
                if (Enemy[i].isDead === false &&
                    Laser[j].x >= Enemy[i].x &&
                    Laser[j].x <= Enemy[i].x + Enemy[i].w &&
                    Laser[j].y + Laser[j].h >= Enemy[i].y &&
                    Laser[j].y <= Enemy[i].y + Enemy[i].h &&
                    Laser[j].Active === true) {

                    if (Enemy[i].Health <= 1) {
                        //make random explosion at location of enemy
                        createExplosion(i);
                        Enemy[i].isDead = true;
                        points += 100 * scoreMultiplier;

                        //Laser lose health
                        if (Laser[j].Health <= 1) {
                            Laser[j].Active = false;
                        }
                        Laser[j].Health--;

                        //play death sound
                        enemyExplode[j % 5].play();

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



function ifLevelBeaten(){
    let checkIfAllDead = false;
    for (let i in Enemy){
        if (Enemy[i].isDead===false){
            checkIfAllDead = true;
        }
    }

    if (checkIfAllDead === false) {

        rememberAmountOfShots = amountOfShots;
        rememberNukes = nukes;
        rememberPlayerBulletCount = playerBulletCount;

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

