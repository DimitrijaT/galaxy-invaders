    //MAIN SETUP
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    MediumMode();
    myContinue.innerHTML = `Revives (${revives})`;




    //GAME OVER!
    function youLOST(){
        fullScreenMode = false;
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
        //  OLD : let Result = "Score: " + points;
        let Result = `Score: ${points}`;   //ECMASCRIPT WAY!
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(Result,20,40);

        let LevelBoard = `Level: ${Level}`;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(LevelBoard,175,40);

        let NukeBoard = `💣: ${nukes}`;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(NukeBoard,280,40);

        let LiveBoard = `❤️: ${lives}/${maxLives}`;
        ctx.font = "25px VT323";
        ctx.fillStyle= color;
        ctx.fillText(LiveBoard,375,40);

        if (bossMode === true){
            let BossHealth = `Health:${Boss.Health}`;
            ctx.font = "30px VT323";
            ctx.fillStyle= "red";
            ctx.fillText(BossHealth,365,80);
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


    function Settings(){

        Easy.style.display = "block";
        Medium.style.display = "block";
        Hard.style.display = "block";
        myFullScreen.style.display = "none";
        myButton.style.display = "none";
        myOptions.style.display = "none";
        myQuit.style.display = 'none';
    }

    function EasyMode(){
        myStartTheGame.innerHTML = 'Start Game - Easy';
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
        myStartTheGame.innerHTML = 'Start Game - Medium';
        points = 0;
        maxLives = 20;
        revives = 3;
        difficulty = 2;
        Level = 1;
        lives = 3;
        numOfEnemies = 8;
        RateOfFire = 400;
        enemySpeed = 1.2;
        scoreMultiplier = 1;
        enemyProjectileSpeed = 2;
        gainLifePerStage = 0;
        EnemyHealth = 1;
        BossHealthBoost = 20;
        chanceOfPower = 60;
        startingLaserHealth = 1;
        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myContinue.style.display = "none";
        myButton.style.display = "block";
        myOptions.style.display = "block";
        myFullScreen.style.display = "block";
    }
    function HardMode(){
        myStartTheGame.innerHTML = 'Start Game - Hard';
        points = 0;
        maxLives = 10;
        revives = 0;
        difficulty = 3;
        Level = 1;
        lives = 3;
        numOfEnemies = 8;
        RateOfFire = 350;
        enemySpeed = 1.55;
        scoreMultiplier = 2;
        enemyProjectileSpeed = 3;
        gainLifePerStage = 0;
        EnemyHealth = 2;
        BossHealthBoost = 30;
        chanceOfPower = 55;
        startingLaserHealth = 1;

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

            canvas.style.backgroundImage = 'none';
            canvas.style.background = 'none';
            canvas.style.border = 'none';

            if(canvas.webkitRequestFullScreen) {
                canvas.webkitRequestFullScreen();
            }
            else {
                canvas.mozRequestFullScreen();
            }
        }

    }


    function PauseResume(goingFullScreen = false){
        if (isGameRunning === true) {
            if (isGamePaused === true) {
                isGamePaused = false;
                myPauseResume.innerHTML = "Pause";

                if (Level % waveTillBoss === 0) {

                    BossMusic.play();

                } else {
                    StartTheGame.play();
                }

                update();
            } else if (isGamePaused === false && goingFullScreen === false) {

                if (Level % waveTillBoss === 0) {

                    BossMusic.pause();

                } else {
                    StartTheGame.pause();
                }

                ctx.fillStyle = 'black';
                ctx.fillRect(0, 210, 500, 70);

                ctx.lineWidth = "5";
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.rect(-10, 210, 600, 70);
                ctx.stroke();

                ctx.font = "60px VT323";
                ctx.fillStyle = color;
                ctx.fillText(`PAUSED`, 180, 260);


                myPauseResume.innerHTML = "Resume";
                isGamePaused = true;
            }
        }
    }


    function EnemyLogic(){
        drawEnemy();
        ifLevelBeaten();
        drawBoom();
        drawEnemyLaser();
        enemyShoot();
        newEnemyLaserPosition();
        newEnemyPosition();
        isHIT();
        isPlayerHIT();

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
                        }, 350);

                    } else {
                        switch (Level % 5) {
                            case 0:
                                ctx.drawImage(background, 0, 0);
                                break;

                            case 1:
                                ctx.drawImage(background1, 0, 0);
                                break;

                            case 2:
                                ctx.drawImage(background2, 0, 0);
                                break;
                            case 3:
                                ctx.drawImage(background3, 0, 0);
                                break;
                            case 4:
                                ctx.drawImage(background5, 0, 0);
                                break;
                            default:

                                ctx.drawImage(background, 0, 0);

                        }
                        if (Level % waveTillBoss === 0) {
                            ctx.drawImage(background4, 0, 0);
                        }

                    }
                    checkHighscore(points, Level, difficulty);

                    drawPower();
                    isPowerUP();
                    newPowerPosition();


                    if (printing1 === true) {
                        for (let i in PowerUP){
                            PowerUP[i].speed += 0.05;
                        }
                        readySetGo.play();
                        Ready();
                        setTimeout(function(){
                            printing1 = false;
                            printing2 = true;

                        }, 650);

                    }
                    else if (printing2 === true) {
                        for (let i in PowerUP){
                            PowerUP[i].speed += 0.05;
                        }
                        Set();
                        setTimeout(function () {
                            printing2 = false;
                            printing3 = true;

                        }, 600);
                    }
                    else if (printing3 === true) {
                        for (let i in PowerUP){
                            PowerUP[i].speed += 0.05;
                        }
                        Go();
                        amountOfPowerUPs = 0;
                        setTimeout(function () {
                            PowerUP = [];
                            printing3 = false;

                        }, 600);
                    }
                    else {

                        if (Level % waveTillBoss === 0) {
                            BossLogic();

                        } else {
                            EnemyLogic();
                        }
                    }

                    if (isGameRunning === true) {
                        PlayerLogic();
                    } else {
                        ctx.font = "40px VT323";
                        ctx.fillStyle = 'red';
                        ctx.fillText('GAME OVER', 170, 250);
                        isGamePaused = true;
                        myButton.style.display = "block";

                        if (Easy.style.display === "none"){
                            myOptions.style.display = "block";
                        }
                        myContinue.style.display = "block";
                        myReset.style.display = 'block';
                        myQuit.style.display = 'none';
                        myPauseResume.style.display = 'none';
                        if (Level === 1 || difficulty === 3) {
                            myContinue.style.display = "none";
                        }
                    }
                    scoreboard();
                    requestAnimationFrame(update);


                }





    }

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


    function beginGame(){
        printing1 = true;
        Player.isDead = false;
        isGamePaused = false;

        myCanvas = document.getElementById('canvas');
        canvas.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.3)";
        myPauseResume.style.display = 'block';
        myQuit.style.display = 'block';
        myQuit.style.background = '#B7121F';
        myReset.style.background = 'green';
        myReset.style.display = 'none';

        if (fullScreenMode === true){
            fullScreenMode = false;
            myFullScreen.style.background = "gray";
            myFullScreen.innerHTML = "Full Screen - OFF";

            canvas.style.backgroundImage = 'none';
            canvas.style.background = 'none';
            canvas.style.border = 'none';

            if(canvas.webkitRequestFullScreen) {
                canvas.webkitRequestFullScreen();
            }
            else {
                canvas.mozRequestFullScreen();
            }
        }

        StartTheGame.loop = true;

        lives = 3;
        LaserShot = 0;
        isGameRunning = true;


        Laser = [];
        BossFire = [];
        EnemyFire = [];
        Enemy = [];
        keys = [];

        nukes = 3;
        Player.amountOfShots = 1;
        Player.sharpness = 0;
        Player.bulletCount= 1;

        Player.x = canvas.width / 2 - 30;
        Player.y = canvas.height - 30;

        if(yesContinue === false){

            revives = 3;
            myContinue.innerHTML = `Revives (${revives})`;
            myContinue.style.background = "green";
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
            Player.amountOfShots = rememberAmountOfShots;
            nukes = rememberNukes;
            Player.sharpness = rememberSharpness;
            Player.bulletCount = rememberPlayerBulletCount;

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
        if (firstTime === true)
        {
            firstTime = false;
            keyPressActions();
        }

        if (difficulty === 1){
            color = "#00fa0c";
        }
        else if (difficulty === 2){
            color = "#fac400"
        }
        else{
            color = "#fa4f00"
        }


        update();


    }

    function  secret(){
        if (isGamePaused === true) {
            if (mouseControls === false) {
                canvas.style.cursor = "none";
                mouseControls = true;
            } else {
                mouseControls = false;
                canvas.style.cursor = "auto";
            }
            secretSound.setDuration = 0;
            secretSound.play();

            let logo = document.getElementById("SiteLogo");
            logo.src = "SiteImages/LogoClicked.png"

            setTimeout(function () {
                let logo = document.getElementById("SiteLogo");
                logo.src = "SiteImages/Logo.png";
            }, 400);
        }

    }

    function quit(){
        if (isGamePaused === false) {
            fullScreenMode = false;
            lives = 0;
            bossMode = false;
            isGameRunning = false;
            BossMusic.pause();
            StartTheGame.pause();
            StartTheGame.currentTime = 0;
            BossMusic.currentTime = 0;

            if (Player.isDead === false) {
                gameOverSound.currentTime = 0;
                gameOverSound.play();
                Player.isDead = true;
            }
        }
    }