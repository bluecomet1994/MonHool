import { useState } from "react";
import ArrowDownIcon from "@/components/shared/icons/ArrowDownIcon";
import { IconProps } from "@/types/props";

const CoinDropDown = (props: IconProps) => {
  const coins = [
    ['Bitcoin (BTC)', 'BTC'],
    ['Ethereum (ETH)', 'ETH'],
    ['Theter (USDT)', 'USDT'],
    ['Ripple (XRP)', 'XRP'],
    ['Solana (SOL)', 'SOL'],
  ];

  const [value, setValue] = useState(coins[0]);
  const [open, setOpen] = useState(false);

  const handleChange = (selectedCoin: string[]) => {
    setValue(selectedCoin);
    setOpen(false);
  }

  return (
    <div className={`flex flex-col justify-center items-center font-bold w-full md:w-[450px] px-4 py-2 rounded-lg bg-${props.color ? props.color : 'primary'} text-black text-xl my-8`}>
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full cursor-pointer"
      >
        <p>{value[0]}</p>
        <ArrowDownIcon color="black" />
      </div>

      <div className={`${open ? 'flex' : 'hidden'} flex-col w-full pb-4`}>
        {
          coins.map((coin: string[], index: number) => (
            <button key={index} className="flex justify-start relative transition-all hover:bg-green-500" onClick={() => handleChange(coin)}>
              <span className="py-2">{coin[0]}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#4E4E4E]" />
            </button>
          ))
        }
      </div>
    </div>

  );
}

export default CoinDropDown;