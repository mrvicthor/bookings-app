import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { AlertMessage } from "@/components/index";
import { BiDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "@/hooks/capitalize";

const Booking = () => {
  const router = useRouter();
  const { data: bookings } = trpc.useQuery(["bookings.getAll"]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const toggleMessage = () => setShowMessage(false);

  // const message = setTimeout(() => {
  //   <AlertMessage toggleMessage={toggleMessage} />;
  // }, 1500);
  return (
    <div className="py-8 w-full">
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className=" text-left py-3 px-3 uppercase font-semibold text-sm">
                S/N
              </th>
              <th className=" text-left py-3 px-3 uppercase font-semibold text-sm">
                First Name
              </th>
              <th className=" text-left py-3 px-3 uppercase font-semibold text-sm">
                Last Name
              </th>
              <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                Item
              </th>
              <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                Fault
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Comment
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Repair Cost
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
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
                <td className="text-left py-3 px-4">
                  {booking.engineerReport}
                </td>
                <td className="text-left py-3 px-4">
                  £{" "}
                  {booking.hardwareInstallation + booking.softwareInstallation}
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
                <td className="text-left py-3 px-4">
                  <button className="flex items-center gap-2 bg-[#EB1018] px-4 py-1 rounded text-white hover:scale-110 hover:bg-[#8C0C0C] transition duration-300 ease-out hover:ease-in">
                    <MdDelete /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
