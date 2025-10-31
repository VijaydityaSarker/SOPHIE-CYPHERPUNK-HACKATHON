"use client";

import { useStore } from "@/lib/state";
import { formatHealth, getHealthColor } from "@/lib/format";
import { cn } from "@/lib/utils";

export function HealthGauge() {
  const health = useStore((state) => state.position.health);

  // Semicircle gauge
  const percentage = Math.min(100, Math.max(0, (health / 2) * 100)); // Scale to 2x max
  const strokeDasharray = 2 * Math.PI * 50; // radius = 50
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Health Gauge</h2>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="64"
              cy="64"
              r="50"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="50"
              stroke={health >= 1.5 ? "#10b981" : health >= 1.35 ? "#f59e0b" : "#ef4444"}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={cn("text-2xl font-bold", getHealthColor(health))}>
                {formatHealth(health)}
              </div>
              <div className="text-xs text-gray-400">x</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

