import Image from "next/image";

export default function OnePager({ response }: { response: any }) {
  return (
    <>
      <div className="mx-auto w-[800px] border-factorialBlue border-2 my-8">
        <Image src="one-pager.png" alt="one pager" width={800} height={1200} />
      </div>
    </>
  );
}
