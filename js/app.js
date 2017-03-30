// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.x + (this.speed * dt);
    //console.log(this.x);

};

Enemy.prototype.checkCollisions = function(player){
    if (Math.floor(player.y) === Math.floor(this.y) && (Math.floor(this.x -50.5) <= player.x) && (Math.floor(this.x + 50.5) >= player.x)){
        console.log("collision");
        player.x = 202;
        player.y = 415;
        player.score -=10;
        console.log("The score is " + player.score);
    }
}

Enemy.prototype.loopAround = function(player){

    if (this.x > 700 && player.y >=83){
        this.x = Math.random() * 30;
        this.speed = Math.random() * 100 + 150
    }

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y){
    this.boy = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
};

Player.prototype.update = function(){
    this.x = this.x;
    this.y = this.y;
    //console.log(this.x);
    //console.log(this.y);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.boy), this.x, this.y);
};

Player.prototype.handleInput = function(userInput){
    if (this.x >= 99 && userInput === 'left'){
        this.x -= 101;
    }else if (this.x <= 303 && userInput === 'right'){
        this.x += 101;

    }else if (this.y >= 83 && userInput === 'up'){
        this.y -= 83;
    }else if (this.y <= 332 && this.y >= 0 && userInput === 'down'){
        this.y += 83;
    }
}

Player.prototype.hitGem = function(gem){
    if (this.x === gem.x && this.y === gem.y){
        this.score += gem.numPoints;
        console.log("The score is " + this.score);
        gem.numPoints = 0;
        gem.x = 1000;
        gem.y = 1000;
    }
}

Player.prototype.checkIfCrossedSuccessfully = function(numPoints){
    if (this.y === 0){
        this.score += numPoints;
        this. y = -1;
        console.log("You Win!! The final score is " + this.score);
    }
}

var Gem = function(numPoints, x, y, img){
    this.numPoints = numPoints;
    this.gemImage = img;
    this.x = x;
    this.y = y;
}

Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.gemImage), this.x, this.y);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(200,83,130);
var enemy2 = new Enemy(80,166,100);
var enemy3 = new Enemy(30,249,250);
var enemy4 = new Enemy(0,83,180);
var enemy5 = new Enemy(20,166,250);
var enemy6 = new Enemy (260,249,280);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Place the player object in a variable called player
var player = new Player(202,415);

var blueGem = new Gem(50,202,166, 'images/Gem Blue.png');
var greenGem = new Gem(30,404,83, 'images/Gem Green.png');
var orangeGem = new Gem(60,101,249, 'images/Gem Orange.png');
var allGems = [blueGem, greenGem, orangeGem];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
