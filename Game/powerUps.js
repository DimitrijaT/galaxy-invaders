
//ENEMY LOOT
let amountOfPowerUPs = 0;
let PowerUP = [];

function isPowerUP(){
    for (let i in PowerUP){
        if (
            PowerUP[i].x >= Player.x-5 &&
            PowerUP[i].x <= Player.x + Player.w &&
            PowerUP[i].y +PowerUP[i].w >= Player.y &&
            PowerUP[i].y <= Player.y + Player.h &&
            PowerUP[i].Active === true){

                switch (PowerUP[i].typeOfPower){
                    case 1:

                        if (lives+1 <= maxLives) {
                            points += 200;
                            lives++;
                        }
                        points += 150;
                        lifeUPSound.currentTime = 0;
                        lifeUPSound.play();
                        PowerUP[i].Active = false;

                        break;

                    case 2:

                        powerUPSound.currentTime = 0;
                        powerUPSound.play();

                        if (Player.amountOfShots !== 5){
                            Player.amountOfShots++;
                            points+=100;
                        }
                        else{
                            points+=250;
                        }
                        PowerUP[i].Active = false;

                        break;
                    case 3:

                        points+=150;
                        shipUPSound.currentTime = 0;
                        shipUPSound.play();
                        if (Player.bulletCount === 1 || Player.bulletCount === 2){
                            Player.bulletCount +=1;
                        }
                        else{
                            Player.bulletCount +=2;
                        }

                        if (Player.bulletCount > 7){
                            Player.bulletCount = 7;
                        }
                        PowerUP[i].Active = false;

                        break;

                    case 4:

                        points+=50;
                        powerUPSound.currentTime = 0;
                        powerUPSound.play();
                        if (nukes <= 4){
                            nukes++;
                        }

                        PowerUP[i].Active = false;

                        break;
                    case 5:

                        points+=100;
                        powerUPSound.currentTime = 0;
                        powerUPSound.play();
                        if (Player.sharpness <= 12){
                            Player.sharpness++;
                        }
                        PowerUP[i].Active = false;

                        break;
                    case 6:
                        points += 200;

                        time = 5000;
                        MaxTime = time;
                        powerUPSound.currentTime = 0;
                        powerUPSound.play();
                        Player.unkillable = true;

                        clearTimeout(DamageShield);

                        DamageShield = setTimeout(function(){
                            Player.unkillable = false;
                        }, time);
                        PowerUP[i].Active = false;
                        break;

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
            PowerUP[amountOfPowerUPs].x = BossFire[eX].x + BossFire[eX].w / 2 - 5;
            PowerUP[amountOfPowerUPs].y = BossFire[eX].y;
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


    if (Math.ceil(Math.random() * 6) === 1  && bossMode !== true){ //no lifeUPS when vs. Boss
        PowerUP[amountOfPowerUPs].typeOfPower = 1 //lifeUP
    }
    else if (Math.ceil(Math.random() * 6) === 1){
        PowerUP[amountOfPowerUPs].typeOfPower = 3;  //shipUP
    }
    else if (Math.ceil(Math.random() * 15) === 1){
        PowerUP[amountOfPowerUPs].typeOfPower = 4;  //bombUP
    }
    else if (Math.ceil(Math.random() * 5) === 1){
        PowerUP[amountOfPowerUPs].typeOfPower = 5;  //sharpnessPower
    }
    else if (Math.ceil(Math.random() * 5) === 1) {
        PowerUP[amountOfPowerUPs].typeOfPower = 6;  //SHIELDUP
    }
        else{
        PowerUP[amountOfPowerUPs].typeOfPower = 2;  //fireUP
    }
    amountOfPowerUPs++;
}
function drawPower(){
    for (let i in PowerUP){
        if (PowerUP[i].y >= canvas.height) {
            PowerUP[i].Active = false;
        }
        if (PowerUP[i].Active === true) {

            switch (PowerUP[i].typeOfPower){
                case 1:
                    ctx.drawImage(lifeUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                    break;

                case 2:
                    ctx.drawImage(fireUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                    break;

                case 3:
                    ctx.drawImage(shipUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                    break;

                case 4:
                    ctx.drawImage(bombUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                    break;

                case 5:
                    ctx.drawImage(sharpnessPower, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                    break;
                case 6:
                    ctx.drawImage(shieldUP, PowerUP[i].x, PowerUP[i].y, PowerUP[i].w, PowerUP[i].h);
                    break;
            }
        }
    }
}
function newPowerPosition() {

    for (let i in PowerUP){
        PowerUP[i].y+=PowerUP[i].speed;
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
    if (bossMode === true){
        Boom[numBooms] = new BoomConstructor(
            200,
            200,
            Boss.x-Boss.w/2+100,
             Boss.y-Boss.h,
            true,
            Math.ceil(Math.random() * 2));
    }
    else{
        Boom[numBooms] = new BoomConstructor(
            40,
            40,
            Enemy[eX].x + Enemy[eX].w / 2 - 5,
            Enemy[eX].y,
            true,
            Math.ceil(Math.random() * 2));
    }

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

            let timeout;
            if (bossMode === true){
                timeout = 500;
            }
            else{
                timeout = 300;
            }

            setTimeout(function(){
                Boom[i].Active = false;
            }, timeout);

        }
    }
}

