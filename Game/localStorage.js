


let highScore = [];
highScore[1] = {
    points:  (localStorage.getItem('Epoints')  == null)?'0':localStorage.getItem('Epoints'),
    level:  (localStorage.getItem('Elevel')  == null)?'0':localStorage.getItem('Epoints')
}
highScore[2] = {
    points:  (localStorage.getItem('Mpoints')  == null)?'0':localStorage.getItem('Mpoints'),
    level:  (localStorage.getItem('Mlevel')  == null)?'0':localStorage.getItem('Mlevel')
}
highScore[3] = {
    points:  (localStorage.getItem('Hpoints')  == null)?'0':localStorage.getItem('Hpoints'),
    level:  (localStorage.getItem('Hlevel')  == null)?'0':localStorage.getItem('Mlevel')
}


let isEmpty = true;
for (let i=1;i<=3;i++){
    if (highScore[i].points !== '0' || highScore[i].level !== '0')
    {
        isEmpty= false;
        break;
    }
}
if (isEmpty === true){
    myReset.style.background = 'gray';
}


    document.getElementById('Epoints').innerHTML = highScore[1].points;
    document.getElementById('Elevel').innerHTML = highScore[1].level;

    document.getElementById('Mpoints').innerHTML = highScore[2].points;
    document.getElementById('Mlevel').innerHTML = highScore[2].level;

    document.getElementById('Hpoints').innerHTML = highScore[3].points;
    document.getElementById('Hlevel').innerHTML = highScore[3].level;



function checkHighscore(pointsX,levelX,diffX){
    for (let i=1;i<=3;i++) {

        if ((i === diffX) && (levelX >= highScore[i].level)){

            //alert(i + ' === ' + diffX + '&&  ' + levelX + '>= ' + highScore[i].level );

            if (highScore[i].points < pointsX) {
                highScore[i].points = pointsX;
            }

            highScore[i].level = levelX;

            let pointString = "points";
            let levelString = "level";

            if (i === 1){
                pointString = "E" + pointString;
                levelString = "E" + levelString;
            }
            else if (i === 2){
                pointString = "M" + pointString;
                levelString = "M" + levelString;
            }
            else{
                pointString = "H" + pointString;
                levelString = "H" + levelString;
            }

            document.getElementById(pointString).innerHTML = highScore[i].points;
            document.getElementById(levelString).innerHTML = highScore[i].level;

            localStorage.setItem(pointString, highScore[i].points);
            localStorage.setItem(levelString, highScore[i].level);


        }
    }

}