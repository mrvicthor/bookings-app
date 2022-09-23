import { Table, Search } from "@/components/index";
import Link from "next/link";
import { Booking } from "@/models/booking";
import { requireAuth } from "@/common/requireAuth";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";

export const getServerSideProps = requireAuth(async (ctx) => {
  return {
    props: {},
  };
});

const Bookings = () => {
  const { data }: any = trpc.useQuery(["bookings.getAll"]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data: session }: any = useSession();

  useEffect(() => {
    if (!data?.length) return;
    setBookings(() => [...data]);
    console.log(bookings);
    console.log(data);
  }, [session, data]);
  return (
    <div className="py-12">
      <div className="md:max-w-[1040px] md:mx-auto space-y-2 md:px-5">
        <div className="flex items-center gap-8">
          <Search />
          <h1 className="text-center font-semibold text-2xl">Bookings</h1>
          <Link href="/createBooking">
            <a className="text-[#8C948C]  hover:text-white hover:bg-[#8C948C] border border-[#8C948C] px-4 py-3 rounded ml-auto">
              Create New Booking
            </a>
          </Link>
        </div>

        <div className="pb-4 w-full">
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
                bookings={bookings}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
