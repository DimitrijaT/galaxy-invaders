    //MAIN SETUP
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;


    //GAME OVER!
    function youLOST(){
        lives = 0;

        bossMode = false;
        isGameRunning = false;


        BossMusic.pause();
        StartTheGame.pause();
        StartTheGame.currentTime = 0;
        BossMusic.currentTime = 0;

        if (Player.isDead === false){
            gameOverSound.currentTime = 0;
            gameOverSound.play();
            Player.isDead = true;
        }

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

        //  OLD : let Result = "Score: " + points;
        let Result = `Score: ${points}`;   //ECMASCRIPT WAY!
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(Result,20,40);

        let LevelBoard = `Level: ${Level}`;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(LevelBoard,180,40);

        let NukeBoard = `💣: ${nukes}`;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(NukeBoard,290,40);

        let LiveBoard = `HP: ${lives}/${maxLives}`;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(LiveBoard,385,40);

        if (bossMode === true){
            let BossHealth = `Health: ${Boss.Health}`;
            ctx.font = "30px VT323";
            ctx.fillStyle= "red";
            ctx.fillText(BossHealth,370,80);
        }
    }



    function Reset(){
        localStorage.clear();
        highScore = [];
        firstTimePointSetup();

        myReset.style.background = 'gray';

        document.getElementById('Epoints').innerHTML ='0';
        document.getElementById('Elevel').innerHTML = '0';

        document.getElementById('Mpoints').innerHTML = '0';
        document.getElementById('Mlevel').innerHTML = '0';

        document.getElementById('Hpoints').innerHTML = '0';
        document.getElementById('Hlevel').innerHTML ='0';
    }





    myButton = document.getElementById('StartGame');
    myOptions = document.getElementById('Options');
    myFullScreen = document.getElementById('FullScreen');
    myReset = document.getElementById('Reset');
    myPauseResume = document.getElementById('PauseResume');

    Easy = document.getElementById('Easy');
    Medium = document.getElementById('Medium');
    Hard = document.getElementById('Hard');

    myContinue = document.getElementById('Continue');
    myContinue.innerHTML = `Revives (${revives})`;


    function Settings(){
        Easy.style.display = "block";
        Medium.style.display = "block";
        Hard.style.display = "block";
        myFullScreen.style.display = "none";
        myButton.style.display = "none";
        myOptions.style.display = "none";
    }
    function EasyMode(){
        points = 0;
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
        BossHealthBoost = 10;
        startingLaserHealth = 2;
        chanceOfPower = 65;

        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myContinue.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
        myFullScreen.style.display = "block";
    }
    function MediumMode(){
        points = 0;
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
        myContinue.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
        myFullScreen.style.display = "block";
    }
    function HardMode(){
        points = 0;
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
        BossHealthBoost = 30;
        chanceOfPower = 55;
        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myContinue.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
        myFullScreen.style.display = "block";
    }

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
            PauseResume(true);

            if(canvas.webkitRequestFullScreen) {
                canvas.webkitRequestFullScreen();
            }
            else {
                canvas.mozRequestFullScreen();
            }
        }

    }


    function PauseResume(goingFullScreen = false){
        if (isGamePaused === true ){
            isGamePaused = false;
            myPauseResume.innerHTML = "Pause";

            if (Level %waveTillBoss === 0 ){

                BossMusic.play();

            }
            else{
                StartTheGame.play();
            }

            update();
        }
        else if (isGamePaused === false && goingFullScreen === false){

            if (Level %waveTillBoss === 0 ){

                BossMusic.pause();

            }
            else{
                StartTheGame.pause();
            }

            myPauseResume.innerHTML = "Resume";
            isGamePaused = true;
        }
    }


    function EnemyLogic(){
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
        BossShoot();
        drawBossLaser();
        newBossLaserPosition();
        isPlayerHITbyBoss();
        isBossBeaten();
    }

    function PlayerLogic(){
        MovePlayer();
        drawPlayer();
        drawLaser();
        newLaserPosition();
    }
    //MAIN LOOP FUNCTION:
    function update(){

        if (isGamePaused === false) {

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if (isNuked === true) {
                    ctx.drawImage(backgroundNuked, 0, 0);
                    setTimeout(function () {
                        isNuked = false;
                    }, 300);

                } else {
                    ctx.drawImage(background, 0, 0);
                }

                scoreboard();
                checkHighscore(points, Level, difficulty);

                drawPower();
                isPowerUP();
                newPowerPosition();

                if (Level % waveTillBoss === 0) {
                    BossLogic();

                } else {
                    EnemyLogic();
                }

            if (isGameRunning === true){
                PlayerLogic();
            }
            else{
                ctx.font = "40px VT323";
                ctx.fillStyle= 'red';
                ctx.fillText('GAME OVER',170,250);
                setTimeout(function () {
                    isGamePaused = true;
                    myButton.style.display = "block";
                    myOptions.style.display = "block";
                    myContinue.style.display = "block";
                    myReset.style.display = 'block';
                    myPauseResume.style.display = 'none';
                    if (Level === 1 || difficulty === 3) {
                        myContinue.style.display = "none";
                    }
                },1000);
            }

            requestAnimationFrame(update);
            }


    }


    let yesContinue = false;

    function Continue() {

        if (revives >= 1){
            revives--;
            if (points-5000 < 0){
                points = 0;
            }
            else{
                points -= 5000;
            }
            myContinue.innerHTML = `Revives (${revives})`;
            yesContinue = true;
            if (revives === 0){
                myContinue.style.background = "gray";
            }

            isGamePaused = true;
            beginGame();
        }
    }


    MediumMode();
    function beginGame(){

        Player.isDead = false;
        isGamePaused = false;

        myPauseResume.style.display = 'block';
        myReset.style.background = 'green';
        myReset.style.display = 'none';

        if (fullScreenMode === true){
            fullScreenMode = false;
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

        lives = 3;
        isGameRunning = true;

        Laser = [];
        BossFire = [];
        EnemyFire = [];
        Enemy = [];

        amountOfShots = 1;
        nukes = 9999;

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

        keyPressActions();
        fillEnemies();
        update();
    }