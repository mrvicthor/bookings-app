import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Booking } from "@/models/booking";
import { requireAuth } from "@/common/requireAuth";
import { Button, Table, ProgressCircle, Card } from "@/components/index";
import { FcSalesPerformance } from "react-icons/fc";
import { AiOutlineAccountBook } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { RiMoneyPoundCircleFill } from "react-icons/ri";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard = () => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const id = session?.user.id as string;
  const list = trpc.useQuery(["bookings.getAll"]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const getBookings = () => {
      if (!list.data?.length) return;

      setBookings(() => [...(list.data as any)]);
      let result = list.data?.filter((b) => b.authorId === id);
      setUserBookings(() => [...(result as any)]);
    };
    getBookings();
  }, [session, list.data]);

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
          <div className=" flex gap-8 overflow-hidden">
            <Card
              value={80}
              icon={<RiMoneyPoundCircleFill />}
              header="Total Sales"
              subheader="£30,000"
            />
            <Card
              value={65}
              icon={<AiOutlineAccountBook />}
              header="Bookings"
              subheader="24"
            />
            <Card
              value={40}
              icon={<FaUsers />}
              header="Customers"
              subheader="20"
            />
          </div>

          <div className="pb-4 w-full mt-6">
            <div className="shadow overflow-hidden rounded border-b border-gray-200">
              {session?.user.role === "ADMIN" ? (
                <Table
                  names={[
                    "S/N",
                    "Cashier",
                    "First Name",
                    "Last Name",
                    "Item",
                    "Fault",
                    "Comment",
                    "Cost",
                    "",
                    "",
                    "",
                  ]}
                  bookings={bookings}
                />
              ) : (
                <Table
                  names={[
                    "S/N",
                    "Cashier",
                    "First Name",
                    "Last Name",
                    "Item",
                    "Fault",
                    "Comment",
                    "Cost",
                    "",
                    "",
                  ]}
                  bookings={userBookings}
                />
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
