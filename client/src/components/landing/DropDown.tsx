import { useState } from "react";
import { InputEleType } from "@/types/components";

const DropDown = (props: InputEleType) => {
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
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
          <path d="M20.9995 26.2501L13.5742 18.8266L16.0505 16.3521L20.9995 21.3011L25.9485 16.3521L28.4247 18.8266L20.9995 26.2518V26.2501Z" fill="white" />
        </svg>
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

export default DropDown;