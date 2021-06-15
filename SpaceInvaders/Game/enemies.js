
//CREATE ENEMIES
let numOfEnemies = 10;
let Enemy = [];
function fillEnemies(){
    let offsetXaxis = 10;
    let offsetYaxis = 10;
    for (let i=0;i<numOfEnemies;i++){
        if (i%8 === 0){
            offsetXaxis = 10;
            offsetYaxis += 50;
        }
        Enemy[i] = {
            w:30,
            h:30,
            x:offsetXaxis,
            y:offsetYaxis,
            speed:enemySpeed,
            Direction:true,
            firingMode: false,
            Health:EnemyHealth,
            isDamaged:false,
            isDead: false
        }
        offsetXaxis +=50;

    }
}

function drawEnemy(){
    for (let i=0;i<numOfEnemies;i++)
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
    for (let i=0;i<numOfEnemies;i++) {
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
let InactiveShots = 0;
let EnemyFire = [];

function enemyShoot() {
    for (let i = 0; i < numOfEnemies; i++) {

        if ((Math.ceil(Math.random() * RateOfFire) <= 1)  && Enemy[i].isDead===false) {

            EnemyFire[EnemyShots] = {
                w: 10,
                h: 20,
                x: 0,
                y: 0,
                speed: enemyProjectileSpeed,
                Active: false
            }


            EnemyFire[EnemyShots].x = Enemy[i].x + Enemy[i].w / 2 - 5;
            EnemyFire[EnemyShots].y = Enemy[i].y;
            EnemyFire[EnemyShots].Active = true;
            Enemy[i].firingMode = true;

            EnemyShots++;
        }

    }
}
function drawEnemyLaser(){

    for (let i=InactiveShots;i<EnemyShots;i++) {
        if (EnemyFire[i].y === 500) {
            EnemyFire[i].Active = false;
        }
        if (EnemyFire[i].Active === true) {
            ctx.drawImage(enemyLaser, EnemyFire[i].x, EnemyFire[i].y, EnemyFire[i].w, EnemyFire[i].h);
        }
    }
}
function newEnemyLaserPosition(){
    for (let i=InactiveShots;i<EnemyShots;i++){
        EnemyFire[i].y+=EnemyFire[i].speed;
    }
}


function isPlayerHIT(){
    for (let i=InactiveShots;i<EnemyShots;i++){
        if (
            EnemyFire[i].x >= Player.x &&
            EnemyFire[i].x <= Player.x + Player.w &&
            EnemyFire[i].y +  EnemyFire[i].w >= Player.y &&
            EnemyFire[i].y + EnemyFire[i].w <= Player.y + Player.h &&
            EnemyFire[i].Active === true &&
            unkillable === false){
            if (lives - 1 >= 1) {
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
    for (let j=0;j<LaserShot;j++) {
        for (let i = 0; i < numOfEnemies; i++) {
            if (     Enemy[i].isDead === false &&
                Laser[j].x >= Enemy[i].x &&
                Laser[j].x <= Enemy[i].x + Enemy[i].w &&
                Laser[j].y >= Enemy[i].y && Laser[j].y <= Enemy[i].y + Enemy[i].h &&
                Laser[j].Active === true )
            {

                if (Enemy[i].Health <= 1){
                    createExplosion(i);
                    Enemy[i].isDead = true;
                    points += 100 * scoreMultiplier;


                    if (Laser[j].Health <= 1) {
                        Laser[j].Active = false;
                    }
                    Laser[j].Health--;

                    enemyExplode[j%5].play();
                    if (Math.ceil(Math.random() * chanceOfPower) <=10){
                        generatePower(i,false);
                    }
                }
                else{
                    Enemy[i].Health--;
                    Enemy[i].isDamaged = true;

                    if (Laser[j].Health <= 1) {
                        Laser[j].Active = false;
                    }
                    Laser[j].Health--;
                    enemyHurtSound[j%5].play();
                }

            }
        }
    }
}

function drawBoom(){

    for (let i=0;i<numBooms;i++){
        if (Boom[i].Active === true) {
            if ( Boom[i].typeOfBoom === 1){
                ctx.drawImage(enemyDeath1, Boom[i].x, Boom[i].y, Boom[i].w, Boom[i].h);
            }
            else if
            ( Boom[i].typeOfBoom === 2){
                ctx.drawImage(enemyDeath2, Boom[i].x, Boom[i].y, Boom[i].w, Boom[i].h);
            }
            setTimeout(function(){ Boom[i].Active = false; }, 300);

        }
    }


}


function ifLevelBeaten(){
    let checkIfAllDead = false;
    for (let i=0;i<numOfEnemies;i++){
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
            LaserShot = 0;
            EnemyShots = 0;
            InactiveShots = 0;
            BossShots = 0;
            BossRadialShots = 0;

            fillEnemies();

        }

        if (Level % 10 === 0){
            EnemyHealth++;
            numOfEnemies-=6;
        }


    }




}



let numBooms = 0;
let Boom = [];
function createExplosion(eX){
    Boom[numBooms] = {
        w: 40,
        h: 40,
        x: 0,
        y: 0,
        Active: true,
        typeOfBoom: 1
    }
    Boom[numBooms].x = Enemy[eX].x + Enemy[eX].w / 2 - 5;
    Boom[numBooms].y = Enemy[eX].y;
    if (Math.ceil(Math.random() * 2) <= 1){
        Boom[numBooms].typeOfBoom = 1
    }
    else{
        Boom[numBooms].typeOfBoom = 2;
    }
    numBooms++;

}

