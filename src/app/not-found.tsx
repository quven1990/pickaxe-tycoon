import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-amber-400 mb-4">404</h1>
      <p className="text-xl text-zinc-400 mb-8">Page not found — maybe it&apos;s still mining...</p>
      <Link href="/" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
