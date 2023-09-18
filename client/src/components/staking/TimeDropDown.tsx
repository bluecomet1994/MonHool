import { useState } from "react";
import ArrowDownIcon from "@/components/shared/icons/ArrowDownIcon";
import { TimeDropDownProps } from "@/types/props";
import { TimeListType } from "@/types/components";

const TimeDropDown = (props: TimeDropDownProps) => {
  const { list, value, setter } = props;
  const [open, setOpen] = useState(false);

  const handleChange = (value: TimeListType) => {
    setter(value);
    setOpen(false);
  }

  return (
    <div className="px-2 md:px-4 md:py-2 my-3 bg-[#272727] rounded-lg">
      <div className="flex justify-between items-center p-1 cursor-pointer" onClick={() => setOpen(!open)}>
        <h1 className="text-xl md:text-3xl text-center">{value.time}h</h1>
        <p className="text-lg md:text-2xl text-[#565656]">{value.rate * 100}%</p>
        <ArrowDownIcon />
      </div>

      <div className={`${open ? 'flex' : 'hidden'} flex-col`}>
        {
          list.map((item: TimeListType) => (
            <div key={item.id} className="flex justify-between items-center p-1 rounded-md cursor-pointer transition-all hover:bg-black" onClick={() => handleChange(item)}>
              <h1 className="text-xl md:text-3xl text-center">{item.time}h</h1>
              <p className="text-lg md:text-2xl text-[#565656]">{item.rate * 100}%</p>
              <span className="w-10 h-10" />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default TimeDropDown;