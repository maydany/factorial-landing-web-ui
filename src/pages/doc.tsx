import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Exclamation from "@/styles/resources/factorial-logo.svg";
// https://beta.nextjs.org/docs/upgrade-guide#migrating-from-pages-to-app

// GO EXTERNAL LINK??

export default function Doc({ response }: { response: any }) {
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
            <button className="px-5 py-1 pt-2 mt-10 text-lg font-semibold text-white transition-opacity rounded-full bg-factorialBlue hover:opacity-90">
              GET STARTED
            </button>
          </div>

          <div className="flex justify-between mt-20 text-left">
            <div>
              <div className="mb-3 text-2xl font-semibold">Title</div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Exercitationem molestias perspiciatis laboriosam quae obcaecati!
                Molestias iure blanditiis soluta dolore, non a at quasi. Dolorum
                eaque totam nesciunt ratione reprehenderit deserunt!
              </div>
            </div>
            <div>
              <div className="mb-3 text-2xl font-semibold">Title</div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Exercitationem molestias perspiciatis laboriosam quae obcaecati!
                Molestias iure blanditiis soluta dolore, non a at quasi. Dolorum
                eaque totam nesciunt ratione reprehenderit deserunt!
              </div>
            </div>
          </div>
        </div>

        {/* Second Part */}
        <div className="relative mt-16 text-center h-44 bg-factorialBlue">
          <div>Title</div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
            dicta velit dolore illum voluptatem laborum consectetur veniam
            magnam iste. Aut dolor a expedita quaerat, eligendi ratione ducimus
            recusandae alias minus!
          </div>
        </div>
      </div>
    </>
  );
}
