import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

import ExchangeDropDown from "@/components/landing/ExchangeDropDown";
import { expandVariant } from '@/utils/animations';

const ExchangeCard = () => {
  const [sendCoin, setSendCoin] = useState('BTC');
  const [getCoin, setGetCoin] = useState('ETH');

  return (
    <motion.div
      initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.5)}
      className="flex flex-col w-full h-full p-6 bg-[#4D4D4D] rounded-md"
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold text-2xl md:text-3xl">Exchange</h1>
        <div className="flex justify-center items-center text-sm w-44 h-10 rounded-full bg-[#A9A9A9]">Balance $24 066.09</div>
      </div>

      <div className="w-full my-2 rounded-2xl bg-white bg-opacity-20">
        <div className="flex justify-center items-center p-5">
          <h1 className="w-1/4 text-lg md:text-xl">Send</h1>
          <h1 className="w-1/4 font-bold text-2xl md:text-3xl">0.079</h1>

          <div className="flex justify-end w-1/2 text-lg md:text-xl">
            <ExchangeDropDown value={sendCoin} setter={setSendCoin} />
          </div>
        </div>

        <div className="relative">
          <hr />
          <div className="absolute top-0 right-1/3 p-2 bg-primary rounded-full -translate-y-1/2">
            <Image alt="safety-icon" src={'/assets/icons/exchange-fill.png'} width={36} height={36} />
          </div>
        </div>

        <div className="flex justify-center items-center p-5">
          <h1 className="w-1/4 text-lg md:text-xl">Get</h1>
          <h1 className="w-1/4 font-bold text-2xl md:text-3xl">0.498</h1>

          <div className="flex justify-end w-1/2 text-lg md:text-xl">
            <ExchangeDropDown value={getCoin} setter={setGetCoin} />
          </div>
        </div>
      </div>

      <p className="[&>span]:text-green-400 text-center text-lg">
        <span>NO fees</span> will be applied in the process. Read <span className='cursor-pointer hover:underline'>Terms & Conditions</span>
      </p>

      <button className="w-full min-h-[40px] h-full rounded-full mt-2 text-black text-xl bg-primary transition-all hover:bg-green-500">Change</button>
    </motion.div>
  )
}

export default ExchangeCard;