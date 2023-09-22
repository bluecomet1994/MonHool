import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

import ExchangeDropDown from "@/components/landing/ExchangeDropDown";
import { expandVariant } from '@/utils/animations';
import { CurrencyType } from '@/types/components';
import { calculateBalance } from '@/utils/functions';
import { ExchangeRequestType } from '@/types/redux';
import { exchangeCoin } from '@/store/actions/transaction.action';
import { logoutUser } from '@/store/actions/user.action';

const ExchangeCard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLogin, userInfo } = useSelector(({ user }) => user);
  const { trading } = useSelector(({ currency }) => currency);
  const { isExchange } = useSelector(({ transaction }) => transaction);

  const [sendCurrency, setSendCurrency] = useState<CurrencyType>({
    id: 0,
    coin: '',
    unit: '',
    image: '',
    lastPrice: '0'
  });

  const [getCurrency, setGetCurrency] = useState<CurrencyType>({
    id: 0,
    coin: '',
    unit: '',
    image: '',
    lastPrice: '0'
  });

  const [sendAmount, setSendAmount] = useState(0.079);
  const [getAmount, setGetAmount] = useState(1.287);

  const handleSendCurrencyChange = (value: CurrencyType) => {
    setSendCurrency(value);
    setGetAmount((sendAmount * Number(value.lastPrice)) / Number(getCurrency.lastPrice));
  }

  const handleGetCurrencyChange = (value: CurrencyType) => {
    setGetCurrency(value);
    setGetAmount((sendAmount * Number(sendCurrency.lastPrice)) / Number(value.lastPrice));
  }

  const handleSendAmountChange = ({ target: { value } }: any) => {
    setSendAmount(Number(value));
    setGetAmount((sendAmount * Number(sendCurrency.lastPrice)) / Number(getCurrency.lastPrice));
  }

  const exchange = () => {
    const requestData: ExchangeRequestType = {
      sendCoin: sendCurrency.unit,
      sendAmount,
      getCoin: getCurrency.unit,
      getAmount
    }

    dispatch(exchangeCoin(requestData))
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
          if (isLogin) {
            Swal.fire({
              toast: true,
              icon: 'error',
              position: 'top-right',
              text: 'The token has expired. Please login again.',
              timerProgressBar: true,
              timer: 3000,
              showConfirmButton: false
            });

            dispatch(logoutUser());
          } else {
            router.push('/auth/login');
          }
        }
      });
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
        <div className="flex justify-center items-center text-sm w-44 h-10 rounded-full bg-[#A9A9A9]">Balance ${trading && calculateBalance(trading, userInfo.wallet)}</div>
      </div>

      <div className="w-full my-2 rounded-2xl bg-[#777777]">
        <div className="flex justify-center items-center p-5">
          <h1 className="w-1/4 text-lg md:text-xl">Send</h1>
          <h1 className="relative w-1/4 font-bold text-[#777777] text-2xl md:text-3xl">
            {sendAmount}
            <input
              type='number'
              className='absolute top-0 left-0 w-[calc(100%+24px)] h-full outline-none border-none bg-[#777777] text-white text-2xl md:text-3xl'
              value={sendAmount.toFixed(3)}
              onChange={handleSendAmountChange}
              min={0}
            />
          </h1>

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

      <button
        onClick={exchange}
        className="w-full min-h-[40px] h-full rounded-full mt-2 text-black text-xl bg-primary transition-all hover:bg-green-500"
        disabled={isExchange}
      >{isExchange ? 'Please wait...' : 'Change'}</button>
    </motion.div>
  )
}

export default ExchangeCard;