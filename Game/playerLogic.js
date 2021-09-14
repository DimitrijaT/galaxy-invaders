//PLAYER CONTROLS AND CREATION
let Player = {
    w:40,
    h:30,
    x:canvas.width/2-30,
    y:canvas.height-35,
    speed:5,
    dx:0,
    dy:0,
    unkillable: false,
    isDead: false,
    shootingMode: false,
    amountOfShots: 1,
    bulletCount: 1,
    typeShip: 1,
    sharpness: 0,
    sx:  0,
    sy : 0,
    sw : 150,
    sh : 140
}

function MovePlayer(){


    if (keys['ArrowLeft'] ){
        if (Player.x >= 0){
            Player.dx=Player.speed*-1;
        }

    }
    else if (keys['ArrowRight'] ){
        if (Player.x + Player.w  <= canvas.width){
            Player.dx=Player.speed;
        }

    }

    if (keys['ArrowUp'] ){
        if (Player.y >= 0){
            Player.dy=Player.speed*-1;
        }

    }
    else if (keys['ArrowDown'] ){
        if (Player.y + Player.h <= canvas.height  ) {
            Player.dy=Player.speed;
        }
    }


        Player.x += Player.dx;
        Player.y += Player.dy;


    Player.dx = 0;
    Player.dy = 0;




}


function drawPlayer(){

    if (Player.shootingMode === true){
        Player.sy += 140;

    }
    if(Player.sy >= 675 || Player.shootingMode === false){
        Player.sy = 0;
    }


    ctx.drawImage(image,Player.sx,Player.sy,Player.sw,Player.sh,Player.x,Player.y,Player.w,Player.h);

    if (Player.unkillable === true) {
        ctx.drawImage(invic, Player.x - 10, Player.y - 10, Player.w + 20, 20);
    }
}

let DamageShield


function takeDamage(x = 1){
    Player.unkillable = true;

    Player.sx -=150;

    if (Player.sx <= 0){
        Player.sx =0;
    }

    Player.typeShip--;

    if ( Player.typeShip < 1){
        Player.typeShip = 1;
    }

    time = 2100;
    MaxTime = time;
    clearTimeout(DamageShield);

    DamageShield = setTimeout(function(){
        Player.unkillable = false;
    }, time);

    lives -= x;

    if (points - 100 < 0){
        points = 0;
    }
    else{
        points -= 100;
    }

    if (Player.sharpness >= 1){
        Player.sharpness--;
    }
    deathSound.currentTime = 0;
    deathSound.play();
    if (Player.amountOfShots > 1){
        Player.amountOfShots--;
    }
    if (Player.bulletCount >= 2){
        if (Player.bulletCount === 2 || Player.bulletCount === 3) {
            Player.bulletCount--;
        }
        else{
            Player.bulletCount-=2;
        }
    }
}





function nukeTheMap(){
    if (isGamePaused === false && isGameRunning === true) {

        if (nukes !== 0) {
            nukes--;
            isNuked = true;

            LaserShot = 0;
            EnemyShots = 0;
            BossShots = 0;

            BossFire = [];
            EnemyFire = [];


            if (Level % waveTillBoss === 0) {
                Boss.isDamaged = true;
                Boss.Health -= 10;
                createExplosion(0);
                points += 100 * scoreMultiplier;
                enemyExplode[0].currentTime = 0;
                enemyExplode[0].play();
            } else {

                for (let i in Enemy) {
                    if (Enemy.hasOwnProperty(i)) {
                        if ((Enemy[i].Health <= 1 && Enemy[i].isDead === false) || (difficulty === 1 && Enemy[i].isDead === false)) {

                            createExplosion(i);
                            Enemy[i].isDead = true;
                            points += 100 * scoreMultiplier;


                            enemyExplode[i % 5].currentTime = 0;
                            enemyExplode[i % 5].play();
                            if (Math.ceil(Math.random() * chanceOfPower) <= 10) {
                                generatePower(i, false);
                            }
                        } else {
                            Enemy[i].Health--;
                            Enemy[i].isDamaged = true;
                            enemyHurtSound[i % 5].currentTime = 0;
                            enemyHurtSound[i % 5].play();
                        }

                    }
                }

            }
        }
    }
}

