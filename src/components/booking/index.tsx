import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { AlertMessage } from "@/components/index";
import { BiDetail } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";

const Booking = () => {
  const router = useRouter();
  const { data: bookings } = trpc.useQuery(["bookings.getAll"]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const toggleMessage = () => setShowMessage(false);

  // const message = setTimeout(() => {
  //   <AlertMessage toggleMessage={toggleMessage} />;
  // }, 1500);
  return (
    <div>
      <table className="border-collapse border border-slate-400 w-full">
        <thead>
          <tr>
            <th className="border border-slate-300  px-4 py-2">S/N</th>
            <th className="border border-slate-300 px-4 py-2">Full Name</th>
            <th className="border border-slate-300 px-4 py-2">Item</th>
            <th className="border border-slate-300 px-4 py-2">Fault</th>
            <th className="border border-slate-300 px-4 py-2">Comment</th>
            <th className="border border-slate-300 px-4 py-2">Repair Cost</th>
            <th className="border border-slate-300 px-4 py-2"></th>
            <th className="border border-slate-300 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {bookings?.map((booking) => (
            <tr key={booking.id}>
              <td className="border border-slate-300 px-4 py-2">
                {booking.id}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {booking.firstName} {booking.lastName}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {booking.item}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {booking.fault}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {booking.engineerReport}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                £ {booking.hardwareInstallation + booking.softwareInstallation}
              </td>
              <td className="border border-slate-300 px-4 py-2">
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
              <td className="border border-slate-300 px-4 py-2">
                <button className="flex items-center gap-2 bg-[#EB1018] px-4 py-1 rounded text-white hover:scale-110 hover:bg-[#8C0C0C] transition duration-300 ease-out hover:ease-in">
                  <MdDelete /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
