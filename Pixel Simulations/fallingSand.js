//makeing the pixal arrays
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for(let i = 0; i < arr.length; i++){
      arr[i] = new Array(rows);
      for(let j = 0; j < arr[i].length; j++){
        arr[i][j] = 0;
      }
  }
  return arr;
}

let grid;
let w = 10;
let cols, rows;

let hueValue = 200;

//setup function for canvas that building grid
function setup() {
  createCanvas(600, 800);
  colorMode(HSB, 360, 255, 255);
  cols = width / w; 
  rows = height / w;
  grid = make2DArray(cols, rows);

  for(let i = 0; i <cols; i++){
      for(let j = 0; j < rows; j++){
          grid[i][j] = 0;
      }
  }

grid[20][20] = 1;
}

function mouseDragged() {
let mouseCol = floor(mouseX / w);
let mouseRow = floor(mouseY / w);

let matrix = 3;
let extent = floor(matrix/2);
for(let i = -extent; i <= extent; i++){
  for(let j = -extent; j <= extent; j++){
    let col = mouseCol + i;
    let row = mouseRow + j;
    if( col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1){
      grid[col][row] = hueValue;
    }
  }
}
hueValue += 1;
if(hueValue > 360){
  hueValue = 1;
}
}

//drawing on canvas (black and white)
function draw() {
  background(0);

  for(let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        noStroke(0);
        if(grid[i][j] > 0){  
          fill(grid[i][j], 255, 255);
          let x = i * w;
          let y = j * w;
          square(x, y, w)
        }
      }
  }

  let nextGrid = make2DArray(cols, rows);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let state = grid[i][j];
      if(state > 0){
        let below = grid[i][j+1];
        
        // let dir = 1;
        // if (random(1) < .5){
        //   dir *= -1;
        // }
        
        let belowR, belowL;
        
        if(i + 1 >= 0 && i + 1 <= cols-1){
          belowR = grid[i + 1][j + 1];
        }
        if(i - 1 >= 0 && i - 1 <= cols-1){
          belowL = grid[i - 1][j + 1];
        }

        
        if (below === 0){
          nextGrid[i][j+1] = grid[i][j];
        } else if(belowR === 0) {
          nextGrid[i + 1][j + 1] = grid[i][j];
        } else if(belowL === 0) {
          nextGrid[i - 1][j + 1] = grid[i][j];
        } else{
          nextGrid[i][j] = grid[i][j];
        }
      }
    }
  }
  grid = nextGrid;
}
