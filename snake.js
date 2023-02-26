let inputdir = {x:0, y:0};

const foodsound = new Audio("/SnakeGame/music/food.mp3");
const gameOverSound = new Audio("/SnakeGame/music/gameover.mp3");
const moveSound = new Audio("/SnakeGame/music/move.mp3");

let speed = 8;
let score = 0;
let highScoreVal = 0;
let lastPaintTime = 0;
let SnakeArr = [{x:13, y:15}];
food = {x: 6, y:7};

// Game Function
function main(ctime){
    window.requestAnimationFrame(main);
    if(score> 15){
        speed = 12;
    }else if(score> 25){
        speed = 18;
    }
    
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){
    // if snake touches itself
    for(let i=1; i< SnakeArr.length; i++){
        if(SnakeArr[0].x === SnakeArr[i].x && SnakeArr[0].y === SnakeArr[i].y){
            return true;
        }
    } 
    // if you touch wall
    if(SnakeArr[0].x >=20 || SnakeArr[0].x <=0 || SnakeArr[0].y >=20 || SnakeArr[0].y <=0){
        return true;
    }
}

function gameEngine(){
    // update the snake array
    if(isCollide(SnakeArr)){
        gameOverSound.play();
        inputdir = {x:0, y:0};
        alert("Game Over. Press any key to play again.");
        SnakeArr = [{x:13, y:15}];
        score = 0;
    }
    //when snake eats the food
    if(SnakeArr[0].y === food.y && SnakeArr[0].x === food.x){
        foodsound.play();
        score += 1;
        
        if(score > highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score: " + highScoreVal;
        }
        scoreBox.innerHTML = "Score: " + score;
         SnakeArr.unshift({x: SnakeArr[0].x + inputdir.x, y: SnakeArr[0].y + inputdir.y});
         let a = 2; 
         let b = 18;
         food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }

    // moving the snake
    for(let i=SnakeArr.length-2; i>=0; i--){
        SnakeArr[i+1] = {...SnakeArr[i]};
    }
    SnakeArr[0].x += inputdir.x;
    SnakeArr[0].y += inputdir.y;

    //display the snake and food
    // Displaying the snake
    board.innerHTML = "";
    SnakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main Logic part
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highscoreVal = 0;
    localStorage.setItem("High Score", JSON.stringify(highscoreVal));
}else{
    highscoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputdir = {x: 0, y: 1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputdir.x= 0;
            inputdir.y= -1;
            break;
        case "ArrowDown":
            inputdir.x= 0;
            inputdir.y= 1;
            break;
        case "ArrowLeft":
            inputdir.x= -1;
            inputdir.y= 0;
            break;
    
        case "ArrowRight":
            inputdir.x= 1;
            inputdir.y= 0;
            break;
    
        default:
            break;
    }
})