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
    <div className="py-4 space-y-1 flex flex-col justify-center items-center">
      <div className="flex items-center gap-8 md:w-[1040px] px-12">
        <div />
        <h1 className="text-center font-semibold text-2xl">Bookings</h1>
        <Link href="/createForm">
          <a className="text-[#8C948C]  hover:text-white hover:bg-[#8C948C] border border-[#8C948C] px-4 py-3 rounded ml-auto">
            Create New Booking
          </a>
        </Link>
      </div>

      <Booking />
    </div>
  );
};

export default Bookings;
