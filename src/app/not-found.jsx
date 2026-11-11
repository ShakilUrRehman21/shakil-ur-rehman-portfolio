import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center px-6 text-center bg-bg text-ink">
      <div>
        <p
          className="font-display text-[clamp(7rem,28vw,18rem)] leading-[0.8] tracking-[-0.04em]"
          style={{ fontVariationSettings: '"wdth" 150, "wght" 900' }}
        >
          4<span className="text-marigold">0</span>4
        </p>
        <h1 className="mt-6 text-2xl font-semibold">This page doesn't exist</h1>
        <p className="mt-2 text-muted">The link may be old, or the page has moved.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center h-12 px-6 rounded-full bg-ink text-bg font-semibold hover:bg-cobalt hover:text-white transition-colors"
        >
          Go to the home page
        </Link>
      </div>
    </div>
  );
}
