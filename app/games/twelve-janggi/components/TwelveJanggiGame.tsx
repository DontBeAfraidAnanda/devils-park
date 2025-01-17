'use client';

import Phaser from 'phaser';
import { useEffect, useRef } from 'react';

import { TwelveJanggiGameScene } from '../scenes';

export default function TwelveJanggiGame() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current!,
      scene: TwelveJanggiGameScene,
      backgroundColor: '#ffffff',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { x: 0, y: 0 },
        },
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameRef}></div>;
}
