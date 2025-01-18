import Phaser from 'phaser';

export class TwelveJanggiGameScene extends Phaser.Scene {
  private width: number;
  private height: number;
  private cellWidth: number;
  private cellHeight: number;
  private rows: number = 3;
  private cols: number = 4;
  private boardInfo: {
    piece: string;
    player: 'A' | 'B' | null;
  }[][] = [];
  private highlights: Phaser.GameObjects.Rectangle[] = [];

  constructor() {
    super('TwelveJanggiGame');
    this.width = 0;
    this.height = 0;
    this.cellWidth = 0;
    this.cellHeight = 0;
  }

  preload() {}

  create() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;
    this.cellWidth = this.width / this.cols;
    this.cellHeight = this.height / this.rows;

    // 보드 초기화
    this.initBoard();
    this.createBoard();
    this.createPieces();
  }

  update() {}

  // 보드 초기화
  private initBoard() {
    for (let i = 0; i < this.rows; i++) {
      this.boardInfo[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.boardInfo[i][j] = {
          piece: '',
          player: null,
        };
      }
    }
  }

  // 보드 그리기
  private createBoard() {
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0x000000);

    for (let col = 0; col <= this.cols; col++) {
      const x = col * this.cellWidth;
      graphics.beginPath();
      graphics.moveTo(x, 0);
      graphics.lineTo(x, this.height);
      graphics.strokePath();
    }

    for (let row = 0; row <= this.rows; row++) {
      const y = row * this.cellHeight;
      graphics.beginPath();
      graphics.moveTo(0, y);
      graphics.lineTo(this.width, y);
      graphics.strokePath();
    }
  }

  // 장기말 배치
  private createPieces() {
    const pieces = [
      ['相', '', '', '將'],
      ['王', '子', '子', '王'],
      ['將', '', '', '相'],
    ];

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const piece = pieces[row][col];
        if (piece !== '') {
          const player = this.getPlayer(row, col);
          const color = player === 'A' ? '#ff0000' : '#0000ff';
          const text = this.add
            .text(col * this.cellWidth + this.cellWidth / 2, row * this.cellHeight + this.cellHeight / 2, piece, {
              fontSize: '32px',
              color: color,
            })
            .setOrigin(0.5)
            .setInteractive();

          text.setData('row', row);
          text.setData('col', col);
          text.setData('piece', piece);
          text.setData('player', player);

          text.on('pointerdown', () => {
            this.showValidMoves(text);
          });

          this.boardInfo[row][col] = {
            piece: piece,
            player: player,
          };
        }
      }
    }
  }

  private getPlayer(row: number, col: number): 'A' | 'B' {
    // A플레이어의 위치는 (0,0), (1,0), (1,2), (2,0) 이므로
    if ((row === 0 && col === 0) || (row === 1 && col === 0) || (row === 1 && col === 1) || (row === 2 && col === 0)) {
      return 'A';
    }
    return 'B'; // 나머지는 B플레이어
  }

  // 유효한 이동 경로 계산
  private getValidMoves(row: number, col: number, piece: string, player: 'A' | 'B'): [number, number][] {
    const validMoves: [number, number][] = [];

    switch (piece) {
      case '將': // 장
        if (row > 0) validMoves.push([row - 1, col]); // 위로
        if (row < this.rows - 1) validMoves.push([row + 1, col]); // 아래로
        if (col > 0) validMoves.push([row, col - 1]); // 왼쪽으로
        if (col < this.cols - 1) validMoves.push([row, col + 1]); // 오른쪽으로
        break;

      case '相': // 상
        if (row > 0 && col > 0) validMoves.push([row - 1, col - 1]); // 왼쪽 위
        if (row > 0 && col < this.cols - 1) validMoves.push([row - 1, col + 1]); // 오른쪽 위
        if (row < this.rows - 1 && col > 0) validMoves.push([row + 1, col - 1]); // 왼쪽 아래
        if (row < this.rows - 1 && col < this.cols - 1) validMoves.push([row + 1, col + 1]); // 오른쪽 아래
        break;

      case '王': // 왕
        if (row > 0) validMoves.push([row - 1, col]); // 위로
        if (row < this.rows - 1) validMoves.push([row + 1, col]); // 아래로
        if (col > 0) validMoves.push([row, col - 1]); // 왼쪽으로
        if (col < this.cols - 1) validMoves.push([row, col + 1]); // 오른쪽으로
        if (row > 0 && col > 0) validMoves.push([row - 1, col - 1]); // 왼쪽 위
        if (row > 0 && col < this.cols - 1) validMoves.push([row - 1, col + 1]); // 오른쪽 위
        if (row < this.rows - 1 && col > 0) validMoves.push([row + 1, col - 1]); // 왼쪽 아래
        if (row < this.rows - 1 && col < this.cols - 1) validMoves.push([row + 1, col + 1]); // 오른쪽 아래
        break;

      case '子': // 자
        if (col > 0 && player === 'A') validMoves.push([row, col + 1]);
        if (col < this.cols - 1 && player === 'B') validMoves.push([row, col - 1]);
        break;

      case '侯': // 후
        if (row > 0) validMoves.push([row - 1, col]); // 앞
        if (row < this.rows - 1) validMoves.push([row + 1, col]); // 뒤
        if (col > 0) validMoves.push([row, col - 1]); // 왼쪽
        if (col < this.cols - 1) validMoves.push([row, col + 1]); // 오른쪽
        break;
    }

    return validMoves;
  }

  // 이동 가능한 위치 하이라이트 표시
  private showValidMoves(selectedPiece: Phaser.GameObjects.Text) {
    // 기존 하이라이트 초기화
    this.clearHighlights();

    const row = selectedPiece.getData('row') as number;
    const col = selectedPiece.getData('col') as number;
    const piece = selectedPiece.getData('piece') as string;
    const player = selectedPiece.getData('player') as 'A' | 'B';

    const validMoves = this.getValidMoves(row, col, piece, player);

    validMoves.forEach(([newRow, newCol]) => {
      const targetPiece = this.getPieceAt(newRow, newCol);
      const isAlly = targetPiece && this.isSameTeam(selectedPiece, targetPiece);

      if (!isAlly) {
        const highlight = this.add
          .rectangle(
            newCol * this.cellWidth + this.cellWidth / 2,
            newRow * this.cellHeight + this.cellHeight / 2,
            this.cellWidth * 0.9,
            this.cellHeight * 0.9,
            0xffff00,
            0.3
          )
          .setOrigin(0.5)
          .setInteractive();

        // 하이라이트 저장
        this.highlights.push(highlight);

        // 이동 또는 잡기 처리
        highlight.on('pointerdown', () => {
          if (targetPiece) {
            console.log(`상대방 말(${targetPiece.getData('piece')})을 잡았습니다!`);
            this.capturePiece(targetPiece);
          }
          this.movePiece(selectedPiece, newRow, newCol);
          this.clearHighlights();
        });
      }
    });
  }

  // 같은 팀인지 확인
  private isSameTeam(piece1: Phaser.GameObjects.Text, piece2: Phaser.GameObjects.Text): boolean {
    const player1 = piece1.getData('player') as 'A' | 'B';
    const player2 = piece2.getData('player') as 'A' | 'B';
    return player1 === player2;
  }

  // 특정 위치에 있는 말 확인
  private getPieceAt(row: number, col: number): Phaser.GameObjects.Text | null {
    const { piece, player } = this.boardInfo[row][col];
    if (!piece || !player) return null;
    return piece ? this.findPiece(piece, player) : null;
  }

  // 말 객체 찾기 (piece와 player 기준)
  private findPiece(piece: string, player: 'A' | 'B'): Phaser.GameObjects.Text | null {
    return this.children.list.find((child: Phaser.GameObjects.GameObject) => {
      return (
        child instanceof Phaser.GameObjects.Text &&
        child.getData('piece') === piece &&
        child.getData('player') === player
      );
    }) as Phaser.GameObjects.Text | null;
  }

  // 말 이동 처리
  private movePiece(piece: Phaser.GameObjects.Text, newRow: number, newCol: number) {
    const currentRow = piece.getData('row') as number;
    const currentCol = piece.getData('col') as number;

    // 기존 위치 비우기
    this.boardInfo[currentRow][currentCol] = {
      piece: '',
      player: null,
    };

    // 새 위치에 말 배치
    piece.setData('row', newRow);
    piece.setData('col', newCol);
    this.boardInfo[newRow][newCol] = {
      piece: piece.getData('piece'),
      player: piece.getData('player'),
    };

    // 화면에서 말 이동
    piece.setPosition(newCol * this.cellWidth + this.cellWidth / 2, newRow * this.cellHeight + this.cellHeight / 2);

    console.log(
      `말(${piece.getData('piece')})이 (${currentRow}, ${currentCol})에서 (${newRow}, ${newCol})로 이동했습니다.`
    );
  }

  // 하이라이트 초기화
  private clearHighlights() {
    this.highlights.forEach((highlight) => {
      highlight.destroy();
    });
    this.highlights = [];
  }

  // 상대방 말 잡기
  private capturePiece(targetPiece: Phaser.GameObjects.Text) {
    const row = targetPiece.getData('row') as number;
    const col = targetPiece.getData('col') as number;
    this.boardInfo[row][col] = {
      piece: '',
      player: null,
    };
    targetPiece.destroy();
  }
}
