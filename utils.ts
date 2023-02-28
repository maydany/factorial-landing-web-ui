import { createClient, configureChains } from "@wagmi/core";
import { polygon, polygonMumbai, hardhat } from "wagmi/chains";
import { publicProvider } from "@wagmi/core/providers/public";
import { Chain } from "@wagmi/core";
export let walletUtils: any = (function () {
  // instance
  let instance: any;

  function getUtils() {
    return {
      getChains: function (env: string) {
        let supportedChains: Chain[];
        switch (env) {
          case "localnet":
            supportedChains = [hardhat];
            break;
          case "testnet":
            supportedChains = [polygonMumbai];
            break;
          case "production":
            supportedChains = [polygon];
            break;
          default:
            supportedChains = [];
        }
        const { provider, webSocketProvider, chains } = configureChains(
          supportedChains,

          [publicProvider()],
          { pollingInterval: 1000 }
        );
        return { provider, webSocketProvider, chains };
      },
      // public 속성 정의
      publicProp: `single value`,
    };
  }

  return (function () {
    if (!instance) {
      instance = getUtils();
    }
    return instance;
  })();
})();
// const { provider, webSocketProvider } = configureChains(
//   [mainnet],
//   [publicProvider()]
// );
// export const productionEnvClient = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
// });
