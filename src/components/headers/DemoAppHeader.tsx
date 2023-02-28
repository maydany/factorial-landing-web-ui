// import Link from "next/link";
// import { useRouter } from "next/router";
import { useWalletInit } from "hooks/useInit";
import ConnectButton from "@/components/buttons/ConnectButton";
import { useRecoilState } from "recoil";
import { dappTypeAtom } from "@/state/states";
export default function AppHeader() {
  // const router = useRouter();
  useWalletInit();

  const [dappType, setDappType] = useRecoilState(dappTypeAtom);
  return (
    <header className="flex justify-between max-w-5xl p-3 mx-auto mt-5">
      {/* Logo */}
      {/* <h1 className="px-4 py-3 text-3xl font-bold text-white bg-black font-BlackOpsOneRegular ">
        {dappType}
      </h1> */}

      {/* Dapp Type */}
      <div className="flex items-center justify-around space-x-10 ml-9">
        <button
          className={` ${getClassNameByDappType(dappType, "margin")}`}
          onClick={() => {
            setDappType("margin");
          }}
        >
          MARGIN
        </button>
        <button
          className={` ${getClassNameByDappType(
            dappType,
            "leverageYieldFarming"
          )}`}
          onClick={() => {
            setDappType("leverageYieldFarming");
          }}
        >
          LEVERAGE YIELD FARMING
        </button>
        <button
          className={` ${getClassNameByDappType(dappType, "maliciousMargin")}`}
          onClick={() => {
            setDappType("maliciousMargin");
          }}
        >
          MALICIOUS MARGIN
        </button>
      </div>

      {/* Connect Button */}
      <div className="flex items-center p-2 overflow-hidden ">
        <ConnectButton />
      </div>
    </header>
  );
}

//helper
function getClassNameByDappType(selectedDappType: string, dappType: string) {
  const commonClass = "font-semibold p-2 px-3  rounded-md   transition-colors";
  if (dappType === selectedDappType) {
    return `text-white bg-factorialDarkGray  ${commonClass}`;
  } else {
    return `text-gray-300 ${commonClass} `;
  }
}
