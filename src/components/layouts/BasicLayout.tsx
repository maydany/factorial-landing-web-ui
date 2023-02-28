import DemoAppHeader from "@/components/headers/DemoAppHeader";
import LandingAppHeader from "@/components/headers/LandingAppHeader";
import BlockNumber from "@/components/widgets/BlockNumber";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Exclamation from "@/styles/resources/factorial-logo.svg";
import BrandName from "@/styles/resources/factorial-name.svg";
import Link from "next/link";
import { BsGithub, BsTwitter, BsDiscord, BsTelegram } from "react-icons/bs";
export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { pathname } = router;
  const isDemoPage = pathname === "/demo";
  const isHomePage = pathname === "/";
  const bgColor = isDemoPage ? "bg-transparent" : "bg-transparent";

  return (
    <>
      {/* Metadata */}
      <Head>
        <title>Factorial</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* Content */}
      <div className={`${bgColor} relative w-full min-h-screen`}>
        {/* background color */}
        {!isDemoPage && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br -z-10 " />
        )}
        <LandingAppHeader />
        {isDemoPage && <DemoAppHeader />}

        <main className="max-w-5xl mx-auto ">{children}</main>

        {isHomePage && (
          <div className="w-[50%] absolute right-0 top-40 -z-10 opacity-40">
            <Image src={Exclamation} alt="landing1" width={600} height={600} />
          </div>
        )}

        {isDemoPage && (
          <div className="fixed right-0 bottom-2 ">
            <BlockNumber />
          </div>
        )}

        {/* Footer */}
        <footer>
          <div className="max-w-full text-white factorial-gradient-bg">
            <div className="relative flex justify-between max-w-5xl px-10 py-6 mx-auto mt-4 text-center ">
              {/* logo */}
              <div className="w-48 text-left">
                <Image
                  src={BrandName}
                  alt="brand name"
                  width={110}
                  height={40}
                />
                <div className="text-sm text-left opacity-80">
                  Factorial enables developers to build DeFi apps with a shorter
                  codebase and mature/grow/accelerate their ecosystem more
                  effectively.
                </div>
              </div>

              <div className="flex pt-3 space-x-20 text-sm text-left ">
                {/* links */}
                <div>
                  <div className="mb-3 font-bold">USEFUL LINKS </div>
                  <div className="flex flex-col space-y-3 transition-opacity ">
                    <Link
                      href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
                      passHref
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer hover:opacity-100"
                        className="opacity-70 hover:opacity-100"
                      >
                        Docs
                      </a>
                    </Link>
                    <Link
                      href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
                      passHref
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100"
                      >
                        Github
                      </a>
                    </Link>
                  </div>
                </div>

                {/* social */}
                <div>
                  <div className="mb-3 font-bold">SOCIAL </div>
                  <div className="flex flex-col space-y-3 transition-opacity ">
                    <Link
                      href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
                      passHref
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100"
                      >
                        Twitter
                      </a>
                    </Link>
                    <Link
                      href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
                      passHref
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100"
                      >
                        Telegram
                      </a>
                    </Link>
                    <Link
                      href="https://factorial-1.gitbook.io/factorial/getting-started/readme"
                      passHref
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100"
                      >
                        Discord
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-center transition-opacity space-x-9">
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
            </div> */}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
