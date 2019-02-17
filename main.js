const canvas = document.getElementById('langton');
const ctx = canvas.getContext('2d');
const runEl = document.getElementById('run');
const directions = [
    {x: 0, y: -1}, // North
    {x: 1, y: 0},  // East
    {x: 0, y: 1},  // South
    {x: -1, y: 0}, // West
    ];
const generation = document.getElementById('gen-counter');
let width, height, cellSize, cols, rows, grid, direction, position;
let run = false;
function toggleAnt() {
    run = !run;
}

function new2DArr(cols, rows, value) {
    let arr = Array(cols);
    for (let x = 0; x < cols; x++) {
        arr[x] = Array(rows).fill(value);
    }
    return arr;
}

function init() {
    // dimensions
    cellSize = 5;
    canvas.width = Math.floor(window.innerWidth / cellSize) * cellSize;
    canvas.height = Math.floor((window.innerHeight - 100) / cellSize) * cellSize;
    document.getElementById('container').style.width = canvas.width + "px";
    //
    width = canvas.width;
    height = canvas.height;
    cols = Math.floor(width / cellSize);
    rows = Math.floor(height / cellSize);
    // game state (running / not running)
    run = false;
    // grid
    grid = new2DArr(cols, rows, "W");
    // ant
    direction = 0;
    position = {x: Math.ceil(cols / 2) - 1, y: Math.ceil(rows / 2) - 1};
    genCounter = 0;
    generation.innerText = "Generation " + genCounter;

    draw();
}

function update() {
    for (let n = 0; n < 400; n++) {
        if (grid[position.x][position.y] === "B") {
            grid[position.x][position.y] = "#";
            direction = (direction + 3) % directions.length;
            position.x += directions[direction].x;
            position.y += directions[direction].y;
        } else {
            grid[position.x][position.y] = "B";
            direction = (direction + 1) % directions.length;
            position.x += directions[direction].x;
            position.y += directions[direction].y;
        }

        if (position.x > cols - 1) {
            position.x = 0;
        } else if (position.x < 0) {
            position.x = cols - 1;
        }

        if (position.y > rows - 1) {
            position.y = 0;
        } else if (position.y < 0) {
            position.y = rows - 1;
        }

        genCounter++;
        generation.innerText = "Generation " + genCounter;
    }

    draw();
}

function draw() {
    ctx.fillStyle = 'rgb(238, 238, 238)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            if (grid[x][y] === "B") {
                ctx.fillStyle = 'rgb(33, 33, 33)';
            } else if (grid[x][y] === "W") {
                ctx.fillStyle = 'rgb(238, 238, 238)';
            } else {
                ctx.fillStyle = 'rgb(0, 123, 255)';
            }
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    ctx.fillStyle = 'rgb(238, 0, 0)';
    ctx.fillRect(position.x * cellSize, position.y * cellSize, cellSize, cellSize);
}

function next() {
    run = false;
    update();
}

function tick() {
    if (run) {
        runEl.innerText = ("Pause");
        update();
    } else {
        runEl.innerText = ("Play");
    }
    requestAnimationFrame(tick);
}

init();
tick();
