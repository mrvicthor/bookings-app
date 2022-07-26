import NextError from "next/error";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";

const DetailsPage = () => {
  const id = parseInt(useRouter().query.id as string, 10);
  const bookingQuery = trpc.useQuery(["bookings.byId", { id }]);

  if (bookingQuery.error) {
    return (
      <NextError
        title={bookingQuery.error.message}
        statusCode={bookingQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (bookingQuery.status !== "success") {
    return <>Loading...</>;
  }
  const { data } = bookingQuery;
  console.log(data);
  return (
    <div>
      <h1>Details Page</h1>
    </div>
  );
};

// export async function getStaticPaths() {
//   const bookings = trpc.useQuery(["bookings.getAll"]).data;

//   return {
//     paths: bookings?.map((booking) => {
//       return { params: { id: booking.id } };
//     }),
//     fallback: false,
//   };
// }

// export function getStaticProps({ params }: { params: { id: number } }) {
//   const { data: bookings } = trpc.useQuery(["bookings.getAll"]);

//   const booking = bookings?.filter((booking) => booking.id === params.id);

//   return {
//     props: {
//       booking,
//     },
//   };
// }
export default DetailsPage;
