'use strict';

const Bot = require('../lib/bot');

let testInput = [[1,2][1]];

let startGame = [['','',''],['X','',''],['','','']];
let startGameNoCen = [['','',''],['','X',''],['','','']];
//--------------------------
let blockdigTDNowLR = [['X','','O'],['','X',''],['','','']];
let blockdigTDLR = [['X','',''],['','',''],['','O','X']];
let blockdigTDNowRL = [['','','X'],['','X',''],['','','']];
let blockdigTDRL = [['','','X'],['','',''],['X','O','']];
let blockdigTDBack = [['','','X'],['','X',''],['','O','']];
//--------------------------
let blockdigBUNowLR = [['','','O'],['','X',''],['X','','']];
let blockdigBULR = [['','','X'],['','',''],['X','O','']];
let blockdigBUNowRL = [['','','X'],['','X',''],['','','']];
let blockdigBURL = [['','','X'],['','',''],['X','O','']];
let blockdigBUBack = [['','',''],['','X',''],['','O','X']];
//--------------------------
let blockAcrossNowLR = [['X','X',''],['','O',''],['','','']];
let blockAcrossLR = [['X','','X'],['','',''],['','O','']];
let blockAcrossBack = [['','X','X'],['','',''],['','O','']];
//--------------------------
let blockDownNowTD = [['X','',''],['X','O',''],['','','']];
let blockDownTD = [['X','',''],['','O',''],['X','','']];
let blockDownBack = [['','',''],['','X',''],['O','X','']];
//--------------------------
let runRandom = [['','',''],['X','O','X'],['','','']];






describe('bot.js', function() {
  describe('check for vaild input', () => {
    it('should return "need to be a square" if not square', () => {
      expect(Bot.nextMove(testInput, 1)).toBe('need to be a square');
    });
  });

  describe('check frist move of user', () => {
    it('if center is open. take center', () => {
      expect(Bot.nextMove(startGame, 1)).toEqual({i:1, y:1});
      expect(Bot.nextMove(startGame, 1)).toBeInstanceOf(Object);
    });
    it('if center is Full. get a random spot', () => {
      expect(Bot.nextMove(startGameNoCen, 1)).toBeInstanceOf(Object);
    });
  });

  describe('Check Diagonal Top Down', () => {
    describe('block TD L => R Diagonal', () => {
      it('if user has everything but last TD dig, go there', () => {
        expect(Bot.nextMove(blockdigTDNowLR, 3)).toEqual({i:2, y:2});
        expect(Bot.nextMove(blockdigTDNowLR, 3)).toBeInstanceOf(Object);
      });
      it('if user has everything but Middle TD dig, go there', () => {
        expect(Bot.nextMove(blockdigTDLR, 3)).toEqual({i:1, y:1});
        expect(Bot.nextMove(blockdigTDLR, 3)).toBeInstanceOf(Object);
      });
    });

    describe('block TD R => L Diagonal', () => {
      it('if user has everything but last TD dig, go there', () => {
        expect(Bot.nextMove(blockdigTDNowRL, 3)).toEqual({i:2, y:0});
        expect(Bot.nextMove(blockdigTDNowRL, 3)).toBeInstanceOf(Object);
      });
      it('if user has everything but Middle TD dig, go there', () => {
        expect(Bot.nextMove(blockdigTDRL, 3)).toEqual({i:1, y:1});
        expect(Bot.nextMove(blockdigTDRL, 3)).toBeInstanceOf(Object);
      });
    });

    describe('block TD R => L Diagonal Back', () => {
      it('if user has everything but last TD dig back, go there', () => {
        expect(Bot.nextMove(blockdigTDBack, 3)).toEqual({i:2, y:0});
        expect(Bot.nextMove(blockdigTDBack, 3)).toBeInstanceOf(Object);
      });
    });
  });

  describe('Check Diagonal Bottom Up', () => {
    describe('block BU L => R Diagonal', () => {
      it('if user has everything but last BU dig, go there', () => {
        expect(Bot.nextMove(blockdigBUNowLR, 3)).toEqual({i:2, y:1});
        expect(Bot.nextMove(blockdigBUNowLR, 3)).toBeInstanceOf(Object);
      });
      it('if user has everything but Middle BU dig, go there', () => {
        expect(Bot.nextMove(blockdigBULR, 3)).toEqual({i:1, y:1});
        expect(Bot.nextMove(blockdigBULR, 3)).toBeInstanceOf(Object);
      });
    });

    describe('block BU R => L Diagonal', () => {
      it('if user has everything but last BU dig, go there', () => {
        expect(Bot.nextMove(blockdigBUNowRL, 3)).toEqual({i:2, y:0});
        expect(Bot.nextMove(blockdigBUNowRL, 3)).toBeInstanceOf(Object);
      });
      it('if user has everything but Middle BU dig, go there', () => {
        expect(Bot.nextMove(blockdigBURL, 3)).toEqual({i:1, y:1});
        expect(Bot.nextMove(blockdigBURL, 3)).toBeInstanceOf(Object);
      });
    });

    describe('block BU R => L Diagonal Back', () => {
      it('if user has everything but last BU dig back, go there', () => {
        expect(Bot.nextMove(blockdigBUBack, 3)).toEqual({i:0, y:0});
        expect(Bot.nextMove(blockdigBUBack, 3)).toBeInstanceOf(Object);
      });
    });
  });

  describe('Checking across', () => {
    describe('block across L => R', () => {
      it('if user has everything but last across, go there', () => {
        expect(Bot.nextMove(blockAcrossNowLR, 3)).toEqual({i:0, y:2});
        expect(Bot.nextMove(blockAcrossNowLR, 3)).toBeInstanceOf(Object);
      });
      it('if user has everything but Middle in across, go there', () => {
        expect(Bot.nextMove(blockAcrossLR, 3)).toEqual({i:0, y:1});
        expect(Bot.nextMove(blockAcrossLR, 3)).toBeInstanceOf(Object);
      });
    });

    describe('block across R => L', () => {
      it('if user has everything but last across, go there', () => {
        expect(Bot.nextMove(blockAcrossBack, 3)).toEqual({i:0, y:0});
        expect(Bot.nextMove(blockAcrossBack, 3)).toBeInstanceOf(Object);
      });
    });
  });

  describe('Checking Down', () => {
    describe('block Down T => D', () => {
      it('if user has everything but last across, go there', () => {
        expect(Bot.nextMove(blockDownNowTD, 3)).toEqual({i:2, y:0});
        expect(Bot.nextMove(blockDownNowTD, 3)).toBeInstanceOf(Object);
      });
      it('if user has everything but Middle in across, go there', () => {
        expect(Bot.nextMove(blockDownTD, 3)).toEqual({i:1, y:0});
        expect(Bot.nextMove(blockDownTD, 3)).toBeInstanceOf(Object);
      });
    });

    describe('block across R => L', () => {
      it('if user has everything but last across, go there', () => {
        expect(Bot.nextMove(blockDownBack, 3)).toEqual({i:0, y:1});
        expect(Bot.nextMove(blockDownBack, 3)).toBeInstanceOf(Object);
      });
    });
  });

  describe('No match, Pick Random', () => {
    describe('No mark was picked, run Random', () => {
      it('Nothing can be played to block, run random.', () => {
        expect(Bot.nextMove(runRandom, 3)).toBeInstanceOf(Object);
      });
    });
  });

});
