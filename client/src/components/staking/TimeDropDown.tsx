import { useState } from "react";
import ArrowDownIcon from "../shared/icons/ArrowDownIcon";

const TimeDropDown = () => {
  const items = [
    ['48h', '20%'],
    ['64h', '22%'],
    ['82h', '23%'],
    ['120h', '24%'],
    ['240h', '27%'],
  ];

  const [value, setValue] = useState(items[0]);
  const [open, setOpen] = useState(false);

  const handleChange = (value: string[]) => {
    setValue(value);
    setOpen(false);
  }

  return (
    <div className="px-2 md:px-4 md:py-2 my-3 bg-[#272727] rounded-lg">
      <div className="flex justify-between items-center p-1 cursor-pointer" onClick={() => setOpen(!open)}>
        <h1 className="text-xl md:text-3xl text-center">{value[0]}</h1>
        <p className="text-lg md:text-2xl text-[#565656]">{value[1]}</p>
        <ArrowDownIcon />
      </div>

      <div className={`${open ? 'flex' : 'hidden'} flex-col`}>
        {
          items.map((item: string[], index: number) => (
            <div key={index} className="flex justify-between items-center p-1 rounded-md cursor-pointer transition-all hover:bg-black" onClick={() => handleChange(item)}>
              <h1 className="text-xl md:text-3xl text-center">{item[0]}</h1>
              <p className="text-lg md:text-2xl text-[#565656]">{item[1]}</p>
              <span className="w-10 h-10" />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default TimeDropDown;