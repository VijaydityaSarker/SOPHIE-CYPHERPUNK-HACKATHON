import Link from "next/link";
import { GradientBackground } from "@/components/GradientBackground";
import { WalletConnect } from "@/components/WalletConnect";
import { ArrowRight, Zap, Shield, Code, Coins } from "lucide-react";

export default function MarketingPage() {
  return (
    <GradientBackground>
      <div className="container mx-auto px-4 py-12">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-accent">SOPHIE</div>
          <WalletConnect />
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">
            SOPHIE
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-12">
            Liquidations Made Simple.
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Visual demo of a continuous liquidation engine (LLAMMA-style) on Solana,
            running against localnet mocks. Experience soft liquidation via AMM bands
            with interactive price controls and time-lapse playback.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href="/demo"
              className="px-8 py-4 bg-accent/20 border border-accent/50 rounded-xl text-accent font-semibold hover:bg-accent/30 transition-colors flex items-center justify-center gap-2"
            >
              Try the Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/competitive"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Competitive Landscape
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Continuous</h3>
              <p className="text-sm text-gray-400">
                Gradual rebalancing instead of sudden liquidations
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <Shield className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Not Catastrophic</h3>
              <p className="text-sm text-gray-400">
                Soft AMM-based liquidation protects borrowers
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <Coins className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Built for Solana</h3>
              <p className="text-sm text-gray-400">
                Leveraging Solana&apos;s speed and low fees
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <Code className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Developer-Ready</h3>
              <p className="text-sm text-gray-400">
                Open architecture for easy integration
              </p>
            </div>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}

