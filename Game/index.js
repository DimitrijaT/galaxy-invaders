    //MAIN SETUP
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
    MediumMode();
    myContinue.innerHTML = `Revives - ${revives}`;

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
        ctx.fillText(LevelBoard,170,40);

        //NUKES

        ctx.fillStyle = 'black';
        ctx.fillRect(282, 42,  75, -20);

        ctx.fillStyle = '#B7121F';
        ctx.fillRect(282, 42,   nukes / 10 * 75, -20);

        ctx.lineWidth = "2";
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(282, 42, 75, -20);
        ctx.stroke();
        let NukeBoard
        if (isNuked === true) {
             NukeBoard = `💥  ${nukes}`;
        }
        else{
             NukeBoard = `💣  ${nukes}`;
        }
        ctx.font = "27px VT323";
        ctx.fillStyle= color;
        ctx.fillText(NukeBoard,260,40);


         //LIVES

        ctx.fillStyle = 'black';
        ctx.fillRect(387, 42,  75, -20);

        ctx.fillStyle = '#B7121F';
        if (Player.unkillable === true){
            ctx.fillStyle = '#740373';
        }

        ctx.fillRect(387, 42,  lives / maxLives * 75, -20);


        ctx.lineWidth = "2";
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.rect(387, 42, 75, -20);
        ctx.stroke();
        let LiveBoard
        if (Player.unkillable === true){
             LiveBoard = `💘  ️${lives}`;
        }
        else{
             LiveBoard = `❤️  ${lives}`;
        }

        ctx.font = "27px VT323";
        ctx.fillStyle=  color ;
        ctx.fillText(LiveBoard,365,40);

        //BOSS HEALTHBAR

        if (bossMode === true){

            ctx.fillStyle = 'black';
            ctx.fillRect(100, 60,  300, 20);

            ctx.fillStyle = '#B7121F';
            if (Boss.isDamaged === true){
                ctx.fillStyle = 'white';
            }
            else if (Boss.isHealing === true && Boss.isProtected === false){
                ctx.fillStyle = 'darkgreen';
            }
            ctx.fillRect(100, 60,  Boss.Health / startingHealth * 300, 20);

            ctx.lineWidth = "2";
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.rect(100, 60, 300, 20);
            ctx.stroke();

            let BossHealth = `${Boss.Health}`;
            ctx.font = "23px VT323";
            ctx.fillStyle= color;
            ctx.fillText(BossHealth,240,76);
        }

        if (Player.unkillable === true){

            ctx.lineWidth = "5";
            ctx.strokeStyle = '#740373';
            ctx.beginPath();
            ctx.rect(0, 500, 500 , 10);
            ctx.stroke();

            ctx.lineWidth = "5";
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.rect(0, 500, time / MaxTime * 500, 10);
            ctx.stroke();

        }
    }

    setInterval(function (){
        time-=250;
    },250);

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

    let inSettings = false;

    function Settings(){

        if (inSettings === false){
            inSettings = true;
            Easy.style.display = "none";
            Medium.style.display = "none";
            Hard.style.display = "none";
            myFullScreen.style.display = "block";
            myMouse.style.display = "block";
            myButton.style.display = "none";
            myOptions.style.display = "none";
            myQuit.style.display = 'none';
            mySettings.innerHTML = 'Back';
            myPowerPanel.style.display = 'block';
            myReset.style.display = 'block';

            myContinue.style.display = 'none';

        }
        else{
            inSettings = false;
            Easy.style.display = "none";
            Medium.style.display = "none";
            Hard.style.display = "none";
            myFullScreen.style.display = "none";
            myMouse.style.display = "none";
            myButton.style.display = "block";
            myOptions.style.display = "block";
            myQuit.style.display = 'none';
            mySettings.innerHTML = 'Settings';
            myPowerPanel.style.display = 'none';
            myReset.style.display = 'none';
            if (revives > 0 && runs === true && showContinue === true){
                myContinue.style.display = 'block';
                showContinue = true;
            }

        }


    }


    function Difficulty(){

            Easy.style.display = "block";
            Medium.style.display = "block";
            Hard.style.display = "block";
            myFullScreen.style.display = "none";
            myButton.style.display = "none";
            myOptions.style.display = "none";
            myQuit.style.display = 'none';
            myMouse.style.display = "none";
            mySettings.style.display = "none";
            myContinue.style.display = 'none';
            myPowerPanel.style.display = 'none';
            myReset.style.display = 'none';


    }

    function HideMenu(){
        Easy.style.display = "none";
        Medium.style.display = "none";
        Hard.style.display = "none";
        myContinue.style.display = "none";
        showContinue = false;
        myButton.style.display = "block";
        myOptions.style.display = "block";
        mySettings.style.display = "block";
        myFullScreen.style.display = "none";
        myPowerPanel.style.display = 'none';
        myReset.style.display = 'none';

    }

    function EasyMode(){
        HideMenu();

        myStartTheGame.innerHTML = 'Start Game - Easy';
        points = 0;
        maxLives = 10;
        revives = 3;
        difficulty = 1;
        Level = 1;
        lives = 5;
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

    }
    function MediumMode(){
        HideMenu();

        myStartTheGame.innerHTML = 'Start Game - Medium';
        points = 0;
        maxLives = 5;
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

    }
    function HardMode(){
        HideMenu();

        myStartTheGame.innerHTML = 'Start Game - Hard';
        points = 0;
        maxLives = 3;
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

    }

    function fullScreen(){
        fullscreenOptimize = false;

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
            fullscreenOptimize = true;
            if(canvas.webkitRequestFullScreen) {

                canvas.webkitRequestFullScreen();
            }
            else {
                canvas.mozRequestFullScreen();
            }
        }

    }
