const canvas = document.getElementById("chasegame");
const ctx = canvas.getContext("2d");
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
	ctx.fillStyle = "black";
	ctx.fillRect(playerPosX, playerPosY, 75, 75);
	for (var i = 0; i < zombiePosXs.length; i++) {
		ctx.fillStyle = "purple";
		ctx.fillRect(zombiePosXs[i], zombiePosYs[i], 75, 75);
	}
}

function spawnZombie() {
	zombiePosXs.push(250);
	zombiePosYs.push(250);
	zombieDirection.push(1);
}

function moveZombies() {
	for (var i = 0; i < zombiePosXs.length; i++) {
		if(zombiePosYs[i] > playerPosY) {
			zombiePosYs[i] -= 10;
			zombieDirection[i] = "up";
		} else if (zombiePosYs < playerPosY) {
			zombiePosYs[i] += 10;
			zombieDirection[i] = "down";
		} else {
			if (zombiePosXs[i] > playerPosX) {
				zombiePosXs[i] -= 10;
				zombieDirection[i] = "left";
			} else if (zombiePosXs[i] < playerPosX) {
				zombiePosXs[i] += 10;
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
		}
	}
}

function movePlayer(move) {
	if (move == 1) {
		playerPosY -= 10;
		console.log(playerPosX, playerPosY);
	} else if (move == 2) {
		playerPosX += 10;
		console.log(playerPosX, playerPosY);
	} else if (move == 3) {
		playerPosY += 10;
		console.log(playerPosX, playerPosY);
	} else if (move == 4) {
		playerPosX -= 10;
		console.log(playerPosX, playerPosY);
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
