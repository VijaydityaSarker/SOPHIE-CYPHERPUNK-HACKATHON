"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { formatAddress } from "@/lib/format";
import { useEffect, useState } from "react";

export function WalletConnect() {
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // avoid SSR/CSR hydration mismatch

  return (
    <div className="flex items-center gap-2">
      {connected && publicKey ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {formatAddress(publicKey.toString())}
          </span>
          <WalletMultiButton className="!bg-accent/20 !border-accent/50 hover:!bg-accent/30 !text-accent !rounded-lg !h-9 !px-4" />
        </div>
      ) : (
        <WalletMultiButton className="!bg-accent/20 !border-accent/50 hover:!bg-accent/30 !text-accent !rounded-lg !h-9 !px-4" />
      )}
    </div>
  );
}

