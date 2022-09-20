import { Path, UseFormRegister } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

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

type ModalProps = {
  label: Path<FormInput>;
  register: UseFormRegister<FormInput>;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ label, register, toggleModal }: ModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="md:max-w-[740px] pt-20 md:mx-auto px-4">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-center items-center gap-4"
          >
            <span
              className="font-bold ml-auto cursor-pointer"
              onClick={() => toggleModal(false)}
            >
              <MdClose color="red" size={25} />
            </span>
            <textarea
              placeholder="Enter a description..."
              className="w-full rounded px-5 py-2"
              {...register(label)}
              rows={5}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Modal;
