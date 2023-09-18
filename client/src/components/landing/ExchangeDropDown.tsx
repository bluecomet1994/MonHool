import { useState } from "react";
import ArrowDownIcon from "@/components/shared/icons/ArrowDownIcon";
import { DropDownProps } from "@/types/props";
import { CurrencyType } from "@/types/components";

const ExchangeDropDown = (props: DropDownProps) => {
  const { list, value, setter } = props;

  const [open, setOpen] = useState(false);

  const toggleDropDown = () => {
    setOpen(!open);
  }

  const handleChange = (value: CurrencyType) => {
    setter(value);
    setOpen(false);
  }

  return (
    <div className=" relative cursor-pointer">
      <div className="flex justify-center items-center" onClick={toggleDropDown}>
        {value.unit}
        <ArrowDownIcon />
      </div>

      <div className={`${open ? 'flex' : 'hidden'} flex-col absolute top-full left-0 w-full bg-gray-500 border-[1px] border-gray-400 rounded-md p-2 z-10`}>
        {
          list.map((item: CurrencyType) => (
            <h1
              key={item.id}
              className="hover:text-green-300 transition-all duration-300"
              onClick={() => handleChange(item)}
            >{item.unit}</h1>
          ))
        }
      </div>
    </div>
  );
}

export default ExchangeDropDown;