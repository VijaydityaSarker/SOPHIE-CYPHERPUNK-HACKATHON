import { GradientBackground } from "@/components/GradientBackground";
import { WalletConnect } from "@/components/WalletConnect";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function FounderPage() {
  return (
    <GradientBackground>
      <div className="container mx-auto px-4 py-12">
        <nav className="flex justify-between items-center mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <WalletConnect />
        </nav>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
              Founder
            </h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-accent">
                  Vijay Ditya Sarkar
                </h2>
                <p className="text-gray-400 mb-4">
                  <span className="font-semibold">Pronunciation:</span> V-I-J-A-Y-D-I-T-Y-A Sarkar S-A-R-K-E-R
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold mb-3">Education</h3>
                <p className="text-gray-300">
                  Masters in Computer Science, University College Dublin
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-semibold mb-3">Experience</h3>
                <div className="space-y-3 text-gray-300">
                  <div>
                    <p className="font-medium">Former Software Engineer</p>
                    <p className="text-gray-400">Wipro</p>
                  </div>
                  <div>
                    <p className="font-medium">Currently Software Engineer</p>
                    <p className="text-gray-400">Staker.fun</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-gray-400 leading-relaxed">
                  Vijay brings expertise in blockchain development and DeFi protocols,
                  with a focus on building innovative solutions for the Solana ecosystem.
                  SOPHIE represents a vision for more humane and efficient liquidation
                  mechanisms in decentralized finance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent/20 border border-accent/50 rounded-xl text-accent font-semibold hover:bg-accent/30 transition-colors"
            >
              Try the Demo
            </Link>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}

