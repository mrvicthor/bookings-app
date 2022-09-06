import { trpc } from "@/utils/trpc";
import { useState, useEffect } from "react";
import { Booking } from "@/models/booking";
import { Table } from "@/components/index";

const Booking = () => {
  const { data } = trpc.useQuery(["bookings.getAll"]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!data?.length) return;
    setBookings(() => [...data]);
    console.log(bookings);
  }, [data]);

  return (
    <div className="pb-4 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <Table
          names={[
            "S/N",
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
      </div>
    </div>
  );
};

export default Booking;
