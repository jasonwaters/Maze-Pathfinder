function MazeSolver(data) {
    this.data = data;
    this.numRows = data.maze.length;
    this.numCols = data.maze[0].length;

    this.clearPaths();

    var graph = new Graph(
        this.data.maze.map(function(row) {
            return row.map(function(value) {
                return value ? 0 : 1;
            });
        })
    );

    var start = graph.grid[this.data.start.y][this.data.start.x];
    var end = graph.grid[this.data.end.y][this.data.end.x];

    this.solutionNodes = astar.search(graph, start, end);

    for(var i=0; i<this.solutionNodes.length; i++) {
        this.path_solution[this.solutionNodes[i].x][this.solutionNodes[i].y] = true;
    }
}

MazeSolver.prototype.getSolution = function() {
    return this.path_solution;
};

MazeSolver.prototype.getSolutionNodes = function() {
    return this.solutionNodes;
};

MazeSolver.prototype.clearPaths = function () {
    var path_solution = [];

    for (var y = 0; y < this.numRows; y++) {
        path_solution.push([]);

        for (var x = 0; x < this.numCols; x++) {
            path_solution[y][x] = false;
        }
    }

    this.path_solution = path_solution;
};