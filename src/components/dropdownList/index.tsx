import { Address } from "@/models/address";
import React, { useState } from "react";

interface DropdownProps {
  results: Address[];
  toggleDisplay: () => void;
  setSelected: (value: Address) => void;
}

const DropdownList = ({
  results,
  toggleDisplay,
  setSelected,
}: DropdownProps) => {
  return (
    <ul className="my-2  divide-y  bg-white rounded overflow-y-scroll h-[200px]">
      {results.map((result, index) => (
        <li
          className="py-1 px-3 text-black hover:text-[#8C948C] cursor-pointer"
          key={index}
          onClick={() => {
            toggleDisplay;
            setSelected(result);
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
