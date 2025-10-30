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
    const { price, mode } = await request.json();
    if (typeof price !== "number" || price < 80 || price > 120) {
      return NextResponse.json(
        { error: "Invalid price. Must be between 80 and 120." },
        { status: 400 }
      );
    }

    // Update mode if provided
    if (mode === "soft" || mode === "baseline") {
      mockState.mode = mode;
    }

    mockState = tickSimulation(mockState, price);
    return NextResponse.json({ position: mockState });
  } catch (error) {
    console.error("Error in set-price:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Initialize state on first GET
export async function GET() {
  return NextResponse.json({ position: mockState });
}

