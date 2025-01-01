export class DodgeGameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private obstacles!: Phaser.Physics.Arcade.Group;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private popupContainer!: Phaser.GameObjects.Container;
  private obstacleTimer!: Phaser.Time.TimerEvent;

  constructor() {
    super('DodgeGame');
  }

  preload() {}

  create() {
    // 플레이어 설정
    this.player = this.add.rectangle(400, 500, 50, 50, 0x00ff00);
    this.physics.add.existing(this.player);
    (this.player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    // 장애물 그룹 설정
    this.obstacles = this.physics.add.group();

    // 점수 텍스트
    this.scoreText = this.add.text(10, 10, 'Score: 0', {
      fontSize: '20px',
      color: 'red',
    });

    // 키보드 입력 설정
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    // 장애물 생성 타이머
    this.obstacleTimer = this.time.addEvent({
      delay: 500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
    });

    // 충돌 이벤트
    this.physics.add.collider(this.player, this.obstacles, this.showGameOverPopup, undefined, this);

    // 팝업 컨테이너 초기화
    this.popupContainer = this.add.container(400, 300);
    this.popupContainer.setVisible(false); // 초기에는 숨김
  }

  update() {
    if (this.physics.world.isPaused) return;

    // 플레이어 움직임
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    if (this.cursors.left.isDown) body.setVelocityX(-300);
    else if (this.cursors.right.isDown) body.setVelocityX(300);
    else body.setVelocityX(0);

    // 점수 업데이트
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  spawnObstacle() {
    const x = Phaser.Math.Between(50, 750);
    const obstacle = this.obstacles.create(x, 0, undefined);
    obstacle.setTintFill('0xff0000');
    obstacle.setDisplaySize(50, 50).setOrigin(0.5, 0.5).setVelocity(Phaser.Math.Between(-100, 100), 200);
    obstacle.body.setVelocityY(200);
  }

  showGameOverPopup() {
    // 장애물 타이머 멈추기
    this.obstacleTimer.paused = true;

    // 물리 엔진 멈추기
    this.physics.world.isPaused = true;

    // 팝업 설정
    const background = this.add.rectangle(0, 0, 300, 200, 0xffffff, 1);
    const gameOverText = this.add
      .text(0, -50, 'Game Over', {
        fontSize: '30px',
        color: '#000000',
      })
      .setOrigin(0.5);
    const scoreText = this.add
      .text(0, 0, `Score: ${this.score}`, {
        fontSize: '20px',
        color: '#000000',
      })
      .setOrigin(0.5);
    const restartButton = this.add
      .text(0, 50, 'Restart', {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { left: 10, right: 10, top: 5, bottom: 5 },
      })
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => this.restartGame());

    // 팝업 컨테이너에 추가
    this.popupContainer.add([background, gameOverText, scoreText, restartButton]);
    this.popupContainer.setVisible(true);
    this.popupContainer.setDepth(100);
  }

  restartGame() {
    this.scene.restart();
    this.score = 0;
    this.popupContainer.setVisible(false);

    // 타이머 재시작
    this.obstacleTimer.paused = false;
    this.popupContainer.setVisible(false);
  }
}
