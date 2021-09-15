const image =  document.getElementById('Player');
const enemy =  document.getElementById('Enemy');
const laser = document.getElementById('Laser');
const motherShip =  document.getElementById('MotherShip');
const enemyLaser = document.getElementById('EnemyLaser');
const invic = document.getElementById('InviciBubble');
const fireUP = document.getElementById('FirePower');
const background = document.getElementById( 'Space');
const backgroundNuked = document.getElementById( 'SpaceNuked');

let maxLives;
let points = 0;
let lives = 3;
let revives = 3;
let isGameRunning = false;
let RateOfFire = 300;   //Enemy Rate of Fire
let enemySpeed = 3;
let scoreMultiplier = 1;
let enemyProjectileSpeed = 3;
let Level = 1;
let time;
let MaxTime;
let chanceOfPower = 60;
let gainLifePerStage = 0;
let waveTillBoss = 5;
let EnemyHealth = 1;
let BossHealthBoost = 20;
let startingLaserHealth = 1;
let nukes = 3;
let isNuked = false;
let difficulty = 1; //1- Easy  2-Medium   3-Hard
let fullScreenMode = false;
let isGamePaused = true;
let yesContinue = false;
let firstTime = true;
let playerLaserSpeed = 4;
let printing1, printing2, printing3 = false;
let color;
let mousecontrolsDisabled = true;
let mouseMode = false;
let runs = false;
let rememberPlayer = Player;


myButton = document.getElementById('StartGame');

myMouse = document.getElementById('MouseONOFF');

mySettings = document.getElementById('Settings');
myFullScreen = document.getElementById('FullScreen');
myReset = document.getElementById('Reset');
myPauseResume = document.getElementById('PauseResume');

myQuit = document.getElementById('Quit');

myOptions = document.getElementById('Options');
Easy = document.getElementById('Easy');
Medium = document.getElementById('Medium');
Hard = document.getElementById('Hard');
myContinue = document.getElementById('Continue');
myStartTheGame = document.getElementById('StartGame');

let Ready = function(){
    let Result = `READY?`;
    ctx.font = "40px VT323";
    ctx.fillStyle= color;
    ctx.fillText(Result,210,200)};

let Set = function(){
    let Result = `SET`;
    ctx.font = "40px VT323";
    ctx.fillStyle= color;
    ctx.fillText(Result,210,230)};


let Go =  function(){
    let Result = `GO!!!`;
    ctx.font = "40px VT323";
    ctx.fillStyle= color;
    ctx.fillText(Result,210,260)};