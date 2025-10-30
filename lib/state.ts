import { create } from "zustand";

export type PositionState = {
  price: number; // current oracle price
  collateral: number; // cSOL amount
  debt: number; // sUSD
  health: number; // collateral_value/debt
  bandLow: number; // integer band index
  bandHigh: number;
  alpha: number; // 0..1 within band
  composition: { collateral: number; susd: number };
  mode: "soft" | "baseline";
  tick: number;
  log: Array<{ t: number; msg: string }>;
};

export type ChartDataPoint = {
  time: number;
  health: number;
};

type StateStore = {
  position: PositionState;
  chartData: ChartDataPoint[];
  isPlaying: boolean;
  playPath: number[] | null;
  setPosition: (position: Partial<PositionState>) => void;
  updatePrice: (price: number) => void;
  setMode: (mode: "soft" | "baseline") => void;
  addChartPoint: (point: ChartDataPoint) => void;
  resetChart: () => void;
  setIsPlaying: (playing: boolean) => void;
  setPlayPath: (path: number[] | null) => void;
  reset: () => void;
};

const initialState: PositionState = {
  price: 100,
  collateral: 10,
  debt: 600,
  health: 1.666, // (10 * 100) / 600
  bandLow: 0,
  bandHigh: 0,
  alpha: 0.5,
  composition: { collateral: 10, susd: 0 },
  mode: "soft",
  tick: 0,
  log: [{ t: 0, msg: "Initial state: price $100, collateral 10 cSOL, debt 600 sUSD" }],
};

export const useStore = create<StateStore>((set) => ({
  position: initialState,
  chartData: [{ time: 0, health: initialState.health }],
  isPlaying: false,
  playPath: null,
  setPosition: (updates) =>
    set((state) => ({
      position: { ...state.position, ...updates },
    })),
  updatePrice: (price) =>
    set((state) => ({
      position: { ...state.position, price },
    })),
  setMode: (mode) =>
    set((state) => ({
      position: { ...state.position, mode },
    })),
  addChartPoint: (point) =>
    set((state) => ({
      chartData: [...state.chartData, point],
    })),
  resetChart: () =>
    set({
      chartData: [{ time: 0, health: initialState.health }],
    }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setPlayPath: (path) => set({ playPath: path }),
  reset: () =>
    set({
      position: initialState,
      chartData: [{ time: 0, health: initialState.health }],
      isPlaying: false,
      playPath: null,
    }),
}));

