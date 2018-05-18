## Tic Tac Toe game made with React.

[![Build Status](https://travis-ci.org/Iamheathsmith/tic-tac-toe.svg?branch=master)](https://travis-ci.org/Iamheathsmith/tic-tac-toe)


### [Link to live site hosted on Heroku.com](https://heath-tic-tac-toe.herokuapp.com/)

This is a game of Tic Tac Toe that is made with React that does not use Redux for state management.
The game has been built so you can play the Orignal way of 3x3 grid or you can play "insane mode" which goes to 4x4 grid. You still have to get 4 in a row with this size of grid to win!  We also have build a very smart CPU that will do what ever it takes to not let you win.  It will block every possible outcome and also play to win as well. Here is a list of the follow react component that we use.

### Mobile first design

We built this app to have a easy layout that is ment to be used on the mobile device such as a phone or a tablet. I will also adjust to work on anysize desktop screen as well.

### React component

* Landing page(content) - The landing page for our components.
* DisplayBox - for displaying the squares on the page.
* Modal - for displaying who has won the game.
* Radio - for selecting the game mode. Either normal or insane.
* CheckBox - for selecting either Player VS. Player or Player VS CPU.


### Lib file

we have 3 different files in my Lib files that do a very basic functions

* Bot.js - this is the CPU to play against you
* Check-winner.js - this is the function to check if there is a winner or stalemate
* utils.js - just has a render function.

### Images

This is a image sprite that we use to select parts of the image for items such as a `radio button` or a `check box`. Doing this lets us reduce the size of the needed image files for the app.

### Test

We use Jest to test the Logic of the game by testing the `bot.js` and `check-winner.js` file.  We cover over 97% in branch, over 98% in lines/stmts and 100% of functions. Below is the results of the Jest test.

```
-----------------|----------|----------|----------|----------|-------------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------|----------|----------|----------|----------|-------------------|
All files        |    98.94 |    97.13 |      100 |    98.93 |                   |
 bot.js          |    98.59 |     96.3 |      100 |    98.58 |           192,255 |
 check-winner.js |      100 |      100 |      100 |      100 |                   |
-----------------|----------|----------|----------|----------|-------------------|
Test Suites: 2 passed, 2 total
Tests:       25 passed, 25 total
Snapshots:   0 total
Time:        1.148s
```

### Continuous integration

We use Travis-ci to run our continuous integration.
