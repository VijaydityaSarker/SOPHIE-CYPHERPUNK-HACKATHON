import type { PositionState } from "./state";

const LIQUIDATION_THRESHOLD = 0.85; // 85% LTV threshold
const LIQUIDATION_PENALTY_MIN = 0.06; // 6%
const LIQUIDATION_PENALTY_MAX = 0.1; // 10%
const MAX_REBALANCE_RATE = 0.03; // 3% max per tick

function calculateHealth(collateral: number, price: number, debt: number): number {
  if (debt === 0) return Infinity;
  return (collateral * price) / debt;
}

function calculateLTV(collateral: number, price: number, debt: number): number {
  if (collateral * price === 0) return 0;
  return debt / (collateral * price);
}

function getBandFromPrice(price: number): number {
  // Band index based on price ranges (simplified: each band is ~2% wide)
  return Math.floor((price - 80) / 2);
}

function getAlphaInBand(price: number, band: number): number {
  const bandLowPrice = 80 + band * 2;
  const bandHighPrice = 80 + (band + 1) * 2;
  if (bandHighPrice === bandLowPrice) return 0.5;
  return (price - bandLowPrice) / (bandHighPrice - bandLowPrice);
}

function getTargetComposition(
  alpha: number
): { collateral: number; susd: number } {
  // At alpha=0, all collateral; at alpha=1, all sUSD
  return {
    collateral: 1 - alpha,
    susd: alpha,
  };
}

export function tickSimulation(
  currentState: PositionState,
  newPrice: number
): PositionState {
  const mode = currentState.mode;
  let { collateral, debt } = currentState;
  const composition = { ...currentState.composition };

  const newHealth = calculateHealth(collateral, newPrice, debt);
  const ltv = calculateLTV(collateral, newPrice, debt);

  const band = getBandFromPrice(newPrice);
  const alpha = Math.max(0, Math.min(1, getAlphaInBand(newPrice, band)));

  let logEntry = "";

  if (mode === "baseline") {
    // Hard liquidation mode: check threshold
    if (ltv > LIQUIDATION_THRESHOLD) {
      const penalty =
        LIQUIDATION_PENALTY_MIN +
        (LIQUIDATION_PENALTY_MAX - LIQUIDATION_PENALTY_MIN) * (ltv - LIQUIDATION_THRESHOLD) / (1 - LIQUIDATION_THRESHOLD);
      const collateralToLiquidate = collateral * penalty;
      const valueLiquidated = collateralToLiquidate * newPrice;
      collateral -= collateralToLiquidate;
      debt -= valueLiquidated;
      logEntry = `Tick ${currentState.tick + 1}: LIQUIDATION! Sold ${formatCurrency(collateralToLiquidate, 3)} cSOL → ${formatCurrency(valueLiquidated, 2)} sUSD @ $${formatCurrency(newPrice, 2)} (penalty: ${formatPercentage(penalty)})`;
    } else {
      logEntry = `Tick ${currentState.tick + 1}: Price updated to $${formatCurrency(newPrice, 2)}, health ${formatHealth(newHealth)}`;
    }
    // Baseline mode: composition stays same (no AMM rebalancing)
  } else {
    // Soft liquidation mode: gradual rebalancing
    const targetComp = getTargetComposition(alpha);
    const totalValue = collateral * newPrice + composition.susd;
    const targetCollateral = totalValue * targetComp.collateral / newPrice;

    const collateralDiff = targetCollateral - collateral;

    // Limit the rebalance rate
    const maxCollateralChange = collateral * MAX_REBALANCE_RATE;

    let collateralChange = 0;

    if (Math.abs(collateralDiff) > maxCollateralChange) {
      collateralChange = Math.sign(collateralDiff) * maxCollateralChange;
    } else {
      collateralChange = collateralDiff;
    }

    // Execute the rebalance
    if (collateralChange < 0) {
      // Selling collateral for sUSD
      const soldCollateral = Math.abs(collateralChange);
      const receivedSusd = soldCollateral * newPrice;
      collateral += collateralChange;
      composition.susd += receivedSusd;
      composition.collateral = collateral;
      logEntry = `Tick ${currentState.tick + 1}: Rebalanced - sold ${formatCurrency(soldCollateral, 3)} cSOL → ${formatCurrency(receivedSusd, 2)} sUSD @ $${formatCurrency(newPrice, 2)}`;
    } else if (collateralChange > 0 && composition.susd > 0) {
      // Buying collateral with sUSD
      const spentSusd = Math.min(composition.susd, collateralChange * newPrice);
      const boughtCollateral = spentSusd / newPrice;
      collateral += boughtCollateral;
      composition.susd -= spentSusd;
      composition.collateral = collateral;
      logEntry = `Tick ${currentState.tick + 1}: Rebalanced - bought ${formatCurrency(boughtCollateral, 3)} cSOL ← ${formatCurrency(spentSusd, 2)} sUSD @ $${formatCurrency(newPrice, 2)}`;
    } else {
      logEntry = `Tick ${currentState.tick + 1}: Price updated to $${formatCurrency(newPrice, 2)}, health ${formatHealth(newHealth)}`;
    }
  }

  const finalHealth = calculateHealth(collateral, newPrice, debt);
  const finalBand = getBandFromPrice(newPrice);
  const finalAlpha = Math.max(0, Math.min(1, getAlphaInBand(newPrice, finalBand)));

  return {
    ...currentState,
    price: newPrice,
    collateral,
    debt,
    health: finalHealth,
    bandLow: finalBand,
    bandHigh: finalBand + 1,
    alpha: finalAlpha,
    composition: { ...composition },
    tick: currentState.tick + 1,
    log: [
      ...currentState.log,
      {
        t: currentState.tick + 1,
        msg: logEntry || `Tick ${currentState.tick + 1}: Price $${formatCurrency(newPrice, 2)}`,
      },
    ],
  };
}

function formatCurrency(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function formatHealth(health: number): string {
  return health.toFixed(3);
}

