import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DrawGame } from './drawGame';
import { GameofLife } from './gameOfLife';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  private width: number;
  private height: number;
  private size: number = 20;
  private board: DrawGame;
  private arrInit: number[][];
  private gameBoards: any[];
  private requestId;
  private ctx: CanvasRenderingContext2D;

  steps: number = 10;
  index: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
    this.board = new DrawGame(this.ctx, '#7D7D7D', this.size, this.width, this.height);
    this.arrInit = GameofLife.generateArray({ width: this.width, height: this.height, size: this.size });
    this.board.drawGrid();
    this.board.drawBoard(this.arrInit);
  }

  newGame() {
    this.cleanCanvas();
    this.arrInit = GameofLife.generateArray({ width: this.width, height: this.height, size: this.size });
    this.board.drawBoard(this.arrInit);
  }

  run() {
    this.index = 0;
    let game = new GameofLife(this.arrInit, this.steps);
    this.gameBoards = game.gameStates();
    this.requestId = setInterval(() => {
      this.cleanCanvas();
      this.board.drawBoard(this.gameBoards[this.index])
      this.index++
      if (this.index == this.steps) {
        clearInterval(this.requestId);
      }

    }, 300);
  }

  cleanCanvas() {
    this.board.cleanBoard();
    this.board.drawGrid();
  }

}
