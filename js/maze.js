function Maze(data) {
    this.WALL_COLOR = '#000000';
    this.START_COLOR = '#00FF00';
    this.END_COLOR = '#FF0000';
    this.SOLUTION_COLOR = '#0000FF';

    this.data = data;
    this.numRows = data.maze.length;
    this.numCols = data.maze[0].length;
}

Maze.prototype.render = function (elementID) {
    this.canvas = document.getElementById(elementID);
    this.ctx = this.canvas.getContext('2d');

    this.STAGE_WIDTH = this.canvas.width;
    this.STAGE_HEIGHT = this.canvas.height;

    this.CELL_WIDTH = this.STAGE_WIDTH / this.numCols;
    this.CELL_HEIGHT = this.STAGE_HEIGHT / this.numRows;

    this.renderMaze();
};

Maze.prototype.renderMaze = function () {
    this.data.maze.forEach(function (row, y) {
        row.forEach(function (value, x) {
            if (value) {
                this.drawWallRect(x, y);
            }
        }, this);
    }, this);

    this.drawStartRect(this.data.start.x, this.data.start.y);
    this.drawEndRect(this.data.end.x, this.data.end.y);
};

Maze.prototype.plotSolution = function (solution) {
    solution.forEach(function (row, y) {
        row.forEach(function (value, x) {
            if (value) {
                this.drawSolutionRect(x, y);
            }
        }, this);
    }, this);
};

Maze.prototype.drawMazeRect = function(x, y, color) {
    this.drawRect(x * this.CELL_WIDTH, y * this.CELL_HEIGHT, this.CELL_WIDTH, this.CELL_HEIGHT, color);
};

Maze.prototype.drawWallRect = function(x, y) {
    this.drawMazeRect(x, y, this.WALL_COLOR);
};

Maze.prototype.drawSolutionRect = function(x, y) {
    this.drawMazeRect(x, y, this.SOLUTION_COLOR);
};

Maze.prototype.drawStartRect = function(x, y) {
    this.drawMazeRect(x, y, this.START_COLOR);
};

Maze.prototype.drawEndRect = function(x, y) {
    this.drawMazeRect(x, y, this.END_COLOR);
};

Maze.prototype.drawRect = function (x, y, w, h, color) {
    if (color) {
        this.ctx.fillStyle = color;
    }

    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.closePath();

    this.ctx.fill();
};

Maze.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.STAGE_WIDTH, this.STAGE_HEIGHT);
};