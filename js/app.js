// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  if(this.x > 505){
    this.x = 0;
  }
  this.gamelose(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y){
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
  this.gamewon();
};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// this function identifies the collision between
//enemy and player
Enemy.prototype.gamelose = function(bug){
  if(player.y + 130 >= bug.y + 90
    && player.x + 25 <= bug.x + 90
    && player.y + 75 <= bug.y + 135
    && player.x + 75 >= bug.x + 10){
      player.x = 200;
      player.y = 415;
      console.log("You Lose");
  }
};

// this function identifies the win of player
Player.prototype.gamewon = function(){
  if(this.y <= -15){
    this.x = 200;
    this.y = 415;
    console.log("You Win");
  }
};

// this function handles the input provided by the user
Player.prototype.handleInput = function(keyPressed){
  if(keyPressed === 'left' && this.x > 0){
    this.x = this.x - 100;
  }
  if(keyPressed === 'right' && this.x < 399){
    this.x = this.x + 100;
  }
  if(keyPressed === 'up' && this.y > -15){
    this.y = this.y - 85;
  }
  if(keyPressed === 'down' && this.y < 410){
    this.y = this.y + 85;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 415);
for(var i=0;i<3;i++){
  var enemy = new Enemy(0, ((Math.floor(Math.random() * (2 - 0+1)) + 0) * 85) + 60, Math.random() * 300);
  allEnemies.push(enemy);
}

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
