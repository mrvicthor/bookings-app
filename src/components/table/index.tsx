import { Booking } from "@/models/booking";
import { capitalizeFirstLetter } from "@/hooks/capitalize";
import { BiDetail } from "react-icons/bi";
import { useRouter } from "next/router";

interface Props {
  names: string[];
  bookings: Booking[];
}

const Table = ({ names, bookings }: Props) => {
  const router = useRouter();
  return bookings.length === 0 ? (
    <h2 className="text-[#8C948C] text-center py-2 text-lg">
      There is no booking to display
    </h2>
  ) : (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          {names.map((name) => (
            <th className=" text-left py-3 px-3 uppercase font-semibold text-sm">
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {bookings?.map((booking) => (
          <tr key={booking.id}>
            <td className=" text-left py-3 px-4">{booking.id}</td>
            <td className=" text-left py-3 px-4">
              {capitalizeFirstLetter(booking.firstName)}
            </td>
            <td className=" text-left py-3 px-4">
              {capitalizeFirstLetter(booking.lastName)}
            </td>
            <td className="text-left py-3 px-4">{booking.item}</td>
            <td className="text-left py-3 px-4">{booking.fault}</td>
            <td className="text-left py-3 px-4">{booking.engineerReport}</td>
            <td className="text-left py-3 px-4">
              £ {booking.hardwareInstallation + booking.softwareInstallation}
            </td>
            <td className="text-left py-3 px-4">
              <button
                onClick={() => {
                  router.push({
                    pathname: `/booking/[id]`,
                    query: { id: booking.id },
                  });
                }}
                className="flex items-center gap-2 bg-[#2304FB] px-4 py-1 rounded text-white hover:scale-110 hover:bg-[#042444] transition duration-300 ease-out hover:ease-in"
              >
                {" "}
                <BiDetail /> Details
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
