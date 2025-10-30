import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            <span className="font-semibold text-accent">SOPHIE</span> — Liquidations Made Simple
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/demo" className="text-gray-400 hover:text-accent transition-colors">
              Demo
            </Link>
            <Link href="/competitive" className="text-gray-400 hover:text-accent transition-colors">
              Competitive
            </Link>
            <Link href="/founder" className="text-gray-400 hover:text-accent transition-colors">
              Founder
            </Link>
          </nav>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Built for Solana • Demo Only
        </div>
      </div>
    </footer>
  );
}

