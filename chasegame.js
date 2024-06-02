const canvas = document.getElementById("chasegame");
const ctx = canvas.getContext("2d");

//pinkku sprites
const pinkkuUp = new Image();
pinkkuUp.src = "./pinkku_up.png";
const pinkkuDown = new Image();
pinkkuDown.src = "./pinkku_down.png";
const pinkkuRight = new Image();
pinkkuRight.src = "./pinkku_right.png";
const pinkkuLeft = new Image();
pinkkuLeft.src = "./pinkku_left.png";

//zombie sprites
//map sprites

var playerPosX = 250;
var playerPosY = 250;
var lastDirection = "right";

var movements = 1;
var zombiePosXs = [];
var zombiePosYs = [];
var zombieDirection = [];

function game() {
	ctx.fillStyle = "green";
	ctx.fillRect(0, 0, 500, 500);
	ctx.drawImage(whichDirectionalPinkkuToDisplay(lastDirection), playerPosX, playerPosY);
	for (var i = 0; i < zombiePosXs.length; i++) {
		ctx.fillStyle = "purple";
		ctx.fillRect(zombiePosXs[i], zombiePosYs[i], 75, 75);
	}
}

function whichDirectionalPinkkuToDisplay(direction) {
	if (lastDirection == "up") {
		return pinkkuUp;
	} else if (lastDirection == "down") {
		return pinkkuDown;
	} else if (lastDirection == "right") {
		return pinkkuRight;
	} else if (lastDirection == "left") {
		return pinkkuLeft;
	}
	return pinkkuDown;
}

function spawnZombie() {
	zombiePosXs.push(Math.random() * 420);
	zombiePosYs.push(Math.random() * 420);
	zombieDirection.push(1);
}

function zombieSpeed(zmin, zmax) {
	return Math.random() * zmax;
}

function moveZombies() {
	for (var i = 0; i < zombiePosXs.length; i++) {
		var speed = zombieSpeed(0, 20);
		if(zombiePosYs[i] > playerPosY) {
			zombiePosYs[i] -= speed;
			zombieDirection[i] = "up";
		} else if (zombiePosYs < playerPosY) {
			zombiePosYs[i] += speed;
			zombieDirection[i] = "down";
		} else {
			if (zombiePosXs[i] > playerPosX) {
				zombiePosXs[i] -= speed;
				zombieDirection[i] = "left";
			} else if (zombiePosXs[i] < playerPosX) {
				zombiePosXs[i] += speed;
				zombieDirection[i] = "right";
			}
		}
	}
	checkCollision();
}

function checkCollision() {
	for (var i = 0; i < zombiePosXs.length; i++) {
		if(zombiePosXs[i] == playerPosX && zombiePosYs[i] == playerPosY) {
			alert("you lost with "+movements+" moves");
			canvas.style.visibility = "hidden";
		} else {
			var xdiff = zombiePosXs[i] - playerPosX;
			if (xdiff < 0) { xdiff = xdiff * -1 }
			var ydiff = zombiePosYs[i] - playerPosY;
			if (ydiff < 0) { ydiff = ydiff * -1 }
			if (ydiff <= 50 && xdiff <= 50) {
				alert("you lost with "+movements+" moves");
				canvas.style.visibility = "hidden";
			}
		}
	}
}

function movePlayer(move) {
	if (move == 1) {
		playerPosY -= 10;
		console.log(playerPosX, playerPosY);
		lastDirection = "up";
	} else if (move == 2) {
		playerPosX += 10;
		console.log(playerPosX, playerPosY);
		lastDirection = "right";
	} else if (move == 3) {
		playerPosY += 10;
		console.log(playerPosX, playerPosY);
		lastDirection = "down";
	} else if (move == 4) {
		playerPosX -= 10;
		console.log(playerPosX, playerPosY);
		lastDirection = "left";
	}

	if (playerPosX >= 430) {
		playerPosX -= 10;
	} 

	if (playerPosX <= 0) {
		playerPosX += 10;
	}

	if (playerPosY >= 430) {
		playerPosY -= 10;
	}
	
	if (playerPosY <= 0) {
		playerPosY += 10;
	}

	moveZombies();
	if(movements % 15 == 0) {
		spawnZombie();
	}
	movements+=1;
	game();
}
game();
