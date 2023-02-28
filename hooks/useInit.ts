import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRecoilState } from "recoil";

import { walletInfoAtom } from "@/state/states";
export const useWalletInit = () => {
  const [, setwalletInfo] = useRecoilState(walletInfoAtom);
  const { isConnected, address } = useAccount();

  useEffect(() => {
    // TODO: Handle the time diff between isConncted and connector(useAccount returns)
    if (isConnected && address) {
      console.log(
        "%cWallet Connected",
        "color:white; background-color:green; font-size:16px;"
      );

      setwalletInfo({ address, isConnected });
    } else {
      console.log(
        "%cWallet Disconnected",
        "color:white; background-color:red; font-size:16px;"
      );
      setwalletInfo({ address: undefined, isConnected: false });
    }
  }, [isConnected, address]);
};
