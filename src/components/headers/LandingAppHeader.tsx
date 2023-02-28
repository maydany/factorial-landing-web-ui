import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "@/styles/resources/factorial-logo-name.svg";
import Exclamation from "@/styles/resources/exclamation.svg";
import ExternalLink from "@/styles/resources/external-link.svg";

export default function AppHeader() {
  const router = useRouter();

  return (
    <header className=" font-notoSans factorial-gradient-bg">
      <div className="flex items-center justify-between max-w-5xl p-2 mx-auto">
        {/* Logo */}
        <div className="mt-1 cursor-pointer">
          <Link href="/">
            <Image src={Logo} alt="logo" width={120} height={30} />
          </Link>
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-around space-x-10 text-base  text-white translate-y-[2px] mr-9 transition-all">
            <Link href="/">
              <div
                className={`cursor-pointer hover:opacity-100 ${
                  router.pathname === "/" ? "opacity-100" : "opacity-60"
                }`}
              >
                Home
                {router.pathname === "/" ? (
                  <div className="inline-block translate-y-[1px] transform: -rotate-[15deg]">
                    <Image
                      src={Exclamation}
                      alt="exclamation"
                      width={14}
                      height={14}
                    />
                  </div>
                ) : (
                  <div className="inline-block w-[14px]" />
                )}
              </div>
            </Link>
            <Link href="/one-pager">
              <div
                className={`cursor-pointer hover:opacity-100 ${
                  router.pathname === "/one-pager"
                    ? "opacity-100"
                    : "opacity-60"
                }`}
              >
                One Pager
                {router.pathname === "/one-pager" ? (
                  <div className="inline-block translate-y-[1px] transform: -rotate-[15deg]">
                    <Image
                      src={Exclamation}
                      alt="exclamation"
                      width={14}
                      height={14}
                    />
                  </div>
                ) : (
                  <div className="inline-block w-[14px]" />
                )}
              </div>
            </Link>
            <Link href="/demo">
              <div
                className={`cursor-pointer hover:opacity-100 ${
                  router.pathname === "/demo" ? "opacity-100" : "opacity-60"
                }`}
              >
                Demo
                {router.pathname === "/demo" ? (
                  <div className="inline-block translate-y-[1px] transform: -rotate-[15deg]">
                    <Image
                      src={Exclamation}
                      alt="exclamation"
                      width={14}
                      height={14}
                    />
                  </div>
                ) : (
                  <div className="inline-block w-[14px]" />
                )}
              </div>
            </Link>

            <Link
              href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
              passHref
            >
              <a target="_blank" rel="noopener noreferrer">
                <div
                  className={`cursor-pointer hover:opacity-100 ${
                    router.pathname === "/docs" ? "opacity-100" : "opacity-60"
                  } flex`}
                >
                  Docs
                  <div className="ml-1 translate-y-[1px]">
                    <Image
                      src={ExternalLink}
                      alt="external-link"
                      width={14}
                      height={14}
                    />
                  </div>
                  {/* {router.pathname === "/doc" ? (
                    <div className="inline-block translate-y-[1px]">
                      <Image
                        src={Exclamation}
                        alt="exclamation"
                        width={16}
                        height={16}
                      />
                    </div>
                  ) : (
                    <div className="inline-block w-4" />
                  )} */}
                </div>
              </a>
            </Link>
          </div>

          {/* <Link href="/demo">
            <div className="px-5 font-bold pt-2 pb-1 text-lg leading-[1.125rem] text-white transition-opacity rounded-full cursor-pointer bg-factorialBlue hover:opacity-70">
              GO TO DEMO
            </div>
          </Link> */}
        </div>
      </div>
    </header>
  );
}
