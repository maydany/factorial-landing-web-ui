import { useRouter } from "next/router";
import Image from "next/image";

export default function Home({ response }: { response: any }) {
  const router = useRouter();
  return (
    <>
      <div className="font-notoSans">
        {/* First part */}
        <div className="relative min-h-[calc(100vh_-_15rem)] text-center pt-44 ">
          <h1 className="text-4xl font-bold text-factorialDarkGray">
            Factorial manages protocol deployments on blockchains
          </h1>
          <h2 className="mt-2 text-3xl font-light">
            Infrastructure as Code for Foundry and Hardhat
          </h2>
          <div>
            <button
              onClick={() => router.push("/one-pager")}
              className="px-5 py-1 pt-2 mt-10 text-lg font-semibold text-white transition-opacity rounded-full bg-factorialBlue hover:opacity-90"
            >
              ONE PAGER
            </button>
          </div>
          <section className="mb-40 mt-60">
            <div className="flex justify-center mb-4 space-x-4">
              <div className=" w-[45%] border-[1px] border-blue-200 px-2 py-4 text-left flex space-x-3 rounded-md bg-factorialBlue">
                <div className=" w-[120px] flex items-center">
                  <Image
                    src="/multi.png"
                    alt="multi"
                    width={160}
                    height={160}
                  />
                </div>
                <div className="w-[70%]">
                  <div className="mt-1 mb-2 text-xl font-semibold text-white">
                    Multi DeFi
                  </div>
                  <div className="text-white opacity-70">
                    Multi-DeFi app developers will need significantly reduced
                    efforts on codebase and infrastructure gifted by the
                    Factorial.
                  </div>
                </div>
              </div>

              <div className=" w-[45%] border-[1px] border-blue-200 px-2 py-4 text-left space-x-3 flex rounded-md bg-factorialBlue">
                <div className=" w-[120px] flex items-center">
                  <Image
                    src="/modular.png"
                    alt="modular"
                    width={160}
                    height={160}
                  />
                </div>
                <div className="w-[70%]">
                  <div className="mt-1 mb-2 text-xl font-semibold text-white">
                    Modular DeFi
                  </div>
                  <div className="text-white opacity-70">
                    Factorial provides core financial functionalities as modules
                    reusable for DeFi apps.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <div className=" w-[45%] border-[1px] border-blue-200 px-2 py-4 text-left flex space-x-3 flex rounded-md bg-factorialBlue">
                <div className=" w-[120px] flex items-center">
                  <Image
                    src="/integrated.png"
                    alt="multi"
                    width={160}
                    height={160}
                  />
                </div>
                <div className="w-[70%]">
                  <div className="mt-1 mb-2 text-xl font-semibold text-white">
                    Integrated DeFi
                  </div>
                  <div className="text-white opacity-70">
                    Ecosystem participants gathered into integrated and shared
                    ecosystem.
                  </div>
                </div>
              </div>

              <div className=" w-[45%] border-[1px] border-blue-200 px-2 py-4 text-left space-x-3 flex rounded-md bg-factorialBlue">
                <div className=" w-[120px] flex items-center">
                  <Image
                    src="/gateway.png"
                    alt="gateway"
                    width={160}
                    height={160}
                  />
                </div>
                <div className="w-[70%]">
                  <div className="mt-1 mb-2 text-xl font-semibold text-white">
                    DeFi Gateway
                  </div>
                  <div className="text-white opacity-70">
                    Users will be introduced to a seamless DeFi gateway through
                    securely integrated multi-DeFi apps built easily on
                    Factorial.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Second Part */}
        {/* <div className="relative px-10 pb-6 mx-auto mt-4 text-center text-white rounded-md max-w-min bg-factorialBlue">
          <div className="pt-6 mb-3 text-2xl font-semibold">Community</div>
          <div className="flex justify-center transition-opacity space-x-9">
            <Link
              href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
              passHref
            >
              <a target="_blank" rel="noopener noreferrer">
                <BsGithub className="w-10 h-10 hover:opacity-70" />
              </a>
            </Link>
            <Link
              href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
              passHref
            >
              <a target="_blank" rel="noopener noreferrer">
                <BsTwitter className="w-10 h-10 hover:opacity-70" />
              </a>
            </Link>
            <Link
              href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
              passHref
            >
              <a target="_blank" rel="noopener noreferrer">
                <BsDiscord className="w-10 h-10 hover:opacity-70" />
              </a>
            </Link>
            <Link
              href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
              passHref
            >
              <a target="_blank" rel="noopener noreferrer">
                <BsTelegram className="w-10 h-10 hover:opacity-70" />
              </a>
            </Link>
          </div>
        </div> */}
      </div>
    </>
  );
}
