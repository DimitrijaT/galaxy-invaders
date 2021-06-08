    //MAIN SETUP
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    const image =  document.getElementById('Player');
    const enemy =  document.getElementById('Enemy');
    const laser = document.getElementById('Laser');
    const enemyLaser = document.getElementById('EnemyLaser');
    const invic = document.getElementById('InviciBubble');
    const lifeUP = document.getElementById('LifeUP');
    const fireUP = document.getElementById('FirePower');
    const background = document.getElementById( 'Space');

    let points = 0;
    let lives = 3;
    let isGameRunning = false;
    let unkillable = false;
    let RateOfFire = 300;
    let enemySpeed = 3;
    let scoreMultiplier = 1;
    let enemyProjectileSpeed = 3;
    let Level = 1;
    let amountOfShots = 4;
    let chanceOfPower = 150;
    let gainLifePerStage = 0;

    //SOUNDS
    let StartTheGame = new Audio();
    StartTheGame.src = 'Sounds/SpaceAmbience.mp3';
    let deathSound = new Audio();
    deathSound.src = 'Sounds/death.mp3';
    let shootLaser  = [];
    let enemyExplode = [];
    for (let i=0;i<5;i++){
        shootLaser[i] = new Audio();
        shootLaser[i].src = 'Sounds/shootLaser.mp3';
        enemyExplode[i] = new Audio();
        enemyExplode[i].src = 'Sounds/boom.mp3';
    }


    //GAME OVER!
    function youLOST(){
        isGameRunning = false;
        alert("GAME OVER");
        myButton.style.display = "block";
        myOptions.style.display = "block";

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
                isDead: false
            }
            offsetXaxis +=50;

        }
    }

    function drawEnemy(){
        for (let i=0;i<numOfEnemies;i++)
        {
            if(Enemy[i].isDead === false){
                ctx.drawImage(enemy, Enemy[i].x, Enemy[i].y, Enemy[i].w, Enemy[i].h);
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
                PowerUP[i].x >= Player.x &&
                PowerUP[i].x <= Player.x + Player.w &&
                PowerUP[i].y >= Player.y &&
                PowerUP[i].y <= Player.y + Player.h &&
                PowerUP[i].Active === true){

                if (PowerUP[i].typeOfPower === 1){
                    lives++;
                    PowerUP[i].Active = false;
                }
                else if (PowerUP[i].typeOfPower === 2){
                    amountOfShots++;
                    PowerUP[i].Active = false;
                }

            }



        }
    }
    function generatePower(eX){
        PowerUP[amountOfPowerUPs] = {
            w: 15,
            h: 15,
            x: 0,
            y: 0,
            speed: 2,
            Active: true,
            typeOfPower: 1
        }
        PowerUP[amountOfPowerUPs].x = Enemy[eX].x + Enemy[eX].w / 2 - 5;
        PowerUP[amountOfPowerUPs].y = Enemy[eX].y;
        if (Math.ceil(Math.random() * 2) === 1){
            PowerUP[amountOfPowerUPs].typeOfPower = 1
        }
        else{
            PowerUP[amountOfPowerUPs].typeOfPower = 2;
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
                else if
                ( PowerUP[i].typeOfPower === 2){
                    ctx.drawImage(fireUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
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

                EnemyShots++;
                /*
                if (EnemyShots >= 5) {
                    InactiveShots++;
                    for (let i = 0; i < InactiveShots; i++) {
                        EnemyFire[i].Active = false;
                    }
                }
                 */
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
                EnemyFire[i].y >= Player.y &&
                EnemyFire[i].y <= Player.y + Player.h &&
                EnemyFire[i].Active === true &&
                unkillable === false){
                if (lives-1 >= 0) {
                    unkillable = true;
                    setTimeout(function(){ unkillable = false; }, 3500);
                    lives -= 1;
                    Player.x = canvas.width / 2 - 30;
                    Player.y = canvas.height - 30;
                    deathSound.play();
                    amountOfShots = 4;
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

                    Enemy[i].isDead = true;
                    points += 100 * scoreMultiplier;
                    Laser[j].Active = false;
                    enemyExplode[j%5].play();
                    if (Math.ceil(Math.random() * chanceOfPower) <=10){
                            generatePower(i);
                    }


                }
            }
        }

    }


    let LaserShot = 0;
    let CoolDown = false;
    let Laser = [];

    function Shoot(){
        if (CoolDown === false) {


            Laser[LaserShot] = {
                w: 10,
                h: 20,
                x: 0,
                y: 0,
                speed: 3,
                Active: false
            }


            Laser[LaserShot].x = Player.x + Player.w / 2 - 5;
            Laser[LaserShot].y = Player.y;
            Laser[LaserShot].Active = true;
            shootLaser[LaserShot % 5].play();
            LaserShot++;

            }



    }
    function drawLaser(){
        let count = 0;

        for (let i=0;i<LaserShot;i++) {
            if (Laser[i].y <= 0){
                Laser[i].Active = false;
            }
            if (Laser[i].Active === true) {
                ctx.drawImage(laser, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);
                count++;
            }
        }

        if (count >= amountOfShots){
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
        ctx.drawImage(image,Player.x,Player.y,Player.w,Player.h);
        if (unkillable === true) {
            ctx.drawImage(invic, Player.x - 10, Player.y - 10, Player.w + 20, 20);
        }
    }

    function newPosition(){
        if (Player.x + Player.w >= canvas.width){
            Player.x -= 0.5;
        }
        else if (Player.x <= 0){
            Player.x +=0.5;
        }
        else{
            Player.x += Player.dx;
        }
    }
    function moveRight(){
        Player.dx=Player.speed;

    }
    function moveLeft(){
        Player.dx=Player.speed*-1;

    }
    function keyDown(EventParameter){
        if (EventParameter.key === 'ArrowRight' || EventParameter.key === 'D'|| EventParameter.key === 'd'){
            moveRight();
        }
        else if (EventParameter.key === 'ArrowLeft'|| EventParameter.key === 'A'|| EventParameter.key === 'a'){
            moveLeft();
        }
        if ((EventParameter.key === 'x' || EventParameter.key === 'X' ||  EventParameter.key === 'W'||  EventParameter.key === 'w')){
            Shoot();
        }
    }
    function keyUp(EventParameter){
        if (EventParameter.key === 'ArrowRight' || EventParameter.key === 'ArrowLeft'|| EventParameter.key === 'D'|| EventParameter.key === 'd'|| EventParameter.key === 'A'|| EventParameter.key === 'a'){
           Player.dx = 0;
        }

    }
    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);



    //ScoreBoard
    function scoreboard(){

        let Result = "Score: " + points;
        ctx.font = "30px VT323";
        ctx.fillStyle= "purple";
        ctx.fillText(Result,20,40);

        let LiveBoard = "Lives: " + lives;
        ctx.font = "30px VT323";
        ctx.fillStyle= "purple";
        ctx.fillText(LiveBoard,370,40);

        let LevelBoard = "Level: " + Level;
        ctx.font = "30px VT323";
        ctx.fillStyle= "purple";
        ctx.fillText(LevelBoard,205,40);



    }

    function ifLevelBeaten(){
            let checkIfAllDead = false;
            for (let i=0;i<numOfEnemies;i++){
                if (Enemy[i].isDead===false){
                    checkIfAllDead = true;
                }
            }

            if (checkIfAllDead === false){
                lives+=gainLifePerStage;
                numOfEnemies+=3;
                if (numOfEnemies >= 40){
                    numOfEnemies = 40;
                }
                RateOfFire-=10;
                enemySpeed+=0.2;
                scoreMultiplier+=1.1;
                enemyProjectileSpeed+=0.2;
                Level++;
                LaserShot = 0;

                EnemyShots = 0;
                InactiveShots = 0;
                fillEnemies();
            }


    }





    myButton = document.getElementById('StartGame');
    myOptions = document.getElementById('Options');

    Easy = document.getElementById('Easy');
    Medium = document.getElementById('Medium');
    Hard = document.getElementById('Hard');

    function Settings(){
        Easy.style.display = "block";
        Medium.style.display = "block";
        Hard.style.display = "block";
        myButton.style.display = "none";
        myOptions.style.display = "none";
    }
    function EasyMode(){
        Level = 1;
        lives = 3;
        numOfEnemies = 8;
        RateOfFire = 350
        enemySpeed = 2;
        scoreMultiplier = 0.2;
        enemyProjectileSpeed = 1.5;
        gainLifePerStage = 1;
        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
    }
    function MediumMode(){
        Level = 1;
        lives = 3;
        numOfEnemies = 16;
        RateOfFire = 300;
        enemySpeed = 3;
        scoreMultiplier = 1;
        enemyProjectileSpeed = 2;
        gainLifePerStage = 0;
        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
    }
    function HardMode(){
        Level = 1;
        lives = 3;
        numOfEnemies = 24;
        RateOfFire = 150;
        enemySpeed = 3.5;
        scoreMultiplier = 2;
        enemyProjectileSpeed = 3;
        gainLifePerStage = 0;
        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
    }


    MediumMode();
    function beginGame(){
        StartTheGame.play();
        points = 0;
        lives = 3;
        isGameRunning = true;
        LaserShot = 0;
        EnemyShots = 0;
        InactiveShots = 0;
        amountOfShots = 4;
        myButton.style.display = "none";
        myOptions.style.display = "none";

        fillEnemies();
        update();
    }

    //MAIN LOOP FUNCTION:
    function update(){
        if (isGameRunning === true) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(background, 0 ,0);
            scoreboard();

            drawPlayer();
            drawEnemy();
            drawLaser();
            drawEnemyLaser();
            drawPower();
            enemyShoot();


            newPosition();
            newEnemyLaserPosition();
            newLaserPosition();
            newEnemyPosition();
            newPowerPosition();

            isHIT();
            isPlayerHIT();
            ifLevelBeaten();
            isPowerUP();

            requestAnimationFrame(update);
        }

    }

