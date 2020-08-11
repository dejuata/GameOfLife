export class DrawGame {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private color: string,
    private size: number,
    private width: number,
    private height: number
  ) {}

  private drawSquare(position: number[]) {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      this.size * position[1],
      this.size * position[0],
      this.size,
      this.size
    );
  }

  drawGrid() {
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 2;
    let columns = [];
    let rows = [];

    for (let i = this.size; i < this.width; i += this.size) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, this.height);
      this.ctx.stroke();
      columns.push(i);
    }

    for (let i = this.size; i < this.height; i += this.size) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(this.width, i);
      this.ctx.stroke();
      rows.push(i);
    }
  }

  drawBoard(arr: any) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        if (arr[i][j] === 1) {
          this.drawSquare([i, j]);
        }
      }
    }
  }

  cleanBoard() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
