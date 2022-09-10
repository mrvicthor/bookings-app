import NextError from "next/error";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { capitalizeFirstLetter } from "@/hooks/capitalize";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useCallback, useState } from "react";

const DetailsPage = () => {
  const router = useRouter();
  const id = parseInt(useRouter().query.id as string, 10);
  const bookingQuery = trpc.useQuery(["bookings.byId", { id }]);
  console.log(bookingQuery);
  const [completed, setCompleted] = useState<boolean>(false);

  const updateOneMutation = trpc.useMutation(["bookings.updateBooking"], {
    onSuccess: () => console.log("Update successful"),
  });

  const updateOne = useCallback(
    (item: any) => {
      updateOneMutation.mutate({
        ...item,
        isDone: !item.isDone,
      });
    },
    [updateOneMutation]
  );

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
  const {
    firstName,
    lastName,
    email,
    phone,
    street,
    postalCode,
    city,
    item,
    itemModel,
    brand,
    fault,
    isDone,
    hardwareInstallation,
    softwareInstallation,
    authorId,
  } = data;

  console.log(data);
  return (
    <div className="px-4 py-4">
      <div className="border mt-5 rounded-md mx-auto w-[60%] space-y-4 px-8 py-4">
        <button
          onClick={() => router.push("/bookings")}
          className="text-white bg-[#3C3C44] flex items-center gap-2 px-3 py-1 rounded hover:opacity-70"
        >
          <MdOutlineKeyboardBackspace /> Back
        </button>
        <h1 className="text-center font-semibold text-2xl">
          {capitalizeFirstLetter(firstName)} {capitalizeFirstLetter(lastName)}
        </h1>

        <div className="grid grid-cols-1 divide-y">
          <div className="grid grid-cols-2 divide-x">
            <div className=" py-2 flex flex-col items-center px-1">
              <h3 className="opacity-70 text-xs">Email:</h3>
              <p className="font-semibold text-2xl">{email}</p>
            </div>
            <div className=" py-2 flex flex-col items-center">
              <h3 className="opacity-70 text-xs">Phone Number:</h3>
              <p className="font-semibold text-2xl">{phone}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x">
            <div className="py-2 flex flex-col items-center">
              <h3 className="opacity-70 text-xs">Street:</h3>
              <p className="font-semibold text-2xl">{street}</p>
            </div>
            <div className="py-2 flex flex-col items-center">
              <h3 className="opacity-70 text-xs">City:</h3>
              <p className="font-semibold text-2xl">{city}</p>
            </div>
            <div className="py-2 flex flex-col items-center">
              <h3 className="opacity-70 text-xs">Post Code:</h3>
              <p className="font-semibold text-2xl">{postalCode}</p>
            </div>
          </div>
          <div className=" grid grid-cols-4 divide-x">
            <div className="py-2 flex flex-col items-center">
              <h3 className="opacity-70 text-xs">Product</h3>
              <p className="font-semibold text-2xl">{item}</p>
            </div>
            <div className="py-2 flex flex-col items-center">
              <h3 className="opacity-70 text-xs">Model</h3>
              <p className="font-semibold text-2xl">{itemModel}</p>
            </div>
            <div className="py-2 flex flex-col items-center">
              <h3 className="opacity-70 text-xs">Brand</h3>
              <p className="font-semibold text-2xl">{brand}</p>
            </div>
            <div className="py-2 px-2 flex flex-col items-center">
              <h3 className="opacity-70 text-xs ">Fault</h3>
              <p className="font-semibold text-2xl">{fault}</p>
            </div>
          </div>
          <div className="py-2 flex flex-col items-center">
            <h3 className="opacity-70 text-xs">Total Cost</h3>
            <p className="font-semibold text-3xl">
              £ {hardwareInstallation + softwareInstallation}
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setCompleted(!completed);
                updateOne(data);
              }}
              className={`${
                completed ? "bg-[#048444]" : "bg-[#F3D122]"
              } px-4 py-2 rounded w-full text-white`}
            >
              {completed ? "Fixed" : "Not Fixed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
