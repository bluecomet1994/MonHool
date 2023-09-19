import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

import ArrowDownIcon from "@/components/shared/icons/ArrowDownIcon";
import ExternalIcon from "@/components/shared/icons/ExternalIcon";
import { fadeSmallLeftVariant } from "@/utils/animations";
import { TradingProps } from "@/types/props";

const TradingBotCard = (props: TradingProps) => {
  const { list, value, setter } = props;

  const [isPositionOpen, setIsPositionOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);

  const handleChange = (coin: string[]) => {
    setter(coin);
    setDropdownOpen(false);
  }

  const handleAmountChange = ({ target: { value } }: any) => {
    setAmount(Number(value));
  }

  const openPosition = () => {
    setIsPositionOpen(true);
  }

  useEffect(() => {
    setRate(Math.floor(Math.random() * (62 - 55 + 1) + 55));
    setTime(Math.floor(Math.random() * (25 - 20 + 1) + 20));
  }, []);

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallLeftVariant(0.5)}
      className='w-full md:w-2/3 p-6 md:p-10 my-1 md:m-1 rounded-lg bg-[#252525]'
    >
      <div className='flex w-full'>
        <div className='flex justify-between items-start w-full md:w-1/3'>
          <h1 className='text-2xl'>Trading bot</h1>

          <div className="flex flex-col md:hidden">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center text-primary cursor-pointer'
            >{value[0]} <ArrowDownIcon /></div>

            <div className={`${dropdownOpen ? 'flex' : 'hidden'} flex-col w-full`}>
              {
                list.map((coin: string[], index: number) => (
                  <div key={index} className='py-2 cursor-pointer' onClick={() => handleChange(coin)}>{coin[0]}</div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='hidden md:flex items-center w-2/3 text-base'>
          <div className='flex'>
            {
              list.map((coin: string[], index: number) => (
                <button
                  key={index}
                  onClick={() => handleChange(coin)}
                  className={`${coin === value && 'text-primary'} mx-3 transition-all hover:font-bold`}
                >{coin[0]}</button>
              ))
            }
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row w-full my-12'>
        <div className='flex w-full md:w-2/3'>
          <div className='flex flex-col w-full'>
            <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Amount</h1>
            <p className='flex items-center font-bold text-3xl md:text-[40px] my-4'>
              $<span className="relative text-[#252525]">
                {amount.toFixed(2)}
                <input type="number" className="absolute top-0 left-0 w-[calc(100%+24px)] h-full font-bold bg-[#252525] text-white text-3xl md:text-[40px] outline-none border-none" value={amount.toFixed(2)} min={0} onChange={handleAmountChange} />
              </span>
            </p>
          </div>

          <div className='flex flex-col items-end md:items-start w-full'>
            <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Earning possibility</h1>
            <p className='font-bold text-3xl md:text-[40px] my-4'>{rate}%</p>
          </div>
        </div>

        <div className='w-full md:w-1/3'>
          <div className='flex flex-col items-center md:items-start w-full'>
            <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Time needed</h1>
            <p className='font-bold text-3xl md:text-[40px] my-4'>{time} hours</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col md:flex-row items-center my-4'>
        <button className={`${isPositionOpen ? 'hidden' : 'flex'} justify-center items-center w-full md:w-auto font-bold px-4 py-3 rounded-lg bg-primary text-xl text-black transition-all hover:bg-green-500`} onClick={openPosition}>
          Open position&nbsp;<ExternalIcon />
        </button>

        <div className={`${isPositionOpen ? 'flex' : 'hidden'} justify-start w-full my-2`}>
          <h1 className='text-xl'>Time left</h1>
          <p className='text-xl text-primary mx-4'>23h 22m 5s</p>
        </div>

        <div className={`${isPositionOpen ? 'flex' : 'hidden'} justify-end w-full my-2`}>
          <button className='font-bold px-4 py-2 rounded-lg bg-primary text-black transition-all hover:bg-green-500'>
            Get earning
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TradingBotCard;