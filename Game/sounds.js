//SOUNDS
let StartTheGame = new Audio();
StartTheGame.src = 'Sounds/SpaceAmbience.mp3';
let BossMusic = new Audio();
BossMusic.src = 'Sounds/BossMusic.mp3';
let Boss3Music = new Audio();
Boss3Music.src = 'Sounds/MotherShip3Theme.mp3';
let deflectSound = new Audio();
deflectSound.src = 'Sounds/deflect.mp3';
let deathSound = new Audio();
deathSound.src = 'Sounds/death.wav';
let motherShipDeathSound = new Audio();
motherShipDeathSound.src = 'Sounds/MotherShipDeath.mp3';
let lifeUPSound = new Audio();
lifeUPSound.src = 'Sounds/lifeUP.mp3';
let powerUPSound = new Audio();
powerUPSound.src = 'Sounds/powerUP.mp3';
let shipUPSound = new Audio();
shipUPSound.src = 'Sounds/shipUP.mp3';
let gameOverSound = new Audio();
gameOverSound.src = 'Sounds/gameOver.mp3';

let shootLaser  = [];
let shootLaser2  = [];
let enemyExplode = [];
let enemyHurtSound = [];
let motherShipHit = [];
let motherShip3Hit = [];
let summonHit = [];
let motherShipHeal = [];
for (let i=0;i<5;i++){

    motherShipHit[i] = new Audio();
    motherShipHit[i].src = 'Sounds/MotherShipHit.mp3';

    motherShip3Hit[i] = new Audio();
    motherShip3Hit[i].src = 'Sounds/MotherShip3Hit.mp3';

    summonHit[i] = new Audio();
    summonHit[i].src = 'Sounds/SummonHit.mp3';

    motherShipHeal[i] = new Audio();
    motherShipHeal[i].src = 'Sounds/MotherShipHeal.mp3';
    shootLaser[i] = new Audio();
    shootLaser[i].src = 'Sounds/shootLaser.mp3';
    shootLaser2[i] = new Audio();
    shootLaser2[i].src = 'Sounds/shootLaser2.mp3';
    enemyExplode[i] = new Audio();
    enemyExplode[i].src = 'Sounds/boom.mp3';
    enemyHurtSound[i] = new Audio();
    enemyHurtSound[i].src = 'Sounds/enemyHurt.mp3';


}