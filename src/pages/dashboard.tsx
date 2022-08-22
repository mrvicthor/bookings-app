import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { requireAuth } from "@/common/requireAuth";
import { Button } from "@/components/index";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard = () => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const [toggleCreate, setToggleCreate] = useState<boolean>(false);
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <section className="py-10">
      <div className="flex justify-between lg:max-w-[1140px] lg:mx-auto lg:px-5">
        <h1 className="text-xl text-[#8C948C]">Welcome {session.user.email}</h1>
        {session.user.role === "ADMIN" && (
          <Button
            value={`Admin`}
            styles="lg:px-5 border border-[#0404FC] hover:bg-[#0404FC] hover:text-white ease-in duration-300"
            handleClick={() => router.push("/admin")}
          />
        )}
      </div>
      <article className="lg:max-w-[1140px] lg:mx-auto lg:px-5 mt-4">
        {toggleCreate ? (
          <Button
            value="Create Booking"
            styles="lg:px-5 border border-[#0404FC] hover:bg-[#0404FC] hover:text-white"
            handleClick={() => router.push("/createForm")}
          />
        ) : (
          <>
            <p className="text-3xl">Want to create a new booking?</p>
            <div className="flex gap-6 mt-4">
              <Button
                value="Yes"
                styles="lg:px-5 border border-[#0404FC] hover:bg-[#0404FC] hover:text-white"
                handleClick={() => setToggleCreate(true)}
              />
              <Button
                value="No"
                styles="lg:px-5 border border-[#0404FC] hover:bg-[#0404FC] hover:text-white"
                handleClick={() => setToggleCreate(false)}
              />
            </div>
          </>
        )}
      </article>
    </section>
  );
};

export default Dashboard;