let fullscreenOptimize = false;

    function EnemyLogic(){
        drawEnemy();
        ifLevelBeaten();
        drawEnemyLaser();
        enemyShoot();
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
        drawPlayer();
        MovePlayer();
    }


    function BackgroundCreate(w,h,x,y,speed,type,img,sx,sy,sw,sh) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.type = type;
        this.img = img;
        this.sx = sx
        this.sy = sy
        this.sw = sw
        this.sh = sh

    }

    Background = new BackgroundCreate(500,500,0,0,5,0,background,0,0,300,300);
    Background2 = new BackgroundCreate(500,500,0,-500,5,0,background,0,0,300,300);
    Background3 = new BackgroundCreate(500,500,0,0,5,0,backgroundNuked,0,0,191,191);
    let gameSpeed = 1;

    function BackgroundScroll(){

        ctx.drawImage(Background.img,Background.sx,  Background.sy,  Background.sw, Background.sh, Background.x,  Background.y,  Background.w, Background.h);
        ctx.drawImage(Background2.img,Background2.sx,  Background2.sy,  Background2.sw, Background2.sh, Background2.x,  Background2.y,  Background2.w, Background2.h);

        Background.y+= gameSpeed;
        Background2.y+= gameSpeed;

        if(Background.y > 500){
            Background.y= -500 + Background2.y + gameSpeed;

            if (backgroundChange === true ){
                backgroundChange = false;
                Background.type++;
                if (Background.type > 11)
                {
                    Background.type = 5;
                }
                switch (Background.type) {
                    case 0:
                        Background.sx = 0;
                        Background.sy = 0;
                        break;
                    case 1:
                        Background.sx = 0;
                        Background.sy = 300;
                        break;
                    case 2:
                        Background.sx = 0;
                        Background.sy = 600;
                        break;
                    case 3:
                        Background.sx = 0;
                        Background.sy = 900;
                        break;
                    case 4:
                        Background.sx = 0;
                        Background.sy = 1200;
                        break;
                    case 5:
                        Background.sx = 300;
                        Background.sy = 0;
                        break;
                    case 6:
                        Background.sx = 300;
                        Background.sy = 300;
                        break;
                    case 7:
                        Background.sx = 300;
                        Background.sy = 600;
                        break;
                    case 8:
                        Background.sx = 300;
                        Background.sy = 900;
                        break;
                    case 9:
                        Background.sx = 300;
                        Background.sy = 1200;
                        break;
                    case 10:
                        Background.sx = 600;
                        Background.sy = 0;
                        break;
                    case 11:
                        Background.sx = 600;
                        Background.sy = 300;
                        break;
                }
            }

        }
        if (Background2.y > 500){
            Background2.y = -500 + Background.y + gameSpeed;
            if (backgroundChange2 === true){
                backgroundChange2 = false;
                Background2.type++;
                if (Background2.type > 11)
                {
                    Background2.type = 5;
                }
                switch (Background2.type) {
                    case 0:
                        Background2.sx = 0;
                        Background2.sy = 0;
                        break;
                    case 1:
                        Background2.sx = 0;
                        Background2.sy = 300;
                        break;
                    case 2:
                        Background2.sx = 0;
                        Background2.sy = 600;
                        break;
                    case 3:
                        Background2.sx = 0;
                        Background2.sy = 900;
                        break;
                    case 4:
                        Background2.sx = 0;
                        Background2.sy = 1200;
                        break;
                    case 5:
                        Background2.sx = 300;
                        Background2.sy = 0;
                        break;
                    case 6:
                        Background2.sx = 300;
                        Background2.sy = 300;
                        break;
                    case 7:
                        Background2.sx = 300;
                        Background2.sy = 600;
                        break;
                    case 8:
                        Background2.sx = 300;
                        Background2.sy = 900;
                        break;
                    case 9:
                        Background2.sx = 300;
                        Background2.sy = 1200;
                        break;
                    case 10:
                        Background2.sx = 600;
                        Background2.sy = 0;
                        break;
                    case 11:
                        Background2.sx = 600;
                        Background2.sy = 300;
                        break;
                }
            }
        }



        if (isNuked === true) {

            ctx.drawImage(Background3.img,Background3.sx,Background3.sy,Background3.sw,Background3.sh, Background3.x, Background3.y,Background3.w,Background3.h);
            Background3.sx += 191;
            if (Background3.sx >= 959){
                Background3.sx = 0;
                Background3.sy = 191;
            }
            if (Background3.sx >= 382 && Background3.sy === 191){
                Background3.sx = 0;
                Background3.sy = 0;
            }
            setTimeout(function () {
                isNuked = false;
            }, 450);

        }


    }

    function  mouse(){

            if (mouseMode === true) {
                mouseMode = false;
                mousecontrolsDisabled = true;
                myMouse.innerHTML = `Mouse Controls - OFF`;
                myMouse.style.background = "gray";
                canvas.style.cursor = "auto";


            } else {
                mouseMode = true;
                mousecontrolsDisabled = false;
                myMouse.innerHTML = `Mouse Controls - ON`;
                myMouse.style.background = "green";
                canvas.style.cursor = "none";
            }
    }











