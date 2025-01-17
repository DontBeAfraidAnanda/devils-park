export class TwelveJanggiGameScene extends Phaser.Scene {
  constructor() {
    super('TwelveJanggiGame');
  }

  preload() {}

  create() {
    // 화면 크기
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // 보드 크기 (4x3)
    const cols = 4;
    const rows = 3;

    // 보드 내 각 칸의 크기
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    // 그래픽스 객체 생성
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0x000000); // 검은색 선, 두께 2px

    // 세로선 그리기
    for (let col = 0; col <= cols; col++) {
      const x = col * cellWidth;
      graphics.beginPath();
      graphics.moveTo(x, 0);
      graphics.lineTo(x, height);
      graphics.strokePath();
    }

    // 가로선 그리기
    for (let row = 0; row <= rows; row++) {
      const y = row * cellHeight;
      graphics.beginPath();
      graphics.moveTo(0, y);
      graphics.lineTo(width, y);
      graphics.strokePath();
    }

    // 말 배치 (4x3 배열)
    const boardPieces = [
      ['相', '', '', '將'],
      ['王', '子', '子', '王'],
      ['將', '', '', '相'],
    ];

    // 말들을 보드에 추가
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const piece = boardPieces[row][col];
        if (piece) {
          // 텍스트 객체 생성
          this.add
            .text(
              col * cellWidth + cellWidth / 2, // x 좌표
              row * cellHeight + cellHeight / 2, // y 좌표
              piece, // 표시할 말
              {
                fontSize: '32px',
                color: '#000000',
              }
            )
            .setOrigin(0.5); // 텍스트를 중앙 정렬
        }
      }
    }
  }

  update() {}
}
