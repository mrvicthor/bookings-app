import { Booking } from "@/models/booking";
import { capitalizeFirstLetter } from "@/hooks/capitalize";
import { BiDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import { useCallback } from "react";
import { FaEdit } from "react-icons/fa";
interface Props {
  names: string[];
  bookings: Booking[];
}

const Table = ({ names, bookings }: Props) => {
  const trimString = (text: string) => {
    return text?.length > 8 ? text.substr(0, 8 - 1) + "..." : text;
  };
  const list = trpc.useQuery(["bookings.getAll"]);
  const deleteOneMutation = trpc.useMutation(["bookings.deleteOne"], {
    onSuccess: () => {
      list.refetch();
      console.log("Delete successful");
    },
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

  const { data: session }: any = useSession();
  const router = useRouter();

  return bookings.length === 0 ? (
    <h2 className="text-[#8C948C] text-center py-2 text-lg">
      There is no booking to display
    </h2>
  ) : (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          {names.map((name, index) => (
            <th
              key={index}
              className=" text-left py-3 px-3 uppercase font-semibold text-sm"
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bookings?.map((booking) => (
          <tr key={booking.id}>
            <td className=" text-left py-3 px-4">{booking.id}</td>
            <td className=" text-left py-3 px-4">{booking.author.username}</td>
            <td className=" text-left py-3 px-4">
              {capitalizeFirstLetter(booking.firstName)}
            </td>
            <td className=" text-left py-3 px-4">
              {capitalizeFirstLetter(booking.lastName)}
            </td>
            <td className="text-left py-3 px-4">{booking.item}</td>
            <td className="text-left py-3 px-4">{trimString(booking.fault)}</td>
            <td className="text-left py-3 px-4">
              {trimString(booking.engineerReport)}
            </td>
            <td className="text-left py-3 px-2">
              £ {booking.deposit + booking.cost}
            </td>
            <td className="text-left py-3 px-4">
              <button
                onClick={() => {
                  router.push({
                    pathname: `/booking/[id]`,
                    query: { id: booking.id },
                  });
                }}
                className="flex items-center gap-2 bg-[#2304FB] px-2 py-1 rounded text-white hover:scale-110 hover:bg-[#042444] transition duration-300 ease-out hover:ease-in"
              >
                {" "}
                <BiDetail /> Details
              </button>
            </td>
            <td className="text-left py-3 px-4">
              <button
                onClick={() => {
                  router.push({
                    pathname: `/booking/edit/[id]`,
                    query: { id: booking.id },
                  });
                }}
                className="flex items-center text-sm gap-2 bg-[#8C948C] px-2 py-1 rounded text-white hover:scale-110 hover:bg-black transition duration-300 ease-out hover:ease-in"
              >
                {" "}
                <FaEdit /> Edit
              </button>
            </td>
            {session?.user.role === "ADMIN" && (
              <td className="text-left py-3 px-4">
                <button
                  onClick={() => deleteBooking(booking)}
                  className="flex items-center gap-2 bg-[#EB1018] px-2 py-1 rounded text-white hover:scale-110 hover:bg-[#8C0C0C] transition duration-300 ease-out hover:ease-in"
                >
                  <MdDelete /> Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
