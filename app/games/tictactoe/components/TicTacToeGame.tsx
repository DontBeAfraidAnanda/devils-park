'use client';

import Phaser from 'phaser';
import { useEffect, useRef } from 'react';

import { TicTacToeScene } from '../scenes';

export default function Game() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 600,
      height: 600,
      parent: gameRef.current!,
      scene: TicTacToeScene,
      backgroundColor: '#ffffff',
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
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
