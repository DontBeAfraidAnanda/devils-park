'use client';

import dynamic from 'next/dynamic';

const TwelveJanggiGame = dynamic(() => import('./components/TwelveJanggiGame'), { ssr: false });

export default function page() {
  return (
    <div className="flex flex-col items-center p-14">
      <h1 className="mb-5">Let&apos;s play Twelve Janggi!</h1>
      <TwelveJanggiGame />
    </div>
  );
}
