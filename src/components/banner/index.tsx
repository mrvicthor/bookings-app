import { Button } from "@/components/index";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";

const Banner = () => {
  const router = useRouter();
  useEffect(() => {}, []);
  return (
    <section className="grid grid-cols-2 justify-between gap-8 lg:max-w-[1040px] lg:mx-auto py-16 px-4">
      <div className="space-y-5 py-16 px-4">
        <div className="flex flex-col ">
          <h1
            data-splitting
            className="text-5xl uppercase font-semibold text-red-600"
          >
            faulty <span className="text-black">computer</span> ?
          </h1>
          <h2 className="text-5xl uppercase font-semibold text-black">
            we can <span className="text-[#0404FC]">fix</span> it...
          </h2>
        </div>
        <p className="text-sm text-[#8C948C]">
          Your one stop solution for all your computers and laptop issues
        </p>
        <div className="">
          <Button
            value="BOOK A REPAIR"
            styles="mt-5 h-[50px] lg:px-[50px] button-86 rounded text-white"
            handleClick={() => router.push("/login")}
          />
        </div>
      </div>
      <div className="flex items-center justify-center overflow-hidden">
        <div className=" relative min-h-[350px] rounded-lg px-8 py-6  helper self-center md:min-w-[400px]">
          <Image
            src="/nice-bg.jpg"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