function powerPanel(){

        if (powerPanelActive === false){
            powerPanelActive = true;
            myPowerPanel.innerHTML = `Power Panel - ON`;
            myPowerPanel.style.background = "green";
            begin2();
        }
        else{
            powerPanelActive = false;
            myPowerPanel.innerHTML = `Power Panel - OFF`;
            myPowerPanel.style.background = "gray";
            begin2();
        }




    }




function secret(){

    secretSound.currentTime = 0;
    secretSound.play();

    let logo = document.getElementById("SiteLogo");
    logo.src = "SiteImages/LogoClicked.png"

    setTimeout(function () {
        let logo = document.getElementById("SiteLogo");
        logo.src = "SiteImages/Logo.png";
    }, 400);
}

    function quit(){
        if (isGamePaused === false) {

            if (mouseMode === true){
                mousecontrolsDisabled = true;
                canvas.style.cursor = "auto";
            }

            setTimeout(function(){
                    canvas.style.cursor = "auto";
                    mousecontrolsDisabled = true;
            },100);


            fullScreenMode = false;
            lives = 0;
            bossMode = false;
            BossMusic.pause();
            StartTheGame.pause();
            StartTheGame.currentTime = 0;
            BossMusic.currentTime = 0;

            if (Player.isDead === false) {
                gameOverSound.currentTime = 0;
                gameOverSound.play();
                Player.isDead = true;
            }
            isGameRunning = false;
            setTimeout(function (){
                isGamePaused=true;
            },50);
        }
    }


    function PauseResume(goingFullScreen = false){

        if (isGameRunning === true) {
            if (isGamePaused === true) {

                if (mouseMode === true) {
                    myMouse.innerHTML = `Mouse Controls - ON`;
                    myMouse.style.background = "green";
                    canvas.style.cursor = "none";
                    mousecontrolsDisabled = false;
                }

                isGamePaused = false;
                myPauseResume.innerHTML = "Pause";

                if (Level % waveTillBoss === 0) {

                    BossMusic.play();

                } else {
                    StartTheGame.play();
                }

                update();
            } else if (isGamePaused === false && goingFullScreen === false) {


                if (mouseMode === true){
                    myMouse.innerHTML = `Mouse Controls - OFF`;
                    myMouse.style.background = "gray";
                    canvas.style.cursor = "auto";
                    mousecontrolsDisabled = true;
                }



                keys = [];
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
                ctx.fillText(`PAUSED`, 175, 260);


                myPauseResume.innerHTML = "Resume";
                isGamePaused = true;
            }
        }
    }

    function Continue() {
        if (revives > 0){

            isGamePaused = false;
            revives--;
            if (points-5000 < 0){
                points = 0;
            }
            else{
                points -= 5000;
            }
            myContinue.innerHTML = `Revives - ${revives}`;
            yesContinue = true;
            if (revives === 0){
                myContinue.style.background = "gray";
            }
            beginGame();
        }
    }


    function beginGame(){


        runs = true;
        readySetGo.currentTime = 0;
        readySetGo.play();

        if (mouseMode === true){

            myMouse.innerHTML = `Mouse Controls - ON`;
            myMouse.style.background = "green";
            mousecontrolsDisabled = false;
            canvas.style.cursor = "none";
        }

        printing1 = true;
        Player.isDead = false;
        isGamePaused = false;
        isGameRunning = true;
        canvas.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.3)";

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

        Laser = [];
        BossFire = [];
        EnemyFire = [];
        Enemy = [];
        keys = [];

        nukes = 3;


        Player.amountOfShots = 1;
        Player.sharpness = 0;
        Player.bulletCount = 1;

        Player.x = canvas.width / 2 - 30;
        Player.y = canvas.height - 35;


        if(yesContinue === false){

            Player.amountOfShots =  1 ;
            Player.bulletCount = 1;
            Player.typeShip =  1 ;
            levelEnemyMixer = 1;
            Player.sx = Player2.sx = 0;
            Background.type = 0
            Background2.type = 0;
            gameSpeed = 1;
            revives = 3;
            myContinue.innerHTML = `Revives - ${revives}`;
            myContinue.style.background = "green";
            Player.ultraLaserSpeed = 0;

            StartTheGame.currentTime = 0;
            StartTheGame.play();
            switch (difficulty){
                    case 1:EasyMode();
                        break;
                    case 2:MediumMode();
                         break;
                    case 3:HardMode();
                         break;
            }
        }
        else{
            yesContinue = false;
            PowerUP = [];
            Player.amountOfShots =  rememberPlayer.amountOfShots ;
            Player.bulletCount =  rememberPlayer.bulletCount ;
            Player.typeShip =  rememberPlayer.typeShip ;
            Player.sharpness =  rememberPlayer.sharpness ;
            setTimeout(function (){
                Player2.sx = Player.sx;
            },200)


            switch (Player.typeShip) {
                case 1:
                    Player.sx = 0;
                    break;
                case 2:
                    Player.sx = 150;
                    break;
                case 3:
                    Player.sx = 300;
                    break;
                case 4:
                    Player.sx = 450;
                    break;
                case 5:
                    Player.sx = 600;
                    break;

            }
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
        mySettings.style.display = "none";
        myContinue.style.display = "none";
        myPauseResume.style.display = 'block';
        myQuit.style.display = 'block';
        myQuit.style.background = '#B7121F';
        myReset.style.background = '#B7121F';
        myReset.style.display = 'none';
        mySettings.style.display = "none";
        myFullScreen.style.display = 'block';
        myMouse.style.display = 'none';


        fillEnemies();
        if (firstTime === true)
        {
            firstTime = false;
            keyPressActions();
        }

        if (difficulty === 1){
            color = "#00bd0a";
        }
        else if (difficulty === 2){
            color = "#fac400"
        }
        else{
            color = "#fa4f00"
        }


        update();

    }


    function update(){


        if (isGamePaused === false) {


            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(Background.img, 0,0,50, 500, 0, 0,500,500);
            BackgroundScroll();
            checkHighscore(points, Level, difficulty);
            drawBoom();
            drawPower();
            drawLaser();
            newLaserPosition();


            if (printing1 === true) {
                if (printing3 === true) {
                    for (let i in PowerUP){
                        PowerUP[i].speed += 0.05;
                    }
                    gameSpeed--;
                    if (gameSpeed < 5){
                        gameSpeed = 1;
                        if (bossMode === true || (levelEnemyMixer === 7 && difficulty !== 3 && Level < 50)){
                            gameSpeed = 5;
                        }
                    }
                    Laser = [];
                    Boom = [];
                    numBooms = 0;
                    EnemyShots = 0;
                    Go();
                    amountOfPowerUPs = 0;

                    rememberPlayer.amountOfShots =  Player.amountOfShots ;
                    rememberPlayer.bulletCount =  Player.bulletCount ;
                    rememberPlayer.typeShip =  Player.typeShip ;
                    rememberPlayer.sharpness =  Player.sharpness ;

                    setTimeout(function () {
                        PowerUP = [];
                    }, 300);

                    setTimeout(function () {
                        printing1 = false;
                        printing2 = false
                        printing3 = false;
                        gameSpeed = 1;
                        if (bossMode === true || (levelEnemyMixer === 7 && difficulty !== 3 && Level < 50)){
                            gameSpeed = 5;
                        }
                    }, 600);
                }
                else if (printing2 === true) {


                    for (let i in PowerUP){
                        PowerUP[i].speed += 0.05;
                    }

                    for (let i in Laser){

                        Laser[i].speedY = gameSpeed * -1;

                    }

                    Set();
                    setTimeout(function () {
                        printing3 = true;

                    }, 600);
                }
                else{

                    for (let i in PowerUP){
                        PowerUP[i].speed += 0.05;
                    }
                    gameSpeed++
                    if (gameSpeed >= 15){
                        gameSpeed = 15;
                    }


                    for (let i in Laser){

                        Laser[i].speedY = gameSpeed*-1;
                    }

                    Ready();
                    setTimeout(function(){
                        printing2 = true;

                    }, 650);


                }

            }

            else {
                if (Level % waveTillBoss === 0) {
                    BossLogic();

                } else {
                    EnemyLogic();
                }
            }

            if (isGameRunning === true) {
                isPowerUP();
                PlayerLogic();
            } else {
                ctx.font = "40px VT323";
                ctx.fillStyle = 'red';
                ctx.fillText('GAME OVER', 175, 260);
                myButton.style.display = "block";

                if (Easy.style.display === "none"){
                    myOptions.style.display = "block";
                }
                myContinue.style.display = "block";
                showContinue = true;
                myReset.style.display = 'none';
                myQuit.style.display = 'none';
                myPauseResume.style.display = 'none';
                if (Level === 1 || difficulty === 3 ) {
                    myContinue.style.display = "none";
                    showContinue = false;
                }

                mySettings.style.display = "block";
                myFullScreen.style.display = 'none';
                myMouse.style.display = 'none';
                myPowerPanel.style.display = 'none';
            }

            scoreboard();



                requestAnimationFrame(update);




        }

    }

