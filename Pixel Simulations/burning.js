// Create a 2D array
// Sorry if you are used to matrix math!
// How would you do this with a
// higher order function????

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
      // Fill the array with 0s
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
  }
  
  // The grid
  let grid;
  // How big is each square?
  let w = 5;
  let cols, rows;
  
  // Check if a row is within the bounds
  function withinCols(i) {
    return i >= 0 && i <= cols - 1;
  }
  
  // Check if a column is within the bounds
  function withinRows(j) {
    return j >= 0 && j <= rows - 1;
  }
  
  function setup() {
    createCanvas(1000, 800);
    colorMode(RGB, 360, 255, 255);
    cols = width / w;
    rows = height / w;
    grid = make2DArray(cols, rows);
  }
  
  function mouseDragged() {
  
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);
   
    // Randomly add an area of sand particles
    let matrix = 5;
    let extent = floor(matrix / 2);
    for (let i = -extent; i <= extent; i++) {
      for (let j = -extent; j <= extent; j++) {
        if (random(1) < 0.75) {
          let col = mouseCol + i;
          let row = mouseRow + j;
          if (withinCols(col) && withinRows(row)) {
            grid[col][row] = 1;
          }
        }
      }
    }
    // Change the color of the sand over time
  }
  
  function draw() {
    background(0);
   
    // Draw the sand
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        noStroke();
        if (grid[i][j] === 1) {
          fill(255, 0, 0);
          let x = i * w;
          let y = j * w;
          square(x, y, w);
        } else if (grid[i][j] === 2){
          fill(255, 100, 0);
          let x = i * w;
          let y = j * w;
          square(x, y, w);
        } else if (grid[i][j] === 3){
          fill(255, 255, 0);
          let x = i * w;
          let y = j * w;
          square(x, y, w);
        } else if (grid[i][j] === 4){
          fill(169, 169, 169);
          let x = i * w;
          let y = j * w;
          square(x, y, w);
        }
      }
    }
   
    // Create a 2D array for the next frame of animation
    let nextGrid = make2DArray(cols, rows);
   
    // Check every cell
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows ; j++) {
        // What is the state?
        let state = grid[i][j];
       
        // If it's on fire
        if(state > 0) {
          if(state === 1){
            nextGrid[i][j] = 2;
          } else if (state === 2){
            if(random(1) < .5){
              nextGrid[i][j] = 2;
            } else{
            nextGrid[i][j] = 3;
            }
          } else if(state === 3){
            if(random(1) < .5){
              nextGrid[i][j] = 3;
            } else{
            nextGrid[i][j] = 4;
            }
          }else if(state === 4){
            nextGrid[i][j] = 4;
          }
        }
       
        // burning
        if(state === 1){
          if(grid[i][j+1] < 1){
            if(random(1) < .6){
              nextGrid[i][j+1] = 1;
            }
          }
          if(grid[i][j-1] < 1){
            if(random(1) < .6){
              nextGrid[i][j-1] = 1;
            }
          }
          if(grid[i+1][j] < 1 && i + 1 < cols - 1){
            if(random(1) < .6){
              nextGrid[i+1][j] = 1;
            }
          }
          if(grid[i-1][j] < 1 && i - 1 > 0){
            if(random(1) < .6){
              nextGrid[i-1][j] = 1;
            }
          }
        }
       
        //dropping physics
        if(state === 0 && grid[i][j - 1] > 0 && grid[i][j - 1] === 4){
          nextGrid[i][j] === 4;
          nextGrid[i][j - 1] === 0;
        }
       
      }
    }
    grid = nextGrid;
  }