import { useMemo } from "react";
import { useBalance, useContractRead } from "wagmi";
import { useRecoilState } from "recoil";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils.js";

import ABI_ERC20 from "@/abi/openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";
import ABI_ERC1155 from "@/abi/openzeppelin/contracts/token/ERC1155/ERC1155.sol/ERC1155.json";
import { walletInfoAtom } from "@/state/states";
import { getContractAddress, APP_ENV } from "COMMON_VARIABLES";
export const useUserBalance = ({
  optionContracts,
}: {
  optionContracts: Array<{ address: string; name: string }>;
}) => {
  // TODO: use useContractReads for multiple contracts
  const [walletInfo] = useRecoilState(walletInfoAtom);
  // Option Balance Info
  const {
    data: optionUserBalanceData,
    isError: isOptionUserBalanceError,
    isLoading: isOptionUserBalanceLoading,
  }: any = useContractRead({
    address: getContractAddress("option"),
    abi: ABI_ERC1155.abi,
    functionName: "balanceOf",
    watch: true,
    // cacheOnBlock: true,
    args: [walletInfo.address, 1],
  });
  const {
    data: optionUserAllowanceData,
    isError: isOptionUserAllowanceError,
    isLoading: isOptionUserAllowanceLoading,
  }: any = useContractRead({
    address: getContractAddress("option"),
    abi: ABI_ERC1155.abi,
    functionName: "isApprovedForAll",
    args: [walletInfo.address, getContractAddress("router")],
    watch: true,
  });

  const optionUserBalances = useMemo(() => {
    // TODO: use useContractReads for multiple contracts and return an array of balances
    if (
      optionUserBalanceData &&
      !isOptionUserAllowanceError &&
      !isOptionUserAllowanceLoading &&
      !isOptionUserBalanceError &&
      !isOptionUserBalanceLoading
    ) {
      const amount = getAmountHelper(optionUserBalanceData, "option");
      return {
        decimals: 0,
        symbol: "option",
        rawBalance: amount?.rawBalance,
        formatted: amount?.formatted,
        value: optionUserBalanceData,
        isLoading: isOptionUserBalanceLoading || isOptionUserAllowanceLoading,
        isError: isOptionUserBalanceError || isOptionUserAllowanceError,
        isApproved: optionUserAllowanceData,
      };
    } else {
      return {
        decimals: 0,
        symbol: "option",
        value: BigNumber.from("0"),
        rawBalance: "0",
        formatted: formatUnits(0, 0),
        isLoading: isOptionUserBalanceLoading || isOptionUserAllowanceLoading,
        isError: isOptionUserBalanceError || isOptionUserAllowanceError,
        isApproved: optionUserAllowanceData,
      };
    }
  }, [
    optionUserAllowanceData,
    optionUserBalanceData,
    isOptionUserAllowanceError,
    isOptionUserAllowanceLoading,
    isOptionUserBalanceError,
    isOptionUserBalanceLoading,
  ]);

  // USDC Balance Info
  const {
    data: userUsdcBalanceData,
    isLoading: isUserUsdcBalanceLoading,
    isError: isUserUsdcBalanceError,
  } = useBalance({
    address: walletInfo.address,
    token: getContractAddress("usdc"),
    watch: true,
    // cacheTime: 2000,
  });
  const { data: usdcContractAllowanceData }: { data: any } = useContractRead({
    address: getContractAddress("usdc"),
    abi: ABI_ERC20.abi,
    functionName: "allowance",
    args: [walletInfo.address, getContractAddress("router")],
    watch: true,
  });
  const usdcUserBalance = useMemo(() => {
    if (
      !isUserUsdcBalanceLoading &&
      !isUserUsdcBalanceError &&
      usdcContractAllowanceData?._hex &&
      userUsdcBalanceData
    ) {
      const amount = getAmountHelper(userUsdcBalanceData.value, "usdc");

      return {
        ...userUsdcBalanceData,
        rawBalance: amount?.rawBalance,
        formatted: amount?.formatted,
        isLoading: isUserUsdcBalanceLoading,
        isError: isUserUsdcBalanceError,
        isApproved:
          Number(formatUnits(usdcContractAllowanceData?._hex || 0)) > 0,
      };
    } else {
      return {
        decimals: 6,
        formatted: "0",
        symbol: "usdc",
        value: BigNumber.from("0"),
        rawBalance: "0",
        isLoading: isUserUsdcBalanceLoading,
        isError: isUserUsdcBalanceError,
        isApproved:
          Number(formatUnits(usdcContractAllowanceData?._hex || 0)) > 0,
      };
    }
  }, [
    userUsdcBalanceData?.value?._hex,
    isUserUsdcBalanceLoading,
    isUserUsdcBalanceError,
    usdcContractAllowanceData?._hex,
  ]);

  return {
    usdcUserBalanceData: usdcUserBalance,
    optionUserBalancesData: optionUserBalances,
  };
};

// test helper
function getAmountHelper(amount: BigNumber, type: "option" | "usdc") {
  if (APP_ENV === "production") {
    if (type === "option") {
      return {
        rawBalance: formatUnits(amount._hex, 0),
        formatted: formatUnits(amount._hex, 0),
      };
    } else if (type === "usdc") {
      return {
        rawBalance: formatUnits(amount, 0),
        formatted: formatUnits(amount._hex, 6),
      };
    }
  } else {
    if (type === "option") {
      return {
        rawBalance: amount.toString().slice(-20),
        formatted: amount.toString().slice(-20),
      };
    } else if (type === "usdc") {
      return {
        rawBalance: amount.toString().slice(-24),
        formatted: formatUnits(amount._hex, 6).toString().slice(-25),
      };
    }
  }
}
