'use client';

import Phaser from 'phaser';
import { useEffect, useRef } from 'react';

import { AnandaExampleScene } from '../scenes';

export default function Game() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current!,
      scene: AnandaExampleScene,
      backgroundColor: '#ffffff',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 20 },
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
