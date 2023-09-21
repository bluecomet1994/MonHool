import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import TimeTab from "@/components/wallet/TimeTab";
import EarningCard from "@/components/wallet/EarningCard";
import CoinList from "@/components/wallet/CoinList";
import WalletTable from "@/components/wallet/WalletTable";
import GreetingTitle from "@/components/shared/GreetingTitle";
import ExchangeCard from "@/components/shared/ExchangeCard";
import { userBalance } from "@/utils/mockData";
import { UserBalanceType } from "@/types/components";
import { expandVariant, fadeVariant } from "@/utils/animations";
import { calculateBalance } from "@/utils/functions";
import { getTransactionHistory } from "@/store/actions/transaction.action";
import { fetchDashboard } from "@/store/actions/user.action";
import Swal from "sweetalert2";

export default function Wallet() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLogin, userInfo, dashboard } = useSelector(({ user }) => user);
  const { isLoading, history } = useSelector(({ transaction }) => transaction);
  const { trading } = useSelector(({ currency }) => currency);

  const tableHeader = ['Status', 'Date', 'Coin', '', '', 'Coin Amount'];

  const [timeRange, setTimeRange] = useState(1);

  useEffect(() => {
    dispatch(getTransactionHistory());

    if (!isLogin) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    dispatch(fetchDashboard(timeRange))
      .then((response: any) => {
        if (!response.valid) {
          Swal.fire({
            toast: true,
            icon: "error",
            position: 'top-right',
            text: "The token has expired. Please refresh the page.",
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false
          });
        }
      });
  }, [timeRange]);

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <GreetingTitle name={userInfo.username} />

        <section className="p-2">
          <motion.h1
            initial="hide" whileInView="show" viewport={{ once: true }} variants={expandVariant(0.5, 0.25)}
            className="flex items-center text-xl md:text-2xl"
          >
            Earnings:
            <TimeTab value={timeRange} setter={setTimeRange} />
          </motion.h1>

          <div className="flex flex-col md:flex-row my-4">
            <EarningCard id={1} title="All earnings" data={dashboard.allEarning} />
            <EarningCard id={2} title="Staking earnings" data={dashboard.staking} />
            <EarningCard id={3} title="Trading bot earnings" data={dashboard.trading} />
          </div>
        </section>

        <section className="p-2 my-12 md:my-32">
          <motion.h1
            initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeVariant(0.5)}
            className="flex items-center text-2xl"
          >
            Balance
          </motion.h1>

          <div className="flex items-center my-4">
            <motion.h1
              initial="hide" whileInView="show" viewport={{ once: true }} variants={expandVariant(0.5, 0.25)}
              className="text-3xl md:text-7xl mr-12"
            >{`$${trading && calculateBalance(trading, userInfo.wallet)}`}</motion.h1>

            <motion.button
              onClick={() => router.push('/wallet/deposit')}
              initial="hide" whileInView="show" viewport={{ once: true }} variants={expandVariant(0.5, 0.5)}
              className="flex justify-center items-center relative text-4xl w-12 h-12 bg-[#6C6C6C] rounded-full mx-2 md:mx-8 transition-all hover:bg-gray-400">
              +
              <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-center text-xs text-gray-500">Deposit</span>
            </motion.button>

            <motion.button
              onClick={() => router.push('/wallet/withdrawal')}
              initial="hide" whileInView="show" viewport={{ once: true }} variants={expandVariant(0.5, 0.75)}
              className="flex justify-center items-center relative text-4xl w-12 h-12 bg-[#6C6C6C] rounded-full mx-2 md:mx-8 transition-all hover:bg-gray-400">
              -
              <span className="absolute top-full left-1/2 mt-1 -translate-x-1/2 text-xs text-gray-500">Withdrawal</span>
            </motion.button>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-2/3 p-2 md:mr-24">
              {
                userBalance.map((data: UserBalanceType) => (
                  <CoinList key={data.id} {...data} amount={userInfo.wallet[data.name.toLowerCase()]} />
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
            initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeVariant(0.5)}
            className="flex items-center text-2xl"
          >History</motion.h1>

          <WalletTable isLoading={isLoading} headCols={tableHeader} bodyCols={history} />
        </section>
      </div>
    </main>
  );
}