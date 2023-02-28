export const APP_ENV: "localnet" | "testnet" | "production" | "error" =
  (process.env.NEXT_PUBLIC_APP_ENV as "localnet" | "testnet" | "production") ||
  "error";

// TEST //

// TEST //

export const CONTRACTS_LOCALNET: { [key: string]: `0x${string}` } = {
  option: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  router: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  usdc: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  option1Market: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
};

export function getContractAddress(
  contract: keyof typeof CONTRACTS_LOCALNET
): `0x${string}` | undefined {
  if (APP_ENV === "localnet") {
    return CONTRACTS_LOCALNET[contract];
  } else {
    alert("getContractAddress() not implemented for this environment");
  }
}
