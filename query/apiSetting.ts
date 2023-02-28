import axios, { Axios } from "axios";
import { AssetInfoRaw } from "@/types/asset";

// Axios instance for web2/web3 endpoints
export type AxiosSource = keyof typeof ApiSources;
export const axiosInstances: Record<AxiosSource, Axios> = {
  web2_eth: axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEB2_ENDPOINT_BASE_URL,
  }),
  web3_eth: axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEB2_ENDPOINT_BASE_URL,
  }),
};

export enum ApiSources {
  web2_eth = "web2_eth",
  web3_eth = "web3_eth",
}

export namespace ApiNames {
  export enum Web2ETH {
    assetInfo = "assetInfo",
  }
  export enum Web3ETH {
    assetInfo2 = "assetInfo2",
    assetInfo3 = "assetInfo3",
  }
}

export const API_ENDPOINTS = {
  [ApiSources["web2_eth"]]: {
    [ApiNames.Web2ETH["assetInfo"]]: "/asset/info",
  },
  [ApiSources["web3_eth"]]: {
    [ApiNames.Web3ETH["assetInfo2"]]: "/asset/info",
    [ApiNames.Web3ETH["assetInfo3"]]: "/asset/info",
  },
} as const;

// Query Response types
export namespace QueryResponses {
  export namespace Web2ETH {
    export type assetInfo = AssetInfoRaw[];
  }
}
