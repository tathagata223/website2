const player = document.querySelector('.player');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.querySelector('.score');

let playerPosX = 130; // starting lane
let playerPosY = 50;  // bottom position
let isJumping = false;
let jumpHeight = 0;
let score = 0;

// Move left/right
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && playerPosX > 50) playerPosX -= 80; // left lane
    if (e.key === 'ArrowRight' && playerPosX < 210) playerPosX += 80; // right lane
    if (e.key === 'ArrowUp' && !isJumping) jump();
    player.style.left = playerPosX + 'px';
});

// Jump
function jump() {
    isJumping = true;
    let jumpInterval = setInterval(() => {
        if (jumpHeight >= 120) {
            clearInterval(jumpInterval);
            let fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
                jumpHeight -= 10;
                player.style.bottom = (50 + jumpHeight) + 'px';
            }, 20);
        }
        jumpHeight += 10;
        player.style.bottom = (50 + jumpHeight) + 'px';
    }, 20);
}
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = [50, 130, 210][Math.floor(Math.random() * 3)] + 'px';
    obstacle.style.bottom = '500px'; // start top
    gameContainer.appendChild(obstacle);

    let obstacleInterval = setInterval(() => {
        let obstacleBottom = parseInt(obstacle.style.bottom);
        obstacleBottom -= 5;
        obstacle.style.bottom = obstacleBottom + 'px';

        // collision detection
        if (
            obstacleBottom < playerPosY + 60 &&
            obstacleBottom + 60 > playerPosY &&
            parseInt(obstacle.style.left) === playerPosX
        ) {
            alert('Game Over! Score: ' + score);
            location.reload();
        }

        // remove obstacle if off-screen
        if (obstacleBottom < -60) {
            obstacle.remove();
            clearInterval(obstacleInterval);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }
    }, 20);
}

// create obstacles every 2 seconds
setInterval(createObstacle, 2000);
