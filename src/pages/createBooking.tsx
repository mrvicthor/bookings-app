import { useForm, useController, UseControllerProps } from "react-hook-form";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import { Button } from "@/components/index";
import { AnimatePresence, motion } from "framer-motion";

type FormInput = {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Street: string;
  City: string;
  PostCode: string;
  Fault: string;
  EngineerReport: string;
  Product: string;
  ItemModel: string;
  Brand: string;
  HardwareInstall: number;
  SoftwareInstall: number;
};

const InputField = (props: UseControllerProps<FormInput>) => {
  const { field } = useController(props);
  return (
    <div className="flex flex-col w-[100%]">
      <label htmlFor={props.name}>{props.name}</label>
      <input
        {...field}
        placeholder={props.name}
        className="w-[100%] rounded py-2 px-6"
      />
    </div>
  );
};

const CreateBooking = () => {
  const router = useRouter();
  const { handleSubmit, control } = useForm<FormInput>({
    mode: "onChange",
  });

  const insertMutation = trpc.useMutation(["bookings.insertOne"], {
    onSuccess: () => {
      router.push("/bookings");

      console.log("Booking Created Successfully...");
    },
  });

  const onSubmit = (data: FormInput) => {
    insertMutation.mutate({
      firstName: data.FirstName,
      lastName: data.LastName,
      email: data.Email,
      phone: data.Phone,
      street: data.Street,
      city: data.City,
      postalCode: data.PostCode,
      fault: data.Fault,
      engineerReport: data.EngineerReport,
      item: data.Product,
      itemModel: data.ItemModel,
      brand: data.Brand,
      hardwareInstallation: Number(data.HardwareInstall),
      softwareInstallation: Number(data.SoftwareInstall),
      isDone: false,
    });
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-[#304352] to-[#d7d2cc] py-10 ">
      <AnimatePresence exitBeforeEnter>
        <motion.form
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 1 }}
          className="booking  max-w-4xl min-h-[80vh] px-6 py-4 space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center  text-2xl font-bold">Booking Form</h1>

          <div className="flex gap-8">
            <InputField
              control={control}
              name="FirstName"
              rules={{ required: true }}
            />
            <InputField
              control={control}
              name="LastName"
              rules={{ required: true }}
            />
            <InputField
              control={control}
              name="Phone"
              rules={{ required: true }}
            />
          </div>
          <div className="flex gap-8">
            <InputField
              control={control}
              name="Email"
              rules={{ required: true }}
            />
          </div>

          <div className="flex gap-8">
            <InputField
              name="Street"
              control={control}
              rules={{ required: true }}
            />
            <InputField
              name="City"
              control={control}
              rules={{ required: true }}
            />
            <InputField
              name="PostCode"
              control={control}
              rules={{ required: true }}
            />
          </div>
          <div className="flex gap-8">
            <InputField
              name="Fault"
              control={control}
              rules={{ required: true }}
            />
            <InputField
              name="EngineerReport"
              control={control}
              rules={{ required: true }}
            />
            <InputField
              name="Product"
              control={control}
              rules={{ required: true }}
            />
            <InputField
              name="ItemModel"
              control={control}
              rules={{ required: true }}
            />
          </div>
          <div className="flex gap-8">
            <InputField
              name="Brand"
              control={control}
              rules={{ required: true }}
            />
            <InputField
              name="HardwareInstall"
              control={control}
              rules={{ required: true }}
            />
            <InputField
              name="SoftwareInstall"
              control={control}
              rules={{ required: true }}
            />
          </div>
          <div className="flex gap-8">
            <Button
              value="Back"
              styles="border border-black hover:bg-black hover:text-white w-[50%] ease-in duration-300"
              handleClick={() => router.push("/dashboard")}
            />
            <button
              type="submit"
              className="w-[50%] bg-[#048444] rounded py-2 font-medium text-white hoverAnimation relative z-[1]"
            >
              Submit
            </button>
          </div>
        </motion.form>
      </AnimatePresence>
    </div>
  );
};

export default CreateBooking;
