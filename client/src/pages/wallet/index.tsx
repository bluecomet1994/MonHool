import Image from "next/image";
import { useState } from "react";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import DropDown from "@/components/landing/DropDown";
import TimeTab from "@/components/wallet/TimeTab";
import EarningCard from "@/components/wallet/EarningCard";
import { coinHistory, earnings, userBalance } from "@/utils/mockData";
import { EarningsType, UserBalanceType } from "@/types/components";
import { expandVariant, fadeSmallUpVariant, fadeVariant } from "@/utils/animations";
import CoinList from "@/components/wallet/CoinList";
import Table from "@/components/shared/Table";

export default function Wallet() {
  const tableHeader = ['Status', 'Date', 'Coin', '', '', 'Coin Amount'];

  const [timeRange, setTimeRange] = useState('24h');

  const [sendCoin, setSendCoin] = useState('BTC');
  const [getCoin, setGetCoin] = useState('ETH');

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <motion.h1
          initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.5)}
          className="font-bold text-2xl md:text-4xl p-2 my-16 [&>span]:text-green-400"
        >
          Good Evening, <span>Sculbio!</span>
        </motion.h1>

        <section className="p-2">
          <motion.h1
            initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.25)}
            className="flex items-center text-xl md:text-2xl"
          >
            Earnings:
            <TimeTab value={timeRange} setter={setTimeRange} />
          </motion.h1>

          <div className="flex flex-col md:flex-row my-4">
            {
              earnings.map((earning: EarningsType) => (
                <EarningCard key={earning.id} {...earning} />
              ))
            }
          </div>
        </section>

        <section className="p-2 my-12 md:my-32">
          <motion.h1
            initial="hide" whileInView="show" exit="hide" variants={fadeVariant(0.5)}
            className="flex items-center text-2xl"
          >
            Balance
          </motion.h1>

          <div className="flex items-center my-4">
            <motion.h1
              initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5,0.25)}
              className="text-3xl md:text-7xl mr-12"
            >{'$21,809.88'}</motion.h1>

            <motion.button
              initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5,0.5)}
              className="flex justify-center items-center relative text-4xl w-12 h-12 bg-[#6C6C6C] rounded-full mx-2 md:mx-8 transition-all hover:bg-gray-400">
              +
              <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-center text-xs text-gray-500">Deposit</span>
            </motion.button>

            <motion.button
              initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5,0.75)}
              className="flex justify-center items-center relative text-4xl w-12 h-12 bg-[#6C6C6C] rounded-full mx-2 md:mx-8 transition-all hover:bg-gray-400">
              -
              <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-xs text-gray-500">Withdrawal</span>
            </motion.button>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-2/3 p-2 md:mr-24">
              {
                userBalance.map((data: UserBalanceType) => (
                  <CoinList key={data.id} {...data} />
                ))
              }
            </div>

            <div className="w-3/1 p-4">
              <motion.div
                initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.5)}
                className="flex flex-col w-full h-full p-6 bg-[#4D4D4D] rounded-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <h1 className="font-bold text-2xl md:text-3xl">Exchange</h1>
                  <div className="flex justify-center items-center text-sm w-44 h-10 rounded-full bg-[#A9A9A9]">Balance $24 066.09</div>
                </div>

                <div className="w-full my-2 rounded-2xl bg-white bg-opacity-20">
                  <div className="flex justify-center items-center p-5">
                    <h1 className="w-1/4 text-lg md:text-xl">Send</h1>
                    <h1 className="w-1/4 font-bold text-2xl md:text-3xl">0.079</h1>

                    <div className="flex justify-end w-1/2 text-lg md:text-xl">
                      <DropDown value={sendCoin} setter={setSendCoin} />
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
                      <DropDown value={getCoin} setter={setGetCoin} />
                    </div>
                  </div>
                </div>

                <p className="[&>span]:text-green-400 text-center text-lg">
                  <span>NO fees</span> will be applied in the process. Read <span>Terms & Conditions</span>
                </p>

                <button className="w-full min-h-[40px] h-full rounded-full mt-2 text-black text-xl bg-primary">Change</button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="p-2">
          <motion.h1
            initial="hide" whileInView="show" exit="hide" variants={fadeVariant(0.5)}
            className="flex items-center text-2xl"
          >History</motion.h1>

          <Table headCols={tableHeader} bodyCols={coinHistory} />
        </section>
      </div>
    </main>
  );
}