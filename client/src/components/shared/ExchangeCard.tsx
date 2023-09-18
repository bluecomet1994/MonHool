import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import ExchangeDropDown from "@/components/landing/ExchangeDropDown";
import { expandVariant } from '@/utils/animations';
import { CurrencyType } from '@/types/components';

const ExchangeCard = () => {
  const { trading } = useSelector(({ currency }) => currency);
  
  const [sendCurrency, setSendCurrency] = useState<CurrencyType>({
    id: 0,
    coin: '',
    unit: '',
    currency: 0
  });
  
  const [getCurrency, setGetCurrency] = useState<CurrencyType>({
    id: 0,
    coin: '',
    unit: '',
    currency: 0
  });

  const [sendAmount, setSendAmount] = useState(0.079);
  const [getAmount, setGetAmount] = useState(1.287);

  const handleSendCurrencyChange = (value: CurrencyType) => {
    setSendCurrency(value);
    setGetAmount((sendAmount * value.currency) / getCurrency.currency);
  }

  const handleGetCurrencyChange = (value: CurrencyType) => {
    setGetCurrency(value);
    setGetAmount((sendAmount * sendCurrency.currency) / value.currency);
  }

  useEffect(() => {
    setSendCurrency(trading && trading[0]);
    setGetCurrency(trading && trading[1]);
  }, [trading]);

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={expandVariant(0.5, 0.5)}
      className="flex flex-col w-full h-full p-6 bg-[#4D4D4D] rounded-md"
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold text-2xl md:text-3xl">Exchange</h1>
        <div className="flex justify-center items-center text-sm w-44 h-10 rounded-full bg-[#A9A9A9]">Balance $24 066.09</div>
      </div>

      <div className="w-full my-2 rounded-2xl bg-white bg-opacity-20">
        <div className="flex justify-center items-center p-5">
          <h1 className="w-1/4 text-lg md:text-xl">Send</h1>
          <h1 className="w-1/4 font-bold text-2xl md:text-3xl">{sendAmount}</h1>

          <div className="flex justify-end w-1/2 text-lg md:text-xl">
            <ExchangeDropDown list={trading} value={sendCurrency} setter={handleSendCurrencyChange} />
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
          <h1 className="w-1/4 font-bold text-2xl md:text-3xl">{getAmount.toFixed(3)}</h1>

          <div className="flex justify-end w-1/2 text-lg md:text-xl">
            <ExchangeDropDown list={trading} value={getCurrency} setter={handleGetCurrencyChange} />
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