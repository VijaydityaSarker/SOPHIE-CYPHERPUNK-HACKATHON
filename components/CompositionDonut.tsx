"use client";

import { useStore } from "@/lib/state";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/format";

const COLORS = {
  collateral: "#7A00FF",
  susd: "#00C6FB",
};

export function CompositionDonut() {
  const composition = useStore((state) => state.position.composition);
  const price = useStore((state) => state.position.price);

  const collateralValue = composition.collateral * price;
  const susdValue = composition.susd;
  const total = collateralValue + susdValue;

  const data = [
    {
      name: "Collateral (cSOL)",
      value: collateralValue,
      percentage: total > 0 ? (collateralValue / total) * 100 : 0,
    },
    {
      name: "sUSD",
      value: susdValue,
      percentage: total > 0 ? (susdValue / total) * 100 : 0,
    },
  ];

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Composition</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? COLORS.collateral : COLORS.susd}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `$${formatCurrency(value)}`}
              contentStyle={{
                backgroundColor: "rgba(11, 15, 30, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend
              formatter={(value, entry) => {
                const item = data.find((d) => d.name === value);
                return `${value}: ${item?.percentage.toFixed(1)}%`;
              }}
              wrapperStyle={{ color: "#fff", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Collateral:</span>
          <span className="font-medium">
            {formatCurrency(composition.collateral, 3)} cSOL (${formatCurrency(collateralValue)})
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">sUSD:</span>
          <span className="font-medium">${formatCurrency(susdValue)}</span>
        </div>
      </div>
    </div>
  );
}

