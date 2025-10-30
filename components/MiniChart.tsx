"use client";

import { useStore } from "@/lib/state";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { formatHealth } from "@/lib/format";

export function MiniChart() {
  const chartData = useStore((state) => state.chartData);

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Health Over Time</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="time"
              stroke="#8884d8"
              style={{ fontSize: "10px" }}
              tick={{ fill: "#9ca3af" }}
            />
            <YAxis
              stroke="#8884d8"
              style={{ fontSize: "10px" }}
              tick={{ fill: "#9ca3af" }}
              domain={[0, "dataMax + 0.2"]}
            />
            <Tooltip
              formatter={(value: number) => [`${formatHealth(value)}x`, "Health"]}
              contentStyle={{
                backgroundColor: "rgba(11, 15, 30, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="health"
              stroke="#00C6FB"
              strokeWidth={2}
              dot={{ fill: "#00C6FB", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

