import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import NextError from "next/error";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  DropdownList,
  Modal,
  EditInputField,
  EditDefaultInputField,
  EditSelectField,
} from "@/components/index";
import { Address } from "@/models/address";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { trpc } from "./../../../utils/trpc";
import React, { useEffect, useState } from "react";
import useAutoComplete from "@/hooks/useAutoComplete";

type EditFormInput = {
  "First Name": string;
  "Last Name": string;
  Email: string;
  "Phone Number": string;
  Street: string;
  City: string;
  "Post Code": string;
  Fault: string;
  "Engineer Report": string;
  Product: string;
  "Item Model": string;
  "Serial Number": string;
  Brand: string;
  "Hardware Install": string;
  "Software Install": string;
  Deposit: number;
  Cost: number;
};

const EditBooking = () => {
  const notify = () => toast("Updated booking successfully");
  const [query, setQuery] = useState<string>("");
  const debounceValue = useAutoComplete(query);
  const [selected, setSelected] = useState<Address>();
  const [options, setOptions] = useState<Address[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const router = useRouter();
  const { handleSubmit, register } = useForm<EditFormInput>();
  const id = parseInt(useRouter().query.id as string, 10);
  const editBooking = trpc.useQuery(["bookings.byId", { id }]);
  const list = trpc.useQuery(["bookings.getAll"]);
  const updateMutation = trpc.useMutation(["bookings.updateBooking"], {
    onSuccess: () => {
      notify();
      list.refetch();
      router.push("/bookings");
    },
  });

  console.log(editBooking);

  useEffect(() => {
    if (!debounceValue) return;
    const getAddress = async () => {
      const response = await fetch(
        `https://ws.postcoder.com/pcw/PCWZ8-ER2SV-9BN5Q-YU2H4/address/uk/${debounceValue}`
      );
      if (!response.ok) setIsHidden(true);
      const result = await response.json();
      console.log(result);
      setOptions(() => [...result]);
      if (selected == null) {
        return;
      } else {
        setOptions([]);
      }
    };
    getAddress();
  }, [debounceValue, selected]);

  const handleHidden = () => setIsHidden(!isHidden);

  if (editBooking.error) {
    return (
      <NextError
        title={editBooking.error.message}
        statusCode={editBooking.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (editBooking.status !== "success") {
    return <>Loading...</>;
  }
  const { data } = editBooking;
  const {
    firstName,
    lastName,
    brand,
    city,
    cost,
    deposit,
    email,
    hardwareInstallation,
    item,
    itemModel,
    phone,
    serialNumber,
    softwareInstallation,
    street,
    engineerReport,
    postalCode,
    fault,
  } = data;

  const onUpdate: SubmitHandler<EditFormInput> = (data) => {
    updateMutation.mutate({
      firstName: data["First Name"],
      lastName: data["Last Name"],
      email: data["Email"],
      phone: data["Phone Number"],
      street: data.Street,
      city: data.City,
      postalCode: data["Post Code"],
      fault: data.Fault,
      engineerReport: data["Engineer Report"],
      item: data.Product,
      itemModel: data["Item Model"],
      serialNumber: data["Serial Number"],
      brand: data.Brand,
      hardwareInstallation: data["Hardware Install"],
      softwareInstallation: data["Software Install"],
      deposit: data["Deposit"] ? Number(data["Deposit"]) : Number(deposit),
      cost: Number(data["Cost"]),
      isDone: false,
      id,
    });
  };
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#304352] to-[#d7d2cc] py-10 ">
      <ToastContainer />
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
          className="booking  max-w-4xl min-h-[80vh] px-6 py-4 "
        >
          <form className="space-y-3">
            <h1 className="text-center  text-2xl font-bold">Edit Booking</h1>

            <div className="flex gap-8">
              <EditInputField
                label="First Name"
                register={register}
                required
                defaultValue={firstName}
              />

              <EditInputField
                label="Last Name"
                register={register}
                required
                defaultValue={lastName}
              />
            </div>
            <div className="flex gap-8">
              <EditInputField
                label="Phone Number"
                register={register}
                required
                defaultValue={phone}
              />
              <EditInputField
                label="Email"
                register={register}
                required
                defaultValue={email}
              />
              <EditInputField
                label="Serial Number"
                register={register}
                required
                defaultValue={serialNumber}
              />
            </div>

            <div className="flex gap-8">
              <EditInputField
                label="Street"
                register={register}
                required
                defaultValue={street}
              />
              <EditInputField
                label="City"
                register={register}
                required
                defaultValue={city}
              />
              <EditInputField
                label="Post Code"
                register={register}
                required
                defaultValue={postalCode}
              />
            </div>
            <div className="flex gap-8">
              <EditInputField
                label="Fault"
                register={register}
                required
                defaultValue={fault}
              />
              <EditInputField
                label="Engineer Report"
                register={register}
                required
                defaultValue={engineerReport}
              />
            </div>
            <div className="flex gap-8">
              <EditInputField
                label="Hardware Install"
                register={register}
                required
                defaultValue={
                  hardwareInstallation == null
                    ? "No hardware install required"
                    : hardwareInstallation
                }
              />
              <EditInputField
                label="Software Install"
                register={register}
                required
                defaultValue={
                  softwareInstallation == null
                    ? "No software install required"
                    : softwareInstallation
                }
              />
            </div>
            <div className="flex items-center justify-center gap-8">
              <EditSelectField
                label="Brand"
                register={register}
                defaultValue={brand}
                required
                lists={[
                  "Apple",
                  "Acer",
                  "Asus",
                  "Dell",
                  "Huawei",
                  "HP",
                  "Lenovo",
                  "Microsoft",
                  "Samsung",
                  "Toshiba",
                  "Zenbook",
                ]}
              />
              <EditSelectField
                label="Product"
                register={register}
                required
                defaultValue={item}
                lists={[
                  "Laptop",
                  "Desktop",
                  "MacBook Pro",
                  "MacBook Air",
                  "iPhone",
                  "Android",
                  "Tablet",
                  "External Hard-Drive",
                ]}
              />
              <EditInputField
                label="Item Model"
                register={register}
                required
                defaultValue={itemModel}
              />
            </div>
            <div className="flex gap-8">
              <EditInputField
                label="Deposit"
                register={register}
                required={false}
                defaultValue={deposit === null ? 0 : deposit}
              />
              <EditInputField
                label="Cost"
                register={register}
                required
                defaultValue={cost}
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit(onUpdate)}
              className="w-[100%] bg-[#048444] rounded py-2 font-medium text-white cursor-pointer hoverAnimation relative z-[1]"
            >
              Update
            </button>
          </form>
          <div className="mt-4">
            <Button
              value="Back"
              styles="border border-black hover:bg-black hover:text-white w-[100%] ease-in duration-300 rounded py-2"
              handleClick={() => router.push("/dashboard")}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EditBooking;
