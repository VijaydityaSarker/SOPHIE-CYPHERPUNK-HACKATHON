import { GradientBackground } from "@/components/GradientBackground";
import { WalletConnect } from "@/components/WalletConnect";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CompetitivePage() {
  const competitors = [
    {
      name: "MakerDAO / Sky",
      mechanism: "Vault-based liquidations",
      chain: "Ethereum",
      weakness: "Auctions, hard thresholds",
      sophie: "Continuous AMM liquidation",
    },
    {
      name: "Aave",
      mechanism: "Bot-triggered liquidations",
      chain: "Ethereum",
      weakness: "Gas, oracle lag",
      sophie: "Real-time smoothing on Solana",
    },
    {
      name: "Solend",
      mechanism: "Oracle-based liquidations",
      chain: "Solana",
      weakness: "Sudden forced sales",
      sophie: "Gradual banded conversion",
    },
    {
      name: "Keel / Stars",
      mechanism: "Treasury allocator",
      chain: "Solana",
      weakness: "Discretionary yield-focused",
      sophie: "Algorithmic borrower protection",
    },
  ];

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

        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Competitive Landscape
          </h1>
          <p className="text-lg text-gray-400 text-center mb-12">
            How SOPHIE compares to existing liquidation mechanisms
          </p>

          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 shadow-lg overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-semibold">Protocol</th>
                    <th className="text-left py-4 px-4 font-semibold">Mechanism</th>
                    <th className="text-left py-4 px-4 font-semibold">Chain</th>
                    <th className="text-left py-4 px-4 font-semibold">Weakness</th>
                    <th className="text-left py-4 px-4 font-semibold text-accent">
                      SOPHIE Advantage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4 font-medium">{comp.name}</td>
                      <td className="py-4 px-4 text-gray-300">{comp.mechanism}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded bg-white/10 text-xs">
                          {comp.chain}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-400">{comp.weakness}</td>
                      <td className="py-4 px-4 text-accent">{comp.sophie}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

