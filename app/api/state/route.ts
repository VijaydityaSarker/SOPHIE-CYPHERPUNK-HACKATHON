import { NextResponse } from "next/server";
import type { PositionState } from "@/lib/state";

// Module-level mock state (stateless fallback)
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

export async function GET() {
  return NextResponse.json({ position: mockState });
}

export async function POST(request: Request) {
  const body = await request.json();
  if (body.position) {
    mockState = body.position;
  }
  return NextResponse.json({ position: mockState });
}

