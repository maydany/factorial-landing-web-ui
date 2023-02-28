import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import "@rainbow-me/rainbowkit/styles.css";
import Modal from "react-modal";
// providers
import { RecoilRoot } from "recoil";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
// clients
import queryClient from "query/queryClientConfig";
import { WagmiConfig, createClient } from "wagmi";
// util
import { walletUtils } from "utils";
import { APP_ENV } from "COMMON_VARIABLES";
// layout
import BasicLayout from "@/components/layouts/BasicLayout";

// wallet infos
const { provider, webSocketProvider, chains } = walletUtils.getChains(APP_ENV);
const { connectors } = getDefaultWallets({
  appName: "OptionDex Demo",
  chains,
});
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
console.log(chains);
const demoAppInfo = {
  appName: "OptionDex Demo",
};

// modal setup
Modal.setAppElement("#__next");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <RecoilRoot>
        <WagmiConfig client={client}>
          <RainbowKitProvider
            appInfo={demoAppInfo}
            chains={chains}
            theme={darkTheme({
              accentColor: "#333333",
              accentColorForeground: "white",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            <BasicLayout>
              <Component {...pageProps} />
            </BasicLayout>
          </RainbowKitProvider>
        </WagmiConfig>
      </RecoilRoot>
    </ReactQueryClientProvider>
  );
}
