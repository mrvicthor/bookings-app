import { Button } from "@/components/index";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect } from "react";

const Banner = () => {
  const router = useRouter();
  useEffect(() => {}, []);

  return (
    <section
      style={{
        backgroundImage: "url(bg-ramon.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" h-[92vh]"
    >
      <div className="grid grid-cols-2 justify-between gap-8  py-16 px-4 md:max-w-[1040px] md:mx-auto">
        <div className="space-y-5 py-16 px-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-5xl uppercase font-semibold  text-[#8C948C]">
              faulty <span className="text-white">computer</span> ?
            </h1>
            <h2 className="text-6xl font-semibold bannerAnimate text-white">
              We can <span className="text-[#0404FC]">fix</span> it...
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
          {/* <div className=" relative min-h-[350px] rounded-lg px-8 py-6  helper self-center md:min-w-[400px]">
          <Image
            src="/nice-bg.jpg"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