let LaserShot = 0;
let CoolDown = false;
let Laser = [];
let SoundCounter = 0;

function LaserConstructor(w,h,x,y,speedY,speedX,Active,Health,sx=1,sy=0,sw=50,sh=75,img=laser){
    this.w =  w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.speedY = speedY;
    this.speedX = speedX;
    this.Active = Active;
    this.Health = Health;
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;
    this.img = img;
}

function Shoot(){
    if (isGamePaused === false && isGameRunning === true) {
        if (CoolDown === false) {
            Player.shootingMode = true;
            setTimeout(function (){
                Player.shootingMode = false;
                Player.sy = 0;
            },100)

            let sharpnessPointsToSpend = Player.sharpness;

            SoundCounter++;

            if (Player.bulletCount >= 6) {
                shootLaser2[SoundCounter % 5].currentTime = 0;
                shootLaser2[SoundCounter % 5].play();
            } else {
                shootLaser[SoundCounter % 5].currentTime = 0;
                shootLaser[SoundCounter % 5].play();
            }

            Laser[LaserShot] = new LaserConstructor(
                10,
                25,
                Player.x + Player.w / 2 - 5,
                Player.y,
                playerLaserSpeed,
                0,
                true,
                startingLaserHealth,
                0,
                0,
                50,
                75,
                laser);

            if (sharpnessPointsToSpend <= 3) {
                Laser[LaserShot].Health += sharpnessPointsToSpend
            } else {
                Laser[LaserShot].Health = 4;
            }

            if (Player.bulletCount >= 2) {
                Laser[LaserShot].x -= 15;
                Laser[LaserShot + 1] = new LaserConstructor(
                    10,
                    25,
                    Player.x + Player.w / 2 + 10,
                    Player.y,
                    playerLaserSpeed,
                    0,
                    true,
                    startingLaserHealth,
                    0,
                    0,
                    50,
                    75,
                    laser);


                if (sharpnessPointsToSpend <= 3) {
                    Laser[LaserShot + 1].Health += sharpnessPointsToSpend
                } else {
                    Laser[LaserShot + 1].Health = 4;
                }


            }
            sharpnessPointsToSpend -= Laser[LaserShot].Health - 1;


            if (Player.bulletCount >= 3) {

                Laser[LaserShot].speedX = 0.3;
                Laser[LaserShot + 1].speedX = -0.3;

                Laser[LaserShot + 2] = new LaserConstructor(
                    15,
                    25,
                    Player.x + Player.w / 2 - 7,
                    Player.y - 5,
                    playerLaserSpeed,
                    0,
                    true,
                    1,
                    0,
                    0,
                    50,
                    75,
                    laser);


                if (sharpnessPointsToSpend <= 3) {
                    Laser[LaserShot + 2].Health += sharpnessPointsToSpend
                } else {
                    Laser[LaserShot + 2].Health = 4;
                }
                sharpnessPointsToSpend -= Laser[LaserShot + 2].Health - 1;

            }


            if (Player.bulletCount >= 4) {

                Laser[LaserShot + 3] = new LaserConstructor(
                    10,
                    20,
                    Player.x + Player.w / 2 - 25,
                    Player.y + 15,
                    playerLaserSpeed,
                    0.3,
                    true,
                    1,
                    0,
                    0,
                    50,
                    75,
                    laser);

                Laser[LaserShot + 4] = new LaserConstructor(
                    10,
                    20,
                    Player.x + Player.w / 2 + 15,
                    Player.y + 15,
                    playerLaserSpeed,
                    -0.3,
                    true,
                    1,
                    0,
                    0,
                    50,
                    75,
                    laser);

                if (sharpnessPointsToSpend <= 3) {
                    Laser[LaserShot + 3].Health += sharpnessPointsToSpend;
                    Laser[LaserShot + 4].Health += sharpnessPointsToSpend;
                } else {
                    Laser[LaserShot + 3].Health = 4;
                    Laser[LaserShot + 4].Health = 4;
                }
                sharpnessPointsToSpend -= Laser[LaserShot + 3].Health - 1;

            }


            if (Player.bulletCount >= 6) {

                Laser[LaserShot + 1].x -= 3;

                Laser[LaserShot].h = 30;
                Laser[LaserShot].w = 20;

                Laser[LaserShot].h = 25;
                Laser[LaserShot].w = 15;

                Laser[LaserShot + 1].h = 25;
                Laser[LaserShot + 1].w = 15;

                Laser[LaserShot + 5] = new LaserConstructor(
                    10,
                    20,
                    Player.x + Player.w / 2 - 35,
                    Player.y + 30,
                    playerLaserSpeed,
                    0.3,
                    true,
                    1,
                    0,
                    0,
                    50,
                    75,
                    laser);

                Laser[LaserShot + 6] = new LaserConstructor(
                    10,
                    20,
                    Player.x + Player.w / 2 + 25,
                    Player.y + 30,
                    playerLaserSpeed,
                    -0.3,
                    true,
                    1,
                    0,
                    0,
                    50,
                    75,
                    laser);

                if (sharpnessPointsToSpend <= 3) {
                    Laser[LaserShot + 5].Health += sharpnessPointsToSpend;
                    Laser[LaserShot + 6].Health += sharpnessPointsToSpend;
                } else {
                    Laser[LaserShot + 5].Health = 4;
                    Laser[LaserShot + 6].Health = 4;
                }

            }


            LaserShot = LaserShot + Player.bulletCount;

        }
    }

}


