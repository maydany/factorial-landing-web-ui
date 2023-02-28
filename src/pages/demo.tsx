import { useEffect, useMemo, useState } from "react";
import {
  dappTypeAtom,
  maliciousMarginInputDataAtom,
  marginInputDataAtom,
  LYFInputDataAtom,
} from "@/state/states";
import { useRecoilState } from "recoil";

import { DemoUI } from "@/components/widgets/DemoUI";
import TransactionProcessingModal from "@/components/modals/TransactionProcessingModal";

// https://beta.nextjs.org/docs/upgrade-guide#migrating-from-pages-to-app

export default function Page({ response }: { response: any }) {
  const [dappType] = useRecoilState(dappTypeAtom);
  const [marginInputData, setMarginInputData] =
    useRecoilState(marginInputDataAtom);
  const [maliciousMarginInputData, setMaliciousMarginInputData] =
    useRecoilState(maliciousMarginInputDataAtom);
  const [LYFInputData, setLYFInputData] = useRecoilState(LYFInputDataAtom);
  const [
    IsTransactionProcessingModalOpen,
    setIsTransactionProcessingModalOpen,
  ] = useState<boolean>(false);
  const txData = useMemo(() => {
    if (dappType === "margin") {
      return marginInputData;
    } else if (dappType === "maliciousMargin") {
      return maliciousMarginInputData;
    } else if (dappType === "leverageYieldFarming") {
      return LYFInputData;
    } else {
      alert("Error in dappType, txData");
      return marginInputData;
    }
  }, [dappType, marginInputData, maliciousMarginInputData, LYFInputData]);

  function trade() {
    console.log("DAPP TYPE: ", dappType);
    console.log("TRADE");
    setIsTransactionProcessingModalOpen(true);
  }
  return (
    <>
      {/* Transaction Processing Modal */}
      {IsTransactionProcessingModalOpen && (
        <TransactionProcessingModal
          setModalOpen={setIsTransactionProcessingModalOpen}
        />
      )}

      {/* title */}
      {/* <div className="text-center text-7xl text-factorialDarkGray-set">
        <div className="h-3 mb-2 border-4 border-secondary" />
        {getDisplayNames(dappType).display}
        <div className="h-3 mt-4 border-4 border-secondary" />
      </div> */}

      {/* subtitle */}
      <div className="flex justify-between text-4xl -mt-4 text-center translate-y-[2.875rem]">
        <div className="w-[50%] flex justify-center">
          <div className="p-2 py-1 text-center text-white border-2 rounded-md bg-factorialDarkGray border-factorialDarkGray">
            Demo UI
          </div>
        </div>
        <div className="w-[45%] flex justify-center ">
          <div className="p-2 py-1 text-center text-white border-2 rounded-md bg-factorialDarkGray border-factorialDarkGray">
            Factorial Params
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="flex justify-between mt-5">
        {/* Left Section */}
        <section className="w-[50%] text-7xl flex-col border-4 border-secondary rounded-md">
          <DemoUI type={dappType} trade={trade} />
        </section>

        {/* Right Section */}
        <section className=" w-max p-4 border-factorialDarkGray border-4 h-full shadow-[5px_5px_rgba(50,_51,_51,_0.4),_10px_10px_rgba(50,_51,_51,_0.3),_15px_15px_rgba(50,_51,_51,_0.2),_20px_20px_rgba(50,_51,_51,_0.1),_25px_25px_rgba(50,_51,_51,_0.05)]">
          {/* Type */}
          <div className="flex items-center mt-10 space-x-4 text-2xl text-factorialDarkGray">
            <div>TYPE:</div>
            <div className="p-1 px-2 bg-gray-200 rounded-md ">
              {getDisplayNames(dappType).type}
            </div>
          </div>

          <div className="flex justify-between mt-8 space-x-3 text-center text-factorialDarkGray">
            {/* Price */}
            <div className="overflow-hidden border-2 rounded-sm w-52 border-factorialDarkGray">
              <div className="px-3 py-1 text-2xl bg-gray-200 border-b-2 border-factorialDarkGray">
                Price
              </div>
              <div className="flex items-center justify-center h-20 text-4xl">
                {txData.price ? (
                  <div>
                    {txData.price}
                    <span className="text-2xl"> USDC</span>
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>
            {/* Amount */}
            <div className="border-2 rounded-sm w-52 border-factorialDarkGray">
              <div className="px-3 py-1 text-2xl bg-gray-200 border-b-2 border-factorialDarkGray">
                Amount
              </div>
              <div className="flex items-center justify-center h-20 text-4xl">
                {txData.amount ? (
                  <div>
                    {txData.amount}
                    <span className="text-2xl"> ETH</span>
                  </div>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4 space-x-4 text-center text-factorialDarkGray">
            {/* Leverage */}
            <div className="border-2 rounded-sm w-52 border-factorialDarkGray">
              <div className="px-3 py-1 text-2xl bg-gray-200 border-b-2 border-factorialDarkGray">
                Leverage
              </div>
              <div className="flex items-center justify-center h-20 text-4xl">
                {txData.leverage} x
              </div>
            </div>
            {/* Borrow from */}
            <div className="border-2 rounded-sm w-52 border-factorialDarkGray">
              <div className="px-3 py-1 text-2xl bg-gray-200 border-b-2 border-factorialDarkGray">
                Borrow From
              </div>
              <div className="flex items-center justify-center h-20 text-4xl">
                {txData.borrow.name ? `Lending ${txData.borrow.name}` : "-"}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// helper
function getDisplayNames(dappType: string) {
  switch (dappType) {
    case "margin":
      return { display: "Margin", type: "MARGIN" };
    case "leverageYieldFarming":
      return {
        display: "Leverage Yield Farming",
        type: "LEVERAGE_YIELD_FARMING",
      };
    case "maliciousMargin":
      return { display: "Malicious Margin", type: "MARGIN" };
    default:
      return { display: "Error", type: "Error" };
  }
}
