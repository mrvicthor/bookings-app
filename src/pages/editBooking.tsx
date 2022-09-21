import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  DropdownList,
  Modal,
  InputField,
  SelectField,
  DefaultInputField,
} from "@/components/index";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

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

const EditBooking = () => {
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
                {!isHidden || !options.length ? null : (
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
              <InputField
                label="Deposit"
                register={register}
                required={false}
              />
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

export default EditBooking;