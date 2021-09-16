const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = 250;
canvas2.height = 30;
PowerUP2 = [];
let Player2;
let powerPanelActive = false;

Player2 = {
    img : image,
    sx : 0,
    sy : 0,
    sw : 150,
    sh : 140
}

function  begin2(){

    if (powerPanelActive === false){
        canvas2.style.boxShadow = 'none';
        canvas2.style.marginBottom = '0';
        canvas2.style.display = 'none';

    }
    else {

        canvas2.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.3)";
        canvas2.style.borderRadius = '15px';
        canvas2.style.marginBottom = '3%';
        canvas2.style.display = 'block';

        for (let k = 0; k < 4; k++) {
            PowerUP2[k] = {
                sx: k * 40,
                sy: 0,
                sh: 40,
                sw: 40,
                img: fireUP
            }
        }

        update2();
    }

}



function update2(){
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);


    ctx2.drawImage(Background.img, 0,0,canvas2.width, canvas2.height, 0, 0,canvas2.width,canvas2.height);


    if (runs === true) {
        //1

        ctx2.fillStyle = 'black';
        ctx2.fillRect(25, 24, 50, -18);

        ctx2.fillStyle = '#B7121F';
        ctx2.fillRect(25, 24, Player.amountOfShots / 5 * 50, -18);

        ctx2.lineWidth = "2";
        ctx2.strokeStyle = color;
        ctx2.beginPath();
        ctx2.rect(25, 24, 50, -18);
        ctx2.stroke();

        let Result2 = `${Player.amountOfShots}`;
        ctx2.font = "20px VT323";
        ctx2.fillStyle = color;
        ctx2.fillText(Result2, 50, 21);

        ctx2.drawImage(PowerUP2[0].img, PowerUP2[0].sx, PowerUP2[0].sy, PowerUP2[0].sw, PowerUP2[0].sh, 15, 5, 20, 20);

        //2

        ctx2.fillStyle = 'black';
        ctx2.fillRect(105, 24, 50, -18);

        ctx2.fillStyle = '#B7121F';
        ctx2.fillRect(105, 24, Player.typeShip / 5 * 50, -18);

        ctx2.lineWidth = "2";
        ctx2.strokeStyle = color;
        ctx2.beginPath();
        ctx2.rect(105, 24, 50, -18);
        ctx2.stroke();

        let Result3 = `${Player.typeShip}`;
        ctx2.font = "20px VT323";
        ctx2.fillStyle = color;
        ctx2.fillText(Result3, 125, 21);


        ctx2.drawImage(image, Player2.sx, Player2.sy, Player2.sw, Player2.sh, 90, 7, 20, 20);

        //3

        ctx2.fillStyle = 'black';
        ctx2.fillRect(185, 24, 50, -18);

        ctx2.fillStyle = '#B7121F';
        ctx2.fillRect(185, 24, (Player.sharpness + startingLaserHealth + Player.ultraLaserSpeed) / 15 * 50, -18);

        ctx2.lineWidth = "2";
        ctx2.strokeStyle = color;
        ctx2.beginPath();
        ctx2.rect(185, 24, 50, -18);
        ctx2.stroke();

        let Result4 = `${Player.sharpness + startingLaserHealth + Player.ultraLaserSpeed}`;
        ctx2.font = "20px VT323";
        ctx2.fillStyle = color;
        ctx2.fillText(Result4, 205, 21);

        ctx2.drawImage(PowerUP2[2].img, PowerUP2[2].sx + 80, PowerUP2[2].sy, PowerUP2[2].sw, PowerUP2[0].sh, 170, 5, 20, 20);

    }
        if (powerPanelActive === true) {
            setTimeout(function () {

                requestAnimationFrame(update2);


            }, 500);
        }




}


