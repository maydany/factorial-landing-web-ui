import { useState } from "react";

export default function TransactionProcessingModal({
  setModalOpen,
}: {
  setModalOpen: Function;
}) {
  const [txStatus, setTxStatus] = useState({
    customDapp: "watch",
    validator: "watch",
    liquidation: "watch",
    execution: "watch",
  });

  return (
    <div className="fixed top-0 left-0 z-50 min-w-full min-h-screen bg-black opacity-100 demo-transition overflow-scroll h-[40rem] pb-10">
      {/* Title */}
      <div className="relative mt-5 text-center text-7xl text-primary-set">
        <div className="h-3 mb-2 border-4 border-secondary" />
        Transaction Processing
        <div
          onClick={() => setModalOpen(false)}
          className="absolute text-6xl transition-all cursor-pointer right-3 top-7 text-shadow-none hover:text-primary-set"
        >
          🆇
        </div>
        <div className="h-3 mt-4 border-4 border-secondary" />
      </div>

      <div className="mx-auto mb-10 max-w-7xl ">
        {/* Sections */}
        <div className="flex justify-between mt-8 mb-10">
          {/* Left Section */}
          <div className=" w-[50%]  h-full">
            {/* Left Section Title */}
            <div className="flex justify-center w-full mt-4 mb-8 text-4xl">
              <div className="px-3 py-1 text-center border-2 rounded-md bg-baseBg text-primary border-primary">
                PROCESS
              </div>
            </div>

            {/* Custom Dapp Block */}
            <div className="w-full border-2 rounded-sm border-primary">
              <div className="px-3 py-1 text-2xl border-b-2 border-primary bg-[#a2bcc852] text-primary text-center">
                CUSTOM DAPP
              </div>

              <div className="my-1">{getTxStatus(txStatus.customDapp)}</div>
            </div>

            {/* Connect Line */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-primary"></div>
            </div>

            {/* Factorial Block */}
            {/* shadow-[5px_5px_rgba(195,_229,_237,_0.4),_10px_10px_rgba(195,_229,_237,_0.3),_15px_15px_rgba(195,_229,_237,_0.2),_20px_20px_rgba(195,_229,_237,_0.1),_25px_25px_rgba(195,_229,_237,_0.05)] */}
            <section className="h-full border-4 border-primary">
              <div className="px-3 py-1 text-2xl border-b-4 border-primary bg-[#a2bcc852] text-primary text-center">
                FACTORIAL RISK MODULE
              </div>

              <div className="flex justify-center mt-8 space-x-3 text-center text-primary"></div>

              <div className="flex items-center justify-center mb-8 text-center text-primary">
                {/* Validator */}
                <div className="border-2 rounded-sm w-44 h-44 border-primary">
                  <div className="px-3 py-1 text-2xl border-b-2 border-primary bg-[#a2bcc852]">
                    Validator
                  </div>
                  {/* Status */}
                  <div className="flex items-center justify-center h-32">
                    {getTxStatus(txStatus.validator)}
                  </div>
                </div>
                {/* connector */}
                <div className="w-6 h-1 bg-primary" />
                {/* Valuation */}
                <div className="border-2 rounded-sm h-11 w-44 border-primary ">
                  <div className="px-3 py-1 text-2xl border-primary bg-[#a2bcc852]">
                    Valuation
                  </div>
                </div>
                {/* connector */}
                <div className="w-6 h-1 bg-primary" />
                {/* Liquidation */}
                <div className="border-2 rounded-sm w-44 h-44 border-primary">
                  <div className="px-3 py-1 text-2xl border-b-2 border-primary bg-[#a2bcc852]">
                    Liquidation
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-center h-32">
                    {getTxStatus(txStatus.liquidation)}
                  </div>
                </div>
              </div>
            </section>

            {/* Connect Line */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-primary"></div>
            </div>

            {/* Exectution Block */}
            <div className="w-full border-2 rounded-sm border-primary">
              <div className="px-3 py-1 text-2xl border-b-2 border-primary bg-[#a2bcc852] text-primary text-center">
                EXECTUTION MODULE
              </div>

              <div className="my-1"> {getTxStatus(txStatus.execution)}</div>
            </div>
          </div>

          {/* Right Section */}
          <section className="w-[45%] text-7xl ">
            {/* Title */}
            <div className="flex justify-center w-full mt-4 mb-8 text-4xl">
              <div className="px-4 py-1 text-center border-2 rounded-md bg-baseBg text-primary border-primary">
                RESULT
              </div>
            </div>
            <div className="flex flex-col justify-center h-[30rem] border-4 rounded-md border-secondary">
              {/* Processing */}
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
                <div className="flex justify-center">
                  <div className="bg-[#a2bcc852] p-1 px-4 rounded-md mt-2 text-xl text-center text-primary w-min">
                    PROCESSING
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function getTxStatus(status: string) {
  if (status === "block") {
    return (
      <div className="flex items-center justify-center h-20 text-3xl">
        <div className="p-2 px-4 border-4 border-systemRed text-systemRed">
          BLOCK
        </div>
      </div>
    );
  } else if (status === "pass") {
    return (
      <div className="flex items-center justify-center h-20 text-3xl">
        <div className="p-2 px-4 border-4 border-systemGreen text-systemGreen">
          PASS
        </div>
      </div>
    );
  } else if (status === "ready") {
    return (
      <div className="flex items-center justify-center h-20 text-3xl">
        <div className="p-2 px-4 border-4 border-primary text-primary">
          READY
        </div>
      </div>
    );
  } else if (status === "watch") {
    return (
      <div className="flex items-center justify-center h-20 text-3xl">
        <div className="p-2 px-4 border-4 border-systemBlue text-systemBlue">
          WATCH
        </div>
      </div>
    );
  }
}
