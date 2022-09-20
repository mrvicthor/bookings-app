import { Path, UseFormRegister } from "react-hook-form";

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

type InputProps = {
  label: Path<FormInput>;
  register: UseFormRegister<FormInput>;
  required?: boolean;
};

type DefaultProps = {
  label: Path<FormInput>;
  register: UseFormRegister<FormInput>;
  defaultValue: string;
};

type SelectProps = {
  label: Path<FormInput>;
  register: UseFormRegister<FormInput>;
  required: boolean;
  lists: string[];
};

export const InputField = ({ label, register, required }: InputProps) => {
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

export const DefaultInputField = ({
  label,
  register,
  defaultValue,
}: DefaultProps) => {
  return (
    <div className="flex flex-col w-[100%]">
      <label htmlFor={label}>{label}</label>
      <input
        {...register(label)}
        defaultValue={defaultValue}
        className="w-[100%] rounded py-2 px-6"
      />
    </div>
  );
};

export const SelectField = ({
  label,
  required,
  register,
  lists,
}: SelectProps) => {
  return (
    <div className="flex flex-col w-[100%]">
      <label htmlFor={label}>{label}</label>
      <select
        className="w-[100%] rounded py-[11px] px-6 cursor-pointer"
        {...register(label, { required })}
      >
        {lists.map((list, index) => (
          <option key={index} value={list}>
            {list}
          </option>
        ))}
      </select>
    </div>
  );
};
