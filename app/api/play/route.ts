import { NextResponse } from "next/server";
import { tickSimulation } from "@/lib/demo";
import type { PositionState } from "@/lib/state";

// Module-level mock state
let mockState: PositionState = {
  price: 100,
  collateral: 10,
  debt: 600,
  health: 1.666,
  bandLow: 0,
  bandHigh: 0,
  alpha: 0.5,
  composition: { collateral: 10, susd: 0 },
  mode: "soft",
  tick: 0,
  log: [{ t: 0, msg: "Initial state: price $100, collateral 10 cSOL, debt 600 sUSD" }],
};

export async function POST(request: Request) {
  try {
    const { path } = await request.json();
    if (!Array.isArray(path) || path.length === 0) {
      return NextResponse.json(
        { error: "Invalid path. Must be a non-empty array." },
        { status: 400 }
      );
    }

    // Reset to initial state
    mockState = {
      price: 100,
      collateral: 10,
      debt: 600,
      health: 1.666,
      bandLow: 0,
      bandHigh: 0,
      alpha: 0.5,
      composition: { collateral: 10, susd: 0 },
      mode: mockState.mode, // preserve mode
      tick: 0,
      log: [{ t: 0, msg: "Initial state: price $100, collateral 10 cSOL, debt 600 sUSD" }],
    };

    const snapshots: Array<{
      position: PositionState;
      chartPoint: { time: number; health: number };
    }> = [];

    // Step through path, simulating 600ms ticks
    for (let i = 0; i < path.length; i++) {
      const newPrice = path[i];
      mockState = tickSimulation(mockState, newPrice);
      snapshots.push({
        position: { ...mockState },
        chartPoint: {
          time: mockState.tick,
          health: mockState.health,
        },
      });
    }

    return NextResponse.json({ snapshots });
  } catch (error) {
    console.error("Error in play:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

