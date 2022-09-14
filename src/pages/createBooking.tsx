import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { Button } from "@/components/index";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useAutoComplete from "@/hooks/useAutoComplete";

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
  "Hardware Install": number;
  "Software Install": number;
  authorId: string;
};

type InputProps = {
  label: Path<FormInput>;
  register: UseFormRegister<FormInput>;
  required: boolean;
};

const InputField = ({ label, register, required }: InputProps) => {
  return (
    <div className="flex flex-col w-[100%]">
      <label htmlFor={label}>{label}</label>
      <input
        {...register(label, { required })}
        id={label}
        placeholder={label}
        className="w-[100%] rounded py-2 px-6"
      />
    </div>
  );
};

const CreateBooking = () => {
  const notify = () => toast("Booking created successfully");
  const { data: session }: any = useSession();
  const router = useRouter();
  const list = trpc.useQuery(["bookings.getAll"]);
  const { handleSubmit, register } = useForm<FormInput>();
  const [query, setQuery] = useState<string>("");
  const debounceValue = useAutoComplete(query);
  console.log(debounceValue);

  const [selected, setSelected] = useState<boolean>(false);

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
      hardwareInstallation: Number(data["Hardware Install"]),
      softwareInstallation: Number(data["Software Install"]),
      serialNumber: data["Serial Number"],
      authorId: session.user.id,
      isDone: false,
    });
  };

  useEffect(() => {
    if (!debounceValue) return;
    const getAddress = async () => {
      const response = await fetch(
        `https://ws.postcoder.com/pcw/PCWZ8-ER2SV-9BN5Q-YU2H4/${debounceValue}`
      );
      const result = await response.json();
      console.log(result);
    };
    getAddress();
  }, [debounceValue]);

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
              </div>
              {selected && (
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
              <InputField label="Product" register={register} required />
              <InputField label="Item Model" register={register} required />
            </div>
            <div className="flex gap-8">
              <InputField label="Brand" register={register} required />
              <InputField
                label="Hardware Install"
                register={register}
                required
              />
              <InputField
                label="Software Install"
                register={register}
                required
              />
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
