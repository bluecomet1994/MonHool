import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { venderImages } from "@/utils/mockData";
import { CurrencyType } from "@/types/components";
import CryptoAnalytic from "@/components/landing/CryptoAnalytic";
import Slider from "@/components/shared/Slider";
import { expandVariant, fadeSmallDownVariant, fadeSmallLeftVariant, fadeSmallUpVariant } from "@/utils/animations";
import ExchangeCard from "@/components/shared/ExchangeCard";
import LongArrowIcon from "@/components/shared/icons/LongArrowIcon";
import ShortArrowIcon from "@/components/shared/icons/ShortArrowIcon";

export default function Home() {
  const feeCurrency = 0.4;
  const stakeCurrency = 20;

  const router = useRouter();
  const { trading } = useSelector(({ currency }) => currency);

  const [fees, setFees] = useState(2345);
  const [feeResult, setFeeResult] = useState(fees * (feeCurrency / 100));
  const [stake, setStake] = useState(2345);
  const [stakeResult, setStakeResult] = useState(stake * (stakeCurrency / 100));

  const handleFeesChange = (value: number) => {
    setFees(value);
    setFeeResult(value * (feeCurrency / 100));
  }

  const handleStakeChange = (value: number) => {
    setStake(value);
    setStakeResult(value * (stakeCurrency / 100));
  }

  return (
    <main>
      <div className="flex justify-center">
        <div className="container">
          <Navbar />

          <main className="p-2 md:p-8">
            <section className="flex justify-center md:justify-start">
              <motion.h1
                initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallLeftVariant(1)}
                className="w-2/3 md:w-[600px] text-xl text-center md:text-left md:text-5xl [&>span]:text-green-400 [&>span]:font-bold tracking-wider"
              >
                Earn <span>massive</span> commissions using our <span>staking</span> program & <span>more.</span>
              </motion.h1>
            </section>

            <section className="flex flex-wrap w-full my-12">
              <div className="md:w-full lg:w-1/3 h-96 p-1">
                <motion.div
                  initial="hide" whileInView="show" viewport={{ once: true }} variants={expandVariant(0.5)}
                  className="flex flex-col w-full h-full rounded-md p-4 bg-primary"
                >
                  <div className="flex justify-center items-center text-[10px] md:text-xs px-2 py-4 rounded-2xl bg-black">
                    <Image alt="safety-icon" src={'/assets/icons/safety-outlined.svg'} width={24} height={24} />
                    <p className="text-primary">&nbsp;Pay securely - </p>&nbsp;
                    <p>Protected by our payment systems</p>
                  </div>

                  <h1 className="font-bold text-3xl md:text-[40px] text-black my-4 leading-tight">The best staking program out here</h1>
                  <p className="text-sm md:text-lg text-black tracking-wide">Freeze your money for a period of time you decide and earn a commission</p>

                  <div className="flex justify-end items-end w-full h-full">
                    <button
                      onClick={() => router.push('/staking')}
                      className="flex justify-between items-center text-black w-36 h-10 px-3 border-2 border-black rounded-full transition-all hover:bg-black hover:text-white"
                    >
                      Try it out
                      <Image alt="safety-icon" src={'/assets/icons/arrow-circle-fill.svg'} width={36} height={36} className="-rotate-45" />
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="md:w-full lg:w-1/3 h-96 p-1">
                <div className="flex flex-col w-full h-full">
                  <motion.div
                    initial="hide" whileInView="show" viewport={{ once: true }} variants={expandVariant(0.5, 0.25)}
                    className="relative w-full h-full p-6 mb-1 bg-white text-black rounded-lg"
                  >
                    <h1 className="font-bold text-3xl">AI Trading Bot</h1>
                    <p className="text-base text-[#686161]">Get into trading with the best Trading bot out here</p>

                    <div className="absolute top-0 right-0 p-1 m-6 rounded-md bg-primary">
                      <Image alt="safety-icon" src={'/assets/images/badges/chart-line-up.png'} width={24} height={24} />
                    </div>

                    <button onClick={() => router.push('/trading-bot')} className="absolute bottom-0 right-0 m-4">
                      <Image alt="safety-icon" src={'/assets/icons/arrow-circle-light.svg'} width={48} height={48} className="rotate-45" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial="hide" whileInView="show" viewport={{ once: true }} variants={expandVariant(0.5, 0.5)}
                    className="relative w-full h-full p-6 mt-1 bg-black border-[1px] border-gray-500 rounded-lg"
                  >
                    <h1 className="font-bold text-3xl">25 USD Bonus</h1>
                    <p className="text-base text-[#909090]">Sign In and deposit more than 100 USD to get a 25 USD bonus.</p>

                    <button onClick={() => router.push('/wallet/deposit')} className="absolute bottom-0 right-0 m-4">
                      <Image alt="safety-icon" src={'/assets/icons/arrow-circle-dark.svg'} width={48} height={48} className="-rotate-45" />
                    </button>
                  </motion.div>
                </div>
              </div>

              <div className="md:w-full lg:w-1/3 h-96 p-1">
                <ExchangeCard />
              </div>
            </section>

            <section className="my-16">
              <h1 className="text-2xl my-4 mx-4 md:mx-0">
                Trading Crypto
                <span className="text-gray-500 text-sm mx-4">Last 24h</span>
              </h1>

              <div className="flex flex-wrap">
                {
                  trading && trading.map((item: CurrencyType) => !(item.unit === "SOL") && (
                    <CryptoAnalytic
                      key={item.id}
                      name={item.coin}
                      image={item.image}
                      amount={Number(item.lastPrice)}
                      trending={(Number(item.priceChangePercent) > 0)}
                    />
                  ))
                }
              </div>
            </section>

            <section className="my-8">
              <h1 className="text-2xl my-4 mx-4 md:mx-0">Trusted by many</h1>

              <div className="vender-container">
                <div className="vender-track">
                  {
                    venderImages.map((url: string, index: number) => (
                      <Image key={index} alt="vender" src={url} width={150} height={75} className="mx-12" />
                    ))
                  }
                </div>
              </div>
            </section>

            <section>
              <div className="flex flex-col md:flex-row justify-between items-center my-12">
                <div className="flex justify-center items-center w-full px-16">
                  <motion.h1
                    initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.75, 0.25)}
                    className="font-bold text-lg text-center md:text-left md:text-4xl my-4 md:my-0 [&>span]:bg-green-400 [&>span]:p-1 [&>span]:rounded-md"
                  >
                    <span>Extremely</span> Low fees for any transaction
                  </motion.h1>
                </div>

                <motion.div
                  initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallDownVariant(0.75, 0.25)}
                  className="w-full px-8 py-12 rounded-md bg-[#575757]"
                >
                  <h1 className="font-semibold text-2xl md:text-4xl">Fees Calculator</h1>

                  <Slider startValue={0} endValue={100000} value={fees} handler={handleFeesChange} />

                  <div className="flex justify-between items-center w-full">
                    <div>
                      <p className="text-lg md:text-2xl text-gray-400">For</p>
                      <p className="font-semibold text-2xl md:text-5xl my-2">${fees}</p>
                    </div>

                    <div className="hidden md:block">
                      <LongArrowIcon />
                    </div>

                    <div className="block md:hidden">
                      <ShortArrowIcon color="gray" />
                    </div>

                    <div>
                      <p className="text-lg md:text-2xl text-gray-400">Fees</p>
                      <p className="font-semibold text-2xl md:text-5xl my-2">${feeResult.toFixed(2)}</p>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-gray-400 my-4 [&>span]:text-green-400">
                    The average fee percentage is <span>{feeCurrency}%</span> per transaction
                  </p>
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center my-12">
                <div className="flex justify-center items-center w-full px-16">
                  <motion.h1
                    initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallUpVariant(0.75, 0.25)}
                    className="font-bold text-lg text-center md:text-left md:text-4xl my-4 md:my-0 [&>span]:bg-orange-400 [&>span]:p-1 [&>span]:rounded-md"
                  >
                    Discover the <span>earnings</span> with our staking program
                  </motion.h1>
                </div>

                <motion.div
                  initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallDownVariant(0.75, 0.25)}
                  className="w-full px-8 py-12 rounded-md bg-[#575757]"
                >
                  <h1 className="font-bold text-2xl md:text-4xl">Staking earnings</h1>

                  <Slider startValue={0} endValue={11000} value={stake} handler={handleStakeChange} />

                  <div className="flex justify-between items-center w-full">
                    <div>
                      <p className="text-lg md:text-2xl text-gray-400">For</p>
                      <p className="font-semibold text-2xl md:text-5xl my-2">${stake}</p>
                    </div>

                    <div className="hidden md:block">
                      <LongArrowIcon />
                    </div>

                    <div className="block md:hidden">
                      <ShortArrowIcon color="gray" />
                    </div>

                    <div>
                      <p className="text-lg md:text-2xl text-gray-400">Earnings</p>
                      <p className="font-semibold text-2xl md:text-5xl my-2">${stakeResult.toFixed(2)}</p>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-gray-400 my-4 [&>span]:text-green-400">
                    You will earn approximately <span>{stakeCurrency}%</span> of your balance with staking
                  </p>
                </motion.div>
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />


      <style jsx>{`
        .vender-container {
          position: relative;
          width: 100%;
          padding: 24px 0;
          overflow: hidden;
        }

        .vender-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 150px;
          height: 100%;
          background: linear-gradient(to right, #181818, transparent);
          z-index: 1;
        }

        .vender-container::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 150px;
          height: 100%;
          background: linear-gradient(to left, #181818, transparent);
          z-index: 1;
        }

        .vender-track {
          display: flex;
          animation: vender_slide 30s linear infinite;
        }

        @keyframes vender_slide {
          from { transform: translateX(0) }
          to { transform: translateX(-101%) }
        }
      `}</style>
    </main>
  )
}
