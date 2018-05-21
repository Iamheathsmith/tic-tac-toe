'use strict';

module.exports = new class {
  winningMove(grid, count) {
    if (grid.length !== grid[0].length) return 'need to be a square';
    let total = 0;

    //cpu 2nd and up move
    if (count > 2) {
      let empty = [];
      let needToUse = [];

      // check diagonal R.top => L.bottom
      if (grid[0][0] === 'O') {
        let now = this.checkDiagonalTDNow(grid);
        if (now) return now;
        let test = this.checkDiagonalTD(grid);
        if (test) {
          return test;
        };
      }

      // check diagonal L.bottom => R.top
      if (grid[0][grid.length -1] === 'O') {
        let now = this.checkDiagonalTDBack(grid);
        if (now) {
          return now;;
        }
      }

      // check diagonal R.bottom => L.top
      if (grid[grid.length -1][0] === 'O') {
        let now = this.checkDiagonalBUNow(grid);
        if (now) return now;
        let test = this.checkDiagonalBU(grid);
        if (test) {
          return test;
        };
      }

      // check diagonal L.bottom => R.top
      if (grid[grid.length -1][grid.length -1] === 'O') {
        let now = this.checkDiagonalBUBack(grid);
        if (now) return now;
      }

      for (let i = 0; i < grid.length; i++) {
        total++;

        //check across L => R
        if (grid[i][grid.length -1] === 'O') {
          let back = this.checkAcrossBack(grid[i], i);
          if (back) {
            return back;
          };
        }

        // check across RL =>
        if (grid[i][0] === 'O') {
          let now = this.checkAcrossNow(grid[i] ,i);
          if (now) needToUse.push(now);
          let test = this.checkAcross(grid[i], i);
          if (test) {
            return test;
          };
        }

        //check down T => B
        if (grid[0][i] === 'O') {
          let now = this.checkDownNow(grid, i);
          if (now) needToUse.push(now);
          let test = this.checkDown(grid, i);
          if (test) {
            return test;
          };
        }

        // check bottom up
        if (grid[grid.length -1][i] === 'O') {
          let test = this.checkDownBack(grid, i);
          if (test) {
            return test;
          };
        }
      }

      if (needToUse.length === 1) {
        return needToUse[0];
      }
      if (empty.length === 1) {
        return empty[0];
      }
    }
    return null;
  }

  //[x,'',x]
  checkAcross(grid, start, count=grid.length - 1, total=1) {
    if (grid[count] === '' && total === grid.length - 1) {
      return {i:start, y:count};
    }
    if (grid[0] === grid[count]) {
      count--;
      total++;
      return this.checkAcross(grid, start, count, total);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkAcrossNow(grid, start, count=1, total=1) {
    if (grid[count] === '' && total === grid.length - 1) {
      return {i:start, y:count};
    }
    if (grid[0] === grid[count]) {
      count++;
      total++;
      return this.checkAcrossNow(grid, start, count, total);
    } else {
      return;
    }
  }


  //['',x,x]
  checkAcrossBack(grid, start, count=grid.length - 2, total=1) {
    if (grid[count] === '' && total === grid.length -1) {
      return {i:start, y:count};
    }
    if (grid[grid.length -1] === grid[count]) {
      count--;
      total++;
      return this.checkAcrossBack(grid, start, count, total);
    } else {
      return;
    }
  }

  //[x,'',x]
  checkDown(grid, start, count=grid.length - 1, total=1) {
    if (grid[0][start] !== grid[count][start] && total === grid.length - 1) {
      return {i:count, y: start};
    }
    if (grid[0][start] === grid[count][start]) {
      count--;
      total++;
      return this.checkDown(grid, start, count, total);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDownNow(grid, start, count=1, total=1) {
    if (grid[count][start] === '' && total === grid.length -1) {
      return {i:count, y:start};
    }

    if (grid[0][start] === grid[count][start]) {
      count++;
      total++;
      return this.checkDownNow(grid, start, count, total);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDownBack(grid, start, count=grid.length - 2, total=1) {
    if (grid[count][start] === '' && total === grid.length -1) {
      return {i:count, y:start};
    }

    if (grid[grid.length -1][start] === grid[count][start]) {
      count--;
      total++;
      return this.checkDownBack(grid, start, count, total);
    }  else {
      return;
    }
  }

  // else if (grid[grid.length - 1][start + 1] === '' && grid[grid.length - 1][start - 1] !== '') {
  //   return {i:grid.length - 1, y:start + 1};
  // } else if (grid[grid.length - 1][start - 1] === '' && grid[grid.length - 1][start + 1] !== '') {
  //   return {i:grid.length - 1, y:start - 1};
  // }

  //[x,'',x]
  checkDiagonalTD(grid, count=grid.length -1, total=1) {
    if (grid[count][count] === '' && total === grid.length -1) {
      return {i:count,y:count};
    };
    if (grid[0][0] === grid[count][count]) {
      count--;
      total++;
      return this.checkDiagonalTD(grid, count, total);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalTDNow(grid, count=1, total=1) {
    if (grid[count][count] === '' && total === grid.length -1) {
      return {i:count, y:count};
    }
    if (grid[0][0] === grid[count][count]) {
      count++;
      total++;
      return this.checkDiagonalTDNow(grid, count, total);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalTDBack(grid, count=grid.length -2, top=1, total=1) {
    if (grid[top][count] === '' && total === grid.length -1) {
      return {i:top, y:count};
    }
    if (grid[0][grid.length -1] === grid[top][count]) {
      count--;
      top++;
      total++;
      return this.checkDiagonalTDBack(grid, count, top, total);
    } else {
      return;
    }
  }

  //[x,'',x]
  checkDiagonalBU(grid, count=grid.length, top=0, total=1) {
    if (grid[top][count - 1] === '' && total === grid.length -1) {
      return {i:top, y:count-1};
    }
    if (grid[grid.length - 1][0] === grid[top][count - 1]) {
      top++;
      total++;
      count--;
      return this.checkDiagonalBU(grid, count, top, total);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalBUNow(grid, count=1, top=grid.length - 2, total=1) {
    if (grid[top][count] === '' && total === grid.length -1) {
      return {i:top, y:count};
    }
    if (grid[grid.length - 1][0] === grid[top][count]) {
      top--;
      count++;
      total++;
      return this.checkDiagonalBUNow(grid, count, top, total);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalBUBack(grid, count=grid.length - 2, total=1) {
    if (grid[count][count] === '' && total === grid.length -1) {
      return {i:count, y:count};
    }
    if (grid[grid.length - 1][grid.length - 1] === grid[count][count]) {
      count--;
      total++;
      return this.checkDiagonalBUBack(grid, count, total);
    } else {
      return;
    }
  }
};
