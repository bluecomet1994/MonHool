import Image from "next/image";
import { useState } from "react";
import { motion } from 'framer-motion';

import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import { tradingCryptos, venderImages } from "@/utils/mockData";
import { TradingCryptoType } from "@/types/components";
import CryptoAnalytic from "@/components/landing/CryptoAnalytic";
import DropDown from "@/components/landing/DropDown";
import Slider from "@/components/shared/Slider";
import { expandVariant, fadeSmallDownVariant, fadeSmallLeftVariant, fadeSmallUpVariant } from "@/utils/animations";

export default function Home() {
  const feeCurrency = 0.4;
  const stakeCurrency = 20;

  const [sendCoin, setSendCoin] = useState('BTC');
  const [getCoin, setGetCoin] = useState('ETH');

  const [fees, setFees] = useState(2345);
  const [feeResult, setFeeResult] = useState(fees * (feeCurrency / 100));
  const [stake, setStake] = useState(2345);
  const [stakeResult, setStakeResult] = useState(0);

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
                initial="hide" whileInView="show" exit="hide" variants={fadeSmallLeftVariant(1)}
                className="w-2/3 md:w-[600px] text-xl text-center md:text-left md:text-5xl [&>span]:text-green-400 [&>span]:font-bold tracking-wider"
              >
                Earn <span>massive</span> commissions using our <span>staking</span> program & <span>more.</span>
              </motion.h1>
            </section>

            <section className="flex flex-wrap w-full my-12">
              <div className="md:w-full lg:w-1/3 h-96 p-1">
                <motion.div
                  initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5)}
                  className="flex flex-col w-full h-full rounded-md p-4 bg-primary"
                >
                  <div className="flex justify-center items-center text-xs px-2 py-4 rounded-2xl bg-black">
                    <Image alt="safety-icon" src={'/assets/icons/safety-outlined.svg'} width={24} height={24} />
                    <p className="text-primary">&nbsp;Pay securely - </p>&nbsp;
                    <p>Protected by our payment systems</p>
                  </div>

                  <h1 className="font-bold text-[40px] text-black my-4 leading-tight">The best staking program out here</h1>
                  <p className="text-lg text-black tracking-wide">Freeze your money for a period of time you decide and earn a commission</p>

                  <div className="flex justify-end items-end w-full h-full">
                    <button className="flex justify-between items-center text-black w-36 h-10 px-3 border-2 border-black rounded-full">
                      Try it out
                      <Image alt="safety-icon" src={'/assets/icons/arrow-circle-fill.svg'} width={36} height={36} className="-rotate-45" />
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="md:w-full lg:w-1/3 h-96 p-1">
                <div className="flex flex-col w-full h-full">
                  <motion.div
                    initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.25)}
                    className="relative w-full h-full p-6 mb-1 bg-white text-black rounded-lg"
                  >
                    <h1 className="font-bold text-3xl">AI Trading Bot</h1>
                    <p className="text-base text-[#686161]">Get into trading with the best Trading bot out here</p>

                    <div className="absolute top-0 right-0 p-1 m-6 rounded-md bg-primary">
                      <Image alt="safety-icon" src={'/assets/images/badges/chart-line-up.png'} width={24} height={24} />
                    </div>

                    <button className="absolute bottom-0 right-0 m-4">
                      <Image alt="safety-icon" src={'/assets/icons/arrow-circle-light.svg'} width={48} height={48} className="rotate-45" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.5)}
                    className="relative w-full h-full p-6 mt-1 bg-black border-[1px] border-gray-500 rounded-lg"
                  >
                    <h1 className="font-bold text-3xl">25 USD Bonus</h1>
                    <p className="text-base text-[#909090]">Sign In and deposit more than 100 USD to get a 25 USD bonus.</p>

                    <button className="absolute bottom-0 right-0 m-4">
                      <Image alt="safety-icon" src={'/assets/icons/arrow-circle-dark.svg'} width={48} height={48} className="-rotate-45" />
                    </button>
                  </motion.div>
                </div>
              </div>

              <div className="md:w-full lg:w-1/3 h-96 p-1">
                <motion.div
                  initial="hide" whileInView="show" exit="hide" variants={expandVariant(0.5, 0.75)}
                  className="flex flex-col w-full h-full p-6 bg-[#4D4D4D] rounded-md"
                >
                  <div className="flex justify-between items-center">
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

                  <button className="w-full h-full rounded-full mt-2 text-black text-xl bg-primary">Change</button>
                </motion.div>
              </div>
            </section>

            <section className="my-16">
              <h1 className="text-2xl my-4 mx-4 md:mx-0">
                Trading Crypto
                <span className="text-gray-500 text-sm mx-4">Last 24h</span>
              </h1>

              <div className="flex flex-wrap">
                {
                  tradingCryptos.map((item: TradingCryptoType) => (
                    <CryptoAnalytic
                      key={item.id}
                      name={item.name}
                      image={item.image}
                      amount={item.amount}
                      trending={item.trending}
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
                    initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.75, 0.25)}
                    className="font-bold text-xl text-center md:text-left md:text-4xl my-4 md:my-0 [&>span]:bg-green-400 [&>span]:p-1 [&>span]:rounded-md"
                  >
                    <span>Extremely</span> Low fees for any transaction
                  </motion.h1>
                </div>

                <motion.div
                  initial="hide" whileInView="show" exit="hide" variants={fadeSmallDownVariant(0.75, 0.25)}
                  className="w-full px-8 py-12 rounded-md bg-[#575757]"
                >
                  <h1 className="font-semibold text-3xl md:text-4xl">Fees Calculator</h1>

                  <Slider startValue={0} endValue={11000} value={fees} handler={handleFeesChange} />

                  <div className="flex justify-between items-center w-full">
                    <div>
                      <p className="text-xl md:text-2xl text-gray-400">For</p>
                      <p className="font-semibold text-3xl md:text-5xl my-2">${fees}</p>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="127" height="24" viewBox="0 0 127 24" fill="none">
                      <path d="M126.069 13.0607C126.655 12.4749 126.655 11.5251 126.069 10.9393L116.523 1.3934C115.937 0.807611 114.987 0.807611 114.401 1.3934C113.816 1.97919 113.816 2.92893 114.401 3.51472L122.887 12L114.401 20.4853C113.816 21.0711 113.816 22.0208 114.401 22.6066C114.987 23.1924 115.937 23.1924 116.523 22.6066L126.069 13.0607ZM0.991943 13.5H125.008V10.5H0.991943V13.5Z" fill="#A4A4A4" />
                    </svg>

                    <div>
                      <p className="text-xl md:text-2xl text-gray-400">Fees</p>
                      <p className="font-semibold text-3xl md:text-5xl my-2">${feeResult.toFixed(2)}</p>
                    </div>
                  </div>

                  <p className="text-base text-gray-400 my-4 [&>span]:text-green-400">
                    The average fee percentage is <span>{feeCurrency}%</span> per transaction
                  </p>
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center my-12">
                <div className="flex justify-center items-center w-full px-16">
                  <motion.h1
                    initial="hide" whileInView="show" exit="hide" variants={fadeSmallUpVariant(0.75, 0.25)}
                    className="font-bold  text-xl text-center md:text-left md:text-4xl my-4 md:my-0 [&>span]:bg-orange-400 [&>span]:p-1 [&>span]:rounded-md"
                  >
                    Discover the <span>earnings</span> with our staking program
                  </motion.h1>
                </div>

                <motion.div
                  initial="hide" whileInView="show" exit="hide" variants={fadeSmallDownVariant(0.75, 0.25)}
                  className="w-full px-8 py-12 rounded-md bg-[#575757]"
                >
                  <h1 className="font-bold text-3xl md:text-4xl">Staking earnings</h1>

                  <Slider startValue={0} endValue={11000} value={stake} handler={handleStakeChange} />

                  <div className="flex justify-between items-center w-full">
                    <div>
                      <p className="text-xl md:text-2xl text-gray-400">For</p>
                      <p className="font-semibold text-3xl md:text-5xl my-2">${stake}</p>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="127" height="24" viewBox="0 0 127 24" fill="none">
                      <path d="M126.069 13.0607C126.655 12.4749 126.655 11.5251 126.069 10.9393L116.523 1.3934C115.937 0.807611 114.987 0.807611 114.401 1.3934C113.816 1.97919 113.816 2.92893 114.401 3.51472L122.887 12L114.401 20.4853C113.816 21.0711 113.816 22.0208 114.401 22.6066C114.987 23.1924 115.937 23.1924 116.523 22.6066L126.069 13.0607ZM0.991943 13.5H125.008V10.5H0.991943V13.5Z" fill="#A4A4A4" />
                    </svg>

                    <div>
                      <p className="text-xl md:text-2xl text-gray-400">Estimated</p>
                      <p className="font-semibold text-3xl md:text-5xl my-2">${stakeResult.toFixed(2)}</p>
                    </div>
                  </div>

                  <p className="text-base text-gray-400 my-4 [&>span]:text-green-400">
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
