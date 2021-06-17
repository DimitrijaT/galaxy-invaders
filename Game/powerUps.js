
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
                        if (amountOfShots+1 <= 6){
                            amountOfShots= amountOfShots +1;
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
                        playerBulletCount +=2;
                        if (playerBulletCount > 4){
                            playerBulletCount = 4;
                        }
                        PowerUP[i].Active = false;

                        break;

                    case 4:

                        points+=50;
                        powerUPSound.currentTime = 0;
                        powerUPSound.play();
                        nukes++;
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
    for (let i in PowerUP){
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

    for (let i in PowerUP){
        PowerUP[i].y+=PowerUP[i].speed;
    }

}

