export function formatAddress(address: string | null | undefined): string {
  if (!address) return "Not connected";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function formatCurrency(value: number, decimals = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${formatCurrency(value * 100, decimals)}%`;
}

export function formatHealth(health: number): string {
  return formatCurrency(health, 3);
}

export function getHealthColor(health: number): string {
  if (health >= 1.5) return "text-green-400";
  if (health >= 1.35) return "text-amber-400";
  return "text-red-400";
}

export function getHealthBgColor(health: number): string {
  if (health >= 1.5) return "bg-green-500/20 border-green-500/50";
  if (health >= 1.35) return "bg-amber-500/20 border-amber-500/50";
  return "bg-red-500/20 border-red-500/50";
}

