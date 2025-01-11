export class LoadingScene extends Phaser.Scene {
  private loadingText!: Phaser.GameObjects.Text;
  private progressBar!: Phaser.GameObjects.Graphics;
  private progressBox!: Phaser.GameObjects.Graphics;
  private percentText!: Phaser.GameObjects.Text;
  private assetText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'LoadingScene' });
  }

  preload() {
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(240, 270, 320, 50);

    this.loadingText = this.make.text({
      x: this.cameras.main.width / 2,
      y: 250,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        backgroundColor: '#ffffff',
      },
    });
    this.loadingText.setOrigin(0.5, 0.5);

    this.percentText = this.make.text({
      x: this.cameras.main.width / 2,
      y: 295,
      text: '0%',
      style: {
        font: '18px monospace',
        backgroundColor: '#ffffff',
      },
    });
    this.percentText.setOrigin(0.5, 0.5);

    this.assetText = this.make.text({
      x: this.cameras.main.width / 2,
      y: 325,
      text: '',
      style: {
        font: '18px monospace',
        backgroundColor: '#ffffff',
      },
    });
    this.assetText.setOrigin(0.5, 0.5);

    this.progressBar = this.add.graphics();

    this.load.on('progress', (value: number) => {
      this.percentText.setText(`${Math.floor(value * 100)}%`);
      this.progressBar.clear();
      this.progressBar.fillStyle(0xffffff, 1);
      this.progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file: Phaser.Loader.File) => {
      this.assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressBox.destroy();
      this.loadingText.destroy();
      this.percentText.destroy();
      this.assetText.destroy();
      this.scene.start('TicTacToeScene');
    });

    this.load.image('X', '/assets/x.png');
    this.load.image('O', '/assets/o.png');
  }

  create() {}
}
