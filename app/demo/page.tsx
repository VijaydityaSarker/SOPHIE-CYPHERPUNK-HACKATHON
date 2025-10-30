"use client";

import { useEffect } from "react";
import { GradientBackground } from "@/components/GradientBackground";
import { WalletConnect } from "@/components/WalletConnect";
import { PositionCard } from "@/components/PositionCard";
import { BandsBar } from "@/components/BandsBar";
import { MiniChart } from "@/components/MiniChart";
import { ControlsBar } from "@/components/ControlsBar";
import { CompositionDonut } from "@/components/CompositionDonut";
import { EventLog } from "@/components/EventLog";
import { useStore } from "@/lib/state";

export default function DemoPage() {
  const setPosition = useStore((state) => state.setPosition);
  const resetChart = useStore((state) => state.resetChart);

  useEffect(() => {
    // Initialize state from API
    fetch("/api/state")
      .then((res) => res.json())
      .then((data) => {
        setPosition(data.position);
        resetChart();
      })
      .catch(console.error);
  }, [setPosition, resetChart]);

  return (
    <GradientBackground>
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-accent">SOPHIE Demo</h1>
          <WalletConnect />
        </nav>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <PositionCard />
            <BandsBar />
            <MiniChart />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <ControlsBar />
            <CompositionDonut />
            <EventLog />
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}

