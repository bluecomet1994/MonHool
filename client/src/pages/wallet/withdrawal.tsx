import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import TransactionInput from "@/components/wallet/TransactionInput";
import HistoryList from "@/components/wallet/HistoryList";
import CoinDropDown from "@/components/shared/CoinDropDown";
import LongArrowIcon from "@/components/shared/icons/LongArrowIcon";
import { fadeSmallDownVariant, fadeSmallRightVariant, fadeSmallUpVariant } from "@/utils/animations";
import { CurrencyType, TransactionHistoryType } from "@/types/components";

export default function Withdrawal() {
  const depositHistory: TransactionHistoryType[] = [
    {
      id: 1,
      coin: 'btc',
      crypto: 'Bitcoin',
      date: new Date(),
      currency: 0.083,
      status: 'Pending'
    },
    {
      id: 2,
      coin: 'btc',
      crypto: 'Bitcoin',
      date: new Date(),
      currency: 0.022,
      status: 'Success'
    },
    {
      id: 3,
      coin: 'sol',
      crypto: 'Solana',
      date: new Date(),
      currency: 100.6,
      status: 'Declined'
    }
  ];

  const { trading } = useSelector(({ currency }) => currency);

  const [currency, setCurrency] = useState<CurrencyType>({
    id: 0,
    coin: '',
    unit: '',
    currency: 0
  });
  const [usdAmount, setUsdAmount] = useState(356);
  const [coinAmount, setCoinAmount] = useState(0);

  const handleCurrencyChange = (currency: CurrencyType) => {
    setCurrency(currency);
    setCoinAmount(usdAmount / currency.currency);
  }

  useEffect(() => {
    setCurrency(trading && trading[0]);
  }, [trading]);

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <section className="my-8 p-4 md:p-0">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <motion.div initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallDownVariant(0.5)}>
              <h1 className="text-[40px] mt-4">Withdrawal</h1>

              <CoinDropDown color="red-400" list={trading} value={currency} setter={handleCurrencyChange} />

              <div className="my-16">
                <h1 className="text-[#B3B3B3]">Amount (USD)</h1>
                <div className="flex justify-center items-center px-2 py-6 md:p-8 my-4 rounded-xl bg-white text-[#B3B3B3] text-xl md:text-4xl">
                  <h1 className="mr-4">${usdAmount.toFixed(2)}</h1>
                  <LongArrowIcon color="black" />
                  <h1 className="ml-4">{currency.unit} {coinAmount.toFixed(2)}</h1>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallRightVariant(0.5)}>
              <Image alt="image" src={'/assets/images/drawer.png'} width={378} height={383} className=" mx-0 md:mx-12" priority />
            </motion.div>
          </div>
        </section>

        <section className="px-4 md:px-0 py-4">
          <motion.div initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5, 0.25)} className="flex flex-col w-full md:w-[600px]">
            <h1 className="text-3xl mb-8">Your informations</h1>

            <TransactionInput type="text" placeholder="Your address" editable={true} />
            <p className="text-[#807C7C]">* Transaction fee is 0%.</p>
            <button className="w-full px-4 py-2 my-4 rounded-lg text-black bg-primary transition-all hover:bg-green-500">Confirm</button>
          </motion.div>

          <motion.p
            initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.5)}
            className="mt-8 mb-12 text-[#807C7C] [&>span]:text-green-400"
          >* After you click on <span>confirm</span> your request will appear in the section below</motion.p>

          <HistoryList title="Last Deposits" data={depositHistory} />
        </section>
      </div>
    </main>
  );
}