function drawLaser(){
    let count = 0;
    let countGroup = 0;

    for (let i in Laser) {
        if (Laser[i].y <= 0){
            Laser[i].Active = false;
        }
        if (Laser[i].Active === true) {

            switch (Laser[i].Health){
                case 4:
                    Laser[i].sx = 150;
                    break;
                case 3:
                    Laser[i].sx = 100;
                    break;
                case 2:
                    Laser[i].sx = 50;
                    break;
                default:
                    Laser[i].sx = 0;
                    break;
            }

            Laser[i].sy+=75;
            if (Laser[i].sy >= 150){
                Laser[i].sy = 0;
            }

            ctx.drawImage(Laser[i].img, Laser[i].sx, Laser[i].sy, Laser[i].sw, Laser[i].sh, Laser[i].x, Laser[i].y, Laser[i].w, Laser[i].h);

            countGroup++;
            if (countGroup === Player.bulletCount){
                count++;
                countGroup = 0;
            }
        }
    }

    CoolDown = count >= Player.amountOfShots;


}

function newLaserPosition(){
    for (let i in Laser){
        if (Laser[i].Active === true){
            Laser[i].y-=Laser[i].speedY;
            Laser[i].x-=Laser[i].speedX;
        }
    }
}
let rememberSpeed;
let flagSpeed=false;
let hacks1 = false;
let hacks2 = false;
let keys = [];


