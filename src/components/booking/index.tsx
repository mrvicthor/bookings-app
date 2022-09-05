import { trpc } from "@/utils/trpc";
import { useState, useCallback, useEffect } from "react";

import { BiDetail } from "react-icons/bi";

import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "@/hooks/capitalize";
import { Booking } from "@/models/booking";
import { Table } from "@/components/index";

const Booking = () => {
  const router = useRouter();
  const { data } = trpc.useQuery(["bookings.getAll"]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const toggleMessage = () => setShowMessage(false);
  const deleteOneMutation = trpc.useMutation(["bookings.deleteOne"], {
    onSuccess: () => console.log("Delete successful"),
  });

  const deleteBooking = useCallback(
    (item: Booking) => {
      if (bookings?.length) {
        deleteOneMutation.mutate({
          id: item.id,
        });
      }
    },
    [bookings, deleteOneMutation]
  );

  useEffect(() => {
    if (!data?.length) return;
    setBookings(() => [...data]);
    console.log(bookings);
  }, [data]);

  return (
    <div className="pb-4 w-full flex justify-center items-center">
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
