'use strict';

module.exports = new class {
  nextMove(grid, count) {
    if (grid.length !== grid[0].length) return 'need to be a square';
    let jic = [[1,1],[1,2],[2,1],[2,2]];
    let total = 0;

    //first cpu move.
    if (count <= 2 && grid[1][1] === '') {
      return {i:1, y:1};
    }
    if (count <= 2 && grid[1][1] !== '') {
      let temp = this.pickRandom(grid);
      return temp;
    }

    //cpu 2nd and up move
    if (count > 2) {
      let empty = [];
      let needToUse = [];

      // check diagonal R.top => L.bottom
      if (grid[0][0] === 'X') {
        let now = this.checkDiagonalTDNow(grid);
        needToUse.push(now);
        let test = this.checkDiagonalTD(grid);
        empty.push(test);
      }

      // check diagonal R.left => L.right
      if (grid[0][grid.length -1] === 'X') {
        let now = this.checkDiagonalTDBack(grid);
        needToUse.push(now);
      }

      // check diagonal R.bottom => L.top
      if (grid[grid.length -1][0] === 'X') {
        let now = this.checkDiagonalBUNow(grid);
        needToUse.push(now);
        let test = this.checkDiagonalBU(grid);
        empty.push(test);
      }

      // check diagonal L.bottom => R.top
      if (grid[grid.length -1][grid.length -1] === 'X') {
        let now = this.checkDiagonalBUBack(grid);
        needToUse.push(now);
      }

      for (let i = 0; i < grid.length; i++) {
        total++;

        //check across L => R
        if (grid[i][grid.length -1] === 'X') {
          let back = this.checkAcrossBack(grid[i], i);
          empty.push(back);
        }

        // check across RL =>
        if (grid[i][0] === 'X') {
          let now = this.checkAcrossNow(grid[i] ,i);
          needToUse.push(now);
          let test = this.checkAcross(grid[i], i);
          empty.push(test);
        }

        //check down T => B
        if (grid[0][i] === 'X') {
          let now = this.checkDownNow(grid, i);
          needToUse.push(now);
          let test = this.checkDown(grid, i);
          empty.push(test);
        }

        // check bottom up
        if (grid[grid.length -1][i] === 'X') {
          let test = this.checkDownBack(grid, i);
          empty.push(test);
        }
      }

      if (total === grid.length) {
        for (let i = 0; i < 6; i++) {
          if (needToUse[i] !== undefined && grid[needToUse[i].i][needToUse[i].y] === '') {
            return needToUse[i];
          } else {
            if (empty[i] !== undefined && grid[empty[i].i][empty[i].y] === '') {
              let temp = empty[i];
              return empty[i];
            }
          }
        }
      }
      let temp = this.pickRandom(grid);
      return temp;
    }
  }

  pickRandom(grid) {
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

  //[x,'',x]
  checkAcross(grid, start, count=grid.length) {
    if (grid[count - 1] === '' && count !== grid.length) {
      return {i:start, y:count - 1};
    }
    if (grid[0] === grid[count - 1]) {
      count--;
      return this.checkAcross(grid, start, count);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkAcrossNow(grid, start, count=1) {
    if (grid[count] === '' && count !== 1) {
      return {i:start, y:count};
    }
    if (grid[0] === grid[count]) {
      count++;
      return this.checkAcrossNow(grid, start, count);
    } else {
      return;
    }
  }


  //['',x,x]
  checkAcrossBack(grid, start, count= grid.length - 2) {
    if (grid[count] === '' && count !== grid.length - 2) {
      return {i:start, y:count};
    }
    if (grid[grid.length -1] === grid[count]) {
      count--;
      return this.checkAcrossBack(grid, start, count);
    } else {
      return;
    }
  }

  //[x,'',x]
  checkDown(grid, start, count=grid.length - 1) {
    if (grid[0][start] !== grid[count][start] && count !== grid.length - 1) {
      return {i:count, y: start};
    }
    if (grid[0][start] === grid[count][start]) {
      count--;
      return this.checkDown(grid, start, count);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDownNow(grid, start, count=1) {
    if (grid[count][start] === '' && count !== 1) {
      return {i:count, y:start};
    }

    if (grid[0][start] === grid[count][start]) {
      count++;
      return this.checkDownNow(grid, start, count);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDownBack(grid, start, count=grid.length - 2) {
    if (grid[count][start] === '' && count !== grid.length - 2) {
      return {i:count, y:start};
    }

    if (grid[grid.length -1][start] === grid[count][start]) {
      count--;
      return this.checkDownBack(grid, start, count);
    } else if (grid[grid.length - 1][start + 1] === '' && grid[grid.length - 1][start - 1] !== '') {
      return {i:grid.length - 1, y:start + 1};
    } else if (grid[grid.length - 1][start - 1] === '' && grid[grid.length - 1][start + 1] !== '') {
      return {i:grid.length - 1, y:start - 1};
    } else {
      return;
    }
  }

  //[x,'',x]
  checkDiagonalTD(grid, count=grid.length) {
    if (grid[count - 1][count - 1] !== '' && count !== grid.length) {
      return {i:count-1,y:count-1};
    };
    if (grid[0][0] === grid[count - 1][count - 1]) {
      count--;
      return this.checkDiagonalTD(grid, count);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalTDNow(grid, count=1) {
    if (grid[count][count] === '' && count !== 1) {
      return {i:count, y:count};
    }
    if (grid[0][0] === grid[count][count]) {
      count++;
      return this.checkDiagonalTDNow(grid, count);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalTDBack(grid, count=grid.length -2, top=1) {
    if (grid[top][count] === '' && top !== 1) {
      return {i:top, y:count};
    }
    if (grid[0][grid.length -1] === grid[top][count]) {
      count--;
      top++;
      return this.checkDiagonalTDBack(grid, count, top);
    } else {
      return;
    }
  }

  //[x,'',x]
  checkDiagonalBU(grid, count=grid.length, top=0) {
    if (grid[top][count - 1] === '' && top !== 0) {
      return {i:top, y:count-1};
    }
    if (grid[grid.length - 1][0] === grid[top][count - 1]) {
      top++;
      count--;
      return this.checkDiagonalBU(grid, count, top);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalBUNow(grid, count=1, top=grid.length - 2) {
    if (grid[top][count] === '' && count !== 1) {
      return {i:top, y:count};
    }
    if (grid[grid.length - 1][0] === grid[top][count]) {
      top--;
      count++;
      return this.checkDiagonalBUNow(grid, count, top);
    } else {
      return;
    }
  }

  //[x,x,'']
  checkDiagonalBUBack(grid, count=grid.length - 2) {
    if (grid[count][count] === '' && count !== grid.length - 2) {
      return {i:count, y:count};
    }
    if (grid[grid.length - 1][grid.length - 1] === grid[count][count]) {
      count--;
      return this.checkDiagonalBUBack(grid, count);
    } else {
      return;
    }
  }

};
