const image =  document.getElementById('Player');
const image2 =  document.getElementById('PlayerLevel2');
const image3 =  document.getElementById('PlayerLevel3');
const image4 =  document.getElementById('PlayerLevel4');
const image5 =  document.getElementById('PlayerLevel5');

const enemy =  document.getElementById('Enemy');
const enemyHurt =  document.getElementById('EnemyHurt');
const enemyshoots =  document.getElementById('EnemyShooting');

const enemy2 =  document.getElementById('Enemy2');
const enemyHurt2 =  document.getElementById('EnemyHurt2');
const enemyshoots2 =  document.getElementById('EnemyShooting2');

const enemy3 =  document.getElementById('Enemy3');
const enemyHurt3 =  document.getElementById('EnemyHurt3');
const enemyshoots3 =  document.getElementById('EnemyShooting3');


const enemy4 =  document.getElementById('Enemy4');
const enemyHurt4 =  document.getElementById('EnemyHurt4');
const enemyshoots4 =  document.getElementById('EnemyShooting4');

const enemy5 =  document.getElementById('Enemy5');
const enemyHurt5 =  document.getElementById('EnemyHurt5');
const enemyshoots5 =  document.getElementById('EnemyShooting5');
const enemyshield5 =  document.getElementById('EnemyShield5');


const motherShip =  document.getElementById('MotherShip');
const motherShipHurt =  document.getElementById('MotherShipHurt');
const bossLaser =  document.getElementById('BossLaser');

const motherShip2 =  document.getElementById('MotherShip2');
const motherShip2Hurt =  document.getElementById('MotherShip2Hurt');
const motherShip2Heal =  document.getElementById('MotherShip2Heal');
const motherShip2Angry =  document.getElementById('MotherShip2Angry');
const boss2Fire =  document.getElementById('Boss2Fire');

const motherShip3 =  document.getElementById('MotherShip3');
const motherShip3Hurt =  document.getElementById('MotherShip3Hurt');
const motherShip3Protected =  document.getElementById('MotherShip3Protected');
const motherShip3Angry =  document.getElementById('MotherShip3Angry');
const motherShip3Heal =  document.getElementById('MotherShip3Heal');
const boss3Fire =  document.getElementById('Boss3Fire');
const boss3FireHurt =  document.getElementById('Boss3FireHurt');
const boss3FireSleep =  document.getElementById('Boss3FireSleep');
const boss3FireAngry =  document.getElementById('Boss3FireAngry');
const boss3FireAttack =  document.getElementById('boss3FireAttack');

const laser = document.getElementById('Laser');
const laserPiercing1 = document.getElementById('LaserPiercing1');
const laserPiercing2 = document.getElementById('LaserPiercing2');
const laserPiercing3 = document.getElementById('LaserPiercing3');

const enemyLaser = document.getElementById('EnemyLaser');
const enemyLaser5 = document.getElementById('enemyFire5');

const sharpnessPower = document.getElementById('SharpnessPower');
const invic = document.getElementById('InviciBubble');
const lifeUP = document.getElementById('LifeUP');
const bombUP = document.getElementById('BombUP');
const fireUP = document.getElementById('FirePower');
const shipUP = document.getElementById('ShipUP');
const enemyDeath1 = document.getElementById('EnemyExplode1');
const enemyDeath2 = document.getElementById('EnemyExplode2');
const background = document.getElementById( 'Space');
const background1 = document.getElementById( 'Space1');
const background2 = document.getElementById( 'Space2');
const background3 = document.getElementById( 'Space3');
const background4 = document.getElementById( 'Space4');
const background5 = document.getElementById( 'Space5');


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
let amountOfShots = 1;
let rememberAmountOfShots;
let chanceOfPower = 60;
let gainLifePerStage = 0;
let waveTillBoss = 5;
let rememberPlayerBulletCount;
let EnemyHealth = 1;
let BossHealthBoost = 20;
let startingLaserHealth = 1;
let nukes = 3;
let rememberNukes;
let isNuked = false;
let difficulty = 1; //1- Easy  2-Medium   3-Hard
let fullScreenMode = false;
let isGamePaused = true;
let yesContinue = false;
let firstTime = true;
let playerLaserSpeed = 4;
let mouseControls = false;
let rememberSharpness;
let printing1, printing2, printing3 = false;
let color;


myButton = document.getElementById('StartGame');
myOptions = document.getElementById('Options');
myFullScreen = document.getElementById('FullScreen');
myReset = document.getElementById('Reset');
myPauseResume = document.getElementById('PauseResume');
myQuit = document.getElementById('Quit');
Easy = document.getElementById('Easy');
Medium = document.getElementById('Medium');
Hard = document.getElementById('Hard');
myContinue = document.getElementById('Continue');

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