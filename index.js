//the HTML element which id is game is defined as a constant
const canvas = document.getElementById('game');

 //we define the context in 2D (we could use 3D for example)
const ctx = canvas.getContext('2d');

//snake's speed
let speed = 7;

//definition of the board, the tiles
let tileCount = 20; //it'll be a 20x20 board
let tileSize = canvas.width / tileCount - 2; //define a smaller size for the tiles (visual style)

//definition of the snake's starting position
let headX = 10;
let headY = 10;

//gameloop
function drawGame(){
  clearScreen();
  drawSnake();
  setTimeout(drawGame, 1000/ speed); //1000ms makes 1s
}

function clearScreen(){
  ctx.fillStyle = 'black'; //definition of a colour
  ctx.fillRect(0,0,canvas.width,canvas.height); //filling the canvas with the previous fillStyle
}

function drawSnake(){
  ctx.fillStyle = 'green';//definition of the snake's colour
  ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);//painting the tile, at the position defined by X and Y
}

drawGame();
