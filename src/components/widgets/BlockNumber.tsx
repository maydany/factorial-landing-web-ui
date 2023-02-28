import { useBlockNumber } from "wagmi";
import { useEffect, useState } from "react";
export default function BlockNumber() {
  const [scopeKey, setScopeKey] = useState("");
  const { data: blockNumber, isError: isBlockNumberError } = useBlockNumber({
    watch: true,
    scopeKey: scopeKey,
  });
  useEffect(() => {
    setScopeKey("wagmi");
  }, []);

  return (
    // TODO: link to block explorer based on env, ex: https://polygonscan.com/block/123456
    <>
      {isBlockNumberError ? (
        <div
          className={`flex font-bold items-center p-1 mr-2 text-xs text-red-500 cursor-pointer opacity-100 hover:opacity-100 rounded-full border-red-500 border-2 `}
        >
          Error
        </div>
      ) : (
        <div
          className={`flex items-center p-1 mr-2 text-xs text-green-500 cursor-pointer opacity-70 hover:opacity-100`}
        >
          <div>{blockNumber}</div>
          <div className="w-2 h-2 ml-2 bg-green-500 rounded-full" />
        </div>
      )}
    </>
  );
}
