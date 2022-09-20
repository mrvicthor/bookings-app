import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import {
  Button,
  DropdownList,
  Modal,
  InputField,
  SelectField,
  DefaultInputField,
} from "@/components/index";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import useAutoComplete from "@/hooks/useAutoComplete";
import { Address } from "@/models/address";
import { FcCheckmark } from "react-icons/fc";

type FormInput = {
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
  authorId: string;
};

const CreateBooking = () => {
  const notify = () => toast("Booking created successfully");
  const { data: session }: any = useSession();
  const router = useRouter();
  const list = trpc.useQuery(["bookings.getAll"]);
  const { handleSubmit, register } = useForm<FormInput>();
  const [query, setQuery] = useState<string>("");
  const [options, setOptions] = useState<Address[]>([]);
  const [selected, setSelected] = useState<Address>();
  const [showHardwareModal, setShowHardwareModal] = useState<boolean>(false);
  const [showSoftwareModal, setShowSoftwareModal] = useState<boolean>(false);
  const debounceValue = useAutoComplete(query);
  console.log(debounceValue);

  const [isHidden, setIsHidden] = useState<boolean>(false);

  const insertMutation = trpc.useMutation(["bookings.insertOne"], {
    onSuccess: () => {
      notify();
      list.refetch();
      router.push("/bookings");
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    insertMutation.mutate({
      firstName: data["First Name"],
      lastName: data["Last Name"],
      email: data.Email,
      phone: data["Phone Number"],
      street: data.Street,
      city: data.City,
      postalCode: data["Post Code"],
      fault: data.Fault,
      engineerReport: data["Engineer Report"],
      item: data.Product,
      itemModel: data["Item Model"],
      brand: data.Brand,
      hardwareInstallation: data["Hardware Install"],
      softwareInstallation: data["Software Install"],
      deposit: data["Deposit"],
      cost: data["Cost"],
      serialNumber: data["Serial Number"],
      authorId: session.user.id,
      isDone: false,
    });
  };

  const handleHidden = () => setIsHidden(!isHidden);

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
            <h1 className="text-center  text-2xl font-bold">Booking Form</h1>

            <div className="flex gap-8">
              <InputField label="First Name" register={register} required />

              <InputField label="Last Name" register={register} required />
            </div>
            <div className="flex gap-8">
              <InputField label="Phone Number" register={register} required />
              <InputField label="Email" register={register} required />
              <InputField label="Serial Number" register={register} required />
            </div>

            <div className="flex gap-8">
              <div className="flex flex-col w-[100%]">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter street or post code..."
                  className="w-[100%] rounded py-2 px-6"
                />
                {isHidden && (
                  <p className="text-red-600">
                    Address not found, enter manually...
                  </p>
                )}
                {!options.length ? null : (
                  <DropdownList
                    results={options}
                    toggleDisplay={handleHidden}
                    setSelected={setSelected}
                  />
                )}
                {selected && (
                  <div className="flex gap-8 mt-1">
                    <DefaultInputField
                      defaultValue={selected.premise + ", " + selected.street}
                      label="Street"
                      register={register}
                    />
                    <DefaultInputField
                      defaultValue={selected.posttown}
                      label="City"
                      register={register}
                    />
                    <DefaultInputField
                      defaultValue={selected.postcode}
                      label="Post Code"
                      register={register}
                    />
                  </div>
                )}
              </div>
              {isHidden && (
                <>
                  <InputField label="Street" register={register} required />
                  <InputField label="City" register={register} required />
                  <InputField label="Post Code" register={register} required />
                </>
              )}
            </div>
            <div className="flex gap-8">
              <InputField label="Fault" register={register} required />
              <InputField
                label="Engineer Report"
                register={register}
                required
              />
              <SelectField
                label="Product"
                register={register}
                required
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

              <InputField label="Item Model" register={register} required />
            </div>
            <div className="flex items-center justify-center gap-8">
              <SelectField
                label="Brand"
                register={register}
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
              <div
                onClick={() => setShowHardwareModal(!showHardwareModal)}
                className="h-[100%] mt-5 border border-white w-72 cursor-pointer text-white hover:border-black hover:text-black text-center py-2 rounded"
              >
                Hardware Install ? {showHardwareModal && <FcCheckmark />}
              </div>
              {showHardwareModal && (
                <Modal
                  label="Hardware Install"
                  register={register}
                  toggleModal={() => setShowHardwareModal(false)}
                />
              )}
              <div
                onClick={() => setShowSoftwareModal(!showSoftwareModal)}
                className="h-[100%] mt-5 py-2 w-72 border border-white cursor-pointer text-white hover:border-black hover:text-black rounded text-center"
              >
                Software Install ? {showSoftwareModal && <FcCheckmark />}
              </div>
              {showSoftwareModal && (
                <Modal
                  label="Software Install"
                  register={register}
                  toggleModal={() => setShowSoftwareModal(false)}
                />
              )}
            </div>
            <div className="flex gap-8">
              <InputField label="Deposit" register={register} />
              <InputField label="Cost" register={register} required />
            </div>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-[100%] bg-[#048444] rounded py-2 font-medium text-white cursor-pointer hoverAnimation relative z-[1]"
            >
              Submit
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

export default CreateBooking;
