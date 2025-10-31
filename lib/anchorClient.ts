import { Connection, PublicKey } from "@solana/web3.js";

// Stub Anchor client - replace with actual IDL and program ID later
export async function getAnchorClient() {
  const clusterUrl =
    process.env.NEXT_PUBLIC_CLUSTER_URL || "http://127.0.0.1:8899";
  const programIdStr =
    process.env.NEXT_PUBLIC_PROGRAM_ID ||
    "SoFtFi11111111111111111111111111111111111111";

  const connection = new Connection(clusterUrl, "confirmed");
  const programId = new PublicKey(programIdStr);

  // For now, return a stub object
  // TODO: Replace with actual Anchor provider and program setup
  return {
    connection,
    programId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getPosition: async (_pubkey: PublicKey) => {
      // Stub: return null or mock data
      return null;
    },
  };
}

export type AnchorClient = Awaited<ReturnType<typeof getAnchorClient>>;

