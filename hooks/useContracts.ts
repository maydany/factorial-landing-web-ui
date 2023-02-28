import { useSigner, useContract } from "wagmi";
import ABI_L2fiMarketRouter from "@/abi/L2fiMarketRouter.sol/L2fiMarketRouter.json";
import ABI_ERC20 from "@/abi/openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import ABI_ERC1155 from "@/abi/openzeppelin/contracts/token/ERC1155/ERC1155.sol/ERC1155.json";
import ABI_L2fiMarket from "@/abi/L2fiMarket.sol/L2fiMarket.json";
import {
  ERC20,
  ERC1155,
  L2fiMarketRouter,
  L2fiMarket,
} from "@/hardhat/typechain";

import { getContractAddress } from "COMMON_VARIABLES";
export const useContracts = () => {
  const { data: signer } = useSigner();
  const optionContract = useContract({
    address: getContractAddress("option"),
    abi: ABI_ERC1155.abi,
    signerOrProvider: signer,
  }) as ERC1155;

  const usdcContract = useContract({
    address: getContractAddress("usdc"),
    abi: ABI_ERC20.abi,
    signerOrProvider: signer,
  }) as ERC20;

  const routerContract = useContract({
    address: getContractAddress("router"),
    abi: ABI_L2fiMarketRouter.abi,
    signerOrProvider: signer,
  }) as L2fiMarketRouter;

  const option1MarketContract = useContract({
    address: getContractAddress("option1Market"),
    abi: ABI_L2fiMarket.abi,
    signerOrProvider: signer,
  }) as L2fiMarket;

  return {
    usdcContract,
    optionContract,
    routerContract,
    option1MarketContract,
  };
};
