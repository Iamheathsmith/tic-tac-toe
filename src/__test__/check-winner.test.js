'use strict';

const Check = require('../lib/check-winner');

let testInput = [[1,2][1]];

let checkAcrossWin = [['X','X'],['O','']];
let checkAcrossSor = [['X',''],['O','']];

let checkDownWin = [['X','O'],['X','']];
let checkDownSor = [['X',''],['O','']];

let checkDigTDWin = [['X','O'],['','X']];
let checkDigTDSor = [['X',''],['O','']];

let checkDigBUWin = [['','X'],['X','O']];
let checkDigBUSor = [['X',''],['','O']];


describe('Check-winner.js', function() {
  describe('check for vaild input', () => {
    it('should return "need to be a square" if not square', () => {
      expect(Check.checkWinner(testInput)).toBe('need to be a square');
    });
  });

  describe('check Across in 2D array', () => {
    it('checking array arcross for winner/Sorry', () => {
      expect(Check.checkWinner(checkAcrossWin)).toBe('winner');
      expect(Check.checkWinner(checkAcrossSor)).toBe('sorry');
    });
  });

  describe('check Down in 2D array', () => {
    it('checking array Down for winner/Sorry', () => {
      expect(Check.checkWinner(checkDownWin)).toBe('winner');
      expect(Check.checkWinner(checkDownSor)).toBe('sorry');
    });
  });

  describe('check checkDiagonalTD in 2D array', () => {
    it('checking array checkDiagonalTD for winner/Sorry', () => {
      expect(Check.checkWinner(checkDigTDWin)).toBe('winner');
      expect(Check.checkWinner(checkDigTDSor)).toBe('sorry');
    });
  });

  describe('check checkDiagonalBU in 2D array', () => {
    it('checking array checkDiagonalBU for winner/Sorry', () => {
      expect(Check.checkWinner(checkDigBUWin)).toBe('winner');
      expect(Check.checkWinner(checkDigBUSor)).toBe('sorry');
    });
  });
});
