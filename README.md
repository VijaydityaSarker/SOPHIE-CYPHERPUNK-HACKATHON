# SOPHIE - Liquidations Made Simple

A production-quality frontend demo of a continuous liquidation engine (LLAMMA-style) on Solana, featuring soft liquidation via AMM bands with interactive price controls and time-lapse playback.

![SOPHIE Demo](https://via.placeholder.com/800x400/0B0F1E/00C6FB?text=SOPHIE+Demo)

## Overview

SOPHIE demonstrates a novel approach to DeFi liquidations that uses continuous AMM-based rebalancing instead of hard liquidation thresholds. This provides borrowers with a smoother, less catastrophic liquidation experience while maintaining protocol safety.

### Key Features

- **Continuous Liquidation**: Gradual rebalancing via AMM bands instead of sudden liquidations
- **Interactive Demo**: Real-time price slider and playback controls
- **Dual Modes**: Compare "Soft" (AMM-based) vs "Baseline" (hard liquidation) modes
- **Visual Analytics**: Health gauge, composition charts, and event logs
- **Solana Integration**: Wallet adapter ready for Phantom and Solflare

## Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS with dark purple→blue gradient theme
- **UI Components**: shadcn/ui patterns
- **State Management**: Zustand
- **Charts**: Recharts
- **Wallet**: Solana Wallet Adapter (Phantom, Solflare)
- **Anchor**: Stub client (ready for integration)

## Quick Start

### Prerequisites

- Node.js 18+ and yarn
- Solana CLI tools (for localnet - optional)

### Installation

```bash
# Install dependencies
yarn install

# Copy environment variables
cp .env.local.example .env.local  # Or create manually with values below
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_CLUSTER_URL=http://127.0.0.1:8899
NEXT_PUBLIC_PROGRAM_ID=SoFtFi11111111111111111111111111111111111111
```

### Development

```bash
# Start development server
yarn dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production
yarn build

# Start production server
yarn start
```

## Project Structure

```
/app
  /(marketing)/page.tsx     # Hero landing page
  /demo/page.tsx            # Main interactive demo
  /competitive/page.tsx     # Competitive comparison table
  /founder/page.tsx         # Founder bio
  /api
    /state/route.ts         # GET current state
    /set-price/route.ts     # POST update price
    /play/route.ts          # POST play price path

/components
  GradientBackground.tsx    # Full-page gradient wrapper
  WalletConnect.tsx         # Solana wallet adapter UI
  PositionCard.tsx          # Position stats display
  ControlsBar.tsx           # Price slider, mode toggle, play controls
  BandsBar.tsx              # AMM band display
  HealthGauge.tsx           # Health indicator
  CompositionDonut.tsx      # Collateral/sUSD pie chart
  EventLog.tsx              # Transaction log
  MiniChart.tsx             # Health over time chart
  Footer.tsx                # Site footer

/lib
  state.ts                  # Zustand store & types
  demo.ts                   # Simulation logic (soft vs baseline)
  format.ts                 # Formatting helpers
  anchorClient.ts           # Anchor client stub
  utils.ts                  # Utility functions

/styles
  globals.css               # Tailwind base + fonts
  theme.css                 # CSS variables for gradient theme
```

## How It Works

### Soft Liquidation Mode

In "Soft" mode, the system uses AMM bands to gradually rebalance positions as prices move:

1. **Band System**: Prices are divided into bands (each ~2% wide)
2. **Alpha (α)**: Position within a band (0 = all collateral, 1 = all sUSD)
3. **Gradual Rebalancing**: Each tick rebalances ≤3% toward target composition
4. **Continuous**: No sudden liquidations - smooth transitions

### Baseline Mode

In "Baseline" mode, traditional hard liquidation logic applies:

1. **Threshold Check**: If LTV exceeds 85%, liquidation triggers
2. **Penalty**: 6-10% penalty applied instantly
3. **Catastrophic**: Immediate forced sale of collateral

### Demo Controls

- **Price Slider**: Manually adjust price (80-120) and trigger ticks
- **Mode Toggle**: Switch between Soft and Baseline modes
- **Play Path**: Automatically play through price path [100,98,95,92,90,94,97,100] with 600ms delays
- **Reset**: Return to initial state (price=100, collateral=10, debt=6000)

## Demo Script

1. **Navigate to Demo**: Click "Try the Demo" from the homepage
2. **Connect Wallet**: Use Phantom or Solflare (optional for demo)
3. **Explore Soft Mode**:
   - Slide price down from $100 to $90
   - Watch gradual rebalancing in CompositionDonut
   - Observe smooth health decline in MiniChart
4. **Switch to Baseline**:
   - Toggle to "Baseline" mode
   - Drop price below threshold (~$85-90)
   - See sudden liquidation event in EventLog
5. **Play Path**:
   - Click "Play Path" to simulate price movement
   - Watch health recover as price rebounds
   - Compare behavior between modes

## Future Work: Anchor Integration

The current implementation uses mock API routes for demonstration. To integrate with actual Solana programs:

1. **Replace Anchor Stub** (`lib/anchorClient.ts`):
   - Add actual IDL file
   - Wire up program methods
   - Connect to position accounts

2. **Update API Routes**:
   - Replace mock state with on-chain reads
   - Add transaction building/signing
   - Handle wallet signing flows

3. **Add Transaction Handling**:
   - Implement position creation/updates
   - Add confirmation dialogs
   - Handle errors gracefully

4. **Oracle Integration**:
   - Connect to real price feeds
   - Implement price update mechanisms

## Competitive Landscape

SOPHIE compares favorably to existing liquidation mechanisms:

| Protocol | Chain | Weakness | SOPHIE Advantage |
|----------|-------|----------|------------------|
| MakerDAO / Sky | Ethereum | Auctions, hard thresholds | Continuous AMM liquidation |
| Aave | Ethereum | Gas, oracle lag | Real-time smoothing on Solana |
| Solend | Solana | Sudden forced sales | Gradual banded conversion |
| Keel / Stars | Solana | Discretionary yield-focused | Algorithmic borrower protection |

## Accessibility

- **Lighthouse Score**: Targets ≥90 a11y score
- **Keyboard Navigation**: All controls accessible via keyboard
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG AA compliant

## Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js + TypeScript rules
- **Prettier**: Consistent code formatting
- **Responsive**: Mobile-first design

## License

MIT

## Founder

**Vijay Ditya Sarkar** (V-I-J-A-Y-D-I-T-Y-A Sarkar S-A-R-K-E-R)

- Masters in Computer Science, University College Dublin
- Former Software Engineer at Wipro
- Currently Software Engineer at Staker.fun

---

Built with ❤️ for the Solana ecosystem

