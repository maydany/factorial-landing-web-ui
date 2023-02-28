import TitleUnitInput from "@/components/inputs/TitleUnit";
import { DappTypes } from "@/state/states";
import { useEffect, useMemo, useState } from "react";
import { useBalance, useAccount } from "wagmi";
import Image from "next/image";
import EthImage from "@/styles/resources/images/eth.png";
import {
  marginInputDataAtom,
  maliciousMarginInputDataAtom,
  LYFInputDataAtom,
  MarginInputDataInterface,
  LYFInputDataInterface,
} from "@/state/states";
import { useRecoilState } from "recoil";

export function DemoUI({
  type,
  trade,
}: {
  type: DappTypes;
  trade: () => void;
}) {
  const { address } = useAccount();
  const [hydrated, setHydrated] = useState(false);
  const [marginInputData, setMarginInputData] =
    useRecoilState(marginInputDataAtom);
  const [maliciousMarginInputData, setMaliciousMarginInputData] =
    useRecoilState(maliciousMarginInputDataAtom);
  const { data: balanceData } = useBalance({
    address: address,
    watch: true,
    // WEATHER
    // token: '0x~~~'// Address for ERC-20 token. If token is provided, hook fetches token balance
  });
  useEffect(() => {
    setHydrated(true);
  }, []);

  const balanceInfo = useMemo(() => {
    if (balanceData?.formatted) {
      return balanceData;
    } else {
      return {
        decimals: "",
        formatted: "0",
        symbol: "",
        value: {
          type: "BigNumber",
          hex: "",
        },
      };
    }
  }, [balanceData?.formatted]);

  return hydrated ? (
    <>
      {/* Margin Demo */}
      <div
        className={`h-full p-10  ${
          type === "margin"
            ? "bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600"
            : type === "maliciousMargin"
            ? // bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-800
              "malicious-magrin-bg "
            : "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-green-300 via-yellow-300 to-pink-300"
        }`}
      >
        {/* Margin */}
        {type === "margin" && (
          <div className="p-4 border-2 border-secondary rounded-md shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-baseBg demo-transition">
            <div className="">
              <div>
                {/* title */}
                <div className="mb-5 text-2xl text-primary">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3">
                      <Image
                        src={EthImage}
                        alt="eth"
                        placeholder="blur" // Optional blur-up while loading
                      />
                    </div>
                    ETH-USDC Margin
                  </div>
                </div>

                {/* user balance */}
                <div className="flex mb-3 space-x-3 text-lg text-primary">
                  <div className="">Avbl</div>{" "}
                  <div className="text-white">
                    {balanceInfo.formatted} {balanceInfo.symbol}
                  </div>
                </div>

                {/* price input */}
                <TitleUnitInput
                  title="Price"
                  theme="primary"
                  unit="USDC"
                  placeholder="0.00"
                  type="number"
                  value={marginInputData.price}
                  setValue={(e: string) => {
                    setMarginInputData({
                      ...marginInputData,
                      price: e,
                    });
                  }}
                />
                {/* Amount input */}
                <div className="mt-4">
                  <TitleUnitInput
                    title="Amount"
                    unit="ETH"
                    theme="primary"
                    placeholder="0"
                    type="number"
                    value={marginInputData.amount}
                    setValue={(e: string) => {
                      setMarginInputData({
                        ...marginInputData,
                        amount: e,
                      });
                    }}
                  />
                </div>

                {/* Leverage Slider */}
                <div className="flex flex-col mt-4">
                  <div className="mb-1 text-lg font-semibold text-primary">
                    Leverage (Max: 5x)
                  </div>{" "}
                  <div className="flex items-center justify-between">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      onChange={(e) =>
                        setMarginInputData({
                          ...marginInputData,
                          leverage: e.target.value,
                        })
                      }
                      value={marginInputData.leverage}
                      step="1"
                      className="w-3/4 h-2 rounded-full appearance-none cursor-pointer bg-secondary accent-white"
                    />
                    <div className="w-1/4 text-3xl text-center text-primary">
                      {marginInputData.leverage}
                      <span className="opacity-70"> x</span>
                    </div>
                  </div>
                </div>

                {/* Borrow From */}
                <div className="mt-4 mb-3 text-lg font-semibold text-primary">
                  Borrow From
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() =>
                      setMarginInputData({
                        ...marginInputData,
                        borrow: { name: "A", address: "A-address" },
                      })
                    }
                    className={`${
                      marginInputData.borrow.name === "A"
                        ? "opacity-100"
                        : "opacity-50"
                    } w-[7.8rem] h-[7.8rem] rounded-md border-[2px] transition-opacity border-primary hover:opacity-100  cursor-pointer`}
                  >
                    <div className="p-1 mx-auto mt-2 text-sm leading-4 text-center border-4 border-systemGreen text-systemGreen font-BlackHanSansRegular max-w-max">
                      AUTHORIZED
                    </div>
                    <div className="mt-1 text-xl font-semibold text-center text-primary">
                      LENDING
                    </div>
                    <div className="text-4xl font-semibold text-center text-primary">
                      A
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setMarginInputData({
                        ...marginInputData,
                        borrow: { name: "B", address: "B-Address" },
                      })
                    }
                    className={`${
                      marginInputData.borrow.name === "B"
                        ? "opacity-100"
                        : "opacity-50"
                    } w-[7.8rem] h-[7.8rem] rounded-md border-[2px] transition-opacity border-primary hover:opacity-100  cursor-pointer`}
                  >
                    <div className="p-1 mx-auto mt-2 text-sm leading-4 text-center border-4 border-systemGreen text-systemGreen font-BlackHanSansRegular max-w-max">
                      AUTHORIZED
                    </div>
                    <div className="mt-1 text-xl font-semibold text-center text-primary">
                      LENDING
                    </div>
                    <div className="text-4xl font-semibold text-center text-primary">
                      B
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setMarginInputData({
                        ...marginInputData,
                        borrow: { name: "C", address: "C-Address" },
                      })
                    }
                    className={`${
                      marginInputData.borrow.name === "C"
                        ? "opacity-100"
                        : "opacity-50"
                    } w-[7.8rem] h-[7.8rem] rounded-md border-[2px] transition-opacity border-primary hover:opacity-100 cursor-pointer`}
                  >
                    <div className="p-1 mx-auto mt-2 text-sm leading-4 text-center border-4 border-systemGreen text-systemGreen font-BlackHanSansRegular max-w-max">
                      AUTHORIZED
                    </div>
                    <div className="mt-1 text-xl font-semibold text-center text-primary">
                      LENDING
                    </div>
                    <div className="text-4xl font-semibold text-center text-primary">
                      C
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade Button */}

            <button
              onClick={() => trade()}
              className="w-full px-8 py-2 mt-10 mb-2 text-lg text-primary border-2 border-primary  bg-baseBg rounded-lg shadow-[5px_5px_0px_0px_#9dc9dc] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 ease-in-out hover:shadow-none"
            >
              Trade
            </button>
          </div>
        )}
        {/* Malicous Margin */}
        {type === "maliciousMargin" && (
          <div className="shadow-[4px_7px_7px_#ef9aff] p-4 border-2 border-systemPurple rounded-md  bg-baseBg slow-transition">
            <div className="">
              <div>
                {/* title */}
                <div className="mb-5 text-2xl text-systemPurple">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3">
                      <Image
                        src={EthImage}
                        alt="eth"
                        placeholder="blur" // Optional blur-up while loading
                      />
                    </div>
                    ETH-USDC Malicious Margin
                  </div>
                </div>

                {/* user balance */}
                <div className="flex mb-3 space-x-3 text-lg text-systemPurple">
                  <div className="">Avbl</div>{" "}
                  <div className="text-white">
                    {balanceInfo.formatted} {balanceInfo.symbol}
                  </div>
                </div>

                {/* price input */}
                <TitleUnitInput
                  title="Price"
                  theme="purple"
                  unit="USDC"
                  placeholder="0.00"
                  type="number"
                  value={maliciousMarginInputData.price}
                  setValue={(e: string) => {
                    setMaliciousMarginInputData({
                      ...maliciousMarginInputData,
                      price: e,
                    });
                  }}
                />
                {/* Amount input */}
                <div className="mt-4">
                  <TitleUnitInput
                    title="Amount"
                    unit="ETH"
                    theme="purple"
                    placeholder="0"
                    type="number"
                    value={maliciousMarginInputData.amount}
                    setValue={(e: string) => {
                      setMaliciousMarginInputData({
                        ...maliciousMarginInputData,
                        amount: e,
                      });
                    }}
                  />
                </div>

                {/* Leverage Slider */}
                <div className="flex flex-col mt-4">
                  <div className="mb-1 text-lg font-semibold text-systemPurple">
                    Leverage (Max: 5x)
                  </div>{" "}
                  <div className="flex items-center justify-between">
                    <input
                      type="range"
                      min="0"
                      max="13"
                      onChange={(e) =>
                        setMaliciousMarginInputData({
                          ...maliciousMarginInputData,
                          leverage: e.target.value,
                        })
                      }
                      value={maliciousMarginInputData.leverage}
                      step="1"
                      className="w-3/4 h-2 rounded-full appearance-none cursor-pointer bg-systemPurple accent-white"
                    />
                    <div className="w-1/4 text-3xl text-center text-systemPurple">
                      {Number(maliciousMarginInputData.leverage) > 5
                        ? "😈 "
                        : ""}{" "}
                      {maliciousMarginInputData.leverage}
                      <span className="opacity-70"> x</span>
                    </div>
                  </div>
                </div>

                {/* Borrow From */}
                <div className="mt-4 mb-3 text-lg font-semibold text-systemPurple">
                  Borrow From
                </div>
                <div className="flex justify-between">
                  <div
                    onClick={() =>
                      setMaliciousMarginInputData({
                        ...maliciousMarginInputData,
                        borrow: { name: "A", address: "A-address" },
                      })
                    }
                    className={`${
                      maliciousMarginInputData.borrow.name === "A"
                        ? "opacity-100"
                        : "opacity-50"
                    } w-[7.8rem] h-[7.8rem] rounded-md border-[2px] transition-opacity border-systemPurple hover:opacity-100  cursor-pointer`}
                  >
                    <div className="p-1 mx-auto mt-2 text-sm leading-4 text-center border-4 border-systemGreen text-systemGreen font-BlackHanSansRegular max-w-max">
                      AUTHORIZED
                    </div>
                    <div className="mt-1 text-xl font-semibold text-center text-systemPurple">
                      LENDING
                    </div>
                    <div className="text-4xl font-semibold text-center text-systemPurple">
                      A
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setMaliciousMarginInputData({
                        ...maliciousMarginInputData,
                        borrow: { name: "B", address: "B-Address" },
                      })
                    }
                    className={`${
                      maliciousMarginInputData.borrow.name === "B"
                        ? "opacity-100"
                        : "opacity-50"
                    } w-[7.8rem] h-[7.8rem] rounded-md border-[2px] transition-opacity border-systemPurple hover:opacity-100  cursor-pointer`}
                  >
                    <div className="p-1 mx-auto mt-2 text-sm leading-4 text-center border-4 border-systemGreen text-systemGreen font-BlackHanSansRegular max-w-max">
                      AUTHORIZED
                    </div>
                    <div className="mt-1 text-xl font-semibold text-center text-systemPurple">
                      LENDING
                    </div>
                    <div className="text-4xl font-semibold text-center text-systemPurple">
                      B
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      setMaliciousMarginInputData({
                        ...maliciousMarginInputData,
                        borrow: { name: "F", address: "F-Address" },
                      })
                    }
                    className={`${
                      maliciousMarginInputData.borrow.name === "C"
                        ? "opacity-100"
                        : "opacity-50"
                    } w-[7.8rem] h-[7.8rem] rounded-md border-[2px] transition-opacity border-systemPurple hover:opacity-100 cursor-pointer`}
                  >
                    <div className="p-1 mx-auto mt-2 text-base leading-4 text-center text-red-500 border-4 border-red-500 font-BlackHanSansRegular max-w-max">
                      😈 SCAM 😈
                    </div>
                    <div className="mt-1 text-xl font-semibold text-center text-systemPurple">
                      LENDING
                    </div>
                    <div className="text-4xl font-semibold text-center text-systemPurple">
                      F
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade Button */}

            <button
              onClick={() => trade()}
              className="w-full px-8 py-2 mt-10 mb-2 text-lg text-systemPurple border-2 border-systemPurple  bg-baseBg rounded-lg shadow-[5px_5px_0px_0px_#85568e] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 ease-in-out hover:shadow-none"
            >
              Trade
            </button>
          </div>
        )}
      </div>
    </>
  ) : (
    <div></div>
  );
}
