import { Booking } from "@/components/index";

const Bookings = () => {
  return (
    <div className="py-4 space-y-4">
      <h1 className="text-center font-semibold text-lg ">Bookings</h1>
      <div className="mx-auto w-[80%]">
        <Booking />
      </div>
    </div>
  );
};

export default Bookings;
