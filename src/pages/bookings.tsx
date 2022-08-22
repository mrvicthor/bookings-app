import { Booking } from "@/components/index";
import Link from "next/link";
import { requireAuth } from "@/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return {
    props: {},
  };
});

const Bookings = () => {
  return (
    <div className="py-4 space-y-1 lg:max-w-[1140px] lg:mx-auto">
      <div className="flex justify-between items-center gap-8">
        <div />
        <h1 className="text-center font-semibold text-2xl">Bookings</h1>
        <Link href="/createForm">
          <a className="text-blue-500 hover:text-blue-800 border px-4 py-3 rounded ">
            Create New Booking
          </a>
        </Link>
      </div>

      <Booking />
    </div>
  );
};

export default Bookings;
