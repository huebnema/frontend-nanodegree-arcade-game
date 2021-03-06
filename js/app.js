// Awesome resource for making sprite-based games:  http://jlongster.com/Making-Sprite-based-Games-with-Canvas
// Used to help with speed/animations

// Constant declarations
var COLLISION_MARGIN = 75,
    TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    "use strict";
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;

};

var canvasWidth = 505;
var canvasHeight = 606;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.w = 101;
    this.h = 171;

};


Player.prototype.update = function(dt) {

    this.checkCollisions();
    this.checkBoundaries();
    this.checkSuccess();

};

// Troubleshooted using https://discussions.udacity.com/t/opening-the-index-html-is-not-loading-the-game/26674/5

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.reset = function() {

    this.x = 200;
    this.y = 400;

};

// Don't let the player go outside the boundaries of the game board
// Troubleshooted using:  http://stackoverflow.com/questions/22739060/creating-player-boundaries-in-javascript




Player.prototype.checkBoundaries = function() {

    var rightBorder = canvasWidth - this.w;
    var bottomBorder = canvasHeight - this.h;

    if (this.y < 0) {
        this.y = 0;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > rightBorder) {
        this.x = rightBorder;
    }
    if (this.y > bottomBorder) {
        this.y = bottomBorder;
    }
};


// Check for collisions
// Troubleshooted using:  https://discussions.udacity.com/t/sure-i-would-love-some-collisioncheck-help/29801/4

Player.prototype.checkCollisions = function() {

    for (enemy in allEnemies) {
        if ((Math.abs(allEnemies[enemy].y - this.y) < COLLISION_MARGIN) &&
            (Math.abs(allEnemies[enemy].x - this.x) < COLLISION_MARGIN)) {
            // crash
            this.reset();
        }
    }

};


Player.prototype.checkSuccess = function() {

    if (this.y < 3) {
        this.reset();
    }

};

// Reference:  https://discussions.udacity.com/t/allenemies-is-not-defined-console-log-error/22661/3
Player.prototype.handleInput = function(dt) {
    if (event.keyCode == 37) {
        this.x = this.x - TILE_WIDTH;
    }
    if (event.keyCode == 38) {
        this.y = this.y - TILE_HEIGHT;
    }
    if (event.keyCode == 39) {
        this.x = this.x + TILE_WIDTH;
    }
    if (event.keyCode == 40) {
        this.y = this.y + TILE_HEIGHT;
    }
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(50, 65, 150);
var enemy2 = new Enemy(85, 145, 50);
var enemy3 = new Enemy(25, 225, 100);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(200, 400);




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