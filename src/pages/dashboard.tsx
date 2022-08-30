import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { requireAuth } from "@/common/requireAuth";
import { Button, Table } from "@/components/index";
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineAccountBook } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { ProgressCircle } from "@/components/index";
import { Booking } from "@/models/booking";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard = () => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const { data } = trpc.useQuery(["bookings.getAll"]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!data?.length) return;
    setBookings(() => [...bookings, ...data]);
    console.log(session);
  }, [session, data, bookings]);

  return (
    <section className="py-10">
      <div className=" md:px-5 md:max-w-[1040px] md:mx-auto">
        <h1 className="text-2xl">Dashbord</h1>

        <div className="flex justify-between ">
          <h2 className="text-xl text-[#8C948C]">
            Welcome {session?.user.email}
          </h2>
          <div className="flex gap-4">
            <Button
              value="Create Booking"
              styles="lg:px-5 text-[#8C948C] border border-[#8C948C] hover:text-white hover:bg-[#8C948C] ease-in duration-300"
              handleClick={() => router.push("/createBooking")}
            />
            {session?.user.role === "ADMIN" && (
              <Button
                value={`Admin`}
                styles="lg:px-5 text-[#0404FC] border border-[#0404FC] hover:bg-[#0404FC] hover:text-white ease-in duration-300"
                handleClick={() => router.push("/admin")}
              />
            )}
          </div>
        </div>
        <article className="mt-4 ">
          <div className=" flex gap-8">
            <div className="dashboardCard flex justify-center items-center gap-6 border rounded-lg px-4">
              <div className="flex-[50%] space-y-2">
                <i className="border cursor-pointer flex justify-center  items-center rounded-full border-[#0404FC] hover:bg-[#0404FC] ease-in duration-300 h-8 w-8">
                  <FcSalesPerformance />
                </i>
                <h4 className="text-lg font-semibold">Total Sales</h4>
                <p className="text-2xl font-bold">£30,000</p>
                <h6 className="text-[#8C948C] text-sm">Last 24 Hours</h6>
              </div>
              <ProgressCircle value={80} />
            </div>
            <div className="dashboardCard flex justify-center items-center gap-6 border rounded-lg  px-4">
              <div className="space-y-2 flex-[50%]">
                <i className="border cursor-pointer flex justify-center items-center rounded-full border-[#0404FC] hover:bg-[#0404FC] ease-in duration-300 h-8 w-8">
                  <AiOutlineAccountBook />
                </i>
                <h4 className="text-lg font-semibold">Bookings</h4>
                <p className="text-2xl font-bold">24</p>
                <h6 className="text-[#8C948C] text-sm">Last 24 Hours</h6>
              </div>
              <ProgressCircle value={65} />
            </div>
            <div className="dashboardCard flex justify-center items-center gap-6 border rounded-lg px-4">
              <div className="space-y-2 flex-[50%]">
                <i className="border cursor-pointer flex justify-center items-center rounded-full border-[#0404FC] hover:bg-[#0404FC] ease-in duration-300 h-8 w-8">
                  <FaUsers />
                </i>
                <h4 className="text-lg font-semibold">Customers</h4>
                <p className="text-2xl font-bold">20</p>
                <h6 className="text-[#8C948C] text-sm">Last 24 Hours</h6>
              </div>
              <ProgressCircle value={40} />
            </div>
          </div>
          <div className="mt-4">
            <Table
              names={[
                "S/N",
                "Username",
                "First Name",
                "Last Name",
                "Item",
                "Fault",
                "Report",
                "Price",
                "",
              ]}
              bookings={bookings}
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
