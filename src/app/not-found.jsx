import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-md w-full font-mono">
        <span className="text-4xl block mb-2 font-bold text-emerald-600 dark:text-emerald-400">404</span>
        <h2 className="text-xl font-bold mb-2">Module Not Found</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          The requested system node does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-tight transition-colors"
        >
          Return to Mission Control
        </Link>
      </div>
    </div>
  );
}
