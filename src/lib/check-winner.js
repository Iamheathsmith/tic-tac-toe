'use strict';

module.exports = new class {
  checkWinner(grid) {
    if (grid.length !== grid[0].length) return 'need to be a square';
    let test = '';
    for (let i = 0; i < grid.length; i++) {
      // check across
      if (grid[i][0] !== '') {
        test = this.checkAcross(grid[i]);
        if (test.includes('winner')) {
          return test;
        }
      }

      //check down
      if (grid[0][i] !== '') {
        test = this.checkDown(grid, i);
        if (test.includes('winner')) {
          return test;
        }
      }
    }

    // check diagonal
    if (grid[0][0] !== '') {
      test = this.checkDiagonalTD(grid);
      if (test.includes('winner')) {
        return test;
      }
    }
    if (grid[grid.length -1][0] !== '') {
      test = this.checkDiagonalBU(grid);
      if (test.includes('winner')) {
        return test;
      }
    }

    return test;
  }


  checkDown(grid, start, count=grid.length) {
    if (count === 0) {
      return 'winner';
    }
    if (grid[0][start] === grid[count - 1][start]) {
      count--;
      return this.checkDown(grid, start, count);
    } else {
      return 'sorry';
    }
  }

  checkDiagonalTD(grid, count=grid.length) {
    if (count === 0) {
      return 'winner';
    }
    if (grid[0][0] === grid[count - 1][count - 1]) {
      count--;
      return this.checkDiagonalTD(grid, count);
    } else {
      return 'sorry';
    }
  }

  checkDiagonalBU(grid, count=grid.length, top=0) {
    if (count === 0) {
      return 'winner';
    }
    if (grid[grid.length - 1][0] === grid[top][count - 1]) {
      top++;
      count--;
      return this.checkDiagonalBU(grid, count, top);
    } else {
      return 'sorry';
    }
  }

  checkAcross(grid, count=grid.length) {
    if (count === 0) {
      return 'winner';
    }
    if (grid[count - 1] === grid[0]) {
      count--;
      return this.checkAcross(grid, count);
    } else {
      return 'sorry';
    }
  }
};
