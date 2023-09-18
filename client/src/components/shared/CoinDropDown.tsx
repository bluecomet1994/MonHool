import { useState } from "react";
import ArrowDownIcon from "@/components/shared/icons/ArrowDownIcon";
import { DropDownProps } from "@/types/props";
import { CurrencyType } from "@/types/components";

const CoinDropDown = (props: DropDownProps) => {
  const { color, list, value, setter } = props;
  const [open, setOpen] = useState(false);

  const handleChange = (selectedCoin: CurrencyType) => {
    setter(selectedCoin);
    setOpen(false);
  }

  return (
    <div className={`flex flex-col justify-center items-center font-bold w-full md:w-[450px] px-4 py-2 rounded-lg bg-${color ? color : 'primary'} text-black text-xl my-8`}>
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full cursor-pointer"
      >
        <p>{value.coin} ({value.unit})</p>
        <ArrowDownIcon color="black" />
      </div>

      <div className={`${open ? 'flex' : 'hidden'} flex-col w-full pb-4`}>
        {
          list.map((item: CurrencyType) => (
            <button key={item.id} className={`flex justify-start relative transition-all hover:bg-${color ? 'red-500' : 'green-500'}`} onClick={() => handleChange(item)}>
              <span className="py-2">{item.coin} ({item.unit})</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#4E4E4E]" />
            </button>
          ))
        }
      </div>
    </div>

  );
}

export default CoinDropDown;