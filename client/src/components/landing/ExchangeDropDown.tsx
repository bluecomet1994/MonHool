import { useState } from "react";
import ArrowDownIcon from "@/components/shared/icons/ArrowDownIcon";
import { InputEleType } from "@/types/components";

const ExchangeDropDown = (props: InputEleType) => {
  const coins: string[] = ['BTC', 'ETH', 'USDT', 'XRP', 'SOL'];

  const [open, setOpen] = useState(false);

  const toggleDropDown = () => {
    setOpen(!open);
  }

  const handleChange = (value: string) => {
    props.setter(value);
    setOpen(false);
  }

  return (
    <div className=" relative cursor-pointer">
      <div className="flex justify-center items-center" onClick={toggleDropDown}>
        {props.value}
        <ArrowDownIcon />
      </div>

      <div className={`${open ? 'flex' : 'hidden'} flex-col absolute top-full left-0 w-full bg-gray-500 border-[1px] border-gray-400 rounded-md p-2 z-10`}>
        {
          coins.map((coin: string, index: number) => (
            <h1 key={index} className="hover:text-green-300 transition-all duration-300" onClick={() => handleChange(coin)}>{coin}</h1>
          ))
        }
      </div>
    </div>
  );
}

export default ExchangeDropDown;