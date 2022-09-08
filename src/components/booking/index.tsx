import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import { Booking } from "@/models/booking";
import { Table } from "@/components/index";
import { useSession } from "next-auth/react";

const Booking = () => {
  const { data }: any = trpc.useQuery(["bookings.getAll"]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data: session }: any = useSession();

  useEffect(() => {
    if (!data?.length) return;
    setBookings(() => [...data]);
    console.log(bookings);
    console.log(data);
  }, [data]);

  return (
    <div className="pb-4 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        {session?.user.role === "ADMIN" ? (
          <Table
            names={[
              "S/N",
              "Cashier Name",
              "First Name",
              "Last Name",
              "Item",
              "Fault",
              "Comment",
              "Repair Cost",
              "",
              "",
            ]}
            bookings={bookings}
          />
        ) : (
          <Table
            names={[
              "S/N",
              "Cashier Name",
              "First Name",
              "Last Name",
              "Item",
              "Fault",
              "Comment",
              "Repair Cost",
              "",
            ]}
            bookings={bookings}
          />
        )}
      </div>
    </div>
  );
};

export default Booking;
