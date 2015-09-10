
// Awesome resource for making sprite-based games:  http://jlongster.com/Making-Sprite-based-Games-with-Canvas
// Used to help with speed/animations
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
    this.w = 101;
    this.h = 171;

};

var canvasWidth = 505;
var canvasHeight = 540;

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

    Player.prototype.checkCollisions();
    Player.prototype.checkBoundaries();
    Player.prototype.checkSuccess();

};

// Troubleshooted using https://discussions.udacity.com/t/opening-the-index-html-is-not-loading-the-game/26674/5

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.reset = function() {

    this.x = 200;
    this.y = 370;

};

// Don't let the player go outside the boundaries of the game board
// Troubleshooted using:  http://stackoverflow.com/questions/22739060/creating-player-boundaries-in-javascript




Player.prototype.checkBoundaries = function() {

    var rightBorder = canvasWidth - 101;
    var bottomBorder = canvasHeight - 107;

    if (player.y < 0) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x > rightBorder) {
        player.x = rightBorder;
    }
    if (player.y > bottomBorder) {
        player.y = bottomBorder;
    }
};


// Check for collisions
// Troubleshooted using:  https://discussions.udacity.com/t/sure-i-would-love-some-collisioncheck-help/29801/4

Player.prototype.checkCollisions = function() {

    //  Basic code for detecting collisions
    //     if (player.x < enemy1.x + enemy1.w &&
    //    player.x + player.w > enemy1.x &&
    //    player.y < enemy1.y + enemy1.h &&
    //    player.h + player.y > enemy1.y) {
    //     // collision detected!
    //     alert("collision");
    //     }

    // };

    //  More coplex code for looping through the allEnemies box

    player.box = [player.x, player.y, player.w, player.h];


    for (var i = 0; i < allEnemies.length; i++) {

        allEnemies[i].box = [allEnemies[i].x, allEnemies[i].y, allEnemies[i].w, allEnemies[i].h];

        if (player.box[0] < allEnemies[i].box[0] + allEnemies[i].box[2] &&
            player.box[0] + player.box[2] > allEnemies[i].box[0] &&
            player.box[1] < allEnemies[i].box[1] + allEnemies[i].box[3] &&
            player.box[3] + player.box[1] > allEnemies[i].box[1]) {
            player.reset(); // collision detected!
            break;
        } else {
            return false;
        }

    }
};


Player.prototype.checkSuccess = function() {

    if (player.y < 3) {
        player.reset();
    }

};

// Reference:  https://discussions.udacity.com/t/allenemies-is-not-defined-console-log-error/22661/3
Player.prototype.handleInput = function(dt) {
    if (event.keyCode == 37) {
        this.x = this.x - 75;
    }
    if (event.keyCode == 38) {
        this.y = this.y - 75;
    }
    if (event.keyCode == 39) {
        this.x = this.x + 75;
    }
    if (event.keyCode == 40) {
        this.y = this.y + 75;
    }
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(50, 65, 150);
var enemy2 = new Enemy(85, 145, 50);
var enemy3 = new Enemy(25, 225, 100);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(200, 370);




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