import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import TimeTab from "@/components/wallet/TimeTab";
import EarningCard from "@/components/wallet/EarningCard";
import CoinList from "@/components/wallet/CoinList";
import Table from "@/components/shared/Table";
import ExchangeCard from "@/components/shared/ExchangeCard";
import { coinHistory, earnings, userBalance } from "@/utils/mockData";
import { EarningsType, UserBalanceType } from "@/types/components";
import { expandVariant, fadeSmallUpVariant, fadeVariant } from "@/utils/animations";

export default function Wallet() {
  const router = useRouter();
  const tableHeader = ['Status', 'Date', 'Coin', '', '', 'Coin Amount'];

  const [timeRange, setTimeRange] = useState('24h');

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
              initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.25)}
              className="text-3xl md:text-7xl mr-12"
            >{'$21,809.88'}</motion.h1>

            <motion.button
              onClick={() => router.push('/wallet/deposit')}
              initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.5)}
              className="flex justify-center items-center relative text-4xl w-12 h-12 bg-[#6C6C6C] rounded-full mx-2 md:mx-8 transition-all hover:bg-gray-400">
              +
              <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-center text-xs text-gray-500">Deposit</span>
            </motion.button>

            <motion.button
              onClick={() => router.push('/wallet/withdrawal')}
              initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.75)}
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
              <ExchangeCard />
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