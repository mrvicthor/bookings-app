import { Address } from "@/models/address";
interface DropdownProps {
  results: Address[];
  toggleSelect: () => void;
}

const DropdownList = ({ results, toggleSelect }: DropdownProps) => {
  return (
    <ul className="my-2  divide-y  bg-gradient-to-r from-cyan-500 to-blue-500 rounded overflow-y-scroll h-[200px]">
      {results.map((result, index) => (
        <li
          className="py-1 px-3 text-white hover:text-black cursor-pointer"
          key={index}
          onClick={() => {
            toggleSelect;
            console.log(result);
          }}
        >
          {result.summaryline}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
