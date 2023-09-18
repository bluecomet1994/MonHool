import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import TradingBotCard from '@/components/trading-bot/TradingBotCard';
import TradingDashboard from '@/components/trading-bot/TradingDashboard';
import { fadeSmallRightVariant, fadeVariant } from '@/utils/animations';
import { useState } from 'react';

const dropDownData: string[][] = [
  ["USDT/ETH", "BINANCE:ETHUSDT"],
  ["USDT/BTC", "BINANCE:BTCUSDT"],
  ["USDT/SOL", "BINANCE:SOLUSDT"],
  ["USDT/XRP", "BINANCE:XRPUSDT"]
];

export default function TradingBot() {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState(dropDownData[0]);

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <section className="my-12">
          <motion.h1
            initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeVariant(1)}
            className="text-3xl text-center md:text-left"
          >Trading bot</motion.h1>

          <div className='flex flex-col w-full my-8 p-2 md:p-0'>
            <div className='flex flex-col md:flex-row'>
              <motion.div
                initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallRightVariant(0.5)}
                className='flex flex-col justify-center items-center w-full md:w-1/3 p-4 my-1 md:m-1 rounded-lg bg-[#545454]'>
                <h1 className='text-3xl text-[#A5A5A5] my-8'>Wallet</h1>
                <p className='font-bold text-[50px]'>$21,809.08</p>

                <div className='flex items-end mt-4'>
                  <h1 className='text-2xl text-[#DEDEDE]'>+3,987.02</h1>
                  <span className='text-xl text-[#9B9B9B] mx-2'>Last week</span>
                </div>

                <div className='flex my-8'>
                  <button onClick={() => router.push('/wallet/deposit')} className="flex justify-center items-center relative text-4xl w-12 h-12 bg-[#D9D9D9] text-black rounded-full mx-4 transition-all hover:bg-gray-400">+</button>
                  <button onClick={() => router.push('/wallet/withdrawal')} className="flex justify-center items-center relative text-4xl w-12 h-12 bg-[#D9D9D9] text-black rounded-full mx-4 transition-all hover:bg-gray-400">-</button>
                </div>
              </motion.div>

              <TradingBotCard list={dropDownData} value={selectedCurrency} setter={setSelectedCurrency} />
            </div>

            <TradingDashboard list={dropDownData} value={selectedCurrency} setter={setSelectedCurrency} />
          </div>
        </section>
      </div>
    </main>
  );
}