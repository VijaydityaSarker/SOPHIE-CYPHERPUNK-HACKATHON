"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useStore } from "@/lib/state";
import { formatAddress, formatCurrency, formatHealth } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PositionCard() {
  const { publicKey } = useWallet();
  const position = useStore((state) => state.position);
  const healthColor =
    position.health >= 1.4
      ? "text-green-400"
      : position.health >= 1.2
      ? "text-amber-400"
      : "text-red-400";
  const healthBg =
    position.health >= 1.4
      ? "bg-green-500/20 border-green-500/50"
      : position.health >= 1.2
      ? "bg-amber-500/20 border-amber-500/50"
      : "bg-red-500/20 border-red-500/50";

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Position</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {publicKey ? formatAddress(publicKey.toString()) : "Not connected"}
          </span>
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              position.mode === "soft"
                ? "bg-accent/20 text-accent border border-accent/50"
                : "bg-purple/20 text-purple border border-purple/50"
            )}
          >
            {position.mode === "soft" ? "Soft" : "Baseline"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-400 mb-1">Price</div>
          <div className="text-lg font-semibold">
            ${formatCurrency(position.price)}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Health</div>
          <div className={cn("text-lg font-semibold", healthColor)}>
            {formatHealth(position.health)}x
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Collateral</div>
          <div className="text-lg font-semibold">
            {formatCurrency(position.collateral, 3)} cSOL
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Debt</div>
          <div className="text-lg font-semibold">
            {formatCurrency(position.debt)} sUSD
          </div>
        </div>
      </div>

      <div className={cn("mt-4 p-3 rounded-lg border", healthBg)}>
        <div className="text-xs text-gray-300 mb-1">Health Status</div>
        <div className={cn("text-sm font-medium", healthColor)}>
          {position.health >= 1.4
            ? "Healthy"
            : position.health >= 1.2
            ? "Warning"
            : "Critical"}
        </div>
      </div>
    </div>
  );
}

