const image =  document.getElementById('Player');
const image2 =  document.getElementById('PlayerLevel2');
const image3 =  document.getElementById('PlayerLevel3');

const enemy =  document.getElementById('Enemy');
const enemyHurt =  document.getElementById('EnemyHurt');

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

const enemyshoots =  document.getElementById('EnemyShooting');
const laser = document.getElementById('Laser');
const laserPiercing1 = document.getElementById('LaserPiercing1');
const laserPiercing2 = document.getElementById('LaserPiercing2');
const enemyLaser = document.getElementById('EnemyLaser');
const invic = document.getElementById('InviciBubble');
const lifeUP = document.getElementById('LifeUP');
const bombUP = document.getElementById('BombUP');
const fireUP = document.getElementById('FirePower');
const shipUP = document.getElementById('ShipUP');
const enemyDeath1 = document.getElementById('EnemyExplode1');
const enemyDeath2 = document.getElementById('EnemyExplode2');
const background = document.getElementById( 'Space');
const backgroundNuked = document.getElementById( 'SpaceNuked');

let maxLives;
let points = 0;
let lives = 3;
let revives = 3;
let isGameRunning = false;
let unkillable = false;
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
let playerBulletCount = 0;
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
