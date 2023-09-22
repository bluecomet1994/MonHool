import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import Swal from "sweetalert2";

import ArrowDownIcon from "@/components/shared/icons/ArrowDownIcon";
import ExternalIcon from "@/components/shared/icons/ExternalIcon";
import { fadeSmallLeftVariant } from "@/utils/animations";
import { TradingProps } from "@/types/props";
import { getTradeEarning, getTradingPosition, openTradingPosition } from "@/store/actions/trading.action";
import { TRADING_STATUS } from "@/enums/status";
import { calculateCoinBalance, convertTime, formatNumber } from "@/utils/functions";
import { OpenTradingRequestType } from "@/types/redux";
import Spinner from "../shared/Spinner";

const TradingBotCard = (props: TradingProps) => {
  const { list, value, setter, trading, wallet } = props;

  const dispatch = useDispatch();
  const { isOpening, isEarning, isLoading, position } = useSelector(({ trading }) => trading);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);
  const [remainTime, setRemainTime] = useState(0);

  const handleChange = (coin: string[]) => {
    setter(coin);
    setDropdownOpen(false);
  }

  const handleAmountChange = ({ target: { value } }: any) => {
    setAmount(Number(value));
  }

  const openPosition = () => {
    if (amount === 0) {
      Swal.fire({
        toast: true,
        icon: 'warning',
        position: 'top-right',
        text: "The amount should be greater than 0.",
        timerProgressBar: true,
        timer: 3000,
        showConfirmButton: false
      });
    } else {
      const positionRequest: OpenTradingRequestType = {
        amount,
        hit: rate,
        time,
        balance: calculateCoinBalance(trading, wallet, amount)
      }
  
      dispatch(openTradingPosition(positionRequest))
        .then((response: any) => {
          if (response && response.valid) {
            Swal.fire({
              toast: true,
              icon: response.success ? 'success' : 'warning',
              position: 'top-right',
              text: response.message,
              timerProgressBar: true,
              timer: 3000,
              showConfirmButton: false
            });
  
            setter(false);
          } else {
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
    }
  }

  const getMoney = () => {
    dispatch(getTradeEarning(position._id))
      .then((response: any) => {
        if (response && response.valid) {
          Swal.fire({
            toast: true,
            icon: response.success ? 'success' : 'warning',
            position: 'top-right',
            text: response.message,
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false
          });
        } else {
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
      })
  }

  useEffect(() => {
    dispatch(getTradingPosition());
  }, []);

  useEffect(() => {
    if (position && position.status === TRADING_STATUS.OPENED) {
      setAmount(position.amount);
      setRate(position.hit);
      setTime(position.time);
    } else {
      setAmount(0);
      setRemainTime(0);
    }
  }, [position]);

  useEffect(() => {
    setRate(Number((Math.floor(Math.random() * (60 - 20 + 1) + 20) / 100).toFixed(2)));
    setTime(Math.floor(Math.random() * (25 - 20 + 1) + 20));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (position) {
        setRemainTime(position.endDate - new Date().getTime());
      }

      if (position && position.endDate - new Date().getTime() < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [position]);

  return (
    <motion.div
      initial="hide" whileInView="show" viewport={{ once: true }} variants={fadeSmallLeftVariant(0.5)}
      className='w-full md:w-2/3 p-6 md:p-10 my-1 md:m-1 rounded-lg bg-[#252525]'
    >
      <div className='flex w-full'>
        <div className='flex justify-between items-start w-full md:w-1/3'>
          <h1 className='text-2xl'>Trading bot</h1>

          <div className="flex flex-col md:hidden">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className='flex items-center text-primary cursor-pointer'
            >{value[0]} <ArrowDownIcon /></div>

            <div className={`${dropdownOpen ? 'flex' : 'hidden'} flex-col w-full`}>
              {
                list.map((coin: string[], index: number) => (
                  <div key={index} className='py-2 cursor-pointer' onClick={() => handleChange(coin)}>{coin[0]}</div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='hidden md:flex items-center w-2/3 text-base'>
          <div className='flex'>
            {
              list.map((coin: string[], index: number) => (
                <button
                  key={index}
                  onClick={() => handleChange(coin)}
                  className={`${coin === value && 'text-primary'} mx-3 transition-all hover:font-bold`}
                >{coin[0]}</button>
              ))
            }
          </div>
        </div>
      </div>

      {
        isLoading ? (
          <div className="flex justify-center items-center w-full h-full">
            <Spinner />
          </div>
        ) : remainTime < 0 ? (
          <div className='flex flex-wrap flex-col md:flex-row w-full my-12'>
            <div className={`flex w-full md:w-full`}>
              <div className='flex flex-col w-full'>
                <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Amount</h1>
                <p className='flex items-center font-bold text-3xl md:text-[40px] my-4'>
                  $<span className="relative text-[#252525]">
                    {amount.toFixed(2)}
                    <input type="number" className="absolute top-0 left-0 w-[calc(100%+24px)] h-full font-bold bg-[#252525] text-white text-3xl md:text-[40px] outline-none border-none" value={amount.toFixed(2)} min={0} onChange={handleAmountChange} disabled={position && position.status === TRADING_STATUS.OPENED} />
                  </span>
                </p>
              </div>

              <div className='flex flex-col items-end md:items-start w-full'>
                <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Time needed</h1>
                <p className='font-bold text-3xl md:text-[40px] my-4'>{time} hours</p>
              </div>
            </div>

            <div className={`flex w-full md:justify-between`}>
              <div className='flex flex-col items-start w-full'>
                <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Earned</h1>
                <p className='font-bold text-3xl md:text-[40px] my-4'>${formatNumber(amount * rate)}</p>
              </div>

              <div className='flex flex-col items-end md:items-start w-full'>
                <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Hit</h1>
                <p className='font-bold text-3xl md:text-[40px] my-4'>{Math.floor(rate * 100)}%</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col md:flex-row w-full my-12'>
            <div className={`flex w-full md:w-2/3'`}>
              <div className='flex flex-col w-full'>
                <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Amount</h1>
                <p className='flex items-center font-bold text-3xl md:text-[40px] my-4'>
                  $<span className="relative text-[#252525]">
                    {amount.toFixed(2)}
                    <input type="number" className="absolute top-0 left-0 w-[calc(100%+24px)] h-full font-bold bg-[#252525] text-white text-3xl md:text-[40px] outline-none border-none" value={amount.toFixed(2)} min={0} onChange={handleAmountChange} disabled={position && position.status === TRADING_STATUS.OPENED} />
                  </span>
                </p>
              </div>

              <div className='flex flex-col items-end md:items-start w-full'>
                <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Earning possibility</h1>
                <p className='font-bold text-3xl md:text-[40px] my-4'>{Math.floor(rate * 100)}%</p>
              </div>
            </div>

            <div className={`flex w-full md:w-1/3`}>
              <div className='flex flex-col items-start w-full'>
                <h1 className='text-sm md:text-xl text-[#BBBBBB]'>Time needed</h1>
                <p className='font-bold text-3xl md:text-[40px] my-4'>{time} hours</p>
              </div>
            </div>
          </div>
        )
      }

      <div className='flex flex-col md:flex-row items-center my-4'>
        {
          !position && (
            <button className='flex justify-center items-center w-full md:w-auto font-bold px-4 py-3 rounded-lg bg-primary text-xl text-black transition-all hover:bg-green-500' onClick={openPosition} disabled={isOpening}>
              { isOpening ? 'Please wait...' : 'Open position' }&nbsp;<ExternalIcon />
            </button>
          )
        }

        {
          position && position.status === TRADING_STATUS.OPENED && (
            <div className="flex flex-col md:flex-row items-center w-full">
              <div className='flex justify-start w-full my-2'>
                <h1 className='text-xl'>Time left</h1>
                <p className='text-xl text-primary mx-4'>{position && remainTime < 0 ? 'Done' : convertTime(remainTime)}</p>
              </div>

              {
                position && remainTime < 0 && (
                  <div className='flex justify-end w-full my-2'>
                    <button onClick={getMoney} className='font-bold px-4 py-2 rounded-lg bg-primary text-black transition-all hover:bg-green-500' disabled={isEarning}>
                      { isEarning ? 'Please wait' : 'Get earning' }
                    </button>
                  </div>
                )
              }
            </div>
          )
        }

      </div>
    </motion.div>
  );
}

export default TradingBotCard;