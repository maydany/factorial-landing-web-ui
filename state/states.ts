import { atom, RecoilEnv, selector } from "recoil";
import { AssetInfoRaw } from "@/types/asset";

/**
 * @summary recoil atom key dupl warning issue resolved by Recoil team
 * https://github.com/facebookexperimental/Recoil/pull/2046/commits/95b345605b5ff015e98bb5185d433310908b34d3
 * */
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

/** @summary set wallet info, when wallet is connected */
export const walletInfoAtom = atom<{
  address: `0x${string}` | undefined;
  isConnected: boolean;
}>({
  key: "walletInfo",
  default: { address: undefined, isConnected: false },
});

export type DappTypes = "margin" | "leverageYieldFarming" | "maliciousMargin";
export const dappTypeAtom = atom<DappTypes>({
  key: "dappType",
  default: "margin",
});

export interface MarginInputDataInterface {
  collateral: { address: string };
  borrow: { address: string; name: string };
  price: string;
  amount: string;
  leverage: string;
}
export const marginInputDataAtom = atom<MarginInputDataInterface>({
  key: "marginValue",
  default: {
    collateral: { address: "" },
    borrow: { address: "", name: "" },
    price: "",
    amount: "",
    leverage: "1",
  },
});

export interface MaliciousMarginInputDataInterface {
  collateral: { address: string };
  borrow: { address: string; name: string };
  price: string;
  amount: string;
  leverage: string;
}
export const maliciousMarginInputDataAtom =
  atom<MaliciousMarginInputDataInterface>({
    key: "maliciousMarginValue",
    default: {
      collateral: { address: "" },
      borrow: { address: "", name: "" },
      price: "",
      amount: "",
      leverage: "13",
    },
  });

export interface LYFInputDataInterface {
  collateral: { address: string };
  borrow: { address: string; name: string };
  price: string;
  amount: string;
  leverage: string;
}
export const LYFInputDataAtom = atom<LYFInputDataInterface>({
  key: "LFYValue",
  default: {
    collateral: { address: "" },
    borrow: { address: "", name: "" },
    price: "",
    amount: "",
    leverage: "",
  },
});

// -------------------------------------------------
// /** @summary TEST */
// export const assetInfosAtom = atom<AssetInfoRaw[]>({
//   key: "assetInfos",
//   default: [],
// });

// export const assetCountState = selector<number>({
//   key: "assetCount",
//   get: ({ get }) => {
//     const assetInfos = get(assetInfosAtom);
//     return assetInfos?.length ?? 0;
//   },
// });

// /** @summary watchlist */
// export const watchListAtom = atom<AssetInfoRaw[]>({
//   key: "watchList",
//   default: [],
// });
