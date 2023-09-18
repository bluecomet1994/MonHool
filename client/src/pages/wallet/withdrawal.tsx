import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import TransactionInput from "@/components/wallet/TransactionInput";
import HistoryList from "@/components/wallet/HistoryList";
import LongArrowIcon from "@/components/shared/icons/LongArrowIcon";
import { fadeSmallDownVariant, fadeSmallLeftVariant, fadeSmallRightVariant, fadeSmallUpVariant } from "@/utils/animations";
import { CurrencyType, TransactionHistoryType } from "@/types/components";
import CoinSelection from "@/components/wallet/CoinSelection";
import ClipboardIcon from "@/components/shared/icons/ClipboardIcon";
import ShortArrowIcon from "@/components/shared/icons/ShortArrowIcon";

export default function Deposit() {
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

  const cryptoAddress: any = {
    BTC: {
      address: "bc1qkndg8vue39fhusfgzrzruh25x5c6n6zchwnffz",
      qrCode: "/assets/images/qr_code/btc.jpg"
    },
    ETH: {
      address: "0xBe140d656915Daf5f0119cb781e7dBdd5C2e587F",
      qrCode: "/assets/images/qr_code/eth.jpg"
    },
    USDT: {
      address: "TCRxGGYNo63SHrNM2rezPBRNRqEtnWtiD1",
      qrCode: "/assets/images/qr_code/usdt.jpg"
    },
    XRP: {
      address: "rhQyS8CXFKzitUeK52tDVQX6a6oFLpe5R9",
      qrCode: "/assets/images/qr_code/xrp.jpg"
    },
    SOL: {
      address: "8pqGHUw7K7xYdzRGirpdZ8xmu2mz1j9nsjevqt4yWHUa",
      qrCode: "/assets/images/qr_code/sol.jpg"
    },
  };

  const { trading } = useSelector(({ currency }) => currency);

  const [currency, setCurrency] = useState<CurrencyType>({
    id: 0,
    coin: '',
    unit: '',
    image: '',
    lastPrice: '0'
  });
  const [usdAmount, setUsdAmount] = useState(356);
  const [coinAmount, setCoinAmount] = useState(0);
  const [cryptoInfo, setCryptoInfo] = useState(cryptoAddress.BTC);

  const handleCurrencyChange = (currency: CurrencyType) => {
    setCurrency(currency);
    setCoinAmount(usdAmount / Number(currency.lastPrice));
    setCryptoInfo(cryptoAddress[currency.unit]);
  }

  const handleAmountChange = ({ target: { value } }: any) => {
    setUsdAmount(Number(value));
    setCoinAmount(Number(value) / Number(currency.lastPrice));
  }

  useEffect(() => {
    setCurrency(trading && trading[0]);
  }, [trading]);

  return (
    <main className="flex justify-center">
      <div className="container">
        <Navbar />

        <section className="m-0 md:my-8 p-4 md:p-0">
          <motion.h1
            initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallDownVariant(0.5)}
            className="text-[40px] text-center md:text-left mt-4"
          >Withdrawal</motion.h1>

          <CoinSelection list={trading} value={currency} setter={handleCurrencyChange} />

          <div className="flex flex-col md:flex-row-reverse w-full">
            <motion.div
              initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallLeftVariant(0.5, 0.5)}
              className="flex flex-col w-full"
            >
              <h1 className="text-[#B3B3B3]">How to add balance</h1>
              <div className="flex flex-wrap">
                <div className="w-1/2 p-1">
                  <div className="flex flex-col w-full h-40 p-5 rounded-lg bg-white text-black">
                    <h1 className="text-[#9A9A9A] text-2xl">01</h1>
                    <p className="text-xs md:text-lg">Select crypto and amount.</p>
                  </div>
                </div>

                <div className="w-1/2 p-1">
                  <div className="flex flex-col w-full h-40 p-5 rounded-lg bg-[#737373] text-white">
                    <h1 className="text-[#9A9A9A] text-2xl">02</h1>
                    <p className="text-xs md:text-lg">Enter your address, make sure it&apos;s right.</p>
                  </div>
                </div>

                <div className="w-1/2 p-1">
                  <div className="flex flex-col w-full h-40 p-5 rounded-lg bg-[#313131] text-white">
                    <h1 className="text-[#9A9A9A] text-2xl">03</h1>
                    <p className="text-xs md:text-lg [&>span]:text-green-400">Click on <span>confirm.</span></p>
                  </div>
                </div>

                <div className="w-1/2 p-1">
                  <div className="flex flex-col w-full h-40 p-5 rounded-lg bg-primary text-white">
                    <h1 className="text-2xl">04</h1>
                    <p className="text-xs md:text-lg">Wait from 20 to 30 minutes and you will get the money</p>
                  </div>
                </div>
              </div>

              <p className="mt-8 mb-12 text-[#807C7C] [&>span]:text-green-400 text-xs md:text-base">
                *Make sure you have entered the <span>right address</span> if not your founds will be lost for ever. Double check the address.
              </p>
            </motion.div>

            <motion.div
              initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallRightVariant(0.5, 0.5)}
              className="flex flex-col items-start w-full md:py-10"
            >
              <div className="flex flex-col w-full md:w-[600px] p-1 md:p-0">
                <h1 className="text-[#B3B3B3]">Amount (USD)</h1>
                <div className="flex justify-between items-center px-2 py-6 md:p-8 my-4 rounded-xl bg-white text-[#B3B3B3] text-xl md:text-4xl">
                  <h1 className="mr-4">$
                    <span className="relative">
                      {usdAmount.toFixed(2)}
                      <input
                        type="number"
                        value={usdAmount.toFixed(2)}
                        onChange={handleAmountChange}
                        className="absolute top-0 left-0 w-[calc(100%+24px)] h-full text-xl md:text-4xl text-center border-none outline-none"
                        min={0}
                      />
                    </span>
                  </h1>

                  <div className="hidden md:block">
                    <LongArrowIcon color="black" />
                  </div>

                  <div className="block md:hidden">
                    <ShortArrowIcon color="black" />
                  </div>

                  <h1 className="ml-4">{currency && currency.unit} {coinAmount.toFixed(2)}</h1>
                </div>

                <h1 className="text-3xl my-8">Your informations</h1>

                <TransactionInput type="text" placeholder="Wallet Address" editable={true} />
                <button className="w-full px-4 py-2 rounded-lg text-black bg-primary transition-all hover:bg-green-500">Confirm</button>

                <p className="mt-8 mb-12 text-[#807C7C] [&>span]:text-green-400 text-xs md:text-base">
                  * After you click on <span>confirm</span> your request will appear in the section below
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-4 px-2 md:pb-20">
          <HistoryList title="Last Withdrawals" data={depositHistory} />
        </section>
      </div>
    </main>
  );
}