import { ReactNode } from "react";

export function GradientBackground({ children }: { children: ReactNode }) {
  return (
    <div className="gradient-bg relative min-h-screen">
      <div className="vignette" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

