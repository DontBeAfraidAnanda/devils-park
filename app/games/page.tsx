import Link from 'next/link';

export default function page() {
  return (
    <div className="flex flex-col items-center p-14">
      <h1 className="mb-16 text-3xl font-semibold">GameList</h1>
      <div className="grid gap-8 grid-cols-3 text-center">
        <Link href="/games/ananda-example">Ananda Example</Link>
        <Link href="/games/tictactoe">Tic Tac Toe</Link>
        <Link href="/games/dodge">Dodge</Link>
        <Link href="/games/twelve-janggi">Twelve Janggi</Link>
      </div>
    </div>
  );
}
