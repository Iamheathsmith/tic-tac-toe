'use strict';

module.exports = new class {
  nextMove(grid, count) {
    if (grid.length !== grid[0].length) return 'need to be a square';

    //first cpu move.
    if (count <= 2 && grid[1][1] === '') {
      return {i:1, y:1};
    }
    if (count <= 2 && grid[1][1] !== '') {
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

      // check diagonal R.bottom => L.top
      if (grid[grid.length -1][0] === 'X') {
        let now = this.checkDiagonalBUNow(grid);
        needToUse.push(now);
        let test = this.checkDiagonalBU(grid);
        empty.push(test);
      }

      for (let i = 0; i < grid.length; i++) {

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

        // //check across L => R
        // if (grid[i][grid.length -1] === 'X') {
        //   let back = this.checkAcrossBack(grid[i], i);
        //   empty.push(back);
        // }

        //check down T => B
        if (grid[0][i] === 'X') {
          let now = this.checkDownNow(grid, i);
          needToUse.push(test);
          let test = this.checkDown(grid, i);
          empty.push(test);
        }
      }


      for (let i = 0; i < needToUse.length || empty.length; i++) {
        console.log('needtoknow', needToUse);
        console.log('empty', empty);
        if (needToUse[i] !== undefined && grid[needToUse[i].i][needToUse[i].y] === '') {
          console.log('using needtouse', needToUse[i]);
          return needToUse[i];
        } else {
          if (empty[i] !== undefined && grid[empty[i].i][empty[i].y] === '') {
            let temp = empty[i];
            console.log('using empty', needToUse[i]);
            return empty[i];
          }
        }
      }
    }
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

  checkAcrossBack(grid, start, count= grid.length - 2) {
    console.log('inside CAB');
    if (grid[count] === '' && count !== grid.length -1) {
      console.log('push CAB', {i:start, y:count});
      return {i:start, y:count};
    }
    if (grid[grid.length -1] === grid[count]) {
      console.log('going again in CAB', grid[grid.length -1], grid[count], count);
      count--;
      console.log('new count', count);
      return this.checkAcrossBack(grid, start, count);
    } else {
      console.log('break CAB');
      return;
    }
  }

  //[x,'',x]
  checkDown(grid, start, count=grid.length) {
    if (grid[0][start] !== grid[count - 1][start]) {
      return {i:count -1, y: start};
    }
    if (grid[0][start] === grid[count - 1][start]) {
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

  //[x,'',x]
  checkDiagonalBU(grid, count=grid.length, top=0) {
    console.log('inside checkDiagonalBU');
    if (grid[top][count - 1] === '' && top !== 0) {
      console.log('pushing', {i:top, y:count-1});
      return {i:top, y:count-1};
    }
    if (grid[grid.length - 1][0] === grid[top][count - 1]) {
      top++;
      count--;
      console.log('running CDBU again');
      return this.checkDiagonalBU(grid, count, top);
    } else {
      console.log('break out of CDBU');
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

};
