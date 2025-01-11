export class TicTacToeScene extends Phaser.Scene {
  private grid: number[][];
  private currentPlayer: number;
  private cellSize: number;
  private boardSize: number;
  private gameOver: boolean;
  private restartButton?: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'TicTacToeScene' });
    this.grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.currentPlayer = 1;
    this.cellSize = 200;
    this.boardSize = 3;
    this.gameOver = false;
  }

  init() {
    this.grid = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.currentPlayer = 1;
    this.cellSize = 200;
    this.boardSize = 3;
    this.gameOver = false;
  }

  preload() {
    this.load.image('X', '/assets/tictactoe/x.png');
    this.load.image('O', '/assets/tictactoe/o.png');
  }

  create() {
    this.drawGrid();

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.gameOver) return;

      const x = Math.floor(pointer.x / this.cellSize);
      const y = Math.floor(pointer.y / this.cellSize);

      if (this.grid[y][x] === 0) {
        this.grid[y][x] = this.currentPlayer;
        this.drawMark(x, y, this.currentPlayer);

        if (this.checkWin(this.currentPlayer)) {
          this.gameOver = true;
          this.showGameOver(`Player ${this.currentPlayer} Wins!`);
        } else if (this.checkDraw()) {
          this.gameOver = true;
          this.showGameOver("It's a Draw!");
        } else {
          this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        }
      }
    });
  }

  private drawGrid() {
    for (let i = 0; i < this.boardSize + 1; i++) {
      this.add
        .line(0, 0, i * this.cellSize, 0, i * this.cellSize, this.cellSize, this.cellSize * this.boardSize, 0x000000)
        .setLineWidth(2, 2)
        .setOrigin(0, 0);
      this.add
        .line(0, 0, 0, i * this.cellSize, this.cellSize * this.boardSize, i * this.cellSize, 0x000000)
        .setLineWidth(2, 2)
        .setOrigin(0, 0);
      this.add
        .line(0, 0, 0, i * this.cellSize, this.cellSize, i * this.cellSize, this.cellSize * this.boardSize, 0x000000)
        .setLineWidth(2, 2)
        .setOrigin(0, 0);
      this.add
        .line(0, 0, i * this.cellSize, 0, i * this.cellSize, this.cellSize * this.boardSize, 0x000000)
        .setLineWidth(2, 2)
        .setOrigin(0, 0);
    }
  }

  private drawMark(x: number, y: number, player: number) {
    const mark = this.add.image(
      x * this.cellSize + this.cellSize / 2,
      y * this.cellSize + this.cellSize / 2,
      player === 1 ? 'X' : 'O'
    );
    mark.setScale(0.5);
  }

  private checkWin(player: number): boolean {
    for (let i = 0; i < this.boardSize; i++) {
      if (this.grid[i].every((cell) => cell === player)) return true;
      if (this.grid.map((row) => row[i]).every((cell) => cell === player)) return true;
    }

    if (this.grid[0][0] === player && this.grid[1][1] === player && this.grid[2][2] === player) return true;
    if (this.grid[0][2] === player && this.grid[1][1] === player && this.grid[2][0] === player) return true;

    return false;
  }

  private checkDraw(): boolean {
    return this.grid.flat().every((cell) => cell !== 0);
  }

  private showGameOver(message: string) {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 0.8);
    graphics.fillRect(200, 175, 200, 100);

    const text = this.add.text(300, 225, message, { font: '20px Arial', color: '#000' });
    text.setOrigin(0.5);

    this.restartButton = this.add
      .text(300, 325, 'Restart', {
        font: '18px Arial',
        color: '#000',
        backgroundColor: '#ddd',
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.restartButton.setStyle({ align: 'center' });

    this.restartButton.on('pointerdown', () => {
      console.log('다시 시작 버튼 클릭됨');
      this.restartGame();
    });
  }

  private restartGame() {
    console.log('게임을 재시작합니다.');
    this.scene.restart();
  }

  update() {}
}
