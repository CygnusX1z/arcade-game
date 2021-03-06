// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    
    //Starting positions of 3 enemies
    this.enemyY = [60,145,230];
    this.x = this.startPosX();
    this.y = this.startPosY(); 
    
    //Random starting speeds for enemies
    this.speed =[30,100,170,250,320,500];
};

//Random enemy start position X
Enemy.prototype.startPosX = function() {
	var startX = -(Math.round(Math.random()*400));
	return startX;
};

//Random enemy start position Y
Enemy.prototype.startPosY = function() {
	var startY = this.enemyY[Math.round(Math.random()*2)];
	return startY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Assign random speed to enemies and multiply by dt 
	this.x += this.speed[Math.round(Math.random()*5)]*dt;
	
	//When enemies go off screen right restart them slightly off screen left
	if (this.x > 550) {
		this.x = this.startPosX();
		this.y = this.startPosY();
	};
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define the Player's sprite and starting position
var Player = function() {
	this.sprite = 'images/char-boy.png';
	this.x = 200;
	this.y = 430;
};

// Update the Player's position
Player.prototype.update = function(dt) {
	this.x*dt;
	this.y*dt;
};

// Reset the Player's position
Player.prototype.reset = function(){
	this.x=200;
	this.y=430;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Players movements via up, down, left, right arrow keys
Player.prototype.handleInput = function(direction) {
	if (direction === 'left' && this.x > 0) {
		this.x -= 101;
	} else if (direction === 'right' && this.x < 400) {
		this.x += 101;
	} else if (direction === 'up' && this.y > 15) {
		this.y -= 83;
	} else if (direction === 'down' && this.y < 400) {
		this.y += 83;
		
	//When Player reaches water, reset game
	} else if (this.y = 50) {
		resetPositions();
	}
};

// Define 3 enemies and insert them into an array
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1,enemy2,enemy3];

//Define a Player
var player = new Player();

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

// Reset the positions of Player & Enemies
function resetPositions() {
	player.reset();
	for(var j in allEnemies) {
	allEnemies[j].x = allEnemies[j].startPosX();
	allEnemies[j].y = allEnemies[j].startPosY();
	}
}

// Check for collisions of Player and Enemies
var checkCollisions = function(allEnemies,player) {
	for (i in allEnemies) {
	if (((allEnemies[i].x - player.x) < 80) 
			&& ((player.x - allEnemies[i].x) < 80) 
			&& ((player.y - allEnemies[i].y) < 80) 
			&& ((allEnemies[i].y - player.y) < 80)) {
		resetPositions();
		};
	};
};

