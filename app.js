const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
// context idha vachi dan drawing color filling la pana mudiyum
const scoreText = document.getElementById('scoreVal');

const width = gameBoard.width;
const height = gameBoard.height;
const unit = 25;


let foodX;
let foodY;
let xVelocity=25;
let yVelocity=0;
let score = 0;
let active = true;
let started= false;
let paused = false;

let snake= [
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit*1,y:0},
    {x:0,y:0}
];
window.addEventListener('keydown',keyPress)
startGame();
function startGame(){
    context.fillStyle = '#212121';
    //fillRect(xstart,ystart,width,height)
    context.fillRect(0,0,width,height) // ipd na dan rectangle fulla black clr fill aagum
    createFood();
    displayFood();
    drawSnake();   
}

function clearBoard(){
    context.fillStyle = '#212121';
    //fillRect(xstart,ystart,width,height)
    context.fillRect(0,0,width,height);
}

function createFood(){
    foodX = Math.floor(Math.random()*width/unit)*unit;
    //random ah 0 to 499 kulla 25 multiples irukara n.o ah eduthu kudukum
    foodY = Math.floor(Math.random()*height/unit)*unit;
}

function displayFood(){
    context.fillStyle = 'red';
    context.fillRect(foodX,foodY,unit,unit);
}

function drawSnake(){
    context.fillStyle = 'darkcyan';
    context.strokeStyle = 'black'
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,unit,unit);
        context.strokeRect(snakePart.x,snakePart.y,unit,unit)
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVelocity, // snake oda 0th index la iruka value + xvelocity
                  y:snake[0].y+yVelocity  }

    snake.unshift(head); //Inserts new elements at the start of an array, and returns the new length of the array
    if(snake[0].x==foodX && snake[0].y==foodY){
        score +=5;
        scoreText.textContent = score;
        createFood();
    }
    else
    snake.pop();//Removes the last element from an array
}

function nextTick(){
    if(active && !paused){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    },200)   
}
else if(!active){
    clearBoard();
    context.font = "bold 50px serif";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("Game Over!!",width/2,height/2)
}
}

function keyPress(event){
    if(!started){
        started=true;
        nextTick();
    }
      //pause when space is pressed
      if(event.key===' '){
        console.log('clicked')
        if(paused){
            paused = false;
            nextTick();
        }
        else{
            paused = true;
        }
    }
    const LEFT ='ArrowLeft';
    const UP ='ArrowUp';
    const RIGHT ='ArrowRight';
    const DOWN ='ArrowDown';

    switch(true){
        case(event.key===LEFT && xVelocity!=unit):
            xVelocity=-unit;
            yVelocity=0;
            break;
        case(event.key===RIGHT && xVelocity!=-unit):
            xVelocity=unit;
            yVelocity=0;
            break;
        case(event.key===UP && yVelocity!=unit):
            xVelocity=0;
            yVelocity=-unit;
            break;
        case(event.key===DOWN && yVelocity!=-unit):
            xVelocity=0;
            yVelocity=unit;
            break; 
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=width):
        case(snake[0].y<0):
        case(snake[0].y>=height):
        active=false;
        break;
        
    }
}


