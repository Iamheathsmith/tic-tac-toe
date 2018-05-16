'use strict';

module.exports = new class {
  nextMove(grid) {
    if (grid.length !== grid[0].length) return 'need to be a square';
    let empty = [];
    for (let i = 0; i < grid.length; i++) {
      for (let y = 0; y < grid[i].length; y++) {
        if (grid[i][y] === '') {
          empty.push({i,y});
        }
      }
    }
    let picked = Math.floor(Math.random() * Math.floor(empty.length));
    return empty[picked];
  }
};
