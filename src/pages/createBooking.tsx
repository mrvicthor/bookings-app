import { useForm, useController, UseControllerProps } from "react-hook-form";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

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
    <div className="bg-[#C8C8C8] py-10">
      <h1 className="text-center  text-2xl font-bold">Booking Form</h1>
      <form
        className="mx-auto max-w-5xl px-6 py-4 space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        </div>
        <div className="flex gap-8">
          <InputField
            control={control}
            name="Email"
            rules={{ required: true }}
          />
          <InputField
            control={control}
            name="Phone"
            rules={{ required: true }}
          />
        </div>
        <div>
          <InputField
            name="Street"
            control={control}
            rules={{ required: true }}
          />
        </div>
        <div className="flex gap-8">
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
        </div>
        <div className="flex gap-8">
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
          <InputField
            name="Brand"
            control={control}
            rules={{ required: true }}
          />
        </div>
        <div className="flex gap-8">
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

        <button
          type="submit"
          className="w-[100%] bg-[#048444] rounded py-2 font-medium text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBooking;
