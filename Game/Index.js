    //MAIN SETUP
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    const image =  document.getElementById('Player');
    const image2 =  document.getElementById('PlayerLevel2');
    const image3 =  document.getElementById('PlayerLevel3');

    const enemy =  document.getElementById('Enemy');
    const enemyHurt =  document.getElementById('EnemyHurt');

    const motherShip =  document.getElementById('MotherShip');
    const motherShipHurt =  document.getElementById('MotherShipHurt');
    const bossLaser =  document.getElementById('BossLaser');

    const motherShip2 =  document.getElementById('MotherShip2');
    const motherShip2Hurt =  document.getElementById('MotherShip2Hurt');
    const motherShip2Heal =  document.getElementById('MotherShip2Heal');
    const motherShip2Angry =  document.getElementById('MotherShip2Angry');
    const boss2Fire =  document.getElementById('Boss2Fire');

    const motherShip3 =  document.getElementById('MotherShip3');
    const motherShip3Hurt =  document.getElementById('MotherShip3Hurt');
    const motherShip3Protected =  document.getElementById('MotherShip3Protected');
    const motherShip3Angry =  document.getElementById('MotherShip3Angry');
    const motherShip3Heal =  document.getElementById('MotherShip3Heal');
    const boss3Fire =  document.getElementById('Boss3Fire');
    const boss3FireHurt =  document.getElementById('Boss3FireHurt');
    const boss3FireSleep =  document.getElementById('Boss3FireSleep');
    const boss3FireAngry =  document.getElementById('Boss3FireAngry');

    const enemyshoots =  document.getElementById('EnemyShooting');
    const laser = document.getElementById('Laser');
    const laserPiercing1 = document.getElementById('LaserPiercing1');
    const laserPiercing2 = document.getElementById('LaserPiercing2');
    const enemyLaser = document.getElementById('EnemyLaser');
    const invic = document.getElementById('InviciBubble');
    const lifeUP = document.getElementById('LifeUP');
    const bombUP = document.getElementById('BombUP');
    const fireUP = document.getElementById('FirePower');
    const shipUP = document.getElementById('ShipUP');
    const enemyDeath1 = document.getElementById('EnemyExplode1');
    const enemyDeath2 = document.getElementById('EnemyExplode2');
    const background = document.getElementById( 'Space');
    const backgroundNuked = document.getElementById( 'SpaceNuked');

    let maxLives;
    let points = 0;
    let lives = 3;
    let revives = 3;
    let isGameRunning = false;
    let unkillable = false;
    let RateOfFire = 300;   //Enemy Rate of Fire
    let enemySpeed = 3;
    let scoreMultiplier = 1;
    let enemyProjectileSpeed = 3;
    let Level = 1;
    let amountOfShots = 1;
    let rememberAmountOfShots;
    let chanceOfPower = 60;
    let gainLifePerStage = 0;
    let waveTillBoss = 5;
    let playerBulletCount = 0;
    let rememberPlayerBulletCount;
    let EnemyHealth = 1;
    let BossHealthBoost = 20;
    let startingLaserHealth = 1;
    let nukes;
    let rememberNukes;
    let isNuked = false;
    let difficulty = 1; //1- Easy  2-Medium   3-Hard

    //SOUNDS
    let StartTheGame = new Audio();
    StartTheGame.src = 'Sounds/SpaceAmbience.mp3';
    let BossMusic = new Audio();
    BossMusic.src = 'Sounds/BossMusic.mp3';
    let Boss3Music = new Audio();
    Boss3Music.src = 'Sounds/MotherShip3Theme.mp3';

    let deathSound = new Audio();
    deathSound.src = 'Sounds/death.wav';
    let motherShipDeathSound = new Audio();
    motherShipDeathSound.src = 'Sounds/MotherShipDeath.mp3';
    let lifeUPSound = new Audio();
    lifeUPSound.src = 'Sounds/lifeUP.mp3';
    let powerUPSound = new Audio();
    powerUPSound.src = 'Sounds/powerUP.mp3';
    let shipUPSound = new Audio();
    shipUPSound.src = 'Sounds/shipUP.mp3';

    let shootLaser  = [];
    let shootLaser2  = [];
    let enemyExplode = [];
    let enemyHurtSound = [];
    let motherShipHit = [];
    let motherShip3Hit = [];
    let summonHit = [];
    let motherShipHeal = [];
    for (let i=0;i<5;i++){

        motherShipHit[i] = new Audio();
        motherShipHit[i].src = 'Sounds/MotherShipHit.mp3';

        motherShip3Hit[i] = new Audio();
        motherShip3Hit[i].src = 'Sounds/MotherShip3Hit.mp3';

        summonHit[i] = new Audio();
        summonHit[i].src = 'Sounds/SummonHit.mp3';

        motherShipHeal[i] = new Audio();
        motherShipHeal[i].src = 'Sounds/MotherShipHeal.mp3';
        shootLaser[i] = new Audio();
        shootLaser[i].src = 'Sounds/shootLaser.mp3';
        shootLaser2[i] = new Audio();
        shootLaser2[i].src = 'Sounds/shootLaser2.mp3';
        enemyExplode[i] = new Audio();
        enemyExplode[i].src = 'Sounds/boom.mp3';
        enemyHurtSound[i] = new Audio();
        enemyHurtSound[i].src = 'Sounds/enemyHurt.mp3';


    }


    //GAME OVER!
    function youLOST(){
        bossMode = false;
        StartTheGame.loop = false;
        BossMusic.pause();
        StartTheGame.pause();
        StartTheGame.currentTime = 0;
        BossMusic.currentTime = 0;
        isGameRunning = false;
        alert("GAME OVER");
        myButton.style.display = "block";
        myOptions.style.display = "block";
        myContinue.style.display = "block";
        if (Level === 1 || difficulty === 3) {
            myContinue.style.display = "none";
        }

    }

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

    //ENEMY LOOT
    let amountOfPowerUPs = 0;
    let PowerUP = [];

    function isPowerUP(){
        for (let i=0;i<amountOfPowerUPs;i++){
            if (
                PowerUP[i].x >= Player.x-5 &&
                PowerUP[i].x <= Player.x + Player.w &&
                PowerUP[i].y +PowerUP[i].w >= Player.y &&
                PowerUP[i].y <= Player.y + Player.h &&
                PowerUP[i].Active === true){

                if (PowerUP[i].typeOfPower === 1){
                    if (lives+1 <= maxLives) {
                        points += 200;
                        lives++;
                    }
                    points += 150;
                    lifeUPSound.currentTime = 0;
                    lifeUPSound.play();
                    PowerUP[i].Active = false;

                }
                else if (PowerUP[i].typeOfPower === 2){
                    powerUPSound.currentTime = 0;
                    powerUPSound.play();
                    if (amountOfShots+1 <= 6){
                        amountOfShots= amountOfShots +1;
                        points+=100;
                    }
                    else{
                        points+=250;
                    }
                    PowerUP[i].Active = false;
                }
                else if (PowerUP[i].typeOfPower === 3){
                    points+=150;
                    shipUPSound.currentTime = 0;
                    shipUPSound.play();
                    playerBulletCount +=2;
                    if (playerBulletCount > 4){
                        playerBulletCount = 4;
                    }
                    PowerUP[i].Active = false;

                }
                else if (PowerUP[i].typeOfPower === 4){
                        points+=50;
                        powerUPSound.currentTime = 0;
                        powerUPSound.play();
                        nukes++;
                        PowerUP[i].Active = false;
                }
            }
        }
    }
    function generatePower(eX,isBossSummon){
        PowerUP[amountOfPowerUPs] = {
            w: 15,
            h: 15,
            x: 0,
            y: 0,
            speed: 2,
            Active: true,
            typeOfPower: 1
        }
        if (bossMode === true){
            if (isBossSummon === true){
                PowerUP[amountOfPowerUPs].x = BossWave[eX].x + BossWave[eX].w / 2 - 5;
                PowerUP[amountOfPowerUPs].y = BossWave[eX].y;
            }
            else{
                PowerUP[amountOfPowerUPs].x = Boss.x + Boss.w / 2 - 5;
                PowerUP[amountOfPowerUPs].y = Boss.y;
            }

        }
        else{
            PowerUP[amountOfPowerUPs].x = Enemy[eX].x + Enemy[eX].w / 2 - 5;
            PowerUP[amountOfPowerUPs].y = Enemy[eX].y;
        }

        if (Math.ceil(Math.random() * 5) === 1  && bossMode !== true){ //no lifeUPS when vs. Boss
            PowerUP[amountOfPowerUPs].typeOfPower = 1 //lifeUP
        }
        else if (Math.ceil(Math.random() * 5) === 1){
            PowerUP[amountOfPowerUPs].typeOfPower = 3;  //shipUP
        }
        else if (Math.ceil(Math.random() * 15) === 1){
            PowerUP[amountOfPowerUPs].typeOfPower = 4;  //bombUP
        }
        else{
            PowerUP[amountOfPowerUPs].typeOfPower = 2;  //fireUP
        }
        amountOfPowerUPs++;
    }
    function drawPower(){
        for (let i=0;i<amountOfPowerUPs;i++){
            if (PowerUP[i].y >= canvas.height) {
                PowerUP[i].Active = false;
            }
            if (PowerUP[i].Active === true) {
                if ( PowerUP[i].typeOfPower === 1){
                    ctx.drawImage(lifeUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                }
                else if ( PowerUP[i].typeOfPower === 2){
                    ctx.drawImage(fireUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                }
                else if (PowerUP[i].typeOfPower === 3){
                    ctx.drawImage(shipUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                }
                else if (PowerUP[i].typeOfPower === 4){
                    ctx.drawImage(bombUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                }

            }
        }
    }
    function newPowerPosition() {

        for (let i=0;i<amountOfPowerUPs;i++){
            PowerUP[i].y+=PowerUP[i].speed;
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

    function nukeTheMap(){

        if (nukes !== 0){
            nukes--;
            isNuked = true;

            LaserShot = 0;
            EnemyShots = 0;
            InactiveShots = 0;
            BossShots = 0;
            BossRadialShots = 0;
            BossWaveShots = 0;

            if (Level%waveTillBoss === 0){
                Boss.isDamaged = true;
                Boss.Health-=10;
                createExplosion(0);
                points += 100 * scoreMultiplier;
                enemyExplode[0].play();
            }
            else {

                for (let i = 0; i < numOfEnemies; i++) {
                    if ((Enemy[i].Health <= 1  && Enemy[i].isDead === false) || (difficulty === 1 && Enemy[i].isDead === false)) {

                            createExplosion(i);
                            Enemy[i].isDead = true;
                            points += 100 * scoreMultiplier;

                            enemyExplode[i % 5].play();
                            if (Math.ceil(Math.random() * chanceOfPower) <= 10) {
                                generatePower(i,false);
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




    let LaserShot = 0;
    let CoolDown = false;
    let Laser = [];
    let SoundCounter = 0;

    function Shoot(){
        if (CoolDown === false) {

            SoundCounter ++;

            if (playerBulletCount >= 4){
                shootLaser2[SoundCounter % 5].play();
            }
            else{
                shootLaser[SoundCounter % 5].play();
            }

            Laser[LaserShot] = {
                w: 10,
                h: 20,
                x: 0,
                y: 0,
                speed: 4,
                Active: true,
                doesPierce: false,
                Health: startingLaserHealth
            }

            Laser[LaserShot].h = 25;
            Laser[LaserShot].x = Player.x + Player.w / 2 - 5;
            Laser[LaserShot].y = Player.y;

            if (playerBulletCount >= 2){

                Laser[LaserShot].Health = 2;

                Laser[LaserShot+1] = {
                    w: 10,
                    h: 20,
                    x: 0,
                    y: 0,
                    speed: 4,
                    Active: true,
                    doesPierce: false,
                    Health: 1
                }

                Laser[LaserShot+2] = {
                    w: 10,
                    h: 20,
                    x: 0,
                    y: 0,
                    speed: 4,
                    Active: true,
                    doesPierce: false,
                    Health: 1
                }

                Laser[LaserShot+1].x = Player.x + Player.w / 2 - 25;
                Laser[LaserShot+1].y = Player.y+15;

                Laser[LaserShot+2].x = Player.x + Player.w / 2 +15;
                Laser[LaserShot+2].y = Player.y+15;

            }
            if (playerBulletCount >= 4){

                Laser[LaserShot].Health = 3;
                Laser[LaserShot].h = 30;
                Laser[LaserShot].w = 15;
                Laser[LaserShot+1].Health = 2;
                Laser[LaserShot+2].Health = 2;

                Laser[LaserShot+3] = {
                    w: 10,
                    h: 20,
                    x: 0,
                    y: 0,
                    speed: 4,
                    Active: true,
                    doesPierce: false,
                    Health: 1

                }

                Laser[LaserShot+4] = {
                    w: 10,
                    h: 20,
                    x: 0,
                    y: 0,
                    speed: 4,
                    Active: true,
                    doesPierce: false,
                    Health: 1
                }

                Laser[LaserShot+3].x = Player.x + Player.w / 2 - 45;
                Laser[LaserShot+3].y = Player.y+30;

                Laser[LaserShot+4].x = Player.x + Player.w / 2 +35;
                Laser[LaserShot+4].y = Player.y+30;

            }
            LaserShot= LaserShot + 1 + playerBulletCount;

            }



    }
    function drawLaser(){
        let count =0;

        for (let i=0;i<LaserShot;i++) {
            if (Laser[i].y <= 0){
                Laser[i].Active = false;
            }
            if (Laser[i].Active === true) {

                if (Laser[i].Health > 2 ) {
                    ctx.drawImage(laserPiercing2, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                }
                else if (Laser[i].Health === 2) {
                    ctx.drawImage(laserPiercing1, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                }
                else{
                    ctx.drawImage(laser, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
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
        for (let i=0;i<LaserShot;i++){
            Laser[i].y-=5;
        }


    }

    //ENEMYDEATH

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




    //PLAYER CONTROLS AND CREATION
    const Player = {
        w:40,
        h:30,
        x:canvas.width/2-30,
        y:canvas.height-30,
        speed:5,
        dx:0
    }
    function drawPlayer(){
        if (playerBulletCount === 4){
            ctx.drawImage(image3,Player.x,Player.y,Player.w,Player.h);
        }
        else if (playerBulletCount === 2){
            ctx.drawImage(image2,Player.x,Player.y,Player.w,Player.h);
        }
        else{
            ctx.drawImage(image,Player.x,Player.y,Player.w,Player.h);
        }

        if (unkillable === true) {
            ctx.drawImage(invic, Player.x - 10, Player.y - 10, Player.w + 20, 20);
        }
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




    //ScoreBoard
    function scoreboard(){

        let color;

        if (difficulty === 1){
            color = "#00fa0c";
        }
        else if (difficulty === 2){
            color = "#fac400"
        }
        else{
            color = "#fa4f00"
        }



        let Result = "Score: " + points;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(Result,20,40);

        let LevelBoard = "Level: " + Level;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(LevelBoard,180,40);

        let NukeBoard = "💣: " + nukes;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(NukeBoard,290,40);

        let LiveBoard = "HP: "+ lives + "/"+ maxLives;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(LiveBoard,385,40);

        if (bossMode === true){
            let BossHealth = "Health: " + Boss.Health;
            ctx.font = "30px VT323";
            ctx.fillStyle= "red";
            ctx.fillText(BossHealth,370,80);
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




    myButton = document.getElementById('StartGame');
    myOptions = document.getElementById('Options');
    myFullScreen = document.getElementById('FullScreen');

    Easy = document.getElementById('Easy');
    Medium = document.getElementById('Medium');
    Hard = document.getElementById('Hard');

    myContinue = document.getElementById('Continue');
    myContinue.innerHTML = "Revives - " + revives;
    let yesContinue = false;

    function Continue() {
        if (revives >= 1){
            revives--;
            if (points -= 5000 < 0){
                points = 0;
            }
            else{
                points -= 5000;
            }
            myContinue.innerHTML = "Revives - " + revives;
            yesContinue = true;
            if (revives === 0){
                myContinue.style.background = "gray";
            }
            beginGame();
        }
    }


    function Settings(){
        Easy.style.display = "block";
        Medium.style.display = "block";
        Hard.style.display = "block";
        myFullScreen.style.display = "none";
        myButton.style.display = "none";
        myOptions.style.display = "none";
    }
    function EasyMode(){
        maxLives = 25;
        revives = 3;
        difficulty = 1;
        Level = 1;
        lives = 3;
        numOfEnemies = 8;
        RateOfFire = 450
        enemySpeed = 0.8;
        scoreMultiplier = 0.5;
        enemyProjectileSpeed = 1.5;
        gainLifePerStage = 1;
        EnemyHealth = 1;
        BossHealthBoost = 15;
        startingLaserHealth = 2;
        chanceOfPower = 65;

        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
        myFullScreen.style.display = "block";
    }
    function MediumMode(){
        maxLives = 20;
        revives = 3;
        difficulty = 2;
        Level = 1;
        lives = 3;
        numOfEnemies = 8;
        RateOfFire = 350;
        enemySpeed = 1.2;
        scoreMultiplier = 1;
        enemyProjectileSpeed = 2;
        gainLifePerStage = 0;
        EnemyHealth = 1;
        BossHealthBoost = 20;
        chanceOfPower = 60;
        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
        myFullScreen.style.display = "block";
    }
    function HardMode(){
        maxLives = 15;
        revives = 0;
        difficulty = 3;
        Level = 1;
        lives = 3;
        numOfEnemies = 8;
        RateOfFire = 250;
        enemySpeed = 1.5;
        scoreMultiplier = 2;
        enemyProjectileSpeed = 3;
        gainLifePerStage = 0;
        EnemyHealth = 2;
        BossHealthBoost = 25;
        chanceOfPower = 55;
        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
        myFullScreen.style.display = "block";
    }

    let fullScreenMode = false;
    function fullScreen(){

        if (fullScreenMode === false){
            fullScreenMode = true;
            myFullScreen.style.background = "green";
            myFullScreen.innerHTML = "Full Screen - ON";
        }
        else{
            fullScreenMode = false;
            myFullScreen.style.background = "gray";
            myFullScreen.innerHTML = "Full Screen - OFF";
        }


        if (fullScreenMode === true && isGameRunning === true){

            myFullScreen.style.background = "gray";
            myFullScreen.innerHTML = "Full Screen - OFF";

            if(canvas.webkitRequestFullScreen) {
                canvas.webkitRequestFullScreen();
            }
            else {
                canvas.mozRequestFullScreen();
            }
        }

    }

    MediumMode();
    function beginGame(){

        if (fullScreenMode === true){
            myFullScreen.style.background = "gray";
            myFullScreen.innerHTML = "Full Screen - OFF";
            if(canvas.webkitRequestFullScreen) {
                canvas.webkitRequestFullScreen();
            }
            else {
                canvas.mozRequestFullScreen();
            }
        }

        StartTheGame.loop = true;

        points = 0;
        lives = 3;
        isGameRunning = true;
        LaserShot = 0;
        BossWaveShots = 0;
        BossRadialShots = 0;
        BossShots = 0;
        EnemyShots = 0;
        InactiveShots = 0;
        amountOfShots = 1;
        nukes = 9;

        Player.x = canvas.width / 2 - 30;
        Player.y = canvas.height - 30;

        if(yesContinue === false){
            StartTheGame.currentTime = 0;
            StartTheGame.play();
            if (difficulty === 1){
                EasyMode();
            }
            else if(difficulty === 2){
                MediumMode();
            }
            else{
                HardMode();
            }
        }
        else{
            yesContinue = false;
            amountOfShots = rememberAmountOfShots;
            nukes = rememberNukes;
            playerBulletCount = rememberPlayerBulletCount;
            if (Level %waveTillBoss === 0 ){
                bossMode = true;
                BossMusic.currentTime = 0;
                BossMusic.play();
                Boss.Health = startingHealth;
                Boss.x = 135;
                Boss.y = 50;
            }
            else{
                StartTheGame.currentTime = 0;
                StartTheGame.play();
            }
        }

        myButton.style.display = "none";
        myOptions.style.display = "none";
        myContinue.style.display = "none";

        fillEnemies();
        update();
    }

    //MOVEMENT

    const keys = [];

    document.addEventListener('keydown',function(e){
        if (e.keyCode !== 32) {
            keys[e.keyCode] = true;
        }
        else if (e.keyCode === 32) {
            Shoot();
        }
        if (e.keyCode === 13) {
            nukeTheMap();
        }
    });
    document.addEventListener('keyup',function(e){
        delete keys[e.keyCode];
    });


    function takeDamage(x = 1){
        unkillable = true;
        setTimeout(function(){ unkillable = false; }, 2000);
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

            /*
               Player.x = canvas.width / 2 - 30;
               Player.y = canvas.height - 30;
                */

    }


    function RegularLogic(){
        drawEnemy();
        drawBoom();
        drawEnemyLaser();
        enemyShoot();

        newEnemyLaserPosition();
        newEnemyPosition();

        isHIT();
        isPlayerHIT();
        ifLevelBeaten();

    }


    //Boss Section
    function BossLogic(){
        drawBoss();
        newBossPosition();
        isBossDamaged();
        if (Boss.typeBoss === 1 ){
            BossShoot();
        }
        else if (Boss.typeBoss === 2 ){
            Boss2Shoot();
        }
            drawBossLaser();
            newBossLaserPosition();
            isPlayerHITbyBoss();

        isBossBeaten();
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


    //canvas

/*
    canvas.addEventListener('click', (event)=>{
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x <= 250){
            MovePlayer(1);
            Shoot();
        }
        else if(x > 250){
            MovePlayer(2);
            Shoot();
        }

        console.log('x: '+x+'/ y '+ y);

    });

 */

    /*
    canvas.addEventListener('mousemove', e => {
        if (e.offsetX <= 250){
            MovePlayer(1);
            Shoot();
        }
        else if(e.offsetX > 250){
            MovePlayer(2);
            Shoot();
        }
    });
     */



    let direction; // 1 left 2 right 3 bomb


        canvas.addEventListener('touchstart', function (e){
            let touch;
            let shoot;
            switch (e.touches.length) {
                case 1:
                    touch = e.touches[0];

                    console.log(touch.clientX + "  " + touch.clientY );

                    if (touch.clientX >= 400   && touch.clientX <= 450 && touch.clientY >= 30 && touch.clientY < 40){
                        nukeTheMap();
                    }
                    else if (touch.clientX <= 250) {
                        direction = 1;
                    } else if (touch.clientX > 250 && touch.clientX <= 500) {
                        direction = 2;
                    }

                    break;
                case 2:
                    touch = e.touches[0];
                    shoot = e.touches[1];

                    console.log(touch.clientX + "  " + touch.clientY );

                    if (touch.clientX >= 400   && touch.clientX <= 450 && touch.clientY >= 30 && touch.clientY < 40 ||
                        shoot.clientX >= 400   && shoot.clientX <= 450 && shoot.clientY >= 30 && shoot.clientY < 40
                    ){
                        nukeTheMap();
                    }
                    else if (touch.clientX <= 250 || shoot.clientX <= 250) {
                        direction = 1;
                    } else if (touch.clientX > 250 && touch.clientX <= 500 || shoot.clientX > 250 && shoot.clientX <= 500) {
                        direction = 2;
                    }
                    if ( touch.clientX > 500 || shoot.clientX > 500) {
                        Shoot();
                    }

                    break;
            }


            /*
            else if (touch.clientX > 500){
                Shoot();
            }

             */

        });

        window.addEventListener('touchend',function (e) {
            direction = 0;
        });









    //MAIN LOOP FUNCTION:
    function update(){
        if (isGameRunning === true) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isNuked === true){
                ctx.drawImage(backgroundNuked, 0 ,0);
                setTimeout(function(){isNuked = false; }, 300);

            }
            else{
                ctx.drawImage(background, 0 ,0);
            }



            scoreboard();

            MovePlayer();
            drawPlayer();
            drawLaser();


            newLaserPosition();

            drawPower();
            isPowerUP();
            newPowerPosition();

            if (Level%waveTillBoss === 0){
                BossLogic();

            }
            else{
                RegularLogic();
            }

            requestAnimationFrame(update);
        }

    }

