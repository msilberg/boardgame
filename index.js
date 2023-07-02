import chalk from 'chalk';

class Game {
  constructor(size, maxMoves) {
    this.boardSize = size;
    this.maxMoves = maxMoves;
    this.colors = ['r', 'b', 'g', 'y'];
    this.board = [];
    this.moves = 0;
    this.gameIsOver = false;
    this.initializeBoard();
  }

  initializeBoard() {
    for (let i = 0; i < this.boardSize; i++) {
      const row = [];
      for (let j = 0; j < this.boardSize; j++) {
        row.push(this.getRandomColor());
      }
      this.board.push(row);
    }
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }

  isValidMove(color) {
    if (!this.colors.includes(color)) {
      console.log('Invalid color! Please choose from: ' + this.colors.join(', '));
      return false;
    }
    if (this.gameIsOver) {
      return false;
    }
    return true;
  }

  fillBoard(color) {
    if (!this.isValidMove(color)) {
      return;
    }

    const targetColor = this.board[0][0];
    this.moves++;
    this.gameIsOver = (this.moves === this.maxMoves);
    if (color === targetColor) {
      if (this.gameIsOver) {
        if (this.checkWinningCondition(color)) {
          this.gameIsOver = true;
          console.log(`You won the game in ${this.moves} moves.`);
        } else if (this.gameIsOver) {;
          console.log(`Game over! ${this.maxMoves} moves reached. You lost the game.`);
        }
      } else {
        console.log(`Move ${this.moves}: No change needed. Same color as the target color.`); 
      }
      return;
    }

    this.depthFirstSearch(0, 0, targetColor, color);
    console.log(`Move ${this.moves}: Fill board with color ${color}`);
    this.printBoard();
    
    if (this.checkWinningCondition(color)) {
      this.gameIsOver = true;
      console.log(`You won the game in ${this.moves} moves.`);
      return;
    } else if (this.gameIsOver) {;
      console.log(`Game over! ${this.maxMoves} moves reached. You lost the game.`);
      return;
    }
  }

  depthFirstSearch(row, col, targetColor, newColor) {
    if (
      row < 0 ||
      row >= this.boardSize ||
      col < 0 ||
      col >= this.boardSize ||
      this.board[row][col] !== targetColor
    ) {
      return;
    }

    this.board[row][col] = newColor;

    // DFS on adjacent cells
    this.depthFirstSearch(row + 1, col, targetColor, newColor); // up
    this.depthFirstSearch(row - 1, col, targetColor, newColor); // down
    this.depthFirstSearch(row, col + 1, targetColor, newColor); // right
    this.depthFirstSearch(row, col - 1, targetColor, newColor); // left
  }

  checkWinningCondition(color) {
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.board[i][j] !== color) {
          return false;
        }
      }
    }
    return true;
  }

  printBoard() {
    for (let i = 0; i < this.boardSize; i++) {
      // console.log(this.board[i].join(' '));
      let rowString = '';
      for (let j = 0; j < this.board[i].length; j++) {
        const color = this.board[i][j];
        let coloredSquare;
        switch (color) {
          case 'r':
            coloredSquare = chalk.red('■');
            break;
          case 'b':
            coloredSquare = chalk.blue('■');
            break;
          case 'g':
            coloredSquare = chalk.green('■');
            break;
          case 'y':
            coloredSquare = chalk.yellow('■');
            break;
        }
        rowString += coloredSquare + ' ';
      }
      console.log(rowString);
    }
  }
}

//  Game Initialization

const maxMoves = 21;
const game = new Game(18, maxMoves);
console.log('Initial Board');
game.printBoard();

for (let i = 0; i < maxMoves; i++) {
  const randomColor = game.getRandomColor();
  game.fillBoard(randomColor);
  if (game.gameIsOver) break;
  console.log('\n');
}
