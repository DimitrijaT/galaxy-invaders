const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

canvas2.width = 250;
canvas2.height = 30;
PowerUP2 = [];

function  begin2(){

    canvas2.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.3)";
    canvas2.style.borderRadius = '15px';
    canvas2.style.marginBottom = '3%';
    canvas2.style.display = 'block';

    for (let k = 0; k<4;k++){
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



function update2(){
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);


    ctx2.drawImage(Background.img, 0,0,canvas2.width, canvas2.height, 0, 0,canvas2.width,canvas2.height);

    ctx2.drawImage(PowerUP2[0].img,PowerUP2[0].sx,PowerUP2[0].sy,PowerUP2[0].sw,PowerUP2[0].sh,35,5,20,20);

    let Result2 = `${Player.amountOfShots}`;
    ctx2.font = "20px VT323";
    ctx2.fillStyle= color;
    ctx2.fillText(Result2,65,21);

    ctx2.drawImage(image,Player.sx,Player.sy,Player.sw,Player.sh,105,7,20,20);

    let Result3 = `${Player.typeShip}`;
    ctx2.font = "20px VT323";
    ctx2.fillStyle= color;
    ctx2.fillText(Result3,135,21);

    ctx2.drawImage(PowerUP2[2].img,PowerUP2[2].sx+80,PowerUP2[2].sy,PowerUP2[2].sw,PowerUP2[0].sh,175,5,20,20);

    let Result4 = `${Player.sharpness}`;
    ctx2.font = "20px VT323";
    ctx2.fillStyle= color;
    ctx2.fillText(Result4,205,21);

    requestAnimationFrame(update2);


}


