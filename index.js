//the HTML element which id is game is defined as a constant
const canvas = document.getElementById('game');

 //we define the context in 2D (we could use 3D for example)
const ctx = canvas.getContext('2d');

//snake parts constructor
class snakePart{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

//snake's speed
let speed = 7;

//definition of the board, the tiles
let tileCount = 20; //it'll be a 20x20 board
let tileSize = canvas.width / tileCount - 2; //define a smaller size for the tiles (visual style)

//definition of the snake's starting position
let headX = 10;
let headY = 10;

//an array to keep the snake parts
const snakeParts = [];
let tailLength = 2;

//controls, by default 0
let xVelocity=0;
let yVelocity=0;

//score variable, always at 0 in the beginning
let score = 0;

//apple position
let appleX = 5;
let appleY = 5;


//gameloop
function drawGame(){
  clearScreen();
  changeSnakePosition();
  checkAppleCollision();
  drawApple();
  drawSnake();
  drawScore();
  setTimeout(drawGame, 1000/ speed); //1000ms makes 1s
}

function drawScore(){
  ctx.fillStyle = 'white';
  ctx.font = '10px Verdana';
  ctx.fillText("Score : "+score, canvas.width-50,10);
}

function clearScreen(){
  ctx.fillStyle = 'black'; //definition of a colour
  ctx.fillRect(0,0,canvas.width,canvas.height); //filling the canvas with the previous fillStyle
}

function drawSnake(){
  ctx.fillStyle = 'green';
  for(let i =0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push(new snakePart(headX, headY)); //put an item at the end of the list next to the head
  while(snakeParts.length > tailLength){
    snakeParts.shift(); //remove the furthers item from the snake aparts if we have more than our tailzise
  }
  ctx.fillStyle = 'orange';//definition of the snake's colour
  ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);//painting the tile, at the position defined by X and Y
}

function drawApple(){
  ctx.fillStyle = "red";
  ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
  if(appleX == headX && appleY == headY){
    appleX = Math.floor(Math.random()* tileCount);
    appleY = Math.floor(Math.random()* tileCount);
    tailLength++;
  }


}

function changeSnakePosition(){
  headX = headX + xVelocity; //Velocity can be negative or positive
  headY = headY + yVelocity;
}



document.body.addEventListener('keydown', keyDown);
function keyDown(event){
  //up
  if(event.keyCode == 38){
    if (yVelocity == 1 )
      return;
    yVelocity = -1; //one tile at a time up
    xVelocity = 0; //we only move up
  }

  //down
  if(event.keyCode == 40){
    if (yVelocity == -1 )
      return;
    yVelocity = +1; //one tile at a time down
    xVelocity = 0; //we only move down
  }

  //left
  if(event.keyCode == 37){
    if (xVelocity == 1 )
      return;
    yVelocity = 0; //one tile at a time left
    xVelocity = -1; //we only move left
  }

  //right
  if(event.keyCode == 39){
    if (xVelocity == -1 )
      return;
    yVelocity = 0; //one tile at a time right
    xVelocity = 1; //we only move right
  }



}


drawGame();
