"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@/lib/state";
import { formatCurrency } from "@/lib/format";
import { Play, Square, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function ControlsBar() {
  const position = useStore((state) => state.position);
  const isPlaying = useStore((state) => state.isPlaying);
  const setPosition = useStore((state) => state.setPosition);
  const setMode = useStore((state) => state.setMode);
  const updateModeInAPI = async (mode: "soft" | "baseline") => {
    try {
      const res = await fetch("/api/set-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: position.price, mode }),
      });
      const data = await res.json();
      setPosition(data.position);
    } catch (error) {
      console.error("Failed to update mode:", error);
    }
  };
  const setIsPlaying = useStore((state) => state.setIsPlaying);
  const addChartPoint = useStore((state) => state.addChartPoint);
  const reset = useStore((state) => state.reset);
  const setPlayPath = useStore((state) => state.setPlayPath);

  const [price, setPrice] = useState(position.price);
  const [playPath] = useState<number[]>([100, 98, 95, 92, 90, 94, 97, 100]);
  const stopRef = useRef(false);

  useEffect(() => {
    setPrice(position.price);
  }, [position.price]);

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
  };

  const handlePriceCommit = async () => {
    try {
      const res = await fetch("/api/set-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, mode: position.mode }),
      });
      const data = await res.json();
      setPosition(data.position);
      addChartPoint({ time: data.position.tick, health: data.position.health });
    } catch (error) {
      console.error("Failed to update price:", error);
    }
  };

  const handlePlay = async () => {
    setIsPlaying(true);
    setPlayPath(playPath);
    stopRef.current = false;
    try {
      const res = await fetch("/api/play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: playPath }),
      });
      const data = await res.json();
      if (data.snapshots) {
        // Reset first
        reset();
        await new Promise((resolve) => setTimeout(resolve, 100));
        
        // Play with 600ms delay between ticks
        for (let i = 0; i < data.snapshots.length; i++) {
          if (stopRef.current) break;
          
          const snap = data.snapshots[i];
          setPosition(snap.position);
          addChartPoint(snap.chartPoint);
          setPrice(snap.position.price);
          
          if (i < data.snapshots.length - 1 && !stopRef.current) {
            await new Promise((resolve) => setTimeout(resolve, 600));
          }
        }
      }
    } catch (error) {
      console.error("Failed to play path:", error);
    } finally {
      setIsPlaying(false);
      setPlayPath(null);
      stopRef.current = false;
    }
  };

  const handleStop = () => {
    stopRef.current = true;
    setIsPlaying(false);
    setPlayPath(null);
  };

  const handleReset = async () => {
    reset();
    setPrice(100);
    // Reset API state
    try {
      await fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          position: {
            price: 100,
            collateral: 10,
            debt: 600,
            health: 1.666,
            bandLow: 0,
            bandHigh: 0,
            alpha: 0.5,
            composition: { collateral: 10, susd: 0 },
            mode: position.mode,
            tick: 0,
            log: [{ t: 0, msg: "Initial state: price $100, collateral 10 cSOL, debt 600 sUSD" }],
          },
        }),
      });
    } catch (error) {
      console.error("Failed to reset API state:", error);
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-lg space-y-4">
      <h2 className="text-lg font-semibold">Controls</h2>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Price</span>
          <span className="font-medium">${formatCurrency(price)}</span>
        </div>
        <input
          type="range"
          min="80"
          max="120"
          step="0.5"
          value={price}
          onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
          onMouseUp={handlePriceCommit}
          onTouchEnd={handlePriceCommit}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
          disabled={isPlaying}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$80</span>
          <span>$120</span>
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-400 mb-2">Mode</div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setMode("soft");
              updateModeInAPI("soft");
            }}
            className={cn(
              "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              position.mode === "soft"
                ? "bg-accent/20 text-accent border border-accent/50"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            )}
          >
            Soft
          </button>
          <button
            onClick={() => {
              setMode("baseline");
              updateModeInAPI("baseline");
            }}
            className={cn(
              "flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              position.mode === "baseline"
                ? "bg-purple/20 text-purple border border-purple/50"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            )}
          >
            Baseline
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            isPlaying
              ? "bg-white/5 text-gray-500 cursor-not-allowed"
              : "bg-accent/20 text-accent border border-accent/50 hover:bg-accent/30"
          )}
        >
          <Play className="w-4 h-4" />
          Play Path
        </button>
        <button
          onClick={handleStop}
          disabled={!isPlaying}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            !isPlaying
              ? "bg-white/5 text-gray-500 cursor-not-allowed"
              : "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30"
          )}
        >
          <Square className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          disabled={isPlaying}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            isPlaying
              ? "bg-white/5 text-gray-500 cursor-not-allowed"
              : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
          )}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

