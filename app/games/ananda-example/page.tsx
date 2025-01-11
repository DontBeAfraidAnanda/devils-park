'use client';

import dynamic from 'next/dynamic';

const AnandaExample = dynamic(() => import('./components/AnandaExampleGame'), { ssr: false });

export default function page() {
  return (
    <div className="flex flex-col items-center p-14">
      <h1 className="mb-5">Let&apos;s show Ananda-Example</h1>
      <AnandaExample />
    </div>
  );
}
