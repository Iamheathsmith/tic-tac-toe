'use strict';

module.exports = new class {
  goForWin(grid, count) {
    if (grid.length !== grid[0].length) return 'need to be a square';
    let total = 0;

    //cpu 2nd and up move
    if (count > 2) {

      // check diagonal R.top => L.bottom
      if (grid[0][0] === 'O') {
        console.log('DIG RT=>LB');
        let test = this.checkDiagonalTD(grid);
        if (test) return test;
      }

      // check diagonal L.bottom => R.top
      if (grid[0][grid.length -1] === 'O') {
        console.log('DIG LB => RT');
        let now = this.checkDiagonalTDBack(grid);
        if (now) return now;
      }

      // check diagonal R.bottom => L.top
      if (grid[grid.length -1][0] === 'O') {
        console.log('DIG RB=>LT');
        let test = this.checkDiagonalBU(grid);
        if (test) return test;
      }

      // check diagonal L.bottom => R.top
      if (grid[grid.length -1][grid.length -1] === 'O') {
        console.log('DIG LB => RT');
        let now = this.checkDiagonalBUBack(grid);
        if (now) return now;
      }

      for (let i = 0; i < grid.length; i++) {
        total++;

        //check across L => R
        if (grid[i][grid.length -1] === 'O') {
          let back = this.checkAcrossBack(grid[i], i);
          if (back) return back;
        }

        // check across R => L =>
        if (grid[i][0] === 'O') {
          let test = this.checkAcross(grid[i], i);
          if (test) return test;
        }

        //check down T => B
        if (grid[0][i] === 'O') {
          let test = this.checkDown(grid, i);
          if (test) return test;
        }

        // check bottom up
        if (grid[grid.length -1][i] === 'O') {
          let test = this.checkDownBack(grid, i);
          if (test) return test;
        }

      }
    }
    return null;
  }




  //[x,'',x]
  checkAcross(grid, start, count=grid.length - 1) {
    console.log('inside CA');
    if (grid[count] === '' && grid[count - 1] === 'O') {
      return {i:start, y:count};
    }
    if (grid[count] !== 'X') {
      count--;
      return this.checkAcross(grid, start, count);
    } else {
      return;
    }
  }


  //['',x,x]
  checkAcrossBack(grid, start, count=grid.length - 2) {
    console.log('inside CAB');
    if (grid[count] === '' && grid[count - 1] !== 'X') {
      return {i:start, y:count};
    }
    if (grid[count] !== 'X') {
      count--;
      return this.checkAcrossBack(grid, start, count);
    } else {
      return;
    }
  }

  //[x,'',x]
  checkDown(grid, start, count=grid.length - 1) {
    console.log('inside CD');
    if (grid[count][start] === '' && grid[count - 1][start] === 'O') {
      return {i:count, y: start};
    }
    if (grid[count][start] !== 'X') {
      count--;
      return this.checkDown(grid, start, count);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDownBack(grid, start, count=grid.length - 2) {
    console.log('inside CDB');
    if (grid[count][start] === '' && grid[count - 1][start] !== 'X') {
      return {i:count, y:start};
    }

    if (grid[count][start] !== 'X') {
      count--;
      return this.checkDownBack(grid, start, count);
    }  else {
      return;
    }
  }

  //[x,'',x]
  checkDiagonalTD(grid, count=grid.length -1) {
    console.log('inside CDTD');
    if (grid[count][count] === '' && grid[count - 1][count - 1] === 'O') {
      return {i:count,y:count};
    };
    if (grid[count][count] !== 'X') {
      count--;
      return this.checkDiagonalTD(grid, count);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalTDBack(grid, count=grid.length -2, top=1) {
    console.log('inside CDTB-back');
    if (grid[top][count] === '' && grid[top + 1][count - 1] !== 'X') {
      return {i:top, y:count};
    }
    if (grid[top][count] !== 'X') {
      count--;
      top++;
      return this.checkDiagonalTDBack(grid, count, top);
    } else {
      return;
    }
  }

  //[x,'',x]
  checkDiagonalBU(grid, count=grid.length - 1, top=0) {
    console.log('inside CDBU');
    if (grid[top][count - 1] === '' && grid[top + 1][count - 1] === 'O') {
      return {i:top, y:count-1};
    }
    if (grid[top][count] !== 'X') {
      top++;
      count--;
      return this.checkDiagonalBU(grid, count, top);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalBUBack(grid, count=grid.length - 2) {
    console.log('inside CDBU-back');
    if (grid[count][count] === '' && grid[count - 1][count - 1] !== 'X') {
      return {i:count, y:count};
    }
    if (grid[count][count] !== 'X') {
      count--;
      return this.checkDiagonalBUBack(grid, count);
    } else {
      return;
    }
  }
};
