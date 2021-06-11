    //MAIN SETUP
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    const image =  document.getElementById('Player');

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
        amountOfShots = 4;
        myButton.style.display = "none";
        myOptions.style.display = "none";
        update();
    }

    //MAIN LOOP FUNCTION:
    function update(){
        if (isGameRunning === true) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(background, 0 ,0);

            drawPlayer();
            newPosition();

            requestAnimationFrame(update);
        }

    }