function keyPressActions(){

    if (isGamePaused === false && isGameRunning === true) {

        //MOVEMENT

        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown'  ) {
                e.preventDefault();
                keys[e.key] = true;
            } else if (e.key === ' ') {
                e.preventDefault();
                if (printing1 === false && printing2 === false && printing3 === false){
                    Shoot();
                }
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                if (isNuked === false){
                    nukeTheMap();
                }

            }
            if (e.key === 'P' || e.key === 'p'){
                e.preventDefault();
                PauseResume();
            }
            if (e.key === 'j'){
                hacks1 = true;
            }
            if (hacks1 === true){
                if (e.key === 'o'){
                    hacks2 = true;
                }
                if (hacks2 === true){
                    if (e.key === '1'){
                        grantPower(1);
                    }
                    else if (e.key === '2'){
                        grantPower(2);
                    }
                    if (e.key === '3'){
                        grantPower(3);
                    }
                    if (e.key === '4'){
                        grantPower(4);
                    }
                    if (e.key === '5'){
                        grantPower(5);
                    }
                    if (e.key === '6'){
                        grantPower(6);
                    }
                    if (e.key === '-'){
                        takeDamage(1);
                    }
                    if (e.key === 'b'){
                        Laser = [];
                        BossFire = [];
                        EnemyFire = [];
                        Enemy = [];
                        BossMusic.pause();



                        if (Level%waveTillBoss !== 0){
                            for (let i in Enemy){
                                if (Enemy[i].isDead===false){
                                    Enemy[i].isDead = true;
                                }
                            }
                        }

                        Level = 9;
                        ifLevelBeaten(true);
                    }
                    if (e.key === 'v'){
                        for (let i in Enemy){
                            Enemy[i].Health++;
                        }
                    }

                    if (e.key === 'c'){
                        console.log(rememberSpeed);

                        if (flagSpeed === false) {
                            flagSpeed = true;
                            rememberSpeed = Enemy[0].speed;
                        }
                        else{
                            flagSpeed = false;
                        }

                        for (let i in Enemy){
                            if (flagSpeed === true) {
                                Enemy[i].speed = 0;
                            }
                            else{
                                Enemy[i].speed = rememberSpeed;
                            }
                        }


                    }
                }

            }
        });
        document.addEventListener('keyup', function (e) {
            delete keys[e.key];
        });









        //MOUSE CONTROLS

        if (mouseControls === true) {
            document.addEventListener('click', function (e){
                e.preventDefault();
                if (printing1 === false && printing2 === false && printing3 === false){
                    Shoot();
                }
            });

            canvas.addEventListener("mousemove", function (e) {
                let cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
                let canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas
                let canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make
                ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas

                Player.x = canvasX;
                Player.y = canvasY;

            });

        }


        //PHONE CONTROLS
        canvas.addEventListener('touchstart', handleTouchEvent, true);
        canvas.addEventListener('touchmove', handleTouchEvent, true);
        canvas.addEventListener('touchend', letGo, true);
        canvas.addEventListener('touchcancel', handleTouchEvent, true);
        canvas.addEventListener('touchstart', handleTouchEvent,true)


        function handleTouchEvent(e){
            e.preventDefault();
            e.stopPropagation();
            let touch;
            let shoot;
            switch (e.touches.length) {
                case 1:
                    touch = e.touches[0];

                    console.log(touch.clientX + "  " + touch.clientY + "   " + canvas.clientWidth + "-" + canvas.clientHeight + " " + (canvas.clientHeight - canvas.clientHeight / 4));
                    if (printing1 === false && printing2 === false && printing3 === false){
                         ShootInterval = true;
                    }


                    /*
                    if (fullscreenOptimize === true) {



                        if (e.touches[0].pageX - canvas.width - Player.w/2 <= canvas.width - Player.w  &&
                            e.touches[0].pageX - canvas.width - Player.w/2 >= 0 &&
                            e.touches[0].pageY - canvas.height  - Player.h/2 >= 0 &&
                            e.touches[0].pageY  - canvas.height- Player.h/2 <= canvas.height - Player.h ) {

                            Player.x= e.touches[0].pageX  - Player.w/2;
                            Player.y= e.touches[0].pageY  - Player.h/2;
                        }


                    }
                    else{ */
                        if (e.touches[0].pageX - canvas.offsetLeft - Player.w/2 <= canvas.width - Player.w + 5 &&
                            e.touches[0].pageX - canvas.offsetLeft - Player.w/2 >= 0 - 5&&
                            e.touches[0].pageY - canvas.offsetTop - Player.h/2 >= 0 - 5&&
                            e.touches[0].pageY - canvas.offsetTop - Player.h/2 <= canvas.height - Player.h + 5) {

                            Player.x= e.touches[0].pageX - canvas.offsetLeft - Player.w/2;
                            Player.y= e.touches[0].pageY - canvas.offsetTop - Player.h/2;
                        }
                    //}




                    e.preventDefault();
                    e.stopPropagation();




                    break;
                case 2:
                    touch = e.touches[0];
                    shoot = e.touches[1];


                    if (isNuked === false){
                        nukeTheMap();
                    }

            }

        }

        function letGo(){
           ShootInterval = false;

        }



    }

}

let ShootInterval;
setInterval(function (){
    if (ShootInterval === true){
        Shoot();
    }
},100)


