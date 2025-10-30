"use client";

import { useStore } from "@/lib/state";
import { useEffect, useRef } from "react";

export function EventLog() {
  const log = useStore((state) => state.position.log);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [log]);

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Event Log</h2>
      <div className="h-64 overflow-y-auto space-y-2 font-mono text-xs">
        {log.slice().reverse().map((entry, idx) => (
          <div
            key={`${entry.t}-${idx}`}
            className="p-2 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="text-gray-400">[{entry.t}]</span>{" "}
            <span className="text-gray-200">{entry.msg}</span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
}

