(function() {
    axios.get('/data.json')
        .then(function (response) {
            if (response.status === 200) {
                var maze = new Maze(response.data);
                maze.render('maze');

                var maze_solver = new MazeSolver(response.data);

                var btnSolve = document.querySelector(".btn-solve");

                btnSolve.addEventListener('click', function() {
                    btnSolve.setAttribute('disabled', 'true');

                    var searchNodes = maze_solver.getSolutionNodes();

                    var drawInterval = setInterval(function() {
                        if(searchNodes.length === 0) {
                            clearInterval(drawInterval);
                            drawInterval = null;
                        }else {
                            var node = searchNodes.shift();
                            maze.drawSolutionRect(node.y, node.x);
                        }
                    }, 10);
                });
            }
        });
})();