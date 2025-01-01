'use client';

import dynamic from 'next/dynamic';

const DodgeGame = dynamic(() => import('./components/DodgeGame'), { ssr: false });

export default function page() {
  return (
    <div className="flex flex-col items-center p-14">
      <h1 className="mb-5">Let&apos;s play Dodge!</h1>
      <DodgeGame />
    </div>
  );
}
