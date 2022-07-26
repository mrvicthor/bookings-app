import { trpc } from "@/utils/trpc";

const Booking = () => {
  const { data: bookings } = trpc.useQuery(["bookings.getAll"]);

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
                {booking.hardwareInstallation + booking.softwareInstallation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
