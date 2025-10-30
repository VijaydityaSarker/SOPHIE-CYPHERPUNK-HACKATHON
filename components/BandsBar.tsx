"use client";

import { useStore } from "@/lib/state";
import { formatCurrency } from "@/lib/format";

export function BandsBar() {
  const position = useStore((state) => state.position);

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">AMM Bands</h2>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Current Band</span>
            <span className="font-medium">{position.bandLow} → {position.bandHigh}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple to-accent transition-all duration-300"
              style={{ width: `${position.alpha * 100}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>α = {position.alpha.toFixed(3)}</span>
          <span>
            Band Range: ${formatCurrency(80 + position.bandLow * 2)} - ${formatCurrency(80 + position.bandHigh * 2)}
          </span>
        </div>
      </div>
    </div>
  );
}

