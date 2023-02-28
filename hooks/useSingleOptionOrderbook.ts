import { useMemo } from "react";
import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import ABI_L2fiMarket from "@/abi/L2fiMarket.sol/L2fiMarket.json";

export const useSingleOptionOrderbook = ({
  contractAddress,
}: {
  contractAddress: `0x${string}` | undefined;
}) => {
  const { data: singleOptionOrderbookData }: { data: any } = useContractRead({
    address: contractAddress,
    abi: ABI_L2fiMarket.abi,
    functionName: "getOrderbook",
    args: [BigNumber.from(100)],
    watch: true,
  });

  return {
    singleOptionOrderbookData,
  };
};
