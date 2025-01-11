'use client';

import dynamic from 'next/dynamic';

const TicTacToeGame = dynamic(() => import('./components/TicTacToeGame'), { ssr: false });

export default function page() {
  return (
    <div className="flex flex-col items-center p-14">
      <h1 className="mb-5">Let&apos;s play Tic Tac Toe!</h1>
      <TicTacToeGame />
    </div>
  );
}
