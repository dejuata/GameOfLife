export class GameofLife {

    private boards = []

    constructor(private initialBoard: number[][], private steps: number) {}
  
    private rules(position: number, neighbors: number) {
      // Rule of game of life
      if (position == 0 && neighbors == 3) {
        return 1;
      } else if (position == 1 && (neighbors == 2 || neighbors == 3)) {
        return 1;
      } else {
        return 0;
      }
    }

    static getRandom(min: number, max: number) {
      return Math.round(Math.random() * (max - min) + min);
    }
  
    private gameOfLife() {
      let board = [];
      this.initialBoard.map((arr) => board.push([...arr]));
    
      // walk board
      for (let i = 0; i < this.initialBoard.length; i++) {
        for (let j = 0; j < this.initialBoard[0].length; j++) {
          let neighbors = 0;
          // sum neighbors
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              let value = 0;
              try {
                if (this.initialBoard[x + i][y + j]) {
                  value = 1;
                }
              } catch (error) {
                value = 0;
              }
              neighbors += value;
            }
          }
          neighbors -= this.initialBoard[i][j];
          board[i][j] = this.rules(this.initialBoard[i][j], neighbors);
        }
      }
      return board;
    }

    static generateArray(
      { width, height, size }: { width: number; height: number; size: number; }): number[][] {
      
        let arr = [];
    
      for (let i = 0; i < height / size; i++) {
        let aux = [];
        for (let j = 0; j < width / size; j++) {
          aux.push(this.getRandom(0, 1));
        }
        arr.push(aux);
      }
      return arr;
    }

    gameStates() {
      this.boards.push(this.initialBoard);
        for(let i = 0; i < this.steps; i++){
            this.initialBoard = this.gameOfLife();
            this.boards.push(this.initialBoard);
        }
        return this.boards
    }

  